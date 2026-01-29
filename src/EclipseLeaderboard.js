import React, { useState } from 'react';
import './EclipseLeaderboard.css';
import EclipseNavigation from './EclipseNavigation';

// Placeholder avatars (Using the ones you provided)
import avatar1 from './logo1.jpeg'; 
import avatar2 from './logo1.jpeg';
import avatar3 from './logo1.jpeg';

const EclipseLeaderboard = ({ onNavigate }) => {
  const [timeframe, setTimeframe] = useState('week'); // 'day', 'week', 'month'

  // --- MOCK DATA ---
  const generateData = (factor) => {
    return Array.from({ length: 10 }).map((_, i) => ({
      rank: i + 1,
      name: `VoidWalker_${factor}${i}`,
      score: Math.floor(10000 / (i + 1)) + (Math.floor(Math.random() * 500)),
      avatar: i === 0 ? avatar1 : i === 1 ? avatar2 : avatar3
    }));
  };

  const dataMap = {
    day: generateData('D'),
    week: generateData('W'),
    month: generateData('M')
  };

  const currentData = dataMap[timeframe];
  const topThree = currentData.slice(0, 3);
  const others = currentData.slice(3);

  return (
    <div className="leaderboard-container">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="star-layer-lb"></div>
      <div className="nebula-glow"></div>
      <div className="warp-lines"></div> {/* New Warp Animation */}
      
      {/* --- HUD STATS (Re-included here to visual consistency if needed, 
           but usually this comes from Navigation or a Layout wrapper. 
           If your Navigation component handles this, you can remove these divs.) 
      */}
      <div className="eclipse-hud-top">
        <div className="hud-stat hearts">
          <div className="stat-icon-glow">
            <svg viewBox="0 0 24 24" fill="currentColor" className="icon"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          <span className="stat-value">5</span>
        </div>
        <div className="hud-stat stardust">
          <div className="stat-icon-glow">
             <svg viewBox="0 0 24 24" fill="currentColor" className="icon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </div>
          <span className="stat-value">1,200</span>
        </div>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="lb-scroll-wrapper">
        <div className="lb-header-section">
          {/* Animated Glitch Title */}
          <h1 className="lb-title glitch" data-text="GALACTIC RANKINGS">
            GALACTIC RANKINGS
          </h1>
          
          {/* Tabs */}
          <div className="lb-tabs-container">
            {['day', 'week', 'month'].map((t) => (
              <button 
                key={t}
                className={`lb-tab ${timeframe === t ? 'active' : ''}`}
                onClick={() => setTimeframe(t)}
              >
                {t.toUpperCase()}
                <div className="tab-scan-line"></div>
              </button>
            ))}
          </div>
        </div>

        {/* --- TOP 3 PODIUM --- */}
        <div className="podium-stage">
          {/* 2nd Place */}
          <div className="podium-spot rank-2">
            <div className="crown-icon silver">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
            </div>
            <div className="avatar-float-wrapper delay-1">
              <div className="avatar-ring silver">
                <img src={topThree[1].avatar} alt="rank2" />
              </div>
            </div>
            <div className="podium-name">{topThree[1].name}</div>
            <div className="podium-score">{topThree[1].score} XP</div>
            <div className="podium-block silver-block">
              <span className="rank-number">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="podium-spot rank-1">
            <div className="crown-icon gold">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
            </div>
            <div className="avatar-float-wrapper">
              <div className="avatar-ring gold">
                <img src={topThree[0].avatar} alt="rank1" />
                <div className="ring-pulse"></div>
              </div>
            </div>
            <div className="podium-name main">{topThree[0].name}</div>
            <div className="podium-score main">{topThree[0].score} XP</div>
            <div className="podium-block gold-block">
               <span className="rank-number">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="podium-spot rank-3">
             <div className="crown-icon bronze">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
            </div>
            <div className="avatar-float-wrapper delay-2">
              <div className="avatar-ring bronze">
                <img src={topThree[2].avatar} alt="rank3" />
              </div>
            </div>
            <div className="podium-name">{topThree[2].name}</div>
            <div className="podium-score">{topThree[2].score} XP</div>
            <div className="podium-block bronze-block">
              <span className="rank-number">3</span>
            </div>
          </div>
        </div>

        {/* --- LIST (4-10) --- */}
        <div className="lb-list">
          {others.map((player, index) => (
            <div key={player.rank} className="lb-row" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="lb-rank-num">{player.rank}</div>
              <div className="lb-info">
                <span className="lb-name">{player.name}</span>
                <span className="lb-detail">Cadet Lvl. 5</span>
              </div>
              <div className="lb-score">
                {player.score} <span className="score-label">XP</span>
              </div>
            </div>
          ))}
        </div>

        {/* Spacer for bottom nav */}
        <div style={{ height: '100px' }}></div>
      </div>

      <EclipseNavigation onNavigate={onNavigate} activeTabOverride="leaderboard" />
    </div>
  );
};

export default EclipseLeaderboard;