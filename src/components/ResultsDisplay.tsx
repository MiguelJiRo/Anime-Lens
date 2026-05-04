import React from 'react';
import { AnimeResult, AnimeInfo } from '../types';
import { translateGenre, translateFormat, translateStatus, translateSeason } from '../utils/translations';

interface ResultsDisplayProps {
  result: AnimeResult;
  animeInfo: AnimeInfo | null;
  onNewSearch: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function similarityTone(value: number): { label: string; color: string } {
  const pct = value * 100;
  if (pct >= 90) return { label: 'Coincidencia altísima', color: 'text-emerald-400' };
  if (pct >= 75) return { label: 'Coincidencia alta', color: 'text-lime-400' };
  if (pct >= 50) return { label: 'Coincidencia media', color: 'text-yellow-400' };
  return { label: 'Coincidencia baja', color: 'text-orange-400' };
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, animeInfo, onNewSearch }) => {
  const similarity = result.similarity * 100;
  const tone = similarityTone(result.similarity);
  const timeFrom = formatTime(result.from);
  const timeTo = formatTime(result.to);

  return (
    <div className="w-full px-4 sm:px-6 py-4 sm:py-6">
      <div className="max-w-6xl mx-auto animate-fade-in-up">
        <div className="glass-strong rounded-3xl p-5 sm:p-8 space-y-6">
          <header className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">Resultado</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1 text-balance">
                {animeInfo?.title.romaji ?? 'Anime detectado'}
              </h2>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wider text-white/50">{tone.label}</p>
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums ${tone.color}`}>
                  {similarity.toFixed(1)}%
                </p>
              </div>
              <button type="button" onClick={onNewSearch} className="btn-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114-5M20 14a8 8 0 01-14 5" />
                </svg>
                Nueva búsqueda
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6">
            <div className="lg:col-span-3 space-y-4">
              <div className="aspect-video glass rounded-2xl overflow-hidden ring-1 ring-white/10">
                <video
                  src={result.video}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover bg-black"
                />
              </div>

              <div className="glass rounded-2xl p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-300 mb-3">
                  Información de la escena
                </h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <InfoRow label="Episodio" value={result.episode?.toString() ?? '—'} />
                  <InfoRow label="Tiempo" value={`${timeFrom} – ${timeTo}`} />
                  <InfoRow label="Archivo" value={result.filename} small className="col-span-2" />
                </dl>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {animeInfo ? (
                <>
                  <div className="glass rounded-2xl p-4 sm:p-5 flex gap-4">
                    <img
                      src={animeInfo.coverImage.large}
                      alt={`Portada de ${animeInfo.title.romaji}`}
                      loading="lazy"
                      className="w-24 sm:w-28 h-36 sm:h-40 object-cover rounded-xl shadow-lg ring-1 ring-white/10 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold leading-tight text-balance">
                        {animeInfo.title.romaji}
                      </h3>
                      {animeInfo.title.english && animeInfo.title.english !== animeInfo.title.romaji && (
                        <p className="text-sm text-white/70 mt-0.5 truncate">{animeInfo.title.english}</p>
                      )}
                      <p className="text-xs text-white/45 mt-0.5 truncate">{animeInfo.title.native}</p>
                      {animeInfo.genres && animeInfo.genres.length > 0 && (
                        <ul className="flex flex-wrap gap-1.5 mt-3">
                          {animeInfo.genres.slice(0, 6).map((genre, i) => (
                            <li key={i} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gradient-to-r from-brand-600/70 to-purple-600/70 border border-white/10">
                              {translateGenre(genre)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-5 space-y-4">
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                      {animeInfo.averageScore != null && (
                        <InfoRow label="Puntuación" value={`${animeInfo.averageScore} / 100`} />
                      )}
                      {animeInfo.episodes != null && (
                        <InfoRow label="Episodios" value={animeInfo.episodes.toString()} />
                      )}
                      {animeInfo.format && (
                        <InfoRow label="Formato" value={translateFormat(animeInfo.format)} />
                      )}
                      {animeInfo.status && (
                        <InfoRow label="Estado" value={translateStatus(animeInfo.status)} />
                      )}
                      {animeInfo.season && animeInfo.seasonYear && (
                        <InfoRow label="Emisión" value={`${translateSeason(animeInfo.season)} ${animeInfo.seasonYear}`} className="col-span-2" />
                      )}
                    </dl>

                    {animeInfo.description && (
                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-brand-300 mb-2">Sinopsis</h4>
                        <p className="text-sm text-white/75 leading-relaxed max-h-48 overflow-y-auto pr-2">
                          {animeInfo.description}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-full min-h-[280px] flex items-center justify-center glass rounded-2xl p-10">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-brand-400/30 border-t-brand-400 animate-spin" />
                    <p className="text-sm font-semibold text-white/85">Cargando información detallada…</p>
                    <p className="text-xs text-white/50">Traduciendo la sinopsis al español</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
  small?: boolean;
  className?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, small, className = '' }) => (
  <div className={className}>
    <dt className="text-[11px] uppercase tracking-wider text-white/50 font-medium">{label}</dt>
    <dd className={`font-semibold mt-0.5 ${small ? 'text-xs break-all text-white/70' : 'text-sm text-white'}`}>{value}</dd>
  </div>
);

export default ResultsDisplay;
