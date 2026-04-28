import { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [view, setView] = useState('sales'); // 'sales' or 'returns'

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/transactions');
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(t => 
    view === 'sales' ? (t.type === 'sell' || t.type === 'issue') : t.type === 'return'
  );

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Reports</h1>
        <button className="btn" onClick={() => window.print()}>Print Report</button>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
        <button 
          className="btn" 
          style={{ backgroundColor: view === 'sales' ? 'var(--primary)' : 'var(--bg-color)' }}
          onClick={() => setView('sales')}
        >
          Sales / Issues Report
        </button>
        <button 
          className="btn"
          style={{ backgroundColor: view === 'returns' ? 'var(--success)' : 'var(--bg-color)' }}
          onClick={() => setView('returns')}
        >
          Returns Report
        </button>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1rem', textTransform: 'capitalize' }}>{view} History</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Book Title</th>
                <th>Type</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t._id}>
                  <td>{new Date(t.date).toLocaleString()}</td>
                  <td style={{ fontWeight: 500 }}>{t.bookId?.title || 'Unknown Book'}</td>
                  <td>
                    <span className={`badge ${t.type === 'return' ? 'badge-success' : t.type === 'sell' ? 'badge-warning' : 'badge-danger'}`} style={{ textTransform: 'capitalize' }}>
                      {t.type}
                    </span>
                  </td>
                  <td>{t.quantity}</td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No {view} records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
