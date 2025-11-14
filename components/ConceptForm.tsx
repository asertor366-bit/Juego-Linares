import React from 'react';
import { LINARES_LOCATIONS, CYBER_THREATS } from '../constants';

interface ConceptFormProps {
  threat: string;
  setThreat: (threat: string) => void;
  location: string;
  setLocation: (location: string) => void;
  handleGenerateConcept: () => void;
  isLoading: boolean;
}

const ConceptForm: React.FC<ConceptFormProps> = ({
  threat,
  setThreat,
  location,
  setLocation,
  handleGenerateConcept,
  isLoading,
}) => {
  return (
    <section className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
      <h2 className="text-2xl font-orbitron text-cyan-400 mb-6 text-center">Diseña un Nivel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="threat-select" className="block mb-2 text-sm font-medium text-slate-300">
            1. Elige una amenaza digital
          </label>
          <select
            id="threat-select"
            value={threat}
            onChange={(e) => setThreat(e.target.value)}
            className="bg-slate-900 border border-slate-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            disabled={isLoading}
          >
            {CYBER_THREATS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location-select" className="block mb-2 text-sm font-medium text-slate-300">
            2. Elige una ubicación en Linares
          </label>
          <select
            id="location-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-slate-900 border border-slate-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            disabled={isLoading}
          >
            {LINARES_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={handleGenerateConcept}
          disabled={isLoading}
          className="font-orbitron text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-800 font-medium rounded-lg text-lg px-8 py-3 text-center transition-all duration-300 ease-in-out disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando...
            </div>
          ) : (
            '¡Generar Concepto!'
          )}
        </button>
      </div>
    </section>
  );
};

export default ConceptForm;
