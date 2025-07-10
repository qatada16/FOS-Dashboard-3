import './Navbar.css';
import fosLogo from '../images/FOS-03.png';
import React from 'react'

export default function Navbar() {
  return (
    <header className="navbar">
      <img 
        src={fosLogo} 
        alt="FOS Logo" 
        className="logo"
      />
      
      <div className="title-container">
        <h1 className="dashboard-title">
          <span className="monitoring-badge">Monitoring</span>
          <span className="dashboard-text">Dashboard 3</span>
        </h1>
      </div>
    </header>
  );
}