'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PuzzleProps {
  level: number;
  imageCount: number;
  onComplete: () => void;
}

export default function Puzzle({ level, imageCount, onComplete }: PuzzleProps) {
  const [pieces, setPieces] = useState<number[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize pieces in order
  useEffect(() => {
    setIsClient(true);
    setPieces(Array.from({ length: imageCount }, (_, i) => i));
  }, [imageCount]);

  // Shuffle pieces only after initial render and when level changes
  useEffect(() => {
    if (isClient && pieces.length > 0) {
      const shuffled = [...pieces];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      // Ensure it's not solved initially
      if (shuffled.every((piece, index) => piece === index)) {
        [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
      }
      setPieces(shuffled);
      setIsComplete(false);
    }
  }, [level, isClient, pieces.length]);

  const handlePieceClick = (index: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      const newPieces = [...pieces];
      [newPieces[selectedPiece], newPieces[index]] = [newPieces[index], newPieces[selectedPiece]];
      setPieces(newPieces);
      setSelectedPiece(null);

      if (newPieces.every((piece, i) => piece === i)) {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    }
  };

  // Initial loading state
  if (!isClient || pieces.length === 0) {
    return (
      <div className="p-4 w-full max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-2 aspect-square bg-white rounded-lg p-2 shadow-lg">
          {Array.from({ length: imageCount }).map((_, index) => (
            <div key={index} className="relative aspect-square overflow-hidden border-2 border-gray-300">
              <div className="w-full h-full bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-2xl mx-auto">
      <div className={`grid grid-cols-3 gap-2 aspect-square bg-white rounded-lg p-2 shadow-lg transition-all duration-500 ${isComplete ? 'scale-105' : ''}`}>
        {isComplete ? (
          <div className="col-span-3 row-span-3 relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={`/images/level${level}/full.jpg`}
              alt="Puzzle completado"
              width={600}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        ) : (
          pieces.map((piece, index) => {
            const row = Math.floor(piece / 3);
            const col = piece % 3;
            return (
              <div
                key={index}
                className={`relative aspect-square cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                  selectedPiece === index ? 'border-purple-500 scale-105' : 'border-gray-300'
                }`}
                onClick={() => handlePieceClick(index)}
              >
                <div 
                  className="absolute w-[300%] h-[300%]"
                  style={{
                    top: `${-row * 100}%`,
                    left: `${-col * 100}%`,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Image
                    src={`/images/level${level}/full.jpg`}
                    alt={`Pieza ${piece + 1}`}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
} 