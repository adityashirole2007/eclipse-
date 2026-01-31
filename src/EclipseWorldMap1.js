import React, { useEffect, useState } from 'react';
import './EclipseWorldMap1.css'; 
import EclipseNavigation from './EclipseNavigation';
import voidCharacter from './logo1.jpeg'; 

const EclipseWorldMap1 = ({ onNavigate }) => {
  const [activeLevel] = useState(1); 
  const [isLightning, setIsLightning] = useState(false);

  // Define 4 levels with Names Only
  const levels = [
    { id: 1, name: 'Mouth' },
    { id: 2, name: 'Stomach' },
    { id: 3, name: 'Intestine' },
    { id: 4, name: 'Kidney' }
  ];

  useEffect(() => {
    // Lightning effect
    const lightningInterval = setInterval(() => {
      setIsLightning(true);
      setTimeout(() => setIsLightning(false), 80);
      setTimeout(() => setIsLightning(true), 160);
      setTimeout(() => setIsLightning(false), 300);
    }, 4000); 
    return () => clearInterval(lightningInterval);
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    const timer = setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`world-container-science science-theme ${isLightning ? 'lightning-flash' : ''}`}>
      <div className="space-dust"></div>
      
      <div className="path-grid">
        {levels.map((levelData, index) => {
          const levelNum = levelData.id;
          const isCurrent = levelNum === activeLevel;
          const isCompleted = levelNum < activeLevel;
          
          // Layout: Center -> Right -> Left -> Center
          const posClass = index % 2 === 0 ? 'center' : (index === 1 ? 'right' : 'left');

          return (
            <div key={levelNum} className={`node-wrapper ${posClass}`}>
              
              {/* Void Character (Blue Background Theme) */}
              {isCurrent && (
                <div className="void-pedestal">
                  <div className="void-aura-science"></div>
                  <div className="void-tag-science">VOID</div>
                  <img src={voidCharacter} alt="Void" className="void-hero" style={{animation: 'floatCrazy 3s ease-in-out infinite'}} />
                </div>
              )}

              {/* The Orb */}
              <div 
                className={`orb-node ${isCurrent ? 'active' : ''} ${isCompleted ? 'done' : 'locked'}`}
                onClick={() => useState(levelNum)}
              >
                <div className="orb-inner-science">
                  {/* TEXT NAME instead of Image */}
                  <span className="orb-text">{levelData.name}</span>
                </div>
                
                {/* Energy Rings */}
                {(isCurrent || isCompleted) && <div className="energy-rings-science"></div>}
              </div>
              
              {/* Connection Line */}
              {index < levels.length - 1 && <div className="tendril-up-science"></div>}
            </div>
          );
        })}
      </div>
      
      <EclipseNavigation onNavigate={onNavigate} />
    </div>
  );
};

export default EclipseWorldMap1;