import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddBook from './pages/AddBook';
import SearchBooks from './pages/SearchBooks';
import UpdateBook from './pages/UpdateBook';
import IssueSellBook from './pages/IssueSellBook';
import ReturnBook from './pages/ReturnBook';
import CheckStock from './pages/CheckStock';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add" element={<AddBook />} />
          <Route path="search" element={<SearchBooks />} />
          <Route path="update" element={<UpdateBook />} />
          <Route path="issue-sell" element={<IssueSellBook />} />
          <Route path="return" element={<ReturnBook />} />
          <Route path="stock" element={<CheckStock />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
