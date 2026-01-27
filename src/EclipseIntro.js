
// Import logos as you did before

  // const flow = [
  //   { id: 1, text: " U have arrived. I am the Void. A weapon without a master. You are the Wielder. My purpose is now yours.", logo: logo1 },
  //   { id: 2, text: " Two laws govern this world...", logo: logo1 }, // Use logo2 etc.
  //   { id: 3, text: " This is your Lifeline. Error cracks the glass. If we bleed out, we fail.", logo: logo1 },
  //   { id: 4, text: " This is Stardust. The spoils of war. Conquer the Realms, and we feast.", logo: logo1 },
  //   { id: 5, text: " The Pact is sealed. The Arcanum. The Aether. The Chronicles. The Lexicon. They are waiting to be broken. Choose a target.", logo: logo1 }
  // ];
import React, { useState } from 'react';
import './EclipseStyles.css';
import EclipseWorldMap from './EclipseWorldMap'; 
import EclipseSelection from './EclipseSelection'; 

import logo1 from './logo1.jpeg';
import logo2 from './logo2.jpeg';
import logo3 from './logo3.jpeg';
import logo4 from './logo4.jpeg';
import logo5 from './logo5.jpeg';

const EclipseIntro = () => {
  const [step, setStep] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [currentView, setCurrentView] = useState('intro'); 

const flow = [
    { id: 1, text: " U have arrived. I am the Void. A weapon without a master. You are the Wielder. My purpose is now yours.", logo: logo1 },
    { id: 2, text: " Two laws govern this world...", logo: logo2 }, // Use logo2 etc.
    { id: 3, text: " This is your Lifeline. Error cracks the glass. If we bleed out, we fail.", logo: logo3 },
    { id: 4, text: " This is Stardust. The spoils of war. Conquer the Realms, and we feast.", logo: logo4 },
    { id: 5, text: " The Pact is sealed. The Arcanum. The Aether. The Chronicles. The Lexicon. They are waiting to be broken. Choose a target.", logo: logo5 }
  ];

  const current = flow[step];
  const progressPercent = ((step + 1) / flow.length) * 100;

  const handleNext = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      if (step < flow.length - 1) {
        setStep(step + 1);
        setIsAnimatingOut(false);
      } else {
        setCurrentView('selection');
      }
    }, 500); 
  };

  if (currentView === 'map') return <EclipseWorldMap />;
  if (currentView === 'selection') {
    return <EclipseSelection onSelect={(choiceId) => setCurrentView('map')} />;
  }

  return (
    <div className="eclipse-main-wrapper">
      <div className="stars-overlay"></div>
      <div className="eclipse-container">
        {/* Progress Bar */}
        <div className="header-bar">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className={`content-area ${isAnimatingOut ? 'exit-scale' : 'enter-scale'}`}>
          <div className="character-section">
            <div className="character-wrapper">
                <div className="portal-ring"></div>
                <img src={current.logo} alt="Void" className="eclipse-logo" />
            </div>
            
            {/* The Speech Box */}
            <div className="speech-container">
              {/* Adding a key here forces the typewriter animation to restart per step */}
              <p key={current.text} className="typewriter-text">
                {current.text}
              </p>
            </div>
          </div>

          <div className="actions-section">
            <button onClick={handleNext} className="void-button">
              <span className="button-glitch"></span>
              {step === flow.length - 1 ? "SEAL THE PACT" : "PROCEED"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EclipseIntro;