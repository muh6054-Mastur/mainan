import React, { useState, useEffect } from 'react';
import { ANIMALS_DATA } from '../../data/animals';
import { Animal } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, RotateCcw, Volume2, Sparkles, Check } from 'lucide-react';

interface ShadowPuzzleGameProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const ShadowPuzzleGame: React.FC<ShadowPuzzleGameProps> = ({ onEarnStars, onBack }) => {
  const [level, setLevel] = useState<number>(1);
  const [currentAnimals, setCurrentAnimals] = useState<Animal[]>([]);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Initialize a round with 3 distinct animals
  const initRound = (lvl = level) => {
    setSelectedAnimalId(null);
    setIsWrong(false);
    setShowCelebration(false);
    setMatchedIds(new Set());

    const startIdx = ((lvl - 1) * 3) % (ANIMALS_DATA.length - 2);
    const chosen = ANIMALS_DATA.slice(startIdx, startIdx + 3);
    setCurrentAnimals(chosen);

    setTimeout(() => {
      soundCtrl.speak('Pasangkan setiap hewan lucu dengan bayangannya yang cocok!', { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initRound(level);
  }, [level]);

  // Handle tapping an animal from the pool
  const handleSelectAnimal = (animal: Animal) => {
    if (matchedIds.has(animal.id)) return;
    soundCtrl.playPop(540);
    setSelectedAnimalId(animal.id);
    soundCtrl.speak(animal.name, { rate: 0.9 });
  };

  // Handle tapping a shadow slot
  const handleSelectShadow = (shadowAnimal: Animal) => {
    if (matchedIds.has(shadowAnimal.id)) return;

    if (!selectedAnimalId) {
      soundCtrl.playPop(420);
      soundCtrl.speak('Pilih dulu salah satu hewan di bawah, lalu pasangkan ke sini ya!', { rate: 0.85 });
      return;
    }

    if (selectedAnimalId === shadowAnimal.id) {
      // Match!
      soundCtrl.playCorrect();
      const nextMatched = new Set(matchedIds);
      nextMatched.add(shadowAnimal.id);
      setMatchedIds(nextMatched);
      setSelectedAnimalId(null);

      soundCtrl.speak(`Cocok sekali! Ini adalah bayangan ${shadowAnimal.name}!`, { rate: 0.85 });

      // Check if all 3 are matched
      if (nextMatched.size === currentAnimals.length) {
        onEarnStars(2);
        setTimeout(() => {
          setShowCelebration(true);
        }, 600);
      }
    } else {
      // Wrong match
      setIsWrong(true);
      soundCtrl.playTryAgain();
      soundCtrl.speak('Bentuk bayangannya berbeda, coba cari bayangan yang pas ya!', { rate: 0.85 });
      setTimeout(() => {
        setIsWrong(false);
      }, 800);
    }
  };

  const handleNextLevel = () => {
    setLevel((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            soundCtrl.playPop();
            onBack();
          }}
          className="flex items-center gap-2 py-2 px-3.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm cursor-pointer shadow-xs active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Pilih Game Lain</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundCtrl.playPop();
              soundCtrl.speak('Pasangkan setiap hewan dengan bayangannya yang cocok!');
            }}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Petunjuk</span>
          </button>

          <button
            onClick={() => {
              soundCtrl.playPop();
              initRound(level);
            }}
            className="p-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-amber-200 text-center">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
            Teka-Teki Bayangan Satwa · Level {level}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display mt-2">
            Pasangkan Hewan ke Bayangannya
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Ketuk hewan di bawah, lalu ketuk bingkai bayangan yang pas!
          </p>
        </div>

        {/* Zone 1: Shadow Slots (Top) */}
        <div className="my-6 p-4 sm:p-6 bg-slate-100/80 rounded-3xl border-2 border-dashed border-slate-300">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
            Bingkai Bayangan Hewan
          </span>
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {currentAnimals.map((animal) => {
              const isMatched = matchedIds.has(animal.id);

              return (
                <button
                  key={animal.id}
                  onClick={() => handleSelectShadow(animal)}
                  disabled={isMatched}
                  className={`p-4 rounded-3xl flex flex-col items-center justify-center min-h-[140px] sm:min-h-[170px] transition-all cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 border-3 border-emerald-400 shadow-md ring-2 ring-emerald-200'
                      : 'bg-white border-2 border-slate-300 hover:border-amber-400 hover:shadow-md'
                  }`}
                >
                  {isMatched ? (
                    <div className="animate-bounce">
                      <span className="text-5xl sm:text-6xl block">{animal.emoji}</span>
                      <span className="text-sm font-extrabold text-emerald-700 block mt-1 font-display">
                        {animal.name}
                      </span>
                      <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-600 mt-0.5">
                        <Check className="w-3 h-3" />
                        <span>Cocok!</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      {/* Silhouette emoji using CSS filter brightness-0 */}
                      <span
                        className="text-5xl sm:text-6xl block filter grayscale brightness-0 opacity-80"
                        title="Bayangan Misterius"
                      >
                        {animal.emoji}
                      </span>
                      <span className="text-xs font-bold text-slate-500 mt-2 bg-slate-200/80 px-2 py-0.5 rounded-lg">
                        Ciri: {animal.bodyParts[0]}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Zone 2: Animal Pieces Pool (Bottom) */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-3">
            Pilih Hewan yang Ingin Dipasangkan:
          </span>
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {currentAnimals.map((animal) => {
              const isMatched = matchedIds.has(animal.id);
              const isSelected = selectedAnimalId === animal.id;

              return (
                <button
                  key={animal.id}
                  onClick={() => handleSelectAnimal(animal)}
                  disabled={isMatched}
                  className={`p-4 rounded-3xl flex flex-col items-center justify-center min-h-[130px] sm:min-h-[150px] transition-all cursor-pointer ${
                    isMatched
                      ? 'bg-slate-50 border-2 border-slate-200 opacity-30 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-100 border-4 border-amber-500 shadow-lg scale-105 ring-4 ring-amber-200'
                      : 'bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-md active:scale-95'
                  }`}
                >
                  <span className="text-5xl sm:text-6xl block">{animal.emoji}</span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-800 font-display mt-1">
                    {animal.name}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold line-clamp-1 mt-0.5">
                    {animal.bodyParts[0]}
                  </span>
                  {isSelected && (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-200 px-2 py-0.5 rounded-full mt-1">
                      Dipilih
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title="Luar Biasa! Semua Bayangan Cocok!"
        message="Mata jeli dan konsentrasimu hebat sekali! Semua bayangan hewan telah terpasang dengan tepat."
        starsEarned={2}
        onNext={handleNextLevel}
        onReplay={() => initRound(level)}
        nextButtonLabel="Tantangan Bayangan Berikutnya"
      />
    </div>
  );
};
