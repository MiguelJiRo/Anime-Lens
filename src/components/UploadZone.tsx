import React, { useCallback, useEffect, useState } from 'react';

interface UploadZoneProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

const SUPPORTED_FORMATS = ['JPG', 'PNG', 'WebP', 'GIF'];

const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) onImageSelect(file);
    },
    [onImageSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onImageSelect(file);
    },
    [onImageSelect]
  );

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      if (isLoading || !e.clipboardData) return;
      const item = Array.from(e.clipboardData.items).find((i) => i.type.startsWith('image/'));
      const file = item?.getAsFile();
      if (file) onImageSelect(file);
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [onImageSelect, isLoading]);

  return (
    <section
      className="relative w-full min-h-[calc(100vh-7.5rem)] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10 overflow-hidden"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label="Zona de subida de imagen"
    >
      <div className="aurora-orb w-[360px] h-[360px] -top-24 -left-20 bg-brand-500/35" aria-hidden="true" />
      <div className="aurora-orb w-[400px] h-[400px] -bottom-32 -right-24 bg-purple-500/30" aria-hidden="true" />

      <div className="relative w-full max-w-3xl flex flex-col items-center text-center animate-fade-in-up">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-balance leading-tight">
          Identifica cualquier escena <span className="text-gradient">de anime</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-white/70 max-w-xl text-pretty">
          Sube una captura y descubre el anime, episodio y momento exacto en segundos.
        </p>

        <label
          className={[
            'mt-5 sm:mt-6 group relative cursor-pointer w-full max-w-2xl',
            'rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center',
            'transition-all duration-300 outline-none',
            isDragging
              ? 'glass-strong scale-[1.02] ring-2 ring-brand-400 shadow-glow-pink'
              : 'glass hover:bg-white/[0.09] hover:scale-[1.01]',
            isLoading ? 'pointer-events-none opacity-70' : '',
          ].join(' ')}
        >
          <input
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={handleFileInput}
            disabled={isLoading}
            aria-label="Seleccionar imagen para buscar anime"
          />

          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-brand-400/30 border-t-brand-400 animate-spin" />
                <div className="absolute inset-1 rounded-full border-4 border-purple-400/20 border-b-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              </div>
              <p className="text-lg sm:text-xl font-semibold">Analizando imagen…</p>
              <p className="text-sm text-white/50">Comparando con miles de fotogramas</p>
            </div>
          ) : (
            <>
              <div className="relative mb-4 animate-float">
                <div className="absolute inset-0 bg-brand-500/30 blur-2xl rounded-full" aria-hidden="true" />
                <svg className="relative w-16 h-16 sm:w-20 sm:h-20 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-balance">
                Arrastra una imagen aquí
              </p>
              <p className="text-sm sm:text-base text-white/60 mt-1">
                o haz clic, o pega con <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-xs font-mono">Ctrl V</kbd>
              </p>
              <span className="btn-primary mt-5 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                Seleccionar imagen
              </span>
              <ul className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/50">
                {SUPPORTED_FORMATS.map((f) => (
                  <li key={f} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-medium">
                    {f}
                  </li>
                ))}
                <li className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-medium">
                  ≤ 10 MB
                </li>
              </ul>
            </>
          )}
        </label>
      </div>
    </section>
  );
};

export default UploadZone;
