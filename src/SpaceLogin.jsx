// src/SpaceLogin.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Mail, Lock, Moon, Stars } from 'lucide-react';
import { supabase } from './supabaseClient';
import EclipseSelection from './EclipseSelection'; // Import the next component
import './SpaceLogin.css';

const SpaceLogin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  // New state to track if login was successful
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = isSignUp 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      
      // If we have a session or user, switch the view
      if (data.user || data.session) {
        setIsAuthorized(true);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChoice = (id) => {
    console.log("User selected path:", id);
    // Add logic here for what happens after an orb is clicked
  };

  // 1. Check if authorized. If yes, render Selection.
  if (isAuthorized) {
    return <EclipseSelection onSelect={handleChoice} />;
  }

  // 2. Otherwise, render the Login UI
  return (
    <div className="magic-container">
      <div className="nebula-bg" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="arcane-card"
      >
        <div className="portal-icon">
          {isSignUp ? <Stars size={40} /> : <Moon size={40} />}
        </div>
        
        <h1 className="magic-title">
          {isSignUp ? 'Initiate' : 'Portal Login'}
        </h1>
        <p className="protocol-text">Arcane Security Protocol</p>

        <form onSubmit={handleAuth} className="magic-form">
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              placeholder="Email Essence" 
              className="magic-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              placeholder="Secret Cipher" 
              className="magic-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="cast-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : (
              <>
                <span>{isSignUp ? 'Cast Registration' : 'Enter the Void'}</span>
                <Wand2 size={20} />
              </>
            )}
          </button>
        </form>

        <button 
          onClick={() => setIsSignUp(!isSignUp)} 
          className="toggle-link"
        >
          {isSignUp ? "Already a practitioner? Sign In" : "New to the arts? Register"}
        </button>
      </motion.div>
    </div>
  );
};

export default SpaceLogin;