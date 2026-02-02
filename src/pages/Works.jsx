import React from 'react';
import './Pages.css';

const WorksPage = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Works</h1>
        <p className="page-description">
          Coming soon - A curated collection of my best projects in web development, 
          blockchain, and AI applications.
        </p>
        <div className="page-placeholder">
          <div className="placeholder-card"></div>
          <div className="placeholder-card"></div>
          <div className="placeholder-card"></div>
        </div>
      </div>
    </div>
  );
};

export default WorksPage;