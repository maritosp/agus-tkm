'use client';

import { useState, useEffect } from 'react';
import Puzzle from './Puzzle';
import { gameData } from '../data/gameData';

const completionPhrases = [
  "Resulta imposible encontrar a alguien como vos.\nCon valores de verdad, de los que ya casi no se ven.\nSos inteligente, solidaria, siempre con ganas de ayudar a los demás.\nSos responsable, una gran amiga, y una laburante incansable.\nTe admiro desde que te conocí.\nY me enseñaste las cosas más importantes de la vida.",
  "Lo que más me impacta de vos es el amor que le tenés a la gente.\nA tus amigos, a tu familia… siempre estás, siempre das lo mejor de vos.\nTe preocupás, te hacés cargo, no soltás la mano nunca.\nTenés una forma muy especial de querer.\nY se nota que lo hacés desde el corazón.",
  "Tenés un humor muy tuyo.\nY aunque a veces no lo parezca, sos de las personas más graciosas que conozco.\nTenés salidas que me hacen reír incluso cuando no quiero.\nTenés esa forma rara y hermosa de hacerme bien, incluso sin darte cuenta.\nY eso también te hace única.",
  "Sos hermosa.\nY no hablo solo de lo que se ve.\nMe gustás despeinada a la mañana, con cara de dormida y todo.\nPero también me encanta tu forma de vestirte, tu buen gusto, tu manera elegante de moverte por la vida.\nTenés una belleza que no necesita esfuerzo, porque simplemente te sale.",
  "Si alguna vez me tocara pelear por algo en esta vida,\nel único motivo real sería vos.\nPor cuidarte, por defenderte, por todo lo que sos.\nSos una de esas personas que le dan sentido al mundo.\nY yo tengo la suerte de compartir un pedacito del mío con vos.\nTe quiero mucho.\nY ojalá nunca cambies."
];

const finalMessage = "Por muchos cumpleaños más juntos, con amor y te deseo una vida muy feliz.";

// Para probar, cambia este valor a true o false
const TEST_BIRTHDAY = false; // Cambia esto para probar ambos casos

// Función para verificar si es el cumpleaños
const isBirthdayToday = () => {
  const today = new Date();
  return today.getMonth() === 3 && today.getDate() === 22; // 22 de abril (mes 3)
};

interface GameProps {
  onGameComplete: () => void;
}

export default function Game({ onGameComplete }: GameProps) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showPhrase, setShowPhrase] = useState(false);
  const [key, setKey] = useState(0);
  const [isBirthday, setIsBirthday] = useState(false);
  const [age, setAge] = useState(0);

  useEffect(() => {
    const today = new Date();
    const birthday = new Date(1993, 3, 22); // Abril 22, 1993
    const currentYear = today.getFullYear();
    const birthYear = birthday.getFullYear();
    const calculatedAge = currentYear - birthYear;
    
    // En producción, usar la función real de verificación
    // En desarrollo, usar el valor de TEST_BIRTHDAY
    setIsBirthday(process.env.NODE_ENV === 'production' ? isBirthdayToday() : TEST_BIRTHDAY);
    setAge(calculatedAge);

    // Verificar cada minuto si es el cumpleaños
    const birthdayChecker = setInterval(() => {
      setIsBirthday(process.env.NODE_ENV === 'production' ? isBirthdayToday() : TEST_BIRTHDAY);
    }, 60000);

    return () => clearInterval(birthdayChecker);
  }, []);

  const handleLevelComplete = () => {
    setShowPhrase(true);
  };

  const handleNextLevel = () => {
    setShowPhrase(false);
    if (currentLevel < gameData.levels.length) {
      setCurrentLevel(prev => prev + 1);
      setKey(prev => prev + 1);
    }
  };

  const handleReturnToStart = () => {
    onGameComplete();
  };

  const isFinalLevel = currentLevel === gameData.levels.length;
  const currentLevelData = !isFinalLevel ? gameData.levels[currentLevel] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        {!isFinalLevel && currentLevelData && (
          <h2 className="text-3xl font-bold text-purple-800 mb-4">{currentLevelData.title}</h2>
        )}
        
        {isFinalLevel ? (
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto mb-8">
            {isBirthday ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">¡Feliz Cumpleaños Agustina!</h3>
                <p className="text-xl text-purple-600 mb-4">¡Felices {age} años!</p>
                <div className="mb-4 relative w-full max-w-[300px] mx-auto rounded-lg overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                  >
                    <source src="/birthday-cake.mp4" type="video/mp4" />
                  </video>
                </div>
                <p className="text-lg text-purple-600 whitespace-pre-line mb-4">{finalMessage}</p>
                <button
                  onClick={handleReturnToStart}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  Volver al Inicio
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg text-purple-600 mb-4">¡Seguí jugando hasta que sea tu cumpleaños!</p>
                <button
                  onClick={handleReturnToStart}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  Volver al Inicio
                </button>
              </div>
            )}
          </div>
        ) : showPhrase && currentLevelData && (
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto mb-8">
            <p className="text-lg text-purple-600 whitespace-pre-line mb-4">{completionPhrases[currentLevel]}</p>
            <button
              onClick={handleNextLevel}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Siguiente Nivel
            </button>
          </div>
        )}
      </div>

      {!isFinalLevel && currentLevelData && (
        <Puzzle
          key={key}
          level={currentLevel + 1}
          imageCount={currentLevelData.imageCount}
          onComplete={handleLevelComplete}
        />
      )}
    </div>
  );
} 