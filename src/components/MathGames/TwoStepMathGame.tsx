import React, { useState, useEffect } from 'react';
import { TWO_STEP_MATH_PROBLEMS } from '../../data/mathPuzzles';
import { TwoStepMathProblem } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, RotateCcw, BookOpen, Check, Layers, Sparkles } from 'lucide-react';

interface TwoStepMathGameProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const TwoStepMathGame: React.FC<TwoStepMathGameProps> = ({ onEarnStars, onBack }) => {
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [showStepHint, setShowStepHint] = useState<boolean>(false);

  const currentProblem: TwoStepMathProblem =
    TWO_STEP_MATH_PROBLEMS[problemIndex % TWO_STEP_MATH_PROBLEMS.length];

  const initProblem = (idx = problemIndex) => {
    setSelectedAnswer(null);
    setIsWrong(false);
    setShowCelebration(false);
    setShowStepHint(false);

    const prob = TWO_STEP_MATH_PROBLEMS[idx % TWO_STEP_MATH_PROBLEMS.length];
    const fullStory = `${prob.storySentence1} ${prob.storySentence2} ${prob.storySentence3} ${prob.questionSentence}`;

    setTimeout(() => {
      soundCtrl.speak(fullStory, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initProblem(problemIndex);
  }, [problemIndex]);

  const handleSelectOption = (ans: number) => {
    setSelectedAnswer(ans);

    if (ans === currentProblem.result) {
      soundCtrl.playCorrect();
      setIsWrong(false);
      onEarnStars(2);

      setTimeout(() => {
        soundCtrl.speak(`Luar biasa! Jawabanmu ${currentProblem.result} tepat sekali! Pemecahan dua langkahmu sangat mahir!`, { rate: 0.85 });
        setShowCelebration(true);
      }, 600);
    } else {
      setIsWrong(true);
      soundCtrl.playTryAgain();
      soundCtrl.speak('Hitung kembali secara bertahap: lakukan langkah pertama, lalu lanjutkan langkah kedua ya!', { rate: 0.85 });
      setTimeout(() => {
        setIsWrong(false);
        setSelectedAnswer(null);
      }, 1200);
    }
  };

  const readStoryAudio = () => {
    soundCtrl.playPop();
    const fullStory = `${currentProblem.storySentence1} ${currentProblem.storySentence2} ${currentProblem.storySentence3} ${currentProblem.questionSentence}`;
    soundCtrl.speak(fullStory, { rate: 0.85 });
  };

  const handleNext = () => {
    setProblemIndex((prev) => prev + 1);
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
            onClick={readStoryAudio}
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
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Level Mahir · Soal Cerita Dua Langkah</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Operasi Hitung Campuran Kontekstual
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Bacalah ketiga kalimat cerita di bawah, lalu hitung secara bertahap!
          </p>
        </div>

        {/* Story Reading Box */}
        <div className="my-6 p-6 sm:p-7 bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-amber-50/80 rounded-3xl border-2 border-amber-300 max-w-2xl mx-auto text-left shadow-xs">
          <div className="flex items-center justify-between mb-3 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Jalan Cerita:</span>
            </div>
            <button
              onClick={() => setShowStepHint(!showStepHint)}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 underline cursor-pointer"
            >
              {showStepHint ? 'Sembunyikan Langkah' : 'Bantuan Langkah Hitung'}
            </button>
          </div>

          <div className="space-y-2 text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-display">
            <p className="p-2 bg-white/80 rounded-xl border border-amber-200/60">
              1️⃣ {currentProblem.storySentence1}
            </p>
            <p className="p-2 bg-white/80 rounded-xl border border-amber-200/60">
              2️⃣ {currentProblem.storySentence2}
            </p>
            <p className="p-2 bg-white/80 rounded-xl border border-amber-200/60">
              3️⃣ {currentProblem.storySentence3}
            </p>
          </div>

          <div className="p-3 bg-amber-100/90 rounded-2xl border border-amber-300 mt-4">
            <p className="text-base sm:text-lg font-extrabold text-amber-950 font-display">
              ❓ {currentProblem.questionSentence}
            </p>
          </div>

          {/* Step-by-step Hint if toggled */}
          {showStepHint && (
            <div className="mt-4 p-3 bg-white rounded-2xl border border-amber-300 text-xs sm:text-sm font-semibold text-slate-700 space-y-1 animate-fadeIn">
              <p>💡 <strong>Panduan Berpikir:</strong></p>
              <p>• Langkah 1: Selesaikan operasi antara kalimat pertama dan kedua.</p>
              <p>• Langkah 2: Ambil hasil langkah 1, lalu gabungkan dengan kalimat ketiga.</p>
              <p className="font-mono text-amber-800 text-sm font-bold mt-1">Bentuk Matematika: {currentProblem.equationDisplay}</p>
            </div>
          )}
        </div>

        {/* Visual Equation Banner */}
        <div className="my-6 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 max-w-lg mx-auto flex items-center justify-center gap-3 text-xl sm:text-2xl font-black text-slate-800 font-display">
          <span>{currentProblem.itemEmoji}</span>
          <span>{currentProblem.equationDisplay}</span>
          <span className="text-amber-600 bg-amber-100 px-3 py-1 rounded-xl">
            {selectedAnswer !== null && selectedAnswer === currentProblem.result ? selectedAnswer : '?'}
          </span>
        </div>

        {/* Options */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-3">
            Pilihlah jawaban akhir yang tepat:
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-sm mx-auto">
            {currentProblem.options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = isSelected && opt === currentProblem.result;
              const isThisWrong = isSelected && isWrong;

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={selectedAnswer === currentProblem.result}
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
        title="Luar Biasa! Pemecahan Dua Langkahmu Sempurna!"
        message={`Kamu berhasil menuntaskan soal cerita bertahap dengan hasil ${currentProblem.result} ${currentProblem.itemName}!`}
        starsEarned={2}
        onNext={handleNext}
        onReplay={() => initProblem()}
        nextButtonLabel="Tantangan Dua Langkah Berikutnya"
      />
    </div>
  );
};
