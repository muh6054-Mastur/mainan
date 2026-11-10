import React, { useState, useEffect } from 'react';
import { STORY_MATH_PROBLEMS } from '../../data/mathPuzzles';
import { StoryMathProblem } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, RotateCcw, BookOpen, Plus, Minus, Equal, Check } from 'lucide-react';

interface StoryMathGameProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const VisualMathGame: React.FC<StoryMathGameProps> = ({ onEarnStars, onBack }) => {
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const currentProblem: StoryMathProblem =
    STORY_MATH_PROBLEMS[problemIndex % STORY_MATH_PROBLEMS.length];

  const initProblem = (idx = problemIndex) => {
    setSelectedAnswer(null);
    setIsWrong(false);
    setShowCelebration(false);

    const prob = STORY_MATH_PROBLEMS[idx % STORY_MATH_PROBLEMS.length];
    const fullStory = `${prob.storySentence1} ${prob.storySentence2} ${prob.questionSentence}`;
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

      const opWord = currentProblem.operator === '+' ? 'ditambah' : 'dikurangi';
      const readEquation = `${currentProblem.numA} ${opWord} ${currentProblem.numB} sama dengan ${currentProblem.result}! Pemahaman membaca dan menghitungmu hebat sekali!`;

      setTimeout(() => {
        soundCtrl.speak(readEquation, { rate: 0.85 });
        setShowCelebration(true);
      }, 600);
    } else {
      setIsWrong(true);
      soundCtrl.playTryAgain();
      soundCtrl.speak('Yuk baca kalimat ceritanya dan hitung sekali lagi dengan teliti!', { rate: 0.85 });
      setTimeout(() => {
        setIsWrong(false);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  const readStoryAudio = () => {
    soundCtrl.playPop();
    const fullStory = `${currentProblem.storySentence1} ${currentProblem.storySentence2} ${currentProblem.questionSentence}`;
    soundCtrl.speak(fullStory, { rate: 0.85 });
  };

  const handleNext = () => {
    setProblemIndex((prev) => prev + 1);
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
            onClick={readStoryAudio}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Bacakan Soal Cerita</span>
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
            Soal Cerita Kalimat Matematika #{problemIndex + 1}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Membaca & Menyelesaikan Soal Cerita
          </h2>
        </div>

        {/* Story Reading Passage */}
        <div className="my-6 p-6 sm:p-7 bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-50 rounded-3xl border-2 border-amber-300 max-w-2xl mx-auto text-left shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Teks Soal Cerita:</span>
          </div>

          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-display mb-2">
            1. {currentProblem.storySentence1}
          </p>
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-display mb-3">
            2. {currentProblem.storySentence2}
          </p>

          <div className="p-3 bg-white/90 rounded-2xl border border-amber-200 mt-2">
            <p className="text-base sm:text-lg font-extrabold text-amber-950 font-display">
              ❓ {currentProblem.questionSentence}
            </p>
          </div>
        </div>

        {/* Mathematical Equation & Visual Clues */}
        <div className="my-6 p-4 sm:p-6 bg-slate-50 rounded-3xl border border-slate-200 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          {/* Group A */}
          <div className="bg-white px-5 py-3 rounded-2xl border-2 border-amber-300 shadow-2xs flex items-center gap-2">
            <span className="text-3xl">{currentProblem.itemEmoji}</span>
            <span className="text-2xl font-black text-slate-900 font-display tabular-nums">
              {currentProblem.numA}
            </span>
          </div>

          {/* Operator */}
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
            {currentProblem.operator === '+' ? (
              <Plus className="w-6 h-6 stroke-[3]" />
            ) : (
              <Minus className="w-6 h-6 stroke-[3]" />
            )}
          </div>

          {/* Group B */}
          <div className="bg-white px-5 py-3 rounded-2xl border-2 border-amber-300 shadow-2xs flex items-center gap-2">
            <span className="text-3xl">{currentProblem.itemEmoji}</span>
            <span className="text-2xl font-black text-slate-900 font-display tabular-nums">
              {currentProblem.numB}
            </span>
          </div>

          {/* Equals */}
          <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-extrabold text-xl">
            <Equal className="w-6 h-6 stroke-[3]" />
          </div>

          {/* Result Box */}
          <div
            className={`min-w-[80px] h-14 px-4 rounded-2xl flex items-center justify-center text-3xl font-extrabold font-display shadow-xs transition-all ${
              selectedAnswer === currentProblem.result
                ? 'bg-emerald-500 text-white ring-4 ring-emerald-200 animate-bounce'
                : 'bg-white border-2 border-dashed border-amber-400 text-amber-600'
            }`}
          >
            {selectedAnswer === currentProblem.result ? selectedAnswer : '?'}
          </div>
        </div>

        {/* Answer Options */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-3">
            Pilih hasil hitungan yang sesuai dengan isi cerita:
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-sm mx-auto">
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
        title="Luar Biasa! Jawaban Soal Cerita Benar!"
        message={`Kamu berhasil memecahkan soal cerita matematika dengan hasil ${currentProblem.result} ${currentProblem.itemName}!`}
        starsEarned={2}
        onNext={handleNext}
        onReplay={() => initProblem()}
        nextButtonLabel="Soal Cerita Berikutnya"
      />
    </div>
  );
};
