import React from 'react';

interface HeaderProps {
  onHelpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHelpClick }) => {
  return (
    <header className="sticky top-0 w-full px-4 sm:px-6 py-3 flex items-center justify-between glass-bar z-30">
      <a href="/" className="flex items-center gap-3 group" aria-label="Anime Lens — inicio">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-purple-600 blur-xl opacity-40 group-hover:opacity-70 transition-opacity rounded-full" aria-hidden="true" />
          <img
            src="/anime-lens.png"
            alt=""
            width={48}
            height={48}
            className="relative w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_4px_12px_rgba(236,72,153,0.4)] group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="flex flex-col leading-none">
          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-gradient">
            Anime Lens
          </h1>
          <span className="hidden sm:block text-[11px] text-white/50 font-medium tracking-wide uppercase mt-0.5">
            Reverse anime image search
          </span>
        </div>
      </a>

      <button
        type="button"
        onClick={onHelpClick}
        className="group relative px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-brand-500 to-purple-600 rounded-xl font-semibold text-white text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-glow-pink overflow-hidden help-button-pulse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
        aria-label="Abrir guía de ayuda"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
        <span className="relative flex items-center gap-2">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-md">
            <span className="text-brand-600 font-bold text-base sm:text-lg leading-none">?</span>
          </span>
          <span className="hidden xs:inline">Ayuda</span>
        </span>
      </button>
    </header>
  );
};

export default Header;
