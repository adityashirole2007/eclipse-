import React, { useState, useEffect } from 'react';
import './EclipseSelection.css';
import EclipseNavigation from './EclipseNavigation';
import EclipseWorldMap from './EclipseWorldMap'; // Ensure this is imported

// Central Image

import voidSanctum from './logo11.jpeg'; // Your Image 4 central asset

// Island Images

import arcanumImg from './logo1.1.jpeg';

import aetherImg from './logo2.1.jpeg';

import chroniclesImg from './logo3.1.jpeg';

import lexiconImg from './logo4.1.jpeg';



const EclipseSelection = () => {
  const [showMap, setShowMap] = useState(false);
  const [isThunder, setIsThunder] = useState(false);

  // Re-adding your thunder effect logic
  useEffect(() => {
    const storm = setInterval(() => {
      setIsThunder(true);
      setTimeout(() => setIsThunder(false), 100);
    }, 2500);
    return () => clearInterval(storm);
  }, []);

  const choices = [
    { id: 'math', img: arcanumImg, label: "THE ARCANUM", sub: "Math", color: '#00f7ff', pos: 'top-left' },
    { id: 'science', img: aetherImg, label: "THE AETHER", sub: "Science", color: '#58cc02', pos: 'top-right' },
    { id: 'history', img: chroniclesImg, label: "THE CHRONICLES", sub: "History", color: '#ffaa00', pos: 'bottom-left' },
    { id: 'english', img: lexiconImg, label: "THE LEXICON", sub: "English", color: '#ff0055', pos: 'bottom-right' }
  ];

  // Logic to switch view
  if (showMap) {
    return <EclipseWorldMap />;
  }

  return (
    <div className={`select-container ${isThunder ? 'storm-active' : ''}`}>
      <div className="star-stream"></div>

      <div className="selection-stage">
        
        {/* CENTER: VOID SANCTUM - Clicking this also takes you to the map */}
        <div className="central-hub" onClick={() => setShowMap(true)} style={{cursor: 'pointer'}}>
          <img src={voidSanctum} alt="Void Sanctum" className="hub-img float-crazy" />
          <h2 className="orb-name-tag" style={{fontSize: '1.5rem'}}></h2>
        </div>

        {/* ORBITING ISLANDS */}
        {choices.map((item) => (
          <button 
            key={item.id} 
            className={`choice-orb ${item.pos}`}
            style={{ '--accent': item.color }}
            onClick={() => setShowMap(true)} // This triggers the map view
          >
            <img src={item.img} alt={item.label} className="orb-img-file" />
            <span className="orb-name-tag">{item.label}</span>
            <span className="orb-sub-text">{item.sub}</span>
          </button>
        ))}
      </div>

      <EclipseNavigation />
    </div>
  );
};

export default EclipseSelection;