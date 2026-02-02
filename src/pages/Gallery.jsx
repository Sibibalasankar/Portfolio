import React from 'react';
import './Pages.css';

const GalleryPage = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Gallery</h1>
        <p className="page-description">
          Coming soon - Visual showcase of UI designs, code snippets, 
          and development process documentation.
        </p>
        <div className="gallery-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="gallery-item"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;