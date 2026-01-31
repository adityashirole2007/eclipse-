import React, { useEffect, useState } from 'react';
import './EclipseWorldMap.css';
import voidCharacter from './logo1.jpeg'; 
// Import the Navigation Bar
import EclipseNavigation from './EclipseNavigation';

const EclipseWorldMap = ({ onNavigate }) => { // Prop received here
  const [activeLevel] = useState(1); 
  const [isLightning, setIsLightning] = useState(false);
  
  const levels = Array.from({ length: 50 }, (_, i) => i + 1);

  // Crazy Lightning Logic: Triggered every 2 seconds with a double-flash
  useEffect(() => {
    const lightningInterval = setInterval(() => {
      setIsLightning(true);
      // Fast triple-flash for more "impact"
      setTimeout(() => setIsLightning(false), 80);
      setTimeout(() => setIsLightning(true), 160);
      setTimeout(() => setIsLightning(false), 300);
    }, 2000);

    return () => clearInterval(lightningInterval);
  }, []);

  // Ensure we start at the bottom (Level 1)
  useEffect(() => {
    const timer = setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'auto'
        });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`world-container conquest-theme ${isLightning ? 'lightning-flash' : ''}`}>
      {/* Background Space Dust layer */}
      <div className="space-dust"></div>
      
      <div className="path-grid">
        {levels.map((level, index) => {
          const isCurrent = level === activeLevel;
          const isCompleted = level < activeLevel;
          
          const posClass = index % 4 === 0 ? 'center' : index % 4 === 1 ? 'right' : index % 4 === 2 ? 'center' : 'left';

          return (
            <div key={level} className={`node-wrapper ${posClass}`}>
              {isCurrent && (
                <div className="void-pedestal">
                  <div className="void-aura"></div>
                  <div className="void-tag">VOID</div>
                  <img src={voidCharacter} alt="Void" className="void-hero float-crazy" />
                </div>
              )}

              <div className={`orb-node ${isCurrent ? 'active' : ''} ${isCompleted ? 'done' : 'locked'}`}>
                <div className="orb-inner">
                  <span className="orb-num">{level}</span>
                </div>
                {(isCurrent || isCompleted) && <div className="energy-rings-anim"></div>}
              </div>
              
              {level < 50 && <div className="tendril-up"></div>}
            </div>
          );
        })}
      </div>

      {/* Pass the onNavigate prop here to resolve the error */}
      <EclipseNavigation onNavigate={onNavigate} />
    </div>
  );
};

export default EclipseWorldMap;