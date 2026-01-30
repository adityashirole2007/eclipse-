import React from 'react';
import './EclipseChapterSelection.css';
import EclipseNavigation from './EclipseNavigation';

const EclipseChapterSelection = ({ onNavigate }) => {
  const chapters = [
    "Chemical Reactions", "Acids, Bases & Salts", "Metals & Non-Metals",
    "Carbon & its Compounds", "Life Processes", "Control & Coordination",
    "How do Organisms Reproduce?", "Heredity", "Light Reflection & Refraction",
    "Human Eye & Colourful World", "Electricity", "Magnetic Effects of Current", "Our Environment"
  ];

  return (
    <div className="chapter-selection-container">
      {/* Background elements consistent with World Map */}
      <div className="space-dust"></div>
      
      <div className="content-wrapper">
        <h1 className="title-glow">SCIENCE ARCHIVES</h1>
        <p className="subtitle">Select your mission, Commander</p>

        <div className="chapters-grid">
          {chapters.map((chapter, index) => (
            <div 
              key={index} 
              className="chapter-card float-anim"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onNavigate('map1')} // Directs to Science Map
            >
              <div className="chapter-number">0{index + 1}</div>
              <div className="chapter-info">
                <h3>{chapter}</h3>
                <span>Class 10 • Science</span>
              </div>
              <div className="portal-arrow">✦</div>
            </div>
          ))}
        </div>
      </div>

      <EclipseNavigation onNavigate={onNavigate} />
    </div>
  );
};

export default EclipseChapterSelection;