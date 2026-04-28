import { useState, useEffect } from 'react';
import axios from 'axios';

const ReturnBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!selectedBookId) {
      return setError('Please select a book');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/transactions/return', {
        bookId: selectedBookId,
        quantity: parseInt(quantity)
      });
      setMessage(`Return processed successfully. Updated stock: ${res.data.updatedStock}`);
      fetchBooks();
      setQuantity(1);
      setSelectedBookId('');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing return');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Return Book</h1>
      </div>

      <div className="card" style={{ maxWidth: '600px' }}>
        {message && <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--success)', color: '#fff', borderRadius: '0.5rem' }}>{message}</div>}
        {error && <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--danger)', color: '#fff', borderRadius: '0.5rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Book</label>
            <select className="input-field" value={selectedBookId} onChange={(e) => setSelectedBookId(e.target.value)}>
              <option value="" disabled>-- Select a book --</option>
              {books.map(b => (
                <option key={b._id} value={b._id}>{b.title} by {b.author}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity Returned</label>
            <input 
              type="number" min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              className="input-field" required 
            />
          </div>
          
          <button type="submit" className="btn btn-success" style={{ width: '100%', marginTop: '1rem' }}>
            Process Return
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReturnBook;
