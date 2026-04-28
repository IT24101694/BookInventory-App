const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search books
router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json([]);
  
  try {
    // Search by title or author or exactly match ID if valid ObjectId
    const searchConditions = [
      { title: { $regex: query, $options: 'i' } },
      { author: { $regex: query, $options: 'i' } }
    ];
    
    // Add ID search if the query is a valid 24 hex char string
    if (query.match(/^[0-9a-fA-F]{24}$/)) {
      searchConditions.push({ _id: query });
    }
    
    const books = await Book.find({ $or: searchConditions });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single book
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// Add a book
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book
router.put('/:id', getBook, async (req, res) => {
  if (req.body.title != null) res.book.title = req.body.title;
  if (req.body.author != null) res.book.author = req.body.author;
  if (req.body.price != null) res.book.price = req.body.price;
  if (req.body.quantity != null) res.book.quantity = req.body.quantity;
  if (req.body.category != null) res.book.category = req.body.category;
  
  res.book.updatedAt = Date.now();

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.deleteOne();
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get book object by ID
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

module.exports = router;
