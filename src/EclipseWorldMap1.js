import React, { useEffect, useState } from 'react';
import './EclipseWorldMap1.css'; // Importing the Science-specific CSS
import voidCharacter from './logo1.jpeg'; 
import EclipseNavigation from './EclipseNavigation';

const EclipseWorldMap1 = ({ onNavigate }) => {
  const [activeLevel, setActiveLevel] = useState(1); 
  const [isLightning, setIsLightning] = useState(false);
  
  const levels = Array.from({ length: 50 }, (_, i) => i + 1);

  useEffect(() => {
    const lightningInterval = setInterval(() => {
      setIsLightning(true);
      setTimeout(() => setIsLightning(false), 80);
      setTimeout(() => setIsLightning(true), 160);
      setTimeout(() => setIsLightning(false), 300);
    }, 2000);
    return () => clearInterval(lightningInterval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`world-container-science science-theme ${isLightning ? 'lightning-flash' : ''}`}>
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
                  <div className="void-aura-science"></div>
                  <div className="void-tag-science">VOID</div>
                  <img src={voidCharacter} alt="Void" className="void-hero float-crazy" />
                </div>
              )}

              <div className={`orb-node ${isCurrent ? 'active' : ''} ${isCompleted ? 'done' : 'locked'}`}>
                <div className="orb-inner-science">
                  <span className="orb-num">{level}</span>
                </div>
                {(isCurrent || isCompleted) && <div className="energy-rings-science"></div>}
              </div>
              
              {level < 50 && <div className="tendril-up-science"></div>}
            </div>
          );
        })}
      </div>
      <EclipseNavigation onNavigate={onNavigate} />
    </div>
  );
};

export default EclipseWorldMap1;