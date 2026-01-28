// src/VoidSlime.jsx
import React from 'react';
import { motion } from 'framer-motion';

const VoidSlime = ({ className }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={className}
      initial={{ y: 10 }}
      animate={{ 
        y: -10,
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        repeat: Infinity, 
        repeatType: "reverse", 
        duration: 3,
        ease: "easeInOut"
      }}
    >
      {/* Main Body Blob */}
      <defs>
        <radialGradient id="slimeGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#2a1a4a" />
          <stop offset="80%" stopColor="#0a0510" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <motion.path 
        d="M100,150 C130,150 160,140 170,120 C180,90 160,60 130,50 C100,40 70,50 40,70 C20,90 20,130 50,145 C70,155 80,150 100,150 Z" 
        fill="url(#slimeGrad)"
        style={{ filter: 'drop-shadow(0 0 10px #8b5cf6)' }}
        animate={{
           d: [
             "M100,150 C130,150 160,140 170,120 C180,90 160,60 130,50 C100,40 70,50 40,70 C20,90 20,130 50,145 C70,155 80,150 100,150 Z",
             "M100,145 C135,155 165,135 175,115 C185,85 155,55 125,45 C95,35 65,45 35,65 C15,85 15,135 45,150 C65,160 75,145 100,145 Z"
           ]
        }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}
      />
      
      {/* Puddle Base */}
      <ellipse cx="100" cy="160" rx="70" ry="15" fill="#0a0510" opacity="0.7" />

      {/* Eyes */}
      <motion.g filter="url(#glow)">
        <circle cx="75" cy="95" r="8" fill="white" />
        <circle cx="125" cy="95" r="8" fill="white" />
      </motion.g>
    </motion.svg>
  );
};

export default VoidSlime;