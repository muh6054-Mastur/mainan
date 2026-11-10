import React, { useState, useEffect } from 'react';
import { ANIMALS_DATA } from '../../data/animals';
import { Animal } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, RotateCcw, Volume2, BookOpen, Check, Sparkles } from 'lucide-react';

interface AnimalSentenceRiddleProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const AnimalSoundQuiz: React.FC<AnimalSentenceRiddleProps> = ({ onEarnStars, onBack }) => {
  const [round, setRound] = useState<number>(0);
  const [targetAnimal, setTargetAnimal] = useState<Animal>(ANIMALS_DATA[0]);
  const [options, setOptions] = useState<Animal[]>([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const initRound = (r = round) => {
    setSelectedAnimalId(null);
    setIsWrong(false);
    setShowCelebration(false);

    const target = ANIMALS_DATA[r % ANIMALS_DATA.length];
    setTargetAnimal(target);

    // Pick 2 other random animals
    const others = ANIMALS_DATA.filter((a) => a.id !== target.id).sort(() => Math.random() - 0.5);
    const pool = [target, others[0], others[1]].sort(() => Math.random() - 0.5);
    setOptions(pool);

    // Audio cue
    setTimeout(() => {
      soundCtrl.speak(`Bacalah kalimat teka-teki berikut, lalu tebak hewan apakah aku?`, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initRound(round);
  }, [round]);

  const handleSelectOption = (animal: Animal) => {
    setSelectedAnimalId(animal.id);

    if (animal.id === targetAnimal.id) {
      soundCtrl.playCorrect();
      setIsWrong(false);
      onEarnStars(1);

      setTimeout(() => {
        soundCtrl.playAnimalSoundEffect(animal.id);
        soundCtrl.speak(`Tepat sekali! Aku adalah ${animal.name}. ${animal.readingSentence}`, { rate: 0.85 });
        setShowCelebration(true);
      }, 500);
    } else {
      setIsWrong(true);
      soundCtrl.playTryAgain();
      soundCtrl.speak('Bukan aku, coba baca kembali kalimat cirinya dengan teliti ya!', { rate: 0.85 });
      setTimeout(() => {
        setIsWrong(false);
        setSelectedAnimalId(null);
      }, 1000);
    }
  };

  const handleNext = () => {
    setRound((prev) => prev + 1);
  };

  const readRiddleAudio = () => {
    soundCtrl.playPop();
    const riddleText = `Teka-teki satwa: ${targetAnimal.clue}. Golonganku: ${targetAnimal.foodType}. Siapakah aku?`;
    soundCtrl.speak(riddleText, { rate: 0.85 });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            soundCtrl.playPop();
            onBack();
          }}
          className="flex items-center gap-2 py-2 px-3.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm cursor-pointer shadow-xs active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Menu Satwa</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={readRiddleAudio}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span>Bacakan Soal</span>
          </button>

          <button
            onClick={() => initRound(round)}
            className="p-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-emerald-200 text-center">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Teka-Teki Kalimat Ciri Satwa #{round + 1}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Bacalah Kalimat Ciri Hewan Ini!
          </h2>
        </div>

        {/* Reading Passage Box */}
        <div className="my-6 p-6 sm:p-7 bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 rounded-3xl border-2 border-emerald-300 max-w-xl mx-auto text-left shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Petunjuk Bacaan:</span>
          </div>

          <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed font-display mb-3">
            "{targetAnimal.clue}"
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-emerald-200/60 text-xs sm:text-sm font-semibold text-slate-700">
            <span>Habitat: <strong>{targetAnimal.habitatLabel}</strong></span>
            <span>·</span>
            <span>Makanan: <strong>{targetAnimal.food}</strong></span>
          </div>
        </div>

        {/* 3 Choice Cards */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-4">
            Berdasarkan kalimat di atas, hewan manakah yang tepat?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 max-w-lg mx-auto">
            {options.map((animal) => {
              const isSelected = selectedAnimalId === animal.id;
              const isCorrect = isSelected && animal.id === targetAnimal.id;
              const isThisWrong = isSelected && isWrong;

              return (
                <button
                  key={animal.id}
                  onClick={() => handleSelectOption(animal)}
                  disabled={selectedAnimalId === targetAnimal.id}
                  className={`p-5 rounded-3xl flex flex-col items-center justify-center min-h-[145px] cursor-pointer shadow-md transition-all active:scale-95 ${
                    isCorrect
                      ? 'bg-emerald-50 border-4 border-emerald-500 ring-4 ring-emerald-200'
                      : isThisWrong
                      ? 'bg-rose-50 border-4 border-rose-500 ring-4 ring-rose-200'
                      : 'bg-white border-2 border-slate-200 hover:border-emerald-400 hover:shadow-lg'
                  }`}
                >
                  <span className="text-5xl sm:text-6xl mb-2">{animal.emoji}</span>
                  <span className="text-lg font-extrabold text-slate-900 font-display">
                    {animal.name}
                  </span>
                  <span className="text-xs text-slate-500 font-medium mt-0.5">
                    {animal.nameEn}
                  </span>
                  {isCorrect && (
                    <div className="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <Check className="w-3.5 h-3.5" />
                      <span>Tepat Sekali!</span>
                    </div>
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
        title="Hebat! Pemahaman Membacamu Sangat Bagus!"
        message={`Kamu berhasil menebak ${targetAnimal.name}: "${targetAnimal.readingSentence}"`}
        starsEarned={1}
        onNext={handleNext}
        onReplay={() => initRound(round)}
        nextButtonLabel="Teka-Teki Kalimat Berikutnya"
      />
    </div>
  );
};
