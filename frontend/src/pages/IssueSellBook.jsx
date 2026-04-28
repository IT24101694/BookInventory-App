import { useState, useEffect } from 'react';
import axios from 'axios';

const IssueSellBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [formData, setFormData] = useState({ type: 'sell', quantity: 1 });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/books`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const selectedBook = books.find(b => b._id === selectedBookId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!selectedBookId) {
      return setError('Please select a book');
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/transactions/issue-sell`, {
        bookId: selectedBookId,
        type: formData.type,
        quantity: parseInt(formData.quantity)
      });
      setMessage(`Successfully processed ${formData.type}. Remaining stock: ${res.data.remainingStock}`);
      fetchBooks();
      setFormData({ type: 'sell', quantity: 1 });
      setSelectedBookId('');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error processing transaction');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Issue or Sell Book</h1>
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
                <option key={b._id} value={b._id} disabled={b.quantity === 0}>
                  {b.title} (Available: {b.quantity}) {b.quantity === 0 && '- OUT OF STOCK'}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Transaction Type</label>
              <select className="input-field" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="sell">Sell</option>
                <option value="issue">Issue</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input 
                type="number" min="1" 
                max={selectedBook?.quantity || 1}
                value={formData.quantity} 
                onChange={(e) => setFormData({...formData, quantity: e.target.value})} 
                className="input-field" required 
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-warning" style={{ width: '100%', marginTop: '1rem' }}>
            Process {formData.type === 'sell' ? 'Sale' : 'Issue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueSellBook;
