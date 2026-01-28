import React from 'react';
import './App.css'; 
import EclipseIntro from './EclipseIntro';

/**
 * App Component
 * We removed EclipseNavigation from here so it doesn't show 
 * on the Intro or Login screens.
 */
function App() {
  return (
    <div className="App">
      <EclipseIntro />
    </div>
  );
}

export default App;