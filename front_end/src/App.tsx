import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import DashboardPage from './Pages/ClientDashboard';
import Adm_Dashboard from './Pages/Adm_Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/Dashboard' element={<DashboardPage />} />
        <Route path='/Adm/Dashboard' element={<Adm_Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
