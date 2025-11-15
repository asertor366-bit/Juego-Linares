import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white p-4 md:p-6 shadow-lg mb-6">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-orbitron text-cyan-400">
          ¡CEIP SANTA TERESA DRA EN ACCIÓN!
        </h1>
      </div>
    </header>
  );
};

export default Header;