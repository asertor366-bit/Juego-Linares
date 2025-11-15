import React, { useState, useCallback } from 'react';
import { GameLevel } from './types';
import { generateGameConcept } from './services/geminiService';
import ConceptForm from './components/ConceptForm';
import ConceptDisplay from './components/ConceptDisplay';
import { LINARES_LOCATIONS, CYBER_THREATS } from './constants';
import Header from './components/Header';

const App: React.FC = () => {
  const [threat, setThreat] = useState<string>(CYBER_THREATS[0]);
  const [location, setLocation] = useState<string>(LINARES_LOCATIONS[0]);
  const [gameConcept, setGameConcept] = useState<GameLevel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateConcept = useCallback(async () => {
    if (!threat || !location) {
      setError('Por favor, especifica una amenaza y una ubicación.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGameConcept(null);
    try {
      const concept = await generateGameConcept(threat, location);
      setGameConcept(concept);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'No se pudo generar el concepto del juego. Inténtalo de nuevo.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [threat, location]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <ConceptForm
          threat={threat}
          setThreat={setThreat}
          location={location}
          setLocation={setLocation}
          handleGenerateConcept={handleGenerateConcept}
          isLoading={isLoading}
        />

        <div className="mt-8">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center animate-fade-in" role="alert">
              <p className="font-bold">¡Error!</p>
              <p>{error}</p>
            </div>
          )}
          
          {!isLoading && !gameConcept && !error && (
            <div className="text-center text-slate-500 p-8 bg-slate-800/50 rounded-lg border border-dashed border-slate-700">
                <h3 className="text-xl font-orbitron mb-2">Listo para la batalla</h3>
                <p>Selecciona una amenaza y una ubicación para generar tu primer nivel.</p>
            </div>
          )}

          {gameConcept && <ConceptDisplay concept={gameConcept} />}
        </div>
      </main>
    </div>
  );
};

export default App;