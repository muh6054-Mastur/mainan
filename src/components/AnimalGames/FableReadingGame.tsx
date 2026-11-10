import React, { useState, useEffect } from 'react';
import { FABLE_STORIES_DATA } from '../../data/animals';
import { FableStory } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, RotateCcw, BookOpen, Check, HelpCircle, Heart, ChevronRight } from 'lucide-react';

interface FableReadingGameProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const FableReadingGame: React.FC<FableReadingGameProps> = ({ onEarnStars, onBack }) => {
  const [storyIndex, setStoryIndex] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const currentFable: FableStory =
    FABLE_STORIES_DATA[storyIndex % FABLE_STORIES_DATA.length];
  const currentQuestion = currentFable.questions[questionIndex];

  const initFable = (idx = storyIndex) => {
    setQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerChecked(false);
    setCorrectCount(0);
    setShowCelebration(false);

    const fable = FABLE_STORIES_DATA[idx % FABLE_STORIES_DATA.length];
    setTimeout(() => {
      soundCtrl.speak(`Ayo membaca cerita fabel: ${fable.title}. Bacalah paragraf berikut lalu jawab pertanyaannya!`, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initFable(storyIndex);
  }, [storyIndex]);

  const readWholeStory = () => {
    soundCtrl.playPop();
    const fullText = `${currentFable.title}. ${currentFable.paragraphs.join(' ')}`;
    soundCtrl.speak(fullText, { rate: 0.85 });
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerChecked) return;
    soundCtrl.playPop(560);
    setSelectedOptionIndex(index);
    setIsAnswerChecked(true);

    if (index === currentQuestion.correctIndex) {
      soundCtrl.playCorrect();
      setCorrectCount((prev) => prev + 1);
      soundCtrl.speak(`Jawabanmu tepat! ${currentQuestion.explanation}`, { rate: 0.85 });
    } else {
      soundCtrl.playTryAgain();
      soundCtrl.speak(`Kurang tepat. ${currentQuestion.explanation}`, { rate: 0.85 });
    }
  };

  const handleNextQuestion = () => {
    soundCtrl.playPop(520);
    if (questionIndex < currentFable.questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerChecked(false);
    } else {
      // Completed all questions in this fable!
      onEarnStars(3);
      setShowCelebration(true);
    }
  };

  const handleNextFable = () => {
    setStoryIndex((prev) => prev + 1);
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
            onClick={readWholeStory}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span>Bacakan Seluruh Cerita</span>
          </button>

          <button
            onClick={() => initFable(storyIndex)}
            className="p-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-emerald-200 text-left">
        {/* Story Title & Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Literasi Membaca Fabel · Level Mahir</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {currentFable.title}
          </h2>
        </div>

        {/* Fable Story Text Book Container */}
        <div className="p-6 sm:p-7 bg-amber-50/60 rounded-3xl border-2 border-amber-200 shadow-xs mb-6 space-y-3">
          {currentFable.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed font-display text-justify"
            >
              {p}
            </p>
          ))}

          <div className="pt-3 border-t border-amber-200/80 flex items-start gap-2 text-xs sm:text-sm text-amber-900 font-bold">
            <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>Pesan Kebaikan: "{currentFable.moralLesson}"</span>
          </div>
        </div>

        {/* Comprehension Question Card */}
        <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-500">
            <span className="uppercase tracking-wider">
              Pertanyaan Pemahaman Bacaan #{questionIndex + 1} dari {currentFable.questions.length}
            </span>
            <span className="text-emerald-700 font-extrabold">
              Benar: {correctCount}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display mb-4">
            ❓ {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, i) => {
              const isSelected = selectedOptionIndex === i;
              const isCorrect = i === currentQuestion.correctIndex;

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
                  onClick={() => handleSelectOption(i)}
                  disabled={isAnswerChecked}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswerChecked && isCorrect && (
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner & Next Question Button */}
          {isAnswerChecked && (
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                💡 <strong>Penjelasan:</strong> {currentQuestion.explanation}
              </p>

              <button
                onClick={handleNextQuestion}
                className="py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 transition-all"
              >
                <span>{questionIndex < currentFable.questions.length - 1 ? 'Pertanyaan Berikutnya' : 'Selesaikan Fabel'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title="Luar Biasa! Pemahaman Cerita Tuntas!"
        message={`Kamu berhasil memahami fabel "${currentFable.title}" dengan sangat baik! (+3 Bintang Prestasi)`}
        starsEarned={3}
        onNext={handleNextFable}
        onReplay={() => initFable(storyIndex)}
        nextButtonLabel="Baca Cerita Fabel Berikutnya"
      />
    </div>
  );
};
