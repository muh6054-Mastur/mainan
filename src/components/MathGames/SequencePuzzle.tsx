import React, { useState, useEffect } from 'react';
import { SEQUENCE_JUMP_PROBLEMS, SequenceJumpProblem } from '../../data/mathPuzzles';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, RotateCcw, HelpCircle, Check, TrendingUp } from 'lucide-react';

interface SequencePuzzleProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const SequencePuzzle: React.FC<SequencePuzzleProps> = ({ onEarnStars, onBack }) => {
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const currentPuzzle: SequenceJumpProblem =
    SEQUENCE_JUMP_PROBLEMS[puzzleIndex % SEQUENCE_JUMP_PROBLEMS.length];

  const initPuzzle = (index = puzzleIndex) => {
    setSelectedAnswer(null);
    setIsWrong(false);
    setShowCelebration(false);

    const puzzle = SEQUENCE_JUMP_PROBLEMS[index % SEQUENCE_JUMP_PROBLEMS.length];
    setTimeout(() => {
      soundCtrl.speak(`${puzzle.title}. ${puzzle.ruleSentence}`, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initPuzzle(puzzleIndex);
  }, [puzzleIndex]);

  const handleSelectOption = (opt: number) => {
    setSelectedAnswer(opt);

    if (opt === currentPuzzle.correctAnswer) {
      soundCtrl.playCorrect();
      setIsWrong(false);
      onEarnStars(1);

      const fullSeq = currentPuzzle.sequence.map((n, i) =>
        i === currentPuzzle.missingIndex ? opt : n
      );
      setTimeout(() => {
        soundCtrl.speak(`Luar biasa! Urutan bilangannya adalah: ${fullSeq.join(', ')}!`, { rate: 0.85 });
        setShowCelebration(true);
      }, 700);
    } else {
      setIsWrong(true);
      soundCtrl.playTryAgain();
      soundCtrl.speak('Hitung kembali aturan penambahan bilangannya ya!', { rate: 0.85 });
      setTimeout(() => {
        setIsWrong(false);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  const handleNext = () => {
    setPuzzleIndex((prev) => prev + 1);
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
          <span>Menu Matematika</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundCtrl.playPop();
              soundCtrl.speak(`${currentPuzzle.title}. ${currentPuzzle.ruleSentence}`);
            }}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-sky-700" />
            <span>Petunjuk Pola</span>
          </button>

          <button
            onClick={() => initPuzzle()}
            className="p-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-sky-200 text-center">
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
            <span>{currentPuzzle.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Lengkapi Kereta Pola Bilangan
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-700 mt-2 max-w-lg mx-auto bg-sky-50/70 p-3 rounded-2xl border border-sky-200">
            📖 <em>"{currentPuzzle.ruleSentence}"</em>
          </p>
        </div>

        {/* Train Visualization Track */}
        <div className="my-6 p-4 sm:p-6 bg-gradient-to-r from-sky-100/70 via-indigo-50/50 to-emerald-100/60 rounded-3xl border-2 border-dashed border-sky-300 overflow-x-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-[340px]">
            {/* Locomotive */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-18 sm:w-20 sm:h-22 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-500 text-white flex flex-col items-center justify-center shadow-md">
                <span className="text-3xl sm:text-4xl">🚂</span>
                <span className="text-[10px] font-black tracking-widest mt-1">LOMPAT</span>
              </div>
              <div className="flex gap-4 mt-1">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-800" />
                <div className="w-3.5 h-3.5 rounded-full bg-slate-800" />
              </div>
            </div>

            {/* Wagons */}
            {currentPuzzle.sequence.map((val, idx) => {
              const isMissing = idx === currentPuzzle.missingIndex;
              const hasAnsweredCorrect = isMissing && selectedAnswer === currentPuzzle.correctAnswer;
              const wagonColors = [
                'from-amber-400 to-orange-400',
                'from-emerald-400 to-teal-400',
                'from-sky-400 to-blue-500',
                'from-purple-400 to-indigo-400',
                'from-pink-400 to-rose-400'
              ][idx % 5];

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-16 h-18 sm:w-20 sm:h-22 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-extrabold font-display shadow-md transition-all duration-300 ${
                      isMissing
                        ? hasAnsweredCorrect
                          ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white ring-4 ring-emerald-200 animate-bounce'
                          : 'bg-white border-3 border-dashed border-sky-500 text-sky-600 shadow-inner'
                        : `bg-gradient-to-tr ${wagonColors} text-white`
                    }`}
                  >
                    {isMissing ? (
                      hasAnsweredCorrect ? (
                        selectedAnswer
                      ) : (
                        <HelpCircle className="w-8 h-8 text-sky-500 animate-pulse" />
                      )
                    ) : (
                      val
                    )}
                  </div>
                  <div className="flex gap-4 mt-1">
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-2 w-full bg-slate-300 rounded-full mt-3 relative">
            <div className="absolute inset-0 flex justify-between px-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="w-1.5 h-3 -top-0.5 bg-slate-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-3">
            Pilih gerbong bilangan yang sesuai dengan pola:
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-sm mx-auto">
            {currentPuzzle.options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = isSelected && opt === currentPuzzle.correctAnswer;
              const isThisWrong = isSelected && isWrong;

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={selectedAnswer === currentPuzzle.correctAnswer}
                  className={`h-20 sm:h-22 rounded-2xl text-3xl font-extrabold font-display flex flex-col items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all ${
                    isCorrect
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                      : isThisWrong
                      ? 'bg-rose-500 text-white ring-4 ring-rose-200'
                      : 'bg-gradient-to-b from-sky-400 to-sky-500 hover:from-sky-500 hover:to-blue-600 text-white hover:shadow-lg'
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
        title="Kereta Pola Bilangan Lengkap!"
        message={`Kamu berhasil melengkapi urutan bilangan dengan tepat: ${currentPuzzle.correctAnswer}!`}
        starsEarned={1}
        onNext={handleNext}
        onReplay={() => initPuzzle()}
        nextButtonLabel="Kereta Pola Berikutnya"
      />
    </div>
  );
};
