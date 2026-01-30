import React, { useEffect, useState } from 'react';
import './EclipseProfile.css';
import EclipseNavigation from './EclipseNavigation';

// Placeholder images - ensure these paths are correct for your project
import characterImg from './logo11.jpeg'; 
import rankIcon1 from './logo1.1.jpeg';   
import rankIcon2 from './logo4.1.jpeg';   

const EclipseProfile = ({ onNavigate }) => {
  const [loaded, setLoaded] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setLoaded(true);
  }, []);

  const userProfile = {
    name: "ActionBolt",
    level: 64,
    likes: "99.9K",
    xp: 12499,
    guild: "IIT_BOMBAY",
    bio: "Trendsetter | Just For Fun",
    stats: {
      matches: 186,
      wins: 316,
      kills: 352,
      mvp: 400
    }
  };

  // Generate stars with random delay for twinkling
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 3 + 1, // Random duration between 1s and 4s
    delay: Math.random() * 2 // Random start delay
  }));

  return (
    <div className="profile-container">
      {/* Background FX */}
      <div className="profile-star-field">
        {stars.map((star) => (
          <div 
            key={star.id} 
            className="star" 
            style={{
               top: `${star.top}%`,
               left: `${star.left}%`,
               '--duration': `${star.duration}s`,
               animationDelay: `${star.delay}s`
            }}
          ></div>
        ))}
      </div>

      <div className={`profile-content ${loaded ? 'active' : ''}`}>
        
        {/* LEFT: CHARACTER */}
        <div className="character-section">
          <div className="character-glow"></div>
          <img src={characterImg} alt="Character" className="character-model" />
        </div>

        {/* RIGHT: DASHBOARD HUD */}
        <div className="dashboard-hud">
          
          {/* HEADER: Avatar & Name */}
          <div className="hud-header">
             <div className="mobile-header-group">
                <div className="player-avatar-frame">
                  <img src={characterImg} alt="Avatar" />
                </div>
                <div className="player-info">
                  <h1 className="player-name">{userProfile.name}</h1>
                  <div className="badges-row">
                    <span className="level-badge">LVL {userProfile.level}</span>
                    <span className="guild-tag">{userProfile.guild}</span>
                  </div>
                </div>
             </div>
          </div>

          {/* SECTION: RANKS */}
          <div className="section-title">CURRENT SEASON</div>
          <div className="ranks-row">
            <div className="rank-card math-rank">
              <img src={rankIcon1} alt="Rank" className="rank-icon" />
              <div className="rank-text">
                <span className="rank-label">MATH RANKED</span>
                <span className="rank-value">{userProfile.xp} PTS</span>
              </div>
            </div>

            <div className="rank-card english-rank">
              <img src={rankIcon2} alt="Rank" className="rank-icon" />
              <div className="rank-text">
                <span className="rank-label">ENGLISH RANKED</span>
                <span className="rank-value">HEROIC</span>
              </div>
            </div>
          </div>

          {/* SECTION: BATTLE STATS */}
          <div className="section-title">BATTLE STATS</div>
          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-num">{userProfile.stats.matches}</span>
              <span className="stat-label">MATCHES</span>
            </div>
            <div className="stat-box">
              <span className="stat-num win-color">{userProfile.stats.wins}</span>
              <span className="stat-label">WINS</span>
            </div>
            <div className="stat-box">
              <span className="stat-num kill-color">{userProfile.stats.kills}</span>
              <span className="stat-label">KILLS</span>
            </div>
            <div className="stat-box">
              <span className="stat-num mvp-color">{userProfile.stats.mvp}</span>
              <span className="stat-label">MVP</span>
            </div>
          </div>

          {/* FOOTER: SOCIAL */}
          <div className="social-footer">
            <div className="social-tags">
              <span className="tag">⚡ Trendsetter</span>
              <span className="tag">🎮 Fun</span>
            </div>
            <div className="like-button">
              <span className="thumb">👍</span> {userProfile.likes}
            </div>
          </div>

        </div>
      </div>

      <EclipseNavigation onNavigate={onNavigate} activeTabOverride="profile" />
    </div>
  );
};

export default EclipseProfile;