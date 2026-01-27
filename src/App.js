import React, { useState } from 'react';
import EclipseIntro from './EclipseIntro';
import EclipseSelection from './EclipseSelection';
import EclipseWorldMap from './EclipseWorldMap';

function App() {
  // Views: 'intro', 'selection', 'worldMap'
  // (Login is handled inside EclipseIntro, so we move from Intro to Selection)
  const [currentView, setCurrentView] = useState('intro');
  const [selectedHero, setSelectedHero] = useState(null);

  // When Login is finished inside EclipseIntro
  const handleLoginComplete = () => {
    setCurrentView('selection');
  };

  // When a character is picked in EclipseSelection
  const handleHeroSelect = (heroId) => {
    setSelectedHero(heroId);
    setCurrentView('worldMap');
  };

  return (
    <div className="App">
      {currentView === 'intro' && (
        <EclipseIntro onFinalLogin={handleLoginComplete} />
      )}

      {currentView === 'selection' && (
        <EclipseSelection onSelect={handleHeroSelect} />
      )}

      {currentView === 'worldMap' && (
        <EclipseWorldMap character={selectedHero} />
      )}
    </div>
  );
}

export default App;