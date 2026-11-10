import React, { useState, useEffect } from 'react';
import { SYMBOL_COMPARISON_PROBLEMS } from '../../data/mathPuzzles';
import { SymbolComparisonProblem } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, RotateCcw, Check } from 'lucide-react';

interface SymbolComparisonGameProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const ScaleCompareGame: React.FC<SymbolComparisonGameProps> = ({ onEarnStars, onBack }) => {
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [selectedSymbol, setSelectedSymbol] = useState<'>' | '<' | '=' | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const currentPuzzle: SymbolComparisonProblem =
    SYMBOL_COMPARISON_PROBLEMS[puzzleIndex % SYMBOL_COMPARISON_PROBLEMS.length];

  const initRound = (idx = puzzleIndex) => {
    setSelectedSymbol(null);
    setIsWrong(false);
    setShowCelebration(false);

    const puzzle = SYMBOL_COMPARISON_PROBLEMS[idx % SYMBOL_COMPARISON_PROBLEMS.length];
    setTimeout(() => {
      soundCtrl.speak(`Bandingkan bilangan ${puzzle.numLeft} dan ${puzzle.numRight}. Manakah simbol perbandingan yang tepat?`, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initRound(puzzleIndex);
  }, [puzzleIndex]);

  const handleSelectSymbol = (sym: '>' | '<' | '=') => {
    setSelectedSymbol(sym);

    if (sym === currentPuzzle.correctSymbol) {
      soundCtrl.playCorrect();
      setIsWrong(false);
      onEarnStars(1);

      setTimeout(() => {
        soundCtrl.speak(`Benar sekali! ${currentPuzzle.sentenceExplanation}`, { rate: 0.85 });
        setShowCelebration(true);
      }, 500);
    } else {
      setIsWrong(true);
      soundCtrl.playTryAgain();
      soundCtrl.speak('Coba perhatikan nilai kedua bilangan sekali lagi ya!', { rate: 0.85 });
      setTimeout(() => {
        setIsWrong(false);
        setSelectedSymbol(null);
      }, 1000);
    }
  };

  const handleNext = () => {
    setPuzzleIndex((prev) => prev + 1);
  };

  // Scale tilt calculation
  const diff = currentPuzzle.numLeft - currentPuzzle.numRight;
  const tiltAngle = diff > 0 ? -6 : diff < 0 ? 6 : 0;

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
            onClick={() => {
              soundCtrl.playPop();
              soundCtrl.speak(`Bandingkan ${currentPuzzle.numLeft} dan ${currentPuzzle.numRight}.`);
            }}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Petunjuk Simbol</span>
          </button>

          <button
            onClick={() => initRound(puzzleIndex)}
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
            Simbol Perbandingan: &gt; (Lebih Dari), &lt; (Kurang Dari), = (Sama Dengan)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Pilih Simbol Matematika yang Tepat
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
            {currentPuzzle.contextSentence}
          </p>
        </div>

        {/* Dynamic Scale & Comparison Area */}
        <div className="my-6 p-6 sm:p-8 bg-amber-50/50 rounded-3xl border-2 border-amber-200">
          <div
            className="flex flex-col sm:flex-row items-center justify-around gap-6 transition-transform duration-500"
            style={{ transform: `rotate(${tiltAngle}deg)` }}
          >
            {/* Left Pan */}
            <div className="p-5 rounded-3xl bg-white border-2 border-amber-300 shadow-xs w-full sm:w-56 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Sisi Kiri
              </span>
              <div className="text-4xl mb-2">{currentPuzzle.itemEmoji}</div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display tabular-nums">
                {currentPuzzle.numLeft}
              </div>
            </div>

            {/* Central Symbol Slot */}
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-18 h-18 rounded-3xl flex items-center justify-center font-black text-4xl shadow-md transition-all ${
                  selectedSymbol === currentPuzzle.correctSymbol
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-200 scale-110'
                    : 'bg-white border-3 border-dashed border-amber-400 text-amber-600'
                }`}
              >
                {selectedSymbol || '?'}
              </div>
              <span className="text-xs font-bold text-slate-400 mt-2">Simbol</span>
            </div>

            {/* Right Pan */}
            <div className="p-5 rounded-3xl bg-white border-2 border-amber-300 shadow-xs w-full sm:w-56 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Sisi Kanan
              </span>
              <div className="text-4xl mb-2">{currentPuzzle.itemEmoji}</div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display tabular-nums">
                {currentPuzzle.numRight}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Symbol Choice Buttons */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-3">
            Pilihlah salah satu tanda pembanding di bawah:
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-md mx-auto">
            {/* Greater Than (>) */}
            <button
              onClick={() => handleSelectSymbol('>')}
              disabled={selectedSymbol === currentPuzzle.correctSymbol}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
                selectedSymbol === '>'
                  ? currentPuzzle.correctSymbol === '>'
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                    : 'bg-rose-500 text-white ring-4 ring-rose-200'
                  : 'bg-white border-2 border-slate-200 hover:border-amber-400 hover:shadow-lg'
              }`}
            >
              <span className="text-3xl sm:text-4xl font-black font-display">&gt;</span>
              <span className="text-xs font-bold mt-1 text-slate-700">Lebih Dari</span>
            </button>

            {/* Equal (=) */}
            <button
              onClick={() => handleSelectSymbol('=')}
              disabled={selectedSymbol === currentPuzzle.correctSymbol}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
                selectedSymbol === '='
                  ? currentPuzzle.correctSymbol === '='
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                    : 'bg-rose-500 text-white ring-4 ring-rose-200'
                  : 'bg-white border-2 border-slate-200 hover:border-amber-400 hover:shadow-lg'
              }`}
            >
              <span className="text-3xl sm:text-4xl font-black font-display">=</span>
              <span className="text-xs font-bold mt-1 text-slate-700">Sama Dengan</span>
            </button>

            {/* Less Than (<) */}
            <button
              onClick={() => handleSelectSymbol('<')}
              disabled={selectedSymbol === currentPuzzle.correctSymbol}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
                selectedSymbol === '<'
                  ? currentPuzzle.correctSymbol === '<'
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                    : 'bg-rose-500 text-white ring-4 ring-rose-200'
                  : 'bg-white border-2 border-slate-200 hover:border-amber-400 hover:shadow-lg'
              }`}
            >
              <span className="text-3xl sm:text-4xl font-black font-display">&lt;</span>
              <span className="text-xs font-bold mt-1 text-slate-700">Kurang Dari</span>
            </button>
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title="Simbol Perbandingan Tepat!"
        message={`Penjelasan: ${currentPuzzle.sentenceExplanation}`}
        starsEarned={1}
        onNext={handleNext}
        onReplay={() => initRound(puzzleIndex)}
        nextButtonLabel="Perbandingan Berikutnya"
      />
    </div>
  );
};
