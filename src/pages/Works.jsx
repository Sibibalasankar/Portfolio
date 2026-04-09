import React from 'react';
import Projects from '../components/Projects';
import './Pages.css';

const WorksPage = () => {
  return (
    <div className="page-wrapper works-page">
      <div className="page-header">
        <h1 className="page-title">Selected Works</h1>
        <p className="page-subtitle">A collection of projects built with passion and precision.</p>
      </div>
      <Projects />
    </div>
  );
};

export default WorksPage;