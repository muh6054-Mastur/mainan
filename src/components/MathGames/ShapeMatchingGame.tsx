import React, { useState, useEffect } from 'react';
import { GEOMETRIC_SHAPES_GRADE1 } from '../../data/mathPuzzles';
import { GeometricShapeGrade1 } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, RotateCcw, Check, Sparkles, BookOpen } from 'lucide-react';

interface ShapeMatchingGameProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const ShapeMatchingGame: React.FC<ShapeMatchingGameProps> = ({ onEarnStars, onBack }) => {
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const [shuffledOptions, setShuffledOptions] = useState<GeometricShapeGrade1[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const targetShape = GEOMETRIC_SHAPES_GRADE1[targetIndex % GEOMETRIC_SHAPES_GRADE1.length];

  const initRound = (idx = targetIndex) => {
    setSelectedShapeId(null);
    setIsWrong(false);
    setShowCelebration(false);

    const curr = GEOMETRIC_SHAPES_GRADE1[idx % GEOMETRIC_SHAPES_GRADE1.length];
    const shuffled = [...GEOMETRIC_SHAPES_GRADE1].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);

    setTimeout(() => {
      soundCtrl.speak(`Teka-teki bangun datar: ${curr.clueSentence} Bangun apakah aku?`, { rate: 0.85 });
    }, 350);
  };

  useEffect(() => {
    initRound(targetIndex);
  }, [targetIndex]);

  const handleSelectShape = (shape: GeometricShapeGrade1) => {
    setSelectedShapeId(shape.id);

    if (shape.id === targetShape.id) {
      soundCtrl.playCorrect();
      setIsWrong(false);
      onEarnStars(1);

      setTimeout(() => {
        soundCtrl.speak(`Benar sekali! Bangun datar ini adalah ${shape.nameIndo}! Memiliki ${shape.sidesCount} sisi dan ${shape.cornersCount} sudut.`, { rate: 0.85 });
        setShowCelebration(true);
      }, 500);
    } else {
      setIsWrong(true);
      soundCtrl.playTryAgain();
      soundCtrl.speak(`Itu adalah ${shape.nameIndo}. Coba periksa jumlah sisi dan sudutnya sekali lagi ya!`, { rate: 0.85 });
      setTimeout(() => {
        setIsWrong(false);
        setSelectedShapeId(null);
      }, 1000);
    }
  };

  const handleNext = () => {
    setTargetIndex((prev) => prev + 1);
  };

  const renderShapeSvg = (svgType: string, color: string) => {
    switch (svgType) {
      case 'triangle':
        return (
          <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100">
            <polygon points="50,12 90,85 10,85" fill={color} stroke="#1E293B" strokeWidth="3" strokeLinejoin="round" />
          </svg>
        );
      case 'square':
        return (
          <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100">
            <rect x="12" y="12" width="76" height="76" rx="8" fill={color} stroke="#1E293B" strokeWidth="3" />
          </svg>
        );
      case 'rectangle':
        return (
          <svg className="w-20 h-14 sm:w-24 sm:h-16" viewBox="0 0 120 80">
            <rect x="10" y="12" width="100" height="56" rx="8" fill={color} stroke="#1E293B" strokeWidth="3" />
          </svg>
        );
      case 'circle':
        return (
          <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill={color} stroke="#1E293B" strokeWidth="3" />
          </svg>
        );
      default:
        return null;
    }
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
            onClick={() => {
              soundCtrl.playPop();
              soundCtrl.speak(`Teka-teki bangun datar: ${targetShape.clueSentence}`);
            }}
            className="flex items-center gap-1.5 py-2 px-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-purple-700" />
            <span>Bacakan Ciri Bangun</span>
          </button>

          <button
            onClick={() => initRound(targetIndex)}
            className="p-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-purple-200 text-center">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
            Teka-Teki Bangun Datar Kelas 1 SD
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Tebak Nama Bangun Datar
          </h2>
        </div>

        {/* Clue Reading Box */}
        <div className="my-6 p-6 sm:p-7 bg-purple-50/70 rounded-3xl border-2 border-purple-200 max-w-xl mx-auto text-left shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-purple-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Kalimat Petunjuk Ciri Bangun:</span>
          </div>

          <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed font-display mb-3">
            "{targetShape.clueSentence}"
          </p>

          <div className="pt-3 border-t border-purple-200 text-xs sm:text-sm font-semibold text-purple-900">
            💡 {targetShape.realExamples}
          </div>
        </div>

        {/* 4 Shape Options */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-4">
            Ketuk bangun datar yang sesuai dengan ciri-ciri di atas:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 max-w-2xl mx-auto">
            {shuffledOptions.map((shape) => {
              const isSelected = selectedShapeId === shape.id;
              const isCorrect = isSelected && shape.id === targetShape.id;
              const isThisWrong = isSelected && isWrong;

              return (
                <button
                  key={shape.id}
                  onClick={() => handleSelectShape(shape)}
                  disabled={selectedShapeId === targetShape.id}
                  className={`p-4 rounded-3xl flex flex-col items-center justify-between cursor-pointer shadow-sm transition-all active:scale-95 min-h-[160px] ${
                    isCorrect
                      ? 'bg-emerald-50 border-4 border-emerald-500 ring-4 ring-emerald-200'
                      : isThisWrong
                      ? 'bg-rose-50 border-4 border-rose-500 ring-4 ring-rose-200'
                      : 'bg-white border-2 border-slate-200 hover:border-purple-400 hover:shadow-md'
                  }`}
                >
                  <div className="my-2">{renderShapeSvg(shape.svgShape, shape.color)}</div>
                  <div className="text-center">
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 font-display block">
                      {shape.nameIndo}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {shape.sidesCount} Sisi · {shape.cornersCount} Sudut
                    </span>
                  </div>
                  {isCorrect && (
                    <div className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <Check className="w-3.5 h-3.5" />
                      <span>Benar!</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title="Tebakan Bangun Datar Benar!"
        message={`Hebat! ${targetShape.nameIndo} memiliki ${targetShape.sidesCount} sisi dan ${targetShape.cornersCount} sudut!`}
        starsEarned={1}
        onNext={handleNext}
        onReplay={() => initRound(targetIndex)}
        nextButtonLabel="Bangun Datar Berikutnya"
      />
    </div>
  );
};
