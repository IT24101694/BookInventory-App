import { Outlet, NavLink } from 'react-router-dom';
import { 
  BookOpen, 
  Home, 
  PlusCircle, 
  Search, 
  Edit, 
  ShoppingCart, 
  RotateCcw, 
  Archive, 
  BarChart 
} from 'lucide-react';

const Layout = () => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>
            <BookOpen size={24} className="text-primary" />
            Book Inventory
          </h2>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                <Home size={20} /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                <PlusCircle size={20} /> Add Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                <Search size={20} /> Search Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/update" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                <Edit size={20} /> Update Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/issue-sell" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                <ShoppingCart size={20} /> Issue / Sell
              </NavLink>
            </li>
            <li>
              <NavLink to="/return" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                <RotateCcw size={20} /> Return Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/stock" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                <Archive size={20} /> Check Stock
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                <BarChart size={20} /> Reports
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
