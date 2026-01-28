import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Feather, Lock, Wand2, Stars, Moon } from 'lucide-react';
import { supabase } from './supabaseClient';
import EclipseSelection from './EclipseSelection';
import VoidSlime from './VoidSlime'; 
import './SpaceLogin.css';

const SpaceLogin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const cardRef = useRef(null);

  // --- 3D Mouse Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the motion
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 150, damping: 20 });

  function handleMouseMove(event) {
    if (!cardRef.current || window.innerWidth < 768) return; 
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // --- Supabase Auth Logic ---
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = isSignUp 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      
      if (data.user || data.session) {
        setIsAuthorized(true);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthorized) {
    return <EclipseSelection onSelect={(id) => console.log("Path selected:", id)} />;
  }

  return (
    <div className="eclipse-master-container">
      {/* Animated Background */}
      <div className="vortex-aura" />
      
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="eclipse-card-3d"
      >
        {/* Dynamic State Icon */}
        <div className="state-icon-wrapper">
          {isSignUp ? (
            <Stars className="glow-icon" size={42} color="#a855f7" />
          ) : (
            <Moon className="glow-icon" size={42} color="#6366f1" />
          )}
        </div>

        <h1 className="eclipse-title-3d">
          {isSignUp ? 'INITIATE' : 'ECLIPSE'}
        </h1>
        <p className="protocol-subtext">
          {isSignUp ? 'Begin your ascension into the void' : 'Knowledge is Power. The Void Awaits.'}
        </p>

        <form onSubmit={handleAuth} autoComplete="off">
          <div className="magic-scroll-wrapper">
            <div className="scroll-container">
              <Feather color="#a855f7" size={20} />
              <input 
                type="email" 
                placeholder="Email Essence" 
                className="scroll-input-box" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div className="magic-scroll-wrapper">
            <div className="scroll-container">
              <Lock color="#a855f7" size={20} />
              <input 
                type="password" 
                placeholder="Secret Cipher" 
                className="scroll-input-box" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
          </div>

          <motion.button 
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="void-btn-3d"
            disabled={loading}
          >
            {loading ? "Channelling..." : (
              <>
                <span>{isSignUp ? 'INSCRIBE NAME' : 'ENTER THE VOID'}</span>
                <Wand2 size={20} />
              </>
            )}
          </motion.button>
        </form>

        <div className="auth-links">
          {!isSignUp && (
            <button type="button" className="link-btn">Lost your path? (Forgot Password)</button>
          )}
          
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)} 
            className="link-btn highlight"
          >
            {isSignUp ? "Already a practitioner? Log In" : "New to the Arts? Inscribe Your Name"}
          </button>
        </div>

        {/* Floating Mascot */}
        <div className="mascot-wrap">
           <VoidSlime />
        </div>
      </motion.div>
    </div>
  );
};

export default SpaceLogin;