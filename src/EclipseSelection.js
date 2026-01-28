import React, { useState } from 'react';
import './EclipseSelection.css';
import EclipseNavigation from './EclipseNavigation';
import EclipseWorldMap from './EclipseWorldMap';

import voidSanctum from './logo11.jpeg';
import arcanumImg from './logo1.1.jpeg';
import aetherImg from './logo2.1.jpeg';
import chroniclesImg from './logo3.1.jpeg';
import lexiconImg from './logo4.1.jpeg';

const EclipseSelection = ({ onNavigate }) => { // Prop received here
  const [showMap, setShowMap] = useState(false);
  const stars = Array.from({ length: 50 });
  const meteors = Array.from({ length: 15 });

  const choices = [
    { id: 'math', img: arcanumImg, label: "THE ARCANUM", sub: "Math", color: '#00f7ff', pos: 'top-left' },
    { id: 'science', img: aetherImg, label: "THE AETHER", sub: "Science", color: '#58cc02', pos: 'top-right' },
    { id: 'history', img: chroniclesImg, label: "THE CHRONICLES", sub: "History", color: '#ffaa00', pos: 'bottom-left' },
    { id: 'english', img: lexiconImg, label: "THE LEXICON", sub: "English", color: '#ff0055', pos: 'bottom-right' }
  ];

  if (showMap) {
    return <EclipseWorldMap />;
  }

  return (
    <div className="select-container">
      <div className="star-field">
        {stars.map((_, i) => (
          <div key={i} className="star" style={{
             top: `${Math.random() * 100}%`,
             left: `${Math.random() * 100}%`,
             width: `${Math.random() * 3 + 1}px`,
             height: `${Math.random() * 3 + 1}px`,
             '--duration': `${Math.random() * 3 + 2}s`
          }}></div>
        ))}
      </div>

      <div className="meteor-shower">
        {meteors.map((_, i) => (
          <div key={i} className="meteor" style={{
            top: `${Math.random() * -100}px`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 2 + 1}s`
          }}></div>
        ))}
      </div>

      <div className="selection-stage">
        <div className="central-hub" onClick={() => setShowMap(true)}>
          <img src={voidSanctum} alt="Void Sanctum" className="hub-img" />
        </div>

        {choices.map((item) => (
          <button 
            key={item.id} 
            className={`choice-orb ${item.pos}`}
            style={{ '--accent': item.color }}
            onClick={() => setShowMap(true)}
          >
            <img src={item.img} alt={item.label} className="orb-img-file" />
            <span className="orb-name-tag">{item.label}</span>
            <span className="orb-sub-text">{item.sub}</span>
          </button>
        ))}
      </div>

      {/* Pass onNavigate to the dock */}
      <EclipseNavigation onNavigate={onNavigate} />
    </div>
  );
};

export default EclipseSelection;