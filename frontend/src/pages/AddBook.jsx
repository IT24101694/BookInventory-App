import { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '', author: '', price: '', quantity: '', category: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', formData);
      setMessage('Book added successfully!');
      setFormData({ title: '', author: '', price: '', quantity: '', category: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error adding book');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Add New Book</h1>
      </div>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        {message && <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--success)', borderRadius: '0.5rem' }}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} className="input-field" required />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input name="author" value={formData.author} onChange={handleChange} className="input-field" required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input name="category" value={formData.category} onChange={handleChange} className="input-field" required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="input-field" required />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="input-field" required />
            </div>
          </div>
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Save Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
