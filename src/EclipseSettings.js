import React, { useState } from 'react';
import './EclipseSettings.css';

const EclipseSettings = ({ onBack, onLogout }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [soundEffects, setSoundEffects] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [board, setBoard] = useState('CBSE');

  const handleMouseMove = (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="settings-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      
      {/* BACKGROUND EFFECTS */}
      <div className="star-field">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="star" style={{
             top: `${Math.random() * 100}%`,
             left: `${Math.random() * 100}%`,
             width: `${Math.random() * 2 + 1}px`,
             height: `${Math.random() * 2 + 1}px`,
             '--duration': `${Math.random() * 3 + 2}s`
          }} />
        ))}
      </div>

      {/* TOP NAVIGATION BAR (Prevents Overlap) */}
      <div className="top-navigation">
        <button className="back-btn-circle" onClick={onBack}>
          <span>←</span>
        </button>
      </div>

      {/* MAIN CONTROL DECK */}
      <div 
        className="control-deck" 
        style={{ 
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: 'transform 0.1s ease-out' 
        }}
      >
        <div className="deck-header">
          <h2 className="deck-title">CONTROL DECK</h2>
          <div className="header-line"></div>
        </div>

        <div className="prime-banner">
          <div className="prime-content">
            <h3>ECLIPSE SUPER</h3>
            <p>Unlimited Hearts • No Ads • Mastery Quiz</p>
          </div>
          <button className="prime-btn">UPGRADE</button>
        </div>

        <div className="setting-group">
          <div className="section-label">Sync Parameters</div>
          <div className="setting-item">
            <div className="setting-text">
              <h4>Target Board</h4>
              <p>Curriculum currently loaded</p>
            </div>
            <div className="selector-value" onClick={() => setBoard(board === 'CBSE' ? 'ICSE' : 'CBSE')}>
              {board} <span className="arrow-icon">&gt;</span>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-text">
              <h4>Daily XP Goal</h4>
              <p>Intensity: Casual (10 mins)</p>
            </div>
            <div className="edit-link">EDIT</div>
          </div>
        </div>

        <div className="setting-group">
          <div className="section-label">System Override</div>
          <div className="setting-item">
            <div className="setting-text"><h4>Sound Effects</h4></div>
            <label className="switch">
              <input type="checkbox" checked={soundEffects} onChange={() => setSoundEffects(!soundEffects)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-text"><h4>Haptic Feedback</h4></div>
            <label className="switch">
              <input type="checkbox" checked={haptics} onChange={() => setHaptics(!haptics)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <div className="meteor-shower">
  {[...Array(8)].map((_, i) => (
    <div key={i} className="meteor" style={{
      top: `${Math.random() * -100}px`, // Starts above the screen
      left: `${Math.random() * 100}%`,  // Random horizontal position
      animationDelay: `${Math.random() * 10}s`, // Staggered start times
      animationDuration: `${Math.random() * 3 + 2}s` // Varying speeds
    }} />
  ))}
</div>

        <button className="logout-btn" onClick={onLogout}>
          SEVER CONNECTION (LOG OUT)
        </button>
      </div>
    </div>
  );
};

export default EclipseSettings;