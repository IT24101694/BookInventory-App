import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({ price: '', quantity: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/books`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (e) => {
    const book = books.find(b => b._id === e.target.value);
    setSelectedBook(book);
    if (book) {
      setFormData({ price: book.price, quantity: book.quantity });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBook) return;
    
    try {
      await axios.put(`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/books/${selectedBook._id}`, formData);
      setMessage('Book updated successfully!');
      fetchBooks();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error updating book');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Update Books</h1>
      </div>

      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="form-group">
          <label>Select Book</label>
          <select className="input-field" onChange={handleSelect} defaultValue="">
            <option value="" disabled>-- Select a book --</option>
            {books.map(b => (
              <option key={b._id} value={b._id}>{b.title} by {b.author}</option>
            ))}
          </select>
        </div>

        {selectedBook && (
          <form onSubmit={handleSubmit} style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            {message && <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--success)', borderRadius: '0.5rem' }}>{message}</div>}
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Update Price ($)</label>
                <input 
                  type="number" step="0.01" 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                  className="input-field" required 
                />
              </div>
              <div className="form-group">
                <label>Update Quantity</label>
                <input 
                  type="number" 
                  value={formData.quantity} 
                  onChange={e => setFormData({...formData, quantity: e.target.value})} 
                  className="input-field" required 
                />
              </div>
            </div>
            <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Update Book</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateBook;
