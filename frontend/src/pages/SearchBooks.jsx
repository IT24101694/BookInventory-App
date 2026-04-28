import { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      const res = await axios.get(`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/books/search?q=${query}`);
      setResults(res.data);
      setSearched(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Search Books</h1>
      </div>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search by Title, Author, or ID..." 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              style={{ paddingLeft: '3rem' }}
            />
          </div>
          <button type="submit" className="btn">Search</button>
        </form>
      </div>

      {searched && (
        <div className="card">
          <h2 style={{ marginBottom: '1rem' }}>Results ({results.length})</h2>
          {results.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No books found for "{query}".</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(book => (
                    <tr key={book._id}>
                      <td><small style={{ color: 'var(--text-muted)' }}>{book._id.substring(book._id.length - 6)}</small></td>
                      <td style={{ fontWeight: 500 }}>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.category}</td>
                      <td>${book.price.toFixed(2)}</td>
                      <td>{book.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBooks;
