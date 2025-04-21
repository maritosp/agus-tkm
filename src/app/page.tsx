'use client';

import { useState, useEffect } from 'react';
import Game from './components/Game';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showGame, setShowGame] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const birthday = new Date(now.getFullYear(), 3, 22); // Abril 22 (mes 3)
      
      if (now > birthday) {
        birthday.setFullYear(birthday.getFullYear() + 1);
      }

      const difference = birthday.getTime() - now.getTime();
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });

      // Verificar si es el cumpleaños
      const today = new Date();
      setIsBirthday(today.getMonth() === 3 && today.getDate() === 22);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (showGame) {
    return <Game />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">¡Feliz Cumpleaños Agustina!</h1>
        {isBirthday ? (
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto mb-8">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">¡Es tu día especial!</h2>
            <p className="text-lg text-purple-600">Que este día esté lleno de amor y felicidad</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-purple-600">{timeLeft.days}</div>
              <div className="text-sm text-gray-600">Días</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-purple-600">{timeLeft.hours}</div>
              <div className="text-sm text-gray-600">Horas</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-purple-600">{timeLeft.minutes}</div>
              <div className="text-sm text-gray-600">Minutos</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-2xl font-bold text-purple-600">{timeLeft.seconds}</div>
              <div className="text-sm text-gray-600">Segundos</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <button 
          onClick={() => setShowGame(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          Comenzar Juego
        </button>
      </div>
    </div>
  );
}
