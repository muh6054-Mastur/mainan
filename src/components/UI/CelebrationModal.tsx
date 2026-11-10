import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundCtrl } from '../../utils/audio';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { StickerItem } from '../../types';

interface CelebrationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  starsEarned?: number;
  unlockedSticker?: StickerItem | null;
  onNext: () => void;
  onReplay?: () => void;
  nextButtonLabel?: string;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  title = 'Hebat Sekali! Kamu Pintar!',
  message = 'Kamu berhasil menyelesaikan tantangan ini dengan sangat baik!',
  starsEarned = 1,
  unlockedSticker = null,
  onNext,
  onReplay,
  nextButtonLabel = 'Lanjut Tantangan Berikutnya'
}) => {
  useEffect(() => {
    if (isOpen) {
      soundCtrl.playFanfare();
      soundCtrl.speak('Luar biasa! Kamu pintar sekali!', { rate: 0.85 });

      // Fire confetti burst
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }

      const timer = setTimeout(() => {
        soundCtrl.playSparkle();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden transform transition-all animate-gentle-pulse">
        {/* Background decorative sparkle elements */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-100 rounded-full opacity-60 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-emerald-100 rounded-full opacity-60 pointer-events-none" />

        {/* Big Trophy / Celebration Avatar */}
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full flex items-center justify-center shadow-lg border-4 border-white text-5xl">
          🎉
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-display mb-2 leading-tight">
          {title}
        </h3>

        <p className="text-slate-600 text-sm sm:text-base font-medium mb-6">
          {message}
        </p>

        {/* Reward Stars Display */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-5 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: starsEarned }).map((_, i) => (
              <Sparkles
                key={i}
                className="w-7 h-7 text-amber-500 fill-amber-400 animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
          <span className="font-bold text-amber-900 text-base">
            +{starsEarned} Bintang Prestasi!
          </span>
        </div>

        {/* Unlocked sticker banner if any */}
        {unlockedSticker && (
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-200 rounded-2xl p-3 mb-5 flex items-center gap-3 text-left">
            <span className="text-3xl p-1 bg-white rounded-xl shadow-xs">
              {unlockedSticker.emoji}
            </span>
            <div>
              <span className="text-xs font-bold text-purple-700 block">STIKER BARU TERBUKA!</span>
              <span className="text-sm font-bold text-slate-800">{unlockedSticker.name}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {onReplay && (
            <button
              onClick={() => {
                soundCtrl.playPop();
                onReplay();
              }}
              className="flex-1 py-3 px-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Main Lagi</span>
            </button>
          )}

          <button
            onClick={() => {
              soundCtrl.playPop(620);
              onNext();
            }}
            className="flex-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-base sm:text-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <span>{nextButtonLabel}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
