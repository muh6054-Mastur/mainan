import React, { useState, useEffect } from 'react';
import { SCIENCE_CLASSIFICATION_DATA } from '../../data/animals';
import { ScienceClassificationQuiz } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, RotateCcw, Award, Check, Sparkles, BookOpen } from 'lucide-react';

interface ScienceClassificationProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const ScienceClassificationGame: React.FC<ScienceClassificationProps> = ({
  onEarnStars,
  onBack
}) => {
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const currentQuiz: ScienceClassificationQuiz =
    SCIENCE_CLASSIFICATION_DATA[problemIndex % SCIENCE_CLASSIFICATION_DATA.length];

  const initQuiz = (idx = problemIndex) => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setShowCelebration(false);

    const quiz = SCIENCE_CLASSIFICATION_DATA[idx % SCIENCE_CLASSIFICATION_DATA.length];
    setTimeout(() => {
      soundCtrl.speak(`Kuis sains satwa: ${quiz.animalName}. ${quiz.question}`, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initQuiz(problemIndex);
  }, [problemIndex]);

  const handleSelectOption = (opt: string) => {
    if (isAnswerChecked) return;
    soundCtrl.playPop(560);
    setSelectedOption(opt);
    setIsAnswerChecked(true);

    if (opt === currentQuiz.correctAnswer) {
      soundCtrl.playCorrect();
      onEarnStars(1);
      setTimeout(() => {
        soundCtrl.speak(`Tepat sekali! ${currentQuiz.explanation}`, { rate: 0.85 });
        setShowCelebration(true);
      }, 500);
    } else {
      soundCtrl.playTryAgain();
      soundCtrl.speak(`Kurang tepat. ${currentQuiz.explanation}`, { rate: 0.85 });
    }
  };

  const handleNext = () => {
    setProblemIndex((prev) => prev + 1);
  };

  const readQuestionAudio = () => {
    soundCtrl.playPop();
    soundCtrl.speak(`Tentang ${currentQuiz.animalName}: ${currentQuiz.question}`);
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
            onClick={readQuestionAudio}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span>Bacakan Soal</span>
          </button>

          <button
            onClick={() => initQuiz(problemIndex)}
            className="p-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-emerald-200 text-center">
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sains Biologi Satwa · Level Mahir #{problemIndex + 1}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Klasifikasi & Ciri Khusus Fauna
          </h2>
        </div>

        {/* Animal Avatar & Question */}
        <div className="my-6 p-6 sm:p-7 bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 rounded-3xl border-2 border-emerald-300 max-w-xl mx-auto shadow-xs">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-5xl shadow-2xs mb-3 animate-soft-bounce">
            {currentQuiz.animalEmoji}
          </div>
          <span className="text-sm font-extrabold text-emerald-800 block mb-1">
            Satwa: {currentQuiz.animalName}
          </span>
          <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed font-display">
            "{currentQuiz.question}"
          </p>
        </div>

        {/* Options */}
        <div className="pt-2 max-w-lg mx-auto space-y-3 text-left">
          {currentQuiz.options.map((opt, i) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === currentQuiz.correctAnswer;

            let btnStyle = 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800';
            if (isAnswerChecked) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 text-emerald-950 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
              } else {
                btnStyle = 'bg-white border-slate-200 opacity-60 text-slate-500';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelectOption(opt)}
                disabled={isAnswerChecked}
                className={`w-full p-4 rounded-2xl border-2 text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswerChecked && isCorrect && (
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation text if checked */}
        {isAnswerChecked && (
          <div className="mt-5 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-lg mx-auto text-left animate-fadeIn">
            <p className="text-xs sm:text-sm font-semibold text-emerald-950">
              💡 <strong>Fakta Sains:</strong> {currentQuiz.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title="Jawaban Sains Satwa Tepat!"
        message={`Penjelasan: ${currentQuiz.explanation}`}
        starsEarned={1}
        onNext={handleNext}
        onReplay={() => initQuiz(problemIndex)}
        nextButtonLabel="Soal Sains Berikutnya"
      />
    </div>
  );
};
