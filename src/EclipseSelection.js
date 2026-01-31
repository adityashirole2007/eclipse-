import React, { useState } from 'react';
import './EclipseSelection.css';
import EclipseNavigation from './EclipseNavigation';
import EclipseShop from './EclipseShop'; 
import EclipseLeaderboard from './EclipseLeaderboard'; 
import EclipseProfile from './EclipseProfile';
import EclipseChapterSelection from './EclipseChapterSelection'; 
import EclipseSettings from './EclipseSettings'; // <--- IMPORT THIS

// Import all map variants
import EclipseWorldMap from './EclipseWorldMap';   
import EclipseWorldMap1 from './EclipseWorldMap1'; 
import EclipseWorldMap2 from './EclipseWorldMap2'; 
import EclipseWorldMap3 from './EclipseWorldMap3'; 

// Images
import voidSanctum from './logo11.jpeg';
import arcanumImg from './logo1.1.jpeg';
import aetherImg from './logo2.1.jpeg';
import chroniclesImg from './logo3.1.jpeg';
import lexiconImg from './logo4.1.jpeg';

const EclipseSelection = ({ onNavigate: externalNavigate, onLogout }) => { 
  const [currentScreen, setCurrentScreen] = useState('selection');

  const stars = Array.from({ length: 50 });
  const meteors = Array.from({ length: 15 });

  const choices = [
    { id: 'math', img: arcanumImg, label: "THE ARCANUM", sub: "Math", color: '#00f7ff', pos: 'top-left', target: 'map' },
    { id: 'science', img: aetherImg, label: "THE AETHER", sub: "Science", color: '#58cc02', pos: 'top-right', target: 'science-chapters' },
    { id: 'history', img: chroniclesImg, label: "THE CHRONICLES", sub: "History", color: '#ffaa00', pos: 'bottom-left', target: 'map2' },
    { id: 'english', img: lexiconImg, label: "THE LEXICON", sub: "English", color: '#ff0055', pos: 'bottom-right', target: 'map3' }
  ];

  const handleInternalNavigation = (destination) => {
      console.log("Navigating to:", destination); 
      setCurrentScreen(destination);
      
      // If going to 'home' (which is 'selection'), reset view
      if (['home', 'selection'].includes(destination)) {
          setCurrentScreen('selection');
      } 
      // Internal routing list: ADD 'settings' here
      else if (externalNavigate && !['map', 'map1', 'map2', 'map3', 'shop', 'leaderboard', 'profile', 'science-chapters', 'settings'].includes(destination)) {
          externalNavigate(destination);
      }
  };

  // --- RENDER STATES ---

  if (currentScreen === 'shop') return <EclipseShop onNavigate={handleInternalNavigation} />;
  if (currentScreen === 'leaderboard') return <EclipseLeaderboard onNavigate={handleInternalNavigation} />;
  if (currentScreen === 'profile') return <EclipseProfile onNavigate={handleInternalNavigation} />;
  
  // Render Settings - pass handleInternalNavigation to go back, and onLogout to exit
  if (currentScreen === 'settings') {
    return <EclipseSettings onBack={() => handleInternalNavigation('selection')} onLogout={onLogout} />;
  }

  // Render Science Chapter List
  if (currentScreen === 'science-chapters') return <EclipseChapterSelection onNavigate={handleInternalNavigation} />;

  // Render Specific Maps
  if (currentScreen === 'map') return <EclipseWorldMap onNavigate={handleInternalNavigation} />;
  if (currentScreen === 'map1') return <EclipseWorldMap1 onNavigate={handleInternalNavigation} />;
  if (currentScreen === 'map2') return <EclipseWorldMap2 onNavigate={handleInternalNavigation} />;
  if (currentScreen === 'map3') return <EclipseWorldMap3 onNavigate={handleInternalNavigation} />;

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
        {/* CENTER HUB - ROUTES TO PROFILE */}
        <div className="central-hub" onClick={() => handleInternalNavigation('profile')}>
          <img src={voidSanctum} alt="Void Sanctum" className="hub-img" />
        </div>

        {/* ORBITING BUTTONS */}
        {choices.map((item) => (
          <button 
            key={item.id} 
            className={`choice-orb ${item.pos}`}
            style={{ '--accent': item.color }}
            onClick={() => handleInternalNavigation(item.target)} 
          >
            <img src={item.img} alt={item.label} className="orb-img-file" />
            <span className="orb-name-tag">{item.label}</span>
            <span className="orb-sub-text">{item.sub}</span>
          </button>
        ))}
      </div>

      <EclipseNavigation 
        onNavigate={handleInternalNavigation} 
        activeTabOverride="home" 
      />
    </div>
  );
};

export default EclipseSelection;