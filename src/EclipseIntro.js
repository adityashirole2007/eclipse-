import React, { useState, useEffect, useRef } from 'react';
import './EclipseStyles.css'; 
import EclipseSelection from './EclipseSelection'; 
import SpaceLogin from './SpaceLogin'; 
import { supabase } from './supabaseClient';

// --- ASSET IMPORTS ---
import audio1File from './dialogue1.mp3'; 
import audio2File from './dialogue2.mp3';
import audio3File from './dialogue3.mp3'; 
import audio4File from './dialogue4.mp3';
import audio5File from './dialogue5.mp3'; 
import audio6File from './dialogue6.mp3'; 
import audio7File from './dialogue7.mp3'; 
import audio10File from './dialogue10.mp3'; 
import crackFile from './cracksound.mp3';
import continueFile from './continue.mp3';
import voidImage from './voidIntro.jpeg'; 
import introVideoFile from './introVideo.mp4'; 

import logo1 from './logo1.1.jpeg';
import logo2 from './logo2.1.jpeg';
import logo3 from './logo3.1.jpeg';
import logo4 from './logo4.1.jpeg';

const EclipseIntro = () => {
  const [currentView, setCurrentView] = useState('intro'); 
  const [hasStarted, setHasStarted] = useState(false); 
  const [step, setStep] = useState(0); 
  const [finalLogoStep, setFinalLogoStep] = useState(0);

  const audioRef = useRef({
    1: new Audio(audio1File),
    2: new Audio(audio2File),
    3: new Audio(audio3File),
    4: new Audio(audio4File),
    5: new Audio(audio5File),
    6: new Audio(audio6File),
    7: new Audio(audio7File),
    10: new Audio(audio10File),
    crack: new Audio(crackFile),
    continue: new Audio(continueFile)
  });
  
  const timerRef = useRef(null);

  useEffect(() => {
    audioRef.current.continue.loop = true;
    audioRef.current.continue.volume = 0.5;
  }, []);

  const playAudio = (key) => {
    try {
      if (audioRef.current[key]) {
        audioRef.current[key].currentTime = 0;
        audioRef.current[key].play().catch(e => {});
      }
    } catch (e) {}
  };

  const startSequence = () => {
    setHasStarted(true);
    runStep0();
  };

  // 1. "Once... I was The Apex" (4s)
  const runStep0 = () => {
    setStep(0);
    playAudio(1);
    timerRef.current = setTimeout(() => runStep1(), 4000); 
  };

  // 2. "Perfect. Whole." (8s)
  const runStep1 = () => {
    setStep(1);
    playAudio(2);
    timerRef.current = setTimeout(() => runStep2(), 8000); 
  };

  // 3. Crack Phase (0.25s)
  const runStep2 = () => {
    setStep(2);
    playAudio('continue');
    if (audioRef.current.crack) {
      audioRef.current.crack.volume = 1.0;
      audioRef.current.crack.play().catch(e => {});
    }
    timerRef.current = setTimeout(() => runStep3(), 250);
  };

  // 4. Whiteout (0.75s)
  const runStep3 = () => {
    setStep(3); 
    timerRef.current = setTimeout(() => runStep4(), 750);
  };

  // 5. Silence (0.5s)
  const runStep4 = () => {
    setStep(4);
    timerRef.current = setTimeout(() => runStep5(), 500);
  };

  // 6. "Now... I am nothing." (4s)
  const runStep5 = () => {
    setStep(5);
    playAudio(3);
    timerRef.current = setTimeout(() => runStep6(), 4000);
  };

  // 7. "Just a shadow..." (6s)
  const runStep6 = () => {
    setStep(6);
    playAudio(4);
    timerRef.current = setTimeout(() => runStep7(), 6000);
  };

  // 8. Void Wait (1.5s)
  const runStep7 = () => {
    setStep(7);
    timerRef.current = setTimeout(() => runStep8(), 1500);
  };

  // 9. Square Formation Starts (5s)
  const runStep8 = () => {
    setStep(8);
    playAudio(5);
    timerRef.current = setTimeout(() => runStep9(), 5000);
  };

  // 10. Square Formation Holds (8s)
  const runStep9 = () => {
    setStep(9);
    playAudio(6);
    timerRef.current = setTimeout(() => runStep10(), 8000); 
  };

  // 11. Sequential Logos (UPDATED: Added 1s -> 9.5s)
  const runStep10 = () => {
    setStep(10);
    playAudio(7);
    
    setFinalLogoStep(1);
    setTimeout(() => setFinalLogoStep(2), 2000);
    setTimeout(() => setFinalLogoStep(3), 4000);
    setTimeout(() => setFinalLogoStep(4), 6000);
    
    // Increased delay from 8500 to 9500
    timerRef.current = setTimeout(() => runStep11(), 9500);
  };

  // 12. FINAL STEP: "Rise, Void..." (15s)
  const runStep11 = () => {
    setStep(11);
    playAudio(10);
    timerRef.current = setTimeout(() => finishIntro(), 15000);
  };

  const handleSkip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (step <= 1) runStep2();
    else if (step === 2) runStep3();
    else if (step === 3 || step === 4) runStep5();
    else if (step === 5) runStep6();
    else if (step === 6) runStep7();
    else if (step >= 7 && step < 10) runStep10();
    else if (step === 10) runStep11();
    else finishIntro();
  };

  const finishIntro = async () => {
    Object.values(audioRef.current).forEach(audio => audio.pause());
    const { data: { session } } = await supabase.auth.getSession();
    if (session) setCurrentView('selection');
    else setCurrentView('login');
  };

  if (currentView === 'selection') return <EclipseSelection onNavigate={setCurrentView} />;
  if (currentView === 'login') return <SpaceLogin onLoginSuccess={() => setCurrentView('selection')} />;

  if (!hasStarted) {
    return (
      <div className="intro-container" onClick={startSequence}>
        <div className="start-prompt">
          <div className="pulse-circle-violet"></div>
          <p>TAP TO INITIALIZE</p>
        </div>
      </div>
    );
  }

  return (
    <div className="intro-container">
      <div className="deep-space-bg"></div>

      {/* --- PHASE 1: INTRO VIDEO --- */}
      {step <= 3 && (
        <div className="video-scene-wrapper">
           <video 
             src={introVideoFile} 
             autoPlay 
             loop 
             muted 
             playsInline 
             className="intro-video" 
           />
           {step <= 2 && (
             <div className="dialogue-below-video">
               <h1 key={step} className={`violet-flame-text fade-in`} style={{ animationDuration: step === 0 ? '4s' : '8s' }}>
                  {step === 0 && "Once... I was The Apex."}
                  {step === 1 && "I was the sum of all truth. Perfect. Whole."}
               </h1>
             </div>
           )}
        </div>
      )}

      {step === 3 && <div className="white-flash-overlay"></div>}

      {/* --- PHASE 2: VOID IMAGE --- */}
      {( (step >= 5 && step <= 9) || step === 11 ) && (
        <div className="void-fixed-upper">
           <img src={voidImage} alt="Void" className="void-flame-img" />
        </div>
      )}

      {/* Text for Steps 5-6 */}
      {(step === 5 || step === 6) && (
        <div className="dialogue-lower-half">
          <h1 key={step} className={`violet-flame-text fade-in`} style={{ animationDuration: step === 5 ? '4s' : '6s' }}>
            {step === 5 && "Now... I am nothing."}
            {step === 6 && "Just a shadow. A hunger in the dark."}
          </h1>
        </div>
      )}

      {/* --- SQUARE FORMATION --- */}
      {(step === 8 || step === 9) && (
        <div className="x-formation-wrapper form-square-from-upper">
           <img src={logo1} className="x-logo pos-tl" alt="" />
           <img src={logo2} className="x-logo pos-tr" alt="" />
           <img src={logo3} className="x-logo pos-bl" alt="" />
           <img src={logo4} className="x-logo pos-br" alt="" />
        </div>
      )}

      {/* --- SEQUENTIAL LOGOS --- */}
      {step === 10 && (
        <div className="sequential-logo-wrapper">
          {finalLogoStep === 1 && (
            <div className="seq-item">
              <img src={logo1} className="seq-logo" alt="" />
              <h2 className="seq-label">The Arcanum</h2>
              <h3 className="seq-sublabel">Maths</h3>
            </div>
          )}
          {finalLogoStep === 2 && (
            <div className="seq-item">
              <img src={logo2} className="seq-logo" alt="" />
              <h2 className="seq-label">The Aether</h2>
              <h3 className="seq-sublabel">Science</h3>
            </div>
          )}
          {finalLogoStep === 3 && (
            <div className="seq-item">
              <img src={logo3} className="seq-logo" alt="" />
              <h2 className="seq-label">The Chronicles</h2>
              <h3 className="seq-sublabel">SST</h3>
            </div>
          )}
          {finalLogoStep === 4 && (
            <div className="seq-item">
              <img src={logo4} className="seq-logo" alt="" />
              <h2 className="seq-label">The Lexicon</h2>
              <h3 className="seq-sublabel">English</h3>
            </div>
          )}
        </div>
      )}

      {/* --- PHASE 5: FINAL RISEN STEP --- */}
      {step === 11 && (
        <div className="dialogue-lower-half">
          {/* Note: Font size here is controlled by CSS class now */}
          <h1 className="violet-flame-text fade-in" style={{ animationDuration: '15s', lineHeight: '1' }}>
            Rise, Void.<br />
            The Eclipse begins with a single step.<br />
            Conquer the Four Realms... and reclaim your rule.
          </h1>
        </div>
      )}

      <button className="skip-btn-violet" onClick={handleSkip}>
        <span className="skip-text-violet">
          {step >= 11 ? "ENTER THE VOID >>" : "SKIP SEGMENT >>"}
        </span>
        <div className="skip-glow-violet"></div>
      </button>
    </div>
  );
};

export default EclipseIntro;