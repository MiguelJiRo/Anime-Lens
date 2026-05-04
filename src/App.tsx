import { useState } from 'react';
import Header from './components/Header';
import HelpModal from './components/HelpModal';
import UploadZone from './components/UploadZone';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import { searchAnimeByImage, getAnimeInfo } from './services/animeApi';
import { AnimeResult, AnimeInfo } from './types';
import { translateText } from './utils/translations';

function App() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnimeResult | null>(null);
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setAnimeInfo(null);

    try {
      const searchResult = await searchAnimeByImage(file);

      if (searchResult.result && searchResult.result.length > 0) {
        const topResult = searchResult.result[0];
        setResult(topResult);

        try {
          const info = await getAnimeInfo(topResult.anilist);
          if (info.description) {
            info.description = await translateText(info.description, 'es');
          }
          setAnimeInfo(info);
        } catch (err) {
          console.error('Error fetching anime details:', err);
        }
      } else {
        setError('No se encontraron coincidencias. Intenta con otra imagen.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar el anime');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setResult(null);
    setAnimeInfo(null);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header onHelpClick={() => setIsHelpOpen(true)} />

      <main className="flex-1 relative">
        {error && (
          <div className="min-h-[60vh] flex items-center justify-center p-6">
            <div className="glass-strong rounded-3xl p-8 max-w-md text-center animate-fade-in-up">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold mb-2 text-red-300">Algo salió mal</h2>
              <p className="text-white/70 mb-6 text-pretty">{error}</p>
              <button type="button" onClick={handleNewSearch} className="btn-primary w-full">
                Intentar de nuevo
              </button>
            </div>
          </div>
        )}

        {!error && !result && (
          <UploadZone onImageSelect={handleImageSelect} isLoading={isLoading} />
        )}

        {!error && result && (
          <ResultsDisplay result={result} animeInfo={animeInfo} onNewSearch={handleNewSearch} />
        )}
      </main>

      <Footer />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

export default App;
