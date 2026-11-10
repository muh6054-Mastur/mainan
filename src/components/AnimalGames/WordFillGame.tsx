import React, { useState, useEffect } from 'react';
import { WORD_FILL_DATA } from '../../data/animals';
import { WordFillProblem } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, RotateCcw, PenTool, Check } from 'lucide-react';

interface WordFillGameProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const WordFillGame: React.FC<WordFillGameProps> = ({ onEarnStars, onBack }) => {
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const currentProblem: WordFillProblem =
    WORD_FILL_DATA[problemIndex % WORD_FILL_DATA.length];

  const initProblem = (idx = problemIndex) => {
    setSelectedWord(null);
    setIsWrong(false);
    setShowCelebration(false);

    const prob = WORD_FILL_DATA[idx % WORD_FILL_DATA.length];
    setTimeout(() => {
      soundCtrl.speak(`Lengkapilah kalimat berikut dengan kata yang paling tepat! ${prob.sentenceWithBlank}`, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initProblem(problemIndex);
  }, [problemIndex]);

  const handleSelectWord = (word: string) => {
    setSelectedWord(word);

    if (word === currentProblem.missingWord) {
      soundCtrl.playCorrect();
      setIsWrong(false);
      onEarnStars(1);

      setTimeout(() => {
        soundCtrl.speak(`Benar sekali! Kalimat lengkapnya: ${currentProblem.fullSentence}`, { rate: 0.85 });
        setShowCelebration(true);
      }, 500);
    } else {
      setIsWrong(true);
      soundCtrl.playTryAgain();
      soundCtrl.speak('Kata tersebut belum tepat untuk melengkapi kalimat ini. Coba pilih kata yang lain ya!', { rate: 0.85 });
      setTimeout(() => {
        setIsWrong(false);
        setSelectedWord(null);
      }, 1000);
    }
  };

  const handleNext = () => {
    setProblemIndex((prev) => prev + 1);
  };

  const readSentenceAudio = () => {
    soundCtrl.playPop();
    soundCtrl.speak(`Bacalah dan lengkapi: ${currentProblem.sentenceWithBlank}`);
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
            onClick={readSentenceAudio}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span>Bacakan Kalimat</span>
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-emerald-200 text-center">
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            <PenTool className="w-3.5 h-3.5 text-emerald-600" />
            <span>Melengkapi Kalimat Rumpang #{problemIndex + 1}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Pilihlah Kata Pengisi yang Tepat
          </h2>
        </div>

        {/* Sentence Container */}
        <div className="my-6 p-6 sm:p-7 bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 rounded-3xl border-2 border-emerald-300 max-w-xl mx-auto shadow-xs text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl p-2 bg-white rounded-2xl shadow-2xs">
              {currentProblem.animalEmoji}
            </span>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Kalimat Latihan:
            </span>
          </div>

          <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed font-display">
            {selectedWord && selectedWord === currentProblem.missingWord ? (
              currentProblem.fullSentence
            ) : (
              <span>
                {currentProblem.sentenceWithBlank.split('_____')[0]}
                <span className="inline-block px-3 py-1 bg-amber-200 border-b-2 border-amber-500 rounded-lg text-amber-950 font-black animate-pulse">
                  {selectedWord || '... ? ...'}
                </span>
                {currentProblem.sentenceWithBlank.split('_____')[1]}
              </span>
            )}
          </p>
        </div>

        {/* Word Options */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-3">
            Ketuk kata di bawah untuk melengkapi kalimat:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto">
            {currentProblem.options.map((word) => {
              const isSelected = selectedWord === word;
              const isCorrect = isSelected && word === currentProblem.missingWord;
              const isThisWrong = isSelected && isWrong;

              return (
                <button
                  key={word}
                  onClick={() => handleSelectWord(word)}
                  disabled={selectedWord === currentProblem.missingWord}
                  className={`py-3.5 px-4 rounded-2xl font-extrabold text-lg sm:text-xl font-display flex flex-col items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all ${
                    isCorrect
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-200'
                      : isThisWrong
                      ? 'bg-rose-500 text-white ring-4 ring-rose-200'
                      : 'bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-800 hover:shadow-lg'
                  }`}
                >
                  <span>{word}</span>
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
        title="Kalimat Lengkap Sempurna!"
        message={`Kamu berhasil melengkapi kalimat: "${currentProblem.fullSentence}"`}
        starsEarned={1}
        onNext={handleNext}
        onReplay={() => initProblem(problemIndex)}
        nextButtonLabel="Kalimat Rumpang Berikutnya"
      />
    </div>
  );
};
