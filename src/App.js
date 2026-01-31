import React, { useState, useEffect } from 'react';
import './App.css'; 
import EclipseIntro from './EclipseIntro';
import { supabase } from './supabaseClient';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div style={{backgroundColor: '#000', height: '100vh'}} />;

  return (
    <div className="App">
      {/* We always start with the Intro. 
          The Intro component will decide whether to show Login 
           or Selection based on the 'session' prop when it finishes.
      */}
      <EclipseIntro session={session} />
    </div>
  );
}

export default App;