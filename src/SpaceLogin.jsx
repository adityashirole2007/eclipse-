import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Feather, Lock, Wand2, Stars, Moon } from 'lucide-react';
import { supabase } from './supabaseClient';
import VoidSlime from './VoidSlime'; 
import './SpaceLogin.css';

const SpaceLogin = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 150, damping: 20 });

  function handleMouseMove(event) {
    if (!cardRef.current || window.innerWidth < 768) return; 
    const rect = cardRef.current.getBoundingClientRect();
    x.set(event.clientX - (rect.left + rect.width / 2));
    y.set(event.clientY - (rect.top + rect.height / 2));
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = isSignUp 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user && onLoginSuccess) onLoginSuccess();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eclipse-master-container">
      <div className="vortex-aura" />
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY }}
        className="eclipse-card-3d"
      >
        <div className="state-icon-wrapper">
          {isSignUp ? <Stars className="glow-icon" size={42} color="#a855f7" /> : <Moon className="glow-icon" size={42} color="#6366f1" />}
        </div>
        <h1 className="eclipse-title-3d">{isSignUp ? 'INITIATE' : 'ECLIPSE'}</h1>
        <form onSubmit={handleAuth}>
          <div className="magic-scroll-wrapper">
            <div className="scroll-container">
              <Feather color="#a855f7" size={20} />
              <input type="email" placeholder="Email Essence" className="scroll-input-box" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="magic-scroll-wrapper">
            <div className="scroll-container">
              <Lock color="#a855f7" size={20} />
              <input type="password" placeholder="Secret Cipher" className="scroll-input-box" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <motion.button type="submit" whileTap={{ scale: 0.95 }} className="void-btn-3d" disabled={loading}>
            {loading ? "Channelling..." : <span>{isSignUp ? 'INSCRIBE NAME' : 'ENTER THE VOID'}</span>}
          </motion.button>
        </form>
        <div className="auth-links">
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="link-btn highlight">
            {isSignUp ? "Already a practitioner? Log In" : "New to the Arts? Inscribe Your Name"}
          </button>
        </div>
        <div className="mascot-wrap"><VoidSlime /></div>
      </motion.div>
    </div>
  );
};

export default SpaceLogin;