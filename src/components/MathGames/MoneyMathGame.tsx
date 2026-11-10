import React, { useState, useEffect } from 'react';
import { MONEY_PROBLEMS } from '../../data/mathPuzzles';
import { MoneyProblem } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, RotateCcw, Coins, Check, ShoppingBag } from 'lucide-react';

interface MoneyMathGameProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const MoneyMathGame: React.FC<MoneyMathGameProps> = ({ onEarnStars, onBack }) => {
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const currentProblem: MoneyProblem =
    MONEY_PROBLEMS[problemIndex % MONEY_PROBLEMS.length];

  const initProblem = (idx = problemIndex) => {
    setSelectedAnswer(null);
    setIsWrong(false);
    setShowCelebration(false);

    const prob = MONEY_PROBLEMS[idx % MONEY_PROBLEMS.length];
    setTimeout(() => {
      soundCtrl.speak(`${prob.storySentence} Berapakah uang kembalian yang harus diterima?`, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initProblem(problemIndex);
  }, [problemIndex]);

  const handleSelectOption = (ans: number) => {
    setSelectedAnswer(ans);

    if (ans === currentProblem.changeNeeded) {
      soundCtrl.playCorrect();
      setIsWrong(false);
      onEarnStars(1);

      setTimeout(() => {
        soundCtrl.speak(`Benar sekali! Uang kembaliannya adalah Rp${currentProblem.changeNeeded.toLocaleString('id-ID')}! Kamu pintar berbelanja dan berhitung!`, { rate: 0.85 });
        setShowCelebration(true);
      }, 500);
    } else {
      setIsWrong(true);
      soundCtrl.playTryAgain();
      soundCtrl.speak('Kurangi uang yang dibayarkan dengan harga barang ya!', { rate: 0.85 });
      setTimeout(() => {
        setIsWrong(false);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  const handleNext = () => {
    setProblemIndex((prev) => prev + 1);
  };

  const readQuestionAudio = () => {
    soundCtrl.playPop();
    soundCtrl.speak(`${currentProblem.storySentence} Berapakah uang kembalian yang tepat?`);
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
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>Mengenal Nilai Uang Rupiah & Kembalian</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Hitung Uang Belanja & Kembalian
          </h2>
        </div>

        {/* Story Box */}
        <div className="my-6 p-6 sm:p-7 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl border-2 border-amber-300 max-w-xl mx-auto text-left shadow-xs">
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-display mb-4">
            📖 "{currentProblem.storySentence}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-bold text-slate-800 pt-3 border-t border-amber-200">
            <div className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-slate-200">
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <span>Harga: Rp{currentProblem.itemPrice.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-slate-200">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>Dibayar: Rp{currentProblem.moneyPaid.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Visual Cash & Coin Tray */}
        <div className="my-6 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="text-xs font-extrabold text-slate-500 uppercase mr-2">Uang Pembayaran:</span>
          {currentProblem.coinsEmoji.map((c, i) => (
            <span
              key={i}
              className="py-1 px-3 bg-white rounded-xl border border-slate-300 font-extrabold text-sm text-slate-800 shadow-2xs"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Options */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-3">
            Berapa sisa uang kembalian yang harus diterima?
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
            {currentProblem.options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = isSelected && opt === currentProblem.changeNeeded;
              const isThisWrong = isSelected && isWrong;

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={selectedAnswer === currentProblem.changeNeeded}
                  className={`py-4 px-3 rounded-2xl font-extrabold text-lg sm:text-xl font-display flex flex-col items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all ${
                    isCorrect
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                      : isThisWrong
                      ? 'bg-rose-500 text-white ring-4 ring-rose-200'
                      : 'bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-white hover:shadow-lg'
                  }`}
                >
                  <span>Rp{opt.toLocaleString('id-ID')}</span>
                  {isCorrect && <Check className="w-4 h-4 text-white mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title="Hitungan Uang Kembalian Benar!"
        message={`Kamu berhasil menghitung kembalian belanja: Rp${currentProblem.changeNeeded.toLocaleString('id-ID')}!`}
        starsEarned={1}
        onNext={handleNext}
        onReplay={() => initProblem()}
        nextButtonLabel="Tantangan Uang Berikutnya"
      />
    </div>
  );
};
