import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  ShoppingCart, 
  RotateCcw, 
  Archive, 
  BarChart 
} from 'lucide-react';

const Dashboard = () => {
  const cards = [
    { title: 'Add Books', icon: <PlusCircle size={24} />, path: '/add', desc: 'Add new books to inventory' },
    { title: 'Search Books', icon: <Search size={24} />, path: '/search', desc: 'Find existing books quickly' },
    { title: 'Update Books', icon: <Edit size={24} />, path: '/update', desc: 'Edit details or restock' },
    { title: 'Issue or Sell', icon: <ShoppingCart size={24} />, path: '/issue-sell', desc: 'Process a sale or issue' },
    { title: 'Return Books', icon: <RotateCcw size={24} />, path: '/return', desc: 'Accept returned books' },
    { title: 'Check Stock', icon: <Archive size={24} />, path: '/stock', desc: 'View inventory levels' },
    { title: 'Reports', icon: <BarChart size={24} />, path: '/reports', desc: 'View sales & stock reports' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Welcome to the Book Inventory System</p>
      </div>
      
      <div className="dashboard-grid">
        {cards.map((card, idx) => (
          <Link to={card.path} key={idx} className="card dashboard-card">
            <div className="dashboard-card-icon">
              {card.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{card.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
