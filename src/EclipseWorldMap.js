import React, { useEffect, useState } from 'react';
import './EclipseWorldMap.css';
import voidCharacter from './logo1.jpeg'; 

const EclipseWorldMap = () => {
  const [activeLevel, setActiveLevel] = useState(1); 
  const [isLightning, setIsLightning] = useState(false);
  
  // Levels 1 to 50
  const levels = Array.from({ length: 50 }, (_, i) => i + 1);

  // Precision Lightning Logic: Fires exactly every 2 seconds
  useEffect(() => {
    const lightningInterval = setInterval(() => {
      setIsLightning(true);
      
      // Double flash effect for that "crazy" realistic feel
      setTimeout(() => setIsLightning(false), 100);
      setTimeout(() => setIsLightning(true), 200);
      setTimeout(() => setIsLightning(false), 300);
      
    }, 2000); // 2 Seconds

    return () => clearInterval(lightningInterval);
  }, []);

  // Auto-scroll to bottom on load so user starts at Level 1
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div className={`world-container conquest-theme ${isLightning ? 'lightning-flash' : ''}`}>
      {/* Background Storm Overlay */}
      <div className="storm-clouds"></div>
      
      <div className="path-grid">
        {/* We map the levels normally; CSS handles the "bottom-to-top" visual stack */}
        {levels.map((level, index) => {
          const isCurrent = level === activeLevel;
          const isCompleted = level < activeLevel;
          
          // Winding path logic
          const posClass = index % 4 === 0 ? 'center' : index % 4 === 1 ? 'right' : index % 4 === 2 ? 'center' : 'left';

          return (
            <div key={level} className={`node-wrapper ${posClass}`}>
              {isCurrent && (
                <div className="void-pedestal">
                  <div className="void-tag">VOID</div>
                  <img src={voidCharacter} alt="Void" className="void-hero float-heavy" />
                </div>
              )}

              <div className={`orb-node ${isCurrent ? 'active' : ''} ${isCompleted ? 'done' : 'locked'}`}>
                <div className="orb-inner">
                  <span className="orb-num">{level}</span>
                </div>
                {(isCurrent || isCompleted) && <div className="energy-rings"></div>}
              </div>
              
              {/* Tendril connecting to the level ABOVE it */}
              {level < 50 && <div className="tendril-up"></div>}
            </div>
          );
        })}
      </div>

      {/* Command Center Nav */}
      <nav className="command-center">
        <button className="nav-btn">⚙️</button>
        <button className="nav-btn">⚔️</button>
        <div className="home-hex-wrapper">
          <button className="home-btn">
            <span className="home-icon">🏠</span>
          </button>
        </div>
        <button className="nav-btn">🏆</button>
        <button className="nav-btn">👤</button>
      </nav>
    </div>
  );
};

export default EclipseWorldMap;