import React, { useEffect, useState } from 'react';
import './EclipseSelection.css';
// Import the map component directly
import EclipseWorldMap from './EclipseWorldMap'; 
// Import the Navigation Bar
import EclipseNavigation from './EclipseNavigation';

// --- Assets ---
import logo1 from './logo1.jpeg';
import choice1 from './logo1.1.jpeg'; 
import choice2 from './logo2.1.jpeg';
import choice3 from './logo3.1.jpeg';
import choice4 from './logo4.1.jpeg';

const EclipseSelection = () => {
  const [isThunder, setIsThunder] = useState(false);
  // NEW: Add state to track if a selection has been made
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const storm = setInterval(() => {
      setIsThunder(true);
      setTimeout(() => setIsThunder(false), 100);
      setTimeout(() => {
        setIsThunder(true);
        setTimeout(() => setIsThunder(false), 150);
      }, 2500);
    }, 2500);
    return () => clearInterval(storm);
  }, []);

  const choices = [
    { id: 'shadow', img: choice1, label: "SHADOW", color: '#a855f7', pos: 'top-left' },
    { id: 'abyss', img: choice2, label: "ABYSS", color: '#58cc02', pos: 'top-right' },
    { id: 'void', img: choice3, label: "VOID", color: '#ff0055', pos: 'bottom-left' },
    { id: 'phantom', img: choice4, label: "PHANTOM", color: '#00f7ff', pos: 'bottom-right' }
  ];

  // If map is selected, render the Map Component
  // (The Map component has its own EclipseNavigation inside it, see next file)
  if (showMap) {
    return <EclipseWorldMap />;
  }

  return (
    <div className={`select-container ${isThunder ? 'storm-active' : ''}`}>
      
      {/* --- HIGH INTENSITY METEOR SHOWER --- */}
      <div className="meteor-storm">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`meteor m-${i + 1}`}></div>
        ))}
      </div>

      <div className="nebula-overlay"></div>
      <div className="star-stream"></div>

      <div className="select-content">
        <div className="title-glitch-wrap">
          <h1 className="select-title" data-text="LETS BEGIN">LETS BEGIN</h1>
        </div>

        <div className="selection-stage">
          <div className="central-hub">
            <div className="hub-rings">
              <div className="ring r-1"></div>
              <div className="ring r-2"></div>
            </div>
            <div className="hub-border"></div>
            <div className="hero-wrapper float-crazy">
              <img src={logo1} alt="Eclipse Central" className="hub-img" />
            </div>
            <div className="hub-core-glow"></div>
          </div>

          <div className="orbs-orbit">
            {choices.map((item, index) => (
              <button 
                key={item.id} 
                className={`choice-orb ${item.pos} pop-entrance`}
                style={{ '--accent': item.color, '--delay': `${index * 0.1}s` }}
                // UPDATED: Trigger the state change here
                onClick={() => setShowMap(true)} 
              >
                <div className="orb-scanner-line"></div>
                <div className="orb-aura"></div>
                <img src={item.img} alt={item.label} className="orb-img-file neon-pulse" />
                <span className="orb-name-tag">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- ADDED NAVIGATION BAR --- */}
      <EclipseNavigation />
    </div>
  );
};

export default EclipseSelection;