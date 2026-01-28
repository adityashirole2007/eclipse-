import React, { useState, useEffect } from 'react';
import './App.css'; 
import EclipseIntro from './EclipseIntro';
import { supabase } from './supabaseClient'; // Import your client

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes on auth state (login, logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show a dark screen while checking the session so there is no "flicker"
  if (loading) return <div style={{backgroundColor: '#000', height: '100vh'}} />;

  return (
    <div className="App">
      {/* Pass the session to the Intro so it knows whether to show Login or Selection */}
      <EclipseIntro initialSession={session} />
    </div>
  );
}

export default App;