import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white p-6 shadow-lg">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold font-orbitron tracking-widest">
          Linares Cyber-Heroes
        </h1>
        <p className="text-lg text-cyan-400 mt-2">
          Game Designer AI
        </p>
      </div>
    </header>
  );
};

export default Header;
