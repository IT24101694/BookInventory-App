const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

// Get all transactions (for reports)
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('bookId').sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Issue or Sell a book
router.post('/issue-sell', async (req, res) => {
  const { bookId, type, quantity } = req.body;
  
  if (!['issue', 'sell'].includes(type)) {
    return res.status(400).json({ message: 'Type must be issue or sell' });
  }

  const session = await Book.startSession();
  session.startTransaction();

  try {
    const book = await Book.findById(bookId).session(session);
    if (!book) {
      throw new Error('Book not found');
    }
    if (book.quantity < quantity) {
      throw new Error('Not enough stock available');
    }

    // Deduct stock
    book.quantity -= quantity;
    await book.save({ session });

    // Create transaction record
    const transaction = new Transaction({
      bookId,
      type,
      quantity
    });
    
    const savedTransaction = await transaction.save({ session });
    
    await session.commitTransaction();
    res.status(201).json({ transaction: savedTransaction, remainingStock: book.quantity });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

// Return a book
router.post('/return', async (req, res) => {
  const { bookId, quantity } = req.body;

  const session = await Book.startSession();
  session.startTransaction();

  try {
    const book = await Book.findById(bookId).session(session);
    if (!book) {
      throw new Error('Book not found');
    }

    // Add back to stock
    book.quantity += parseInt(quantity, 10);
    await book.save({ session });

    // Create return transaction record
    const transaction = new Transaction({
      bookId,
      type: 'return',
      quantity
    });
    
    const savedTransaction = await transaction.save({ session });
    
    await session.commitTransaction();
    res.status(201).json({ transaction: savedTransaction, updatedStock: book.quantity });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
