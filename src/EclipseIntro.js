import React, { useState, useEffect, useRef } from 'react';
import './EclipseStyles.css';
import EclipseWorldMap from './EclipseWorldMap'; 
import EclipseSelection from './EclipseSelection'; 
import SpaceLogin from './SpaceLogin'; 
import { supabase } from './supabaseClient'; // Added for session check

// Import your logos
import logo1 from './logo1.jpeg';
import logo2 from './logo2.jpeg';
import logo3 from './logo3.jpeg';
import logo4 from './logo4.jpeg';
import logo5 from './logo5.jpeg';

// --- SOUND ENGINE ---
const playTypingSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle'; 
    osc.frequency.setValueAtTime(600, ctx.currentTime); 
    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
};

// --- TYPEWRITER COMPONENT ---
const Typewriter = ({ text, onComplete }) => {
  const [charIndex, setCharIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);
  
  useEffect(() => {
    setCharIndex(0); 
    const intervalID = setInterval(() => {
      setCharIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(intervalID);
          if (onCompleteRef.current) onCompleteRef.current();
          return prev;
        }
        if (prev % 3 === 0) playTypingSound();
        return prev + 1;
      });
    }, 35); 
    return () => clearInterval(intervalID);
  }, [text]); 

  return (
    <span className="glowing-text">
      {text.slice(0, charIndex)}
      <span className="cursor">|</span>
    </span>
  );
};

const EclipseIntro = () => {
  const [step, setStep] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [currentView, setCurrentView] = useState('loading'); // Initial loading state
  const [textFinished, setTextFinished] = useState(false);

  // --- AUTH WATCHER ---
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setCurrentView('selection'); // Skip intro/login if session exists
      } else {
        setCurrentView('intro');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setCurrentView('selection');
      } else {
        setCurrentView('intro');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const flow = [
    { id: 1, text: "U have arrived. I am the Void. A weapon without a master. You are the Wielder. My purpose is now yours.", logo: logo1 },
    { id: 2, text: "Two laws govern this world...", logo: logo2 },
    { id: 3, text: "This is your Lifeline. Error cracks the glass. If we bleed out, we fail.", logo: logo3 },
    { id: 4, text: "This is Stardust. The spoils of war. Conquer the Realms, and we feast.", logo: logo4 },
    { id: 5, text: "The Pact is sealed. The Arcanum. The Aether. The Chronicles. The Lexicon. They are waiting to be broken. Choose a target.", logo: logo5 }
  ];

  const current = flow[step];
  const progressPercent = ((step + 1) / flow.length) * 100;

  const handleNext = () => {
    setIsGlitching(true);
    playTypingSound(); 
    setTimeout(() => {
      if (step < flow.length - 1) {
        setStep(step + 1);
        setIsGlitching(false);
        setTextFinished(false); 
      } else {
        setCurrentView('login');
      }
    }, 800); 
  };

  if (currentView === 'loading') return <div className="eclipse-main-wrapper">Initializing...</div>;
  if (currentView === 'map') return <EclipseWorldMap />;
  if (currentView === 'selection') return <EclipseSelection onSelect={() => setCurrentView('map')} />;
  if (currentView === 'login') return <SpaceLogin onLoginSuccess={() => setCurrentView('selection')} />;

  return (
    <div className="eclipse-main-wrapper">
      <div className="scanlines"></div>
      <div className="stars-overlay"></div>
      <div className={`eclipse-container ${isGlitching ? 'glitch-active' : ''}`}>
        <div className="header-bar">
          <div className="tech-readout">SYSTEM.CORE // {step + 1} OF 5</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
        <div className="content-area">
          <div className="character-section">
            <div className="character-wrapper">
                <div className="inferno-base"></div>
                <div className="inferno-core"></div>
                <div className="portal-ring ring-outer"></div>
                <img src={current.logo} alt="Void" className="eclipse-logo" />
            </div>
            <div className="speech-container">
              <div className="speech-header">/// TRANSMISSION_RECEIVED</div>
              <p className="typewriter-text">
                <Typewriter key={current.text} text={current.text} onComplete={() => setTextFinished(true)} />
              </p>
            </div>
          </div>
          <div className="actions-section">
            <button 
              onClick={handleNext} 
              className={`void-button ${textFinished ? 'btn-visible' : 'btn-hidden'}`}
              disabled={!textFinished}
            >
              <span className="button-content">{step === flow.length - 1 ? "INITIALIZE LINK" : "ACCEPT DATA >>"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EclipseIntro;