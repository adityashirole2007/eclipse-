import React from 'react';
import './EclipseShop.css';
import EclipseNavigation from './EclipseNavigation';

// --- IMAGES ---
import shopKeeperImg from './logo1.jpeg'; 
import heartIconLg from './logo1.jpeg';
import stardustIconLg from './logo1.jpeg';
import emotesIconLg from './logo1.jpeg';

const EclipseShop = ({ onNavigate }) => {

  const shopItems = [
    { id: 1, title: "HEART LIFELINE", price: "500", img: heartIconLg },
    { id: 2, title: "STARDUST BAG", price: "1000", img: stardustIconLg },
    { id: 3, title: "VOID EMOTES", price: "250", img: emotesIconLg }
  ];

  return (
    <div className="shop-container">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="star-layer"></div>
      
      <div className="meteor-shower">
        <div className="meteor"></div>
        <div className="meteor"></div>
        <div className="meteor"></div>
        <div className="meteor"></div>
        <div className="meteor"></div>
        <div className="meteor"></div>
        <div className="meteor"></div>
      </div>

      <div className="asteroid-belt">
        <div className="asteroid a1"></div>
        <div className="asteroid a2"></div>
        <div className="asteroid a3"></div>
        <div className="asteroid a4"></div>
      </div>

      {/* --- MAIN SHOP CONTENT --- */}
      <div className="shop-content">
        
        <div className="shop-header-wrapper">
          <h1>VOID SHOP</h1>
        </div>

        <div className="shopkeeper-stage">
          <img src={shopKeeperImg} alt="Shopkeeper" className="shopkeeper-img" />
        </div>

        <div className="shop-cards-container">
          {shopItems.map((item) => (
            <div key={item.id} className="shop-card">
              <div className="card-badge">#{item.id}</div>
              
              <div className="card-visuals">
                <img src={item.img} alt={item.title} />
              </div>

              <div className="card-info">
                <h3 className="card-title">{item.title}</h3>
                <div className="card-price-tag">
                  <span className="price-val">{item.price}</span> DUST
                </div>
              </div>

              <button className="buy-button">BUY</button>
            </div>
          ))}
        </div>
      </div>

      <EclipseNavigation onNavigate={onNavigate} activeTabOverride="shop" />
    </div>
  );
};

export default EclipseShop;