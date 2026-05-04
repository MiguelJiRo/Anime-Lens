import React, { useEffect } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    icon: '📤',
    title: 'Sube una imagen',
    body: 'Haz clic en la zona de carga, arrastra una imagen o pega con Ctrl V. Sirve cualquier captura, fotograma o screenshot del anime.',
  },
  {
    icon: '⚡',
    title: 'Análisis instantáneo',
    body: 'Nuestro sistema compara la imagen con miles de fotogramas usando trace.moe. El proceso suele tardar solo unos segundos.',
  },
  {
    icon: '🎬',
    title: 'Descubre la escena',
    body: 'Verás el anime detectado, episodio, momento exacto, vista previa en vídeo y la ficha completa de AniList traducida al español.',
  },
];

const TIPS = [
  'Usa imágenes nítidas y sin marcas de agua para mejorar la precisión',
  'Las escenas distintivas dan mejores resultados que planos genéricos',
  'Formatos soportados: JPG, PNG, GIF, WebP',
  'Tamaño máximo recomendado: 10 MB',
];

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/85 animate-fade-in-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-title"
    >
      <div
        className="glass-strong rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-4 mb-6">
          <div>
            <h2 id="help-title" className="font-display text-2xl sm:text-3xl font-bold text-gradient">
              Cómo usar Anime Lens
            </h2>
            <p className="text-sm text-white/60 mt-1">Tres pasos para identificar cualquier escena</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xl flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <ol className="space-y-3">
          {STEPS.map((step, i) => (
            <li key={i} className="glass rounded-2xl p-4 sm:p-5 flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/30 to-purple-600/30 border border-white/10 flex items-center justify-center text-2xl" aria-hidden="true">
                {step.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-300 tracking-widest uppercase">Paso {i + 1}</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mt-0.5">{step.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed mt-1">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 glass rounded-2xl p-4 sm:p-5">
          <h3 className="text-sm font-bold text-white/90 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span aria-hidden="true">💡</span> Consejos para mejores resultados
          </h3>
          <ul className="space-y-1.5">
            {TIPS.map((tip, i) => (
              <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-brand-400 mt-0.5" aria-hidden="true">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <button type="button" onClick={onClose} className="btn-primary w-full mt-6">
          ¡Entendido!
        </button>
      </div>
    </div>
  );
};

export default HelpModal;
