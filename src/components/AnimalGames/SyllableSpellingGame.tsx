import React, { useState, useEffect } from 'react';
import { SENTENCE_PUZZLES_DATA } from '../../data/animals';
import { SentencePuzzleData } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, RotateCcw, Volume2, Sparkles, Undo2 } from 'lucide-react';

interface SentenceBuilderGameProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const SyllableSpellingGame: React.FC<SentenceBuilderGameProps> = ({
  onEarnStars,
  onBack
}) => {
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const currentPuzzle: SentencePuzzleData =
    SENTENCE_PUZZLES_DATA[puzzleIndex % SENTENCE_PUZZLES_DATA.length];

  const initRound = (idx = puzzleIndex) => {
    const puzzle = SENTENCE_PUZZLES_DATA[idx % SENTENCE_PUZZLES_DATA.length];
    setAssembledWords([]);
    setIsWrong(false);
    setShowCelebration(false);

    // Shuffle word tiles
    const shuffled = [...puzzle.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);

    setTimeout(() => {
      soundCtrl.speak(`Susunlah kata-kata acak menjadi kalimat yang benar tentang ${puzzle.animalEmoji}!`, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initRound(puzzleIndex);
  }, [puzzleIndex]);

  // Handle clicking a word tile to add to sentence
  const handleSelectWord = (word: string, indexInAvailable: number) => {
    soundCtrl.playPop(560);
    soundCtrl.speak(word.replace('.', ''), { rate: 0.85 });

    const nextAssembled = [...assembledWords, word];
    const nextAvailable = availableWords.filter((_, i) => i !== indexInAvailable);

    setAssembledWords(nextAssembled);
    setAvailableWords(nextAvailable);

    // If all words placed, verify sentence
    if (nextAvailable.length === 0) {
      const builtSentence = nextAssembled.join(' ');
      if (builtSentence === currentPuzzle.correctSentence) {
        soundCtrl.playCorrect();
        onEarnStars(2);
        setTimeout(() => {
          soundCtrl.speak(`Luar biasa! Kalimatmu benar: ${builtSentence}`, { rate: 0.85 });
          setShowCelebration(true);
        }, 600);
      } else {
        setIsWrong(true);
        soundCtrl.playTryAgain();
        soundCtrl.speak('Urutan katanya belum pas. Ayo coba susun kembali ya!', { rate: 0.85 });
        setTimeout(() => {
          setIsWrong(false);
          // Return words to available pool
          initRound(puzzleIndex);
        }, 1200);
      }
    }
  };

  // Undo last placed word
  const handleUndo = () => {
    if (assembledWords.length === 0) return;
    soundCtrl.playPop(440);
    const lastWord = assembledWords[assembledWords.length - 1];
    setAssembledWords((prev) => prev.slice(0, -1));
    setAvailableWords((prev) => [...prev, lastWord]);
  };

  const handleNext = () => {
    setPuzzleIndex((prev) => prev + 1);
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
            onClick={() => {
              soundCtrl.playPop();
              soundCtrl.speak(currentPuzzle.hint);
            }}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span>Petunjuk: {currentPuzzle.hint}</span>
          </button>

          <button
            onClick={() => initRound(puzzleIndex)}
            className="p-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer shadow-xs"
            title="Ulangi Susunan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-emerald-200 text-center">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Teka-Teki Susun Kalimat Satwa #{puzzleIndex + 1}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Susun Kata Menjadi Kalimat Utuh
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Sentuh kata-kata di bawah sesuai urutan kalimat yang tepat!
          </p>
        </div>

        {/* Mascot Avatar */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-6xl shadow-xs my-3 animate-soft-bounce">
          {currentPuzzle.animalEmoji}
        </div>

        {/* Sentence Assembly Strip */}
        <div
          className={`my-6 min-h-[90px] p-4 sm:p-5 rounded-3xl border-2 border-dashed flex flex-wrap items-center justify-center gap-2.5 transition-all ${
            isWrong
              ? 'bg-rose-50 border-rose-400 ring-4 ring-rose-200'
              : assembledWords.length === currentPuzzle.words.length
              ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-200'
              : 'bg-slate-50 border-emerald-300'
          }`}
        >
          {assembledWords.length === 0 ? (
            <span className="text-slate-400 text-sm font-semibold italic">
              Kalimatmu akan muncul di sini saat kamu mengetuk kata-kata di bawah...
            </span>
          ) : (
            assembledWords.map((w, idx) => (
              <span
                key={idx}
                className="py-2.5 px-4 rounded-2xl bg-white border-2 border-emerald-400 text-slate-900 font-extrabold text-lg sm:text-xl font-display shadow-xs animate-bounce"
                style={{ animationDuration: '0.4s' }}
              >
                {w}
              </span>
            ))
          )}
        </div>

        {/* Undo Action if words exist */}
        {assembledWords.length > 0 && availableWords.length > 0 && (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleUndo}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Batal Kata Terakhir</span>
            </button>
          </div>
        )}

        {/* Available Word Tiles */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
            Pilihan Kata yang Tersedia:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-xl mx-auto">
            {availableWords.map((word, i) => (
              <button
                key={`${word}-${i}`}
                onClick={() => handleSelectWord(word, i)}
                className="py-3 px-5 sm:py-3.5 sm:px-6 rounded-2xl bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-800 font-extrabold text-lg sm:text-xl font-display shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title="Luar Biasa! Kalimatmu Terbaca Sempurna!"
        message={`Kamu berhasil menyusun kalimat: "${currentPuzzle.correctSentence}"`}
        starsEarned={2}
        onNext={handleNext}
        onReplay={() => initRound(puzzleIndex)}
        nextButtonLabel="Susun Kalimat Berikutnya"
      />
    </div>
  );
};
