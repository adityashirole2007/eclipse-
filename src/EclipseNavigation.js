import React, { useState, useEffect } from 'react';
import './EclipseNavigation.css';

const EclipseNavigation = ({ onNavigate, activeTabOverride }) => { 
  const [internalActiveTab, setInternalActiveTab] = useState('home');
  
  // Allow parent to force the active tab (e.g., if you are on the Shop screen, force 'shop' highlight)
  const activeTab = activeTabOverride || internalActiveTab;

  useEffect(() => {
    if (activeTabOverride) {
        setInternalActiveTab(activeTabOverride);
    }
  }, [activeTabOverride]);

  const navItems = ['shop', 'battle', 'home', 'leaderboard', 'settings'];

  const Icons = {
    // HUD Icons
    Heart: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
    Stardust: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>,
    Level: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/></svg>,

    // Bottom Dock Icons
    Home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    Battle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"></path><path d="M13 19l6-6"></path><path d="M16 16l4 4"></path><path d="M19 21l2-2"></path></svg>,
    Settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    Leaderboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>,
    Shop: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
  };

  const handleTabClick = (item) => {
    setInternalActiveTab(item);
    // Strict pass-through to parent
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(item);
    }
  };

  return (
    <>
      {/* --- UPPER NAVIGATION (HUD) --- */}
      <div className="eclipse-hud-top">
        
        {/* RIGHT: Stats Cluster - Back Button Removed */}
        <div className="hud-stats-group">
            
            {/* 1. Level Indicator */}
            <div className="hud-stat level">
                <span className="stat-label">LVL</span>
                <span className="stat-value">5</span>
            </div>

            {/* 2. Hearts */}
            <div className="hud-stat hearts">
                <div className="stat-icon-glow" style={{color: '#ff2a2a'}}>{Icons.Heart}</div>
                <span className="stat-value">5</span>
            </div>

            {/* 3. Stardust */}
            <div className="hud-stat stardust">
                <div className="stat-icon-glow" style={{color: '#ffd700'}}>{Icons.Stardust}</div>
                <span className="stat-value">1,200</span>
            </div>

        </div>
      </div>

      {/* --- BOTTOM DOCK (Navigation) --- */}
      <div className="eclipse-dock-container">
        <div className="eclipse-dock">
          {navItems.map((item) => (
            <div 
              key={item}
              className={`dock-item ${item} ${activeTab === item ? 'active' : ''}`}
              onClick={() => handleTabClick(item)}
            >
              <div className="dock-icon-wrapper">
                {item === 'home' && Icons.Home}
                {item === 'battle' && Icons.Battle}
                {item === 'leaderboard' && Icons.Leaderboard}
                {item === 'shop' && Icons.Shop}
                {item === 'settings' && Icons.Settings}
              </div>
              
              <div className="plasma-jet">
                 <div className="jet-core-white"></div>
                 <div className="jet-layer-blue"></div>
                 <div className="jet-flash"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EclipseNavigation;