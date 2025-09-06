import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Price of Juice Admin Panel</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          <Link to="/products" className="dashboard-card">
            <div className="card-icon">📦</div>
            <h2>Products Management</h2>
            <p>Manage product catalog, prices, and availability</p>
          </Link>

          <Link to="/text" className="dashboard-card">
            <div className="card-icon">📝</div>
            <h2>Text Content</h2>
            <p>Edit website text content and descriptions</p>
          </Link>
        </div>

        <div className="dashboard-info">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <Link to="/products" className="action-button">
              View Products
            </Link>
            <Link to="/text" className="action-button">
              Edit Text
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
