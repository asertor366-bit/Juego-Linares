import React, { useState } from 'react';
import { GameLevel } from '../types';

interface ConceptDisplayProps {
  concept: GameLevel;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-lg transition-transform transform hover:scale-105 hover:border-cyan-500">
        <div className="flex items-center mb-3">
            <div className="text-cyan-400 mr-4">{icon}</div>
            <h3 className="text-xl font-orbitron text-cyan-400">{title}</h3>
        </div>
        <div className="text-slate-300 leading-relaxed">{children}</div>
    </div>
);

const NPCBubble: React.FC<{ name: string; dialogue: string }> = ({ name, dialogue }) => (
    <div className="mt-6 bg-slate-900/50 p-4 rounded-lg border-l-4 border-yellow-400 italic">
        <p className="text-yellow-200">
            <strong className="font-bold not-italic">{name}:</strong> "{dialogue}"
        </p>
    </div>
);


const ConceptDisplay: React.FC<ConceptDisplayProps> = ({ concept }) => {
  const [feedback, setFeedback] = useState<{ message: string; type: 'correct' | 'incorrect' } | null>(null);

  const handleOptionClick = (selectedOption: string) => {
    if (selectedOption === concept.reward) {
      setFeedback({ message: '¡Muy bien!', type: 'correct' });
    } else {
      setFeedback({ message: 'Esa no es la mejor opción. ¡Sigue intentándolo!', type: 'incorrect' });
    }
  };

  return (
    <div className="mt-8 p-6 bg-slate-900 rounded-lg shadow-2xl border border-slate-700 animate-fade-in">
      <header className="text-center mb-6 pb-4 border-b-2 border-cyan-500/50">
        <h2 className="text-4xl font-orbitron font-bold text-white tracking-wide">{concept.title}</h2>
        <p className="text-lg text-slate-400 mt-2">
          {concept.location} vs. {concept.threat}
        </p>
      </header>

      <div className="space-y-6">
        <InfoCard title="Misión" icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        }>
            <p>{concept.missionDescription}</p>
            {concept.npc && <NPCBubble name={concept.npc.name} dialogue={concept.npc.dialogue} />}
        </InfoCard>

        <InfoCard title="Reto Principal" icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        }>
            <p className="mb-4">{concept.challenge}</p>
            <div className="mt-4 pt-4 border-t border-slate-700">
                <h4 className="text-lg font-orbitron text-slate-300 mb-3">Elige tu acción:</h4>
                <div className="flex flex-col space-y-3">
                    {concept.options.map((option, index) => (
                        <div 
                            key={index} 
                            onClick={() => handleOptionClick(option)}
                            className="bg-slate-900/70 p-3 rounded-md border border-slate-600 text-center cursor-pointer hover:bg-slate-700 transition-colors"
                        >
                           <span className="font-semibold text-slate-200">{option}</span>
                        </div>
                    ))}
                </div>
                {feedback && (
                    <div className={`mt-4 p-3 rounded-lg text-center font-semibold animate-fade-in ${
                        feedback.type === 'correct' 
                        ? 'bg-green-900/50 border border-green-700 text-green-300' 
                        : 'bg-yellow-900/50 border border-yellow-700 text-yellow-300'
                    }`}>
                        {feedback.message}
                    </div>
                )}
            </div>
        </InfoCard>
        
        <InfoCard title="Recompensa / Power-Up (Solución Correcta)" icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118-8.618c0-1.21-.23-2.363-.64-3.456z" /></svg>
        }>
            <p>{concept.reward}</p>
        </InfoCard>
      </div>
    </div>
  );
};

export default ConceptDisplay;