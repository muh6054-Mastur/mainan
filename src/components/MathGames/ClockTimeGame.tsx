import React, { useState, useEffect } from 'react';
import { CLOCK_PROBLEMS } from '../../data/mathPuzzles';
import { ClockProblem } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, RotateCcw, Clock, Check, Sun, Moon } from 'lucide-react';

interface ClockTimeGameProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const ClockTimeGame: React.FC<ClockTimeGameProps> = ({ onEarnStars, onBack }) => {
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const currentProblem: ClockProblem =
    CLOCK_PROBLEMS[problemIndex % CLOCK_PROBLEMS.length];

  const initProblem = (idx = problemIndex) => {
    setSelectedOption(null);
    setIsWrong(false);
    setShowCelebration(false);

    const prob = CLOCK_PROBLEMS[idx % CLOCK_PROBLEMS.length];
    setTimeout(() => {
      soundCtrl.speak(`Perhatikan jam dinding ini. ${prob.activitySentence} Jam berapakah yang ditunjukkan?`, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initProblem(problemIndex);
  }, [problemIndex]);

  const handleSelectOption = (ans: string) => {
    setSelectedOption(ans);

    if (ans === currentProblem.timeLabel) {
      soundCtrl.playCorrect();
      setIsWrong(false);
      onEarnStars(1);

      setTimeout(() => {
        soundCtrl.speak(`Tepat sekali! Jam ini menunjukkan ${currentProblem.timeLabel}! Kamu pintar membaca waktu!`, { rate: 0.85 });
        setShowCelebration(true);
      }, 500);
    } else {
      setIsWrong(true);
      soundCtrl.playTryAgain();
      soundCtrl.speak('Perhatikan jarum pendek yang menunjukkan jam dan jarum panjang yang menunjukkan menit!', { rate: 0.85 });
      setTimeout(() => {
        setIsWrong(false);
        setSelectedOption(null);
      }, 1000);
    }
  };

  const handleNext = () => {
    setProblemIndex((prev) => prev + 1);
  };

  // Calculate clock hand angles (degrees)
  // 12 hours = 360 deg -> 30 deg/hour + (minutes/60 * 30)
  // 60 minutes = 360 deg -> 6 deg/minute
  const hourAngle = (currentProblem.hours % 12) * 30 + (currentProblem.minutes / 60) * 30;
  const minuteAngle = currentProblem.minutes * 6;

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
              soundCtrl.speak(currentProblem.activitySentence);
            }}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-sky-700" />
            <span>Petunjuk Jam</span>
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-sky-200 text-center">
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span>Membaca Jam Analog & Digital</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Pukul Berapakah Sekarang?
          </h2>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 mt-2 bg-slate-100 px-3 py-1 rounded-lg">
            {currentProblem.timePeriod.includes('Pagi') || currentProblem.timePeriod.includes('Siang') ? (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
            )}
            <span>Waktu: <strong>{currentProblem.timePeriod}</strong></span>
          </div>
        </div>

        {/* Analog Clock SVG Visual */}
        <div className="my-6 p-6 sm:p-8 bg-sky-50/60 rounded-3xl border-2 border-sky-200 max-w-sm mx-auto flex flex-col items-center justify-center">
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 bg-white rounded-full border-8 border-slate-800 shadow-xl flex items-center justify-center">
            {/* Clock Numbers 1 to 12 */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
              const angle = (num * 30 - 90) * (Math.PI / 180);
              const radius = 82; // px from center
              const x = Math.round(radius * Math.cos(angle));
              const y = Math.round(radius * Math.sin(angle));

              return (
                <span
                  key={num}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  className="absolute text-base sm:text-lg font-black text-slate-800 font-display"
                >
                  {num}
                </span>
              );
            })}

            {/* Hour Hand (Jarum Pendek - Red/Amber) */}
            <div
              style={{
                transform: `rotate(${hourAngle}deg)`,
                transformOrigin: 'bottom center'
              }}
              className="absolute w-2.5 h-16 sm:h-18 bg-rose-600 rounded-full shadow-md z-10 bottom-1/2 left-[calc(50%-5px)]"
              title="Jarum Pendek (Jam)"
            />

            {/* Minute Hand (Jarum Panjang - Slate/Dark) */}
            <div
              style={{
                transform: `rotate(${minuteAngle}deg)`,
                transformOrigin: 'bottom center'
              }}
              className="absolute w-1.5 h-22 sm:h-24 bg-slate-900 rounded-full shadow-md z-20 bottom-1/2 left-[calc(50%-3px)]"
              title="Jarum Panjang (Menit)"
            />

            {/* Center Pivot Pin */}
            <div className="absolute w-5 h-5 bg-amber-500 rounded-full border-2 border-white shadow-md z-30" />
          </div>

          <p className="text-xs font-semibold text-slate-500 mt-4 italic">
            "{currentProblem.activitySentence}"
          </p>
        </div>

        {/* Options */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-3">
            Pilihlah waktu yang tepat sesuai jarum jam di atas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
            {currentProblem.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrect = isSelected && opt === currentProblem.timeLabel;
              const isThisWrong = isSelected && isWrong;

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={selectedOption === currentProblem.timeLabel}
                  className={`py-4 px-3 rounded-2xl font-extrabold text-lg sm:text-xl font-display flex flex-col items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all ${
                    isCorrect
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                      : isThisWrong
                      ? 'bg-rose-500 text-white ring-4 ring-rose-200'
                      : 'bg-gradient-to-b from-sky-400 to-sky-500 hover:from-sky-500 hover:to-blue-600 text-white hover:shadow-lg'
                  }`}
                >
                  <span>{opt}</span>
                  {isCorrect && <Check className="w-4 h-4 text-white mt-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title="Pembacaan Jam Tepat Sekali!"
        message={`Kamu berhasil membaca jarum jam: ${currentProblem.timeLabel} (${currentProblem.timePeriod})!`}
        starsEarned={1}
        onNext={handleNext}
        onReplay={() => initProblem()}
        nextButtonLabel="Tantangan Jam Berikutnya"
      />
    </div>
  );
};
