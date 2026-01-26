import React, { useState } from 'react';
import './EclipseStyles.css';
import EclipseWorldMap from './EclipseWorldMap'; // Import your map component

// --- Import all 5 Logos ---
import logo1 from './logo1.jpeg';
import logo2 from './logo2.jpeg';
import logo3 from './logo3.jpeg';
import logo4 from './logo4.jpeg';
import logo5 from './logo5.jpeg';

const EclipseIntro = () => {
  const [step, setStep] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showMap, setShowMap] = useState(false); // New state to toggle views

  const flow = [
    { id: 1, text: "Yo! I'm Eclipse. Ready to crush Class 10?", type: "dialogue", logo: logo1 },
    { id: 2, text: "First up, what subject is your main focus right now?", type: "options", logo: logo2, choices: ["Mathematics 📐", "Science 🧬", "Social Science 🌍", "English 📚"] },
    { id: 3, text: "What's the biggest goal for the next 3 months?", type: "options", logo: logo3, choices: ["Top the class exams 🏆", "Understand concepts deeply 🧠", "Just survive the semester 😅"] },
    { id: 4, text: "Be real with me. How much time can you commit daily?", type: "options", logo: logo4, choices: ["15 mins (Quick session)", "30 mins (Solid focus)", "60 mins (Beast mode)"] },
    { id: 5, text: "Awesome. Let's sync your learning path. Tap continue to start!", type: "dialogue", logo: logo5 }
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
        // Instead of an alert, we trigger the Map view
        setShowMap(true);
      }
    }, 400); 
  };

  // If showMap is true, render the World Map instead of the Intro
  if (showMap) {
    return <EclipseWorldMap />;
  }

  return (
    <div className="eclipse-container font-sans">
      <div className="header-bar fade-in">
        <button className="back-icon">←</button>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}>
            <div className="progress-glow"></div>
          </div>
        </div>
      </div>

      <div key={step} className={`content-area ${isAnimatingOut ? 'scale-out' : 'scale-in'}`}>
        <div className="character-section stagger-1">
          <div className="speech-bubble">
            <h2 className="bubble-text">{current.text}</h2>
            <div className="bubble-tail"></div>
          </div>
          <div className="character-wrapper float-animation">
            <img src={current.logo} alt="Eclipse Character" className="eclipse-logo neon-pulse" />
          </div>
        </div>

        <div className="actions-section stagger-2">
          {current.type === "options" ? (
            <div className="options-grid">
              {current.choices.map((choice, i) => (
                <button key={i} onClick={handleNext} className="cyber-button option">
                  {choice}
                </button>
              ))}
            </div>
          ) : (
            <button onClick={handleNext} className="cyber-button primary squish-effect">
              CONTINUE 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EclipseIntro;