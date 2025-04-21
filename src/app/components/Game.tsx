'use client';

import { useState, useEffect } from 'react';
import Puzzle from './Puzzle';
import { gameData } from '../data/gameData';

export default function Game() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showPhrase, setShowPhrase] = useState(false);
  const [key, setKey] = useState(0);

  const handleLevelComplete = () => {
    setShowPhrase(true);
    setTimeout(() => {
      setShowPhrase(false);
      if (currentLevel < gameData.levels.length - 1) {
        setCurrentLevel(prev => prev + 1);
        setKey(prev => prev + 1);
      }
    }, 3000);
  };

  const currentLevelData = gameData.levels[currentLevel];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-800 mb-4">{currentLevelData.title}</h2>
        {showPhrase && (
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto mb-8">
            <p className="text-lg text-purple-600">{currentLevelData.phrase}</p>
          </div>
        )}
      </div>

      <Puzzle
        key={key}
        level={currentLevel + 1}
        imageCount={currentLevelData.imageCount}
        onComplete={handleLevelComplete}
      />
    </div>
  );
} 