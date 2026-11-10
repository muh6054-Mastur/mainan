import React, { useState, useEffect } from 'react';
import { PLACE_VALUE_PROBLEMS } from '../../data/mathPuzzles';
import { PlaceValueItem } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, RotateCcw, Check, Sparkles, Layers } from 'lucide-react';

interface CountingPlaceValueProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const CountingGame: React.FC<CountingPlaceValueProps> = ({ onEarnStars, onBack }) => {
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [selectedOnes, setSelectedOnes] = useState<number | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [options, setOptions] = useState<number[]>([]);

  const currentItem: PlaceValueItem =
    PLACE_VALUE_PROBLEMS[problemIndex % PLACE_VALUE_PROBLEMS.length];

  const initProblem = (idx = problemIndex) => {
    setSelectedOnes(null);
    setIsWrong(false);
    setShowCelebration(false);

    const prob = PLACE_VALUE_PROBLEMS[idx % PLACE_VALUE_PROBLEMS.length];

    // Generate 3 choices for the ones value
    const opts = new Set<number>([prob.ones]);
    while (opts.size < 3) {
      const fake = Math.floor(Math.random() * 9) + 1;
      if (fake !== prob.ones) opts.add(fake);
    }
    setOptions(Array.from(opts).sort(() => Math.random() - 0.5));

    setTimeout(() => {
      soundCtrl.speak(`Bilangan ${prob.number}. Terdiri dari ${prob.tens} puluhan dan berapa satuan?`, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initProblem(problemIndex);
  }, [problemIndex]);

  const handleSelectOption = (onesAns: number) => {
    setSelectedOnes(onesAns);

    if (onesAns === currentItem.ones) {
      soundCtrl.playCorrect();
      setIsWrong(false);
      onEarnStars(1);

      setTimeout(() => {
        soundCtrl.speak(`Tepat sekali! ${currentItem.number} terdiri dari ${currentItem.tens} puluhan dan ${currentItem.ones} satuan!`, { rate: 0.85 });
        setShowCelebration(true);
      }, 500);
    } else {
      setIsWrong(true);
      soundCtrl.playTryAgain();
      soundCtrl.speak('Hitung kembali jumlah satuan yang terpisah ya!', { rate: 0.85 });
      setTimeout(() => {
        setIsWrong(false);
        setSelectedOnes(null);
      }, 1000);
    }
  };

  const handleNext = () => {
    setProblemIndex((prev) => prev + 1);
  };

  const readQuestionAudio = () => {
    soundCtrl.playPop();
    soundCtrl.speak(`Bilangan ${currentItem.number} terdiri dari ${currentItem.tens} puluhan dan berapa satuan?`);
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
          <span>Menu Matematika</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={readQuestionAudio}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Bacakan Soal</span>
          </button>

          <button
            onClick={() => initProblem(problemIndex)}
            className="p-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-amber-200 text-center">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Nilai Tempat: Puluhan & Satuan (Bilangan 1 - 20)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Mengurai Bilangan <span className="text-amber-600">{currentItem.number}</span>
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-lg mx-auto">
            Perhatikan seikat puluhan (10 benda) dan benda satuan yang terpisah di bawah:
          </p>
        </div>

        {/* Visual Blocks of Tens & Ones */}
        <div className="my-6 p-6 bg-gradient-to-r from-amber-50/70 via-sky-50/70 to-emerald-50/70 rounded-3xl border-2 border-dashed border-amber-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Box 1: Tens Block (Puluhan = 10 items) */}
            <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-xs flex flex-col items-center justify-between">
              <div className="flex items-center gap-1.5 mb-2 text-xs font-extrabold text-amber-800 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>1 Ikat Puluhan ({currentItem.tens * 10} {currentItem.itemName})</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-2 bg-amber-50/80 rounded-xl border border-amber-200 min-h-[90px]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    onClick={() => soundCtrl.playCountNote(i + 1)}
                    className="text-2xl sm:text-3xl hover:scale-125 transition-transform cursor-pointer"
                    title={`${currentItem.itemName} ke-${i + 1}`}
                  >
                    {currentItem.itemEmoji}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-sm font-extrabold text-amber-900 font-display">
                {currentItem.tens} Puluhan (= 10)
              </div>
            </div>

            {/* Box 2: Ones (Satuan) */}
            <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 shadow-xs flex flex-col items-center justify-between">
              <div className="flex items-center gap-1.5 mb-2 text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Benda Satuan ({currentItem.ones} {currentItem.itemName})</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-emerald-50/80 rounded-xl border border-emerald-200 min-h-[90px]">
                {Array.from({ length: currentItem.ones }).map((_, i) => (
                  <span
                    key={i}
                    onClick={() => soundCtrl.playCountNote(10 + i + 1)}
                    className="text-2xl sm:text-3xl hover:scale-125 transition-transform cursor-pointer animate-soft-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                    title={`Satuan ke-${i + 1}`}
                  >
                    {currentItem.itemEmoji}
                  </span>
                ))}
                {currentItem.ones === 0 && (
                  <span className="text-slate-400 text-xs font-semibold italic">Tidak ada sisa satuan (0)</span>
                )}
              </div>
              <div className="mt-2 text-sm font-extrabold text-emerald-900 font-display">
                {selectedOnes !== null && selectedOnes === currentItem.ones
                  ? `${currentItem.ones} Satuan`
                  : `? Satuan`}
              </div>
            </div>
          </div>

          {/* Equation breakdown banner */}
          <div className="mt-6 p-3.5 bg-white rounded-2xl border border-slate-200 text-base sm:text-lg font-bold text-slate-800 font-display">
            {currentItem.number} = {currentItem.tens} Puluhan +{' '}
            <span className="text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl">
              {selectedOnes !== null && selectedOnes === currentItem.ones ? selectedOnes : '... ? ...'} Satuan
            </span>
          </div>
        </div>

        {/* Choice Buttons for Ones */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-3">
            Berapa banyak angka satuannya? Pilih di bawah:
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-sm mx-auto">
            {options.map((opt) => {
              const isSelected = selectedOnes === opt;
              const isCorrect = isSelected && opt === currentItem.ones;
              const isThisWrong = isSelected && isWrong;

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={selectedOnes === currentItem.ones}
                  className={`h-20 sm:h-22 rounded-2xl text-3xl font-extrabold font-display flex flex-col items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all ${
                    isCorrect
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                      : isThisWrong
                      ? 'bg-rose-500 text-white ring-4 ring-rose-200'
                      : 'bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-white hover:shadow-lg'
                  }`}
                >
                  <span>{opt}</span>
                  {isCorrect && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title="Luar Biasa! Pemahaman Nilai Tempatmu Sempurna!"
        message={`Bilangan ${currentItem.number} tepat sekali terdiri dari ${currentItem.tens} Puluhan dan ${currentItem.ones} Satuan!`}
        starsEarned={1}
        onNext={handleNext}
        onReplay={() => initProblem(problemIndex)}
        nextButtonLabel="Tantangan Bilangan Berikutnya"
      />
    </div>
  );
};
