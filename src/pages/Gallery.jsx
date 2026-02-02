import React from 'react';
import './Pages.css';

const ResumePage = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Resume</h1>
        <p className="page-description">
          Coming soon - Interactive resume with detailed experience, 
          skills, and achievements. Downloadable PDF version available.
        </p>
        <div className="resume-preview">
          <div className="resume-header"></div>
          <div className="resume-section"></div>
          <div className="resume-section"></div>
          <div className="resume-section"></div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;