import { useState, useEffect } from 'react';
import axios from 'axios';

const CheckStock = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/books`);
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  const getStockBadge = (quantity) => {
    if (quantity === 0) return <span className="badge badge-danger">Out of Stock</span>;
    if (quantity < 10) return <span className="badge badge-warning">Low Stock</span>;
    return <span className="badge badge-success">Available</span>;
  };

  return (
    <div>
      <div className="page-header">
        <h1>Check Stock</h1>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book._id}>
                  <td style={{ fontWeight: 500 }}>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td style={{ fontWeight: 600 }}>{book.quantity}</td>
                  <td>{getStockBadge(book.quantity)}</td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No books in inventory.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CheckStock;
