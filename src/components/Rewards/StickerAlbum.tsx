import React, { useState } from 'react';
import { REWARD_STICKERS } from '../../data/stickers';
import { StickerItem } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { Sparkles, Trash2, Lock, Palette } from 'lucide-react';

interface PlacedSticker {
  instanceId: string;
  sticker: StickerItem;
  x: number;
  y: number;
}

interface StickerAlbumProps {
  stars: number;
}

export const StickerAlbum: React.FC<StickerAlbumProps> = ({ stars }) => {
  const [backgroundTheme, setBackgroundTheme] = useState<'grass' | 'ocean' | 'sky' | 'farm'>('grass');
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [activeStickerToPlace, setActiveStickerToPlace] = useState<StickerItem | null>(null);

  const backgrounds = [
    {
      id: 'grass',
      name: 'Padang Rumput',
      bgClass: 'bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-200',
      icon: '🌱'
    },
    {
      id: 'ocean',
      name: 'Samudra Biru',
      bgClass: 'bg-gradient-to-b from-cyan-100 via-sky-200 to-blue-300',
      icon: '🌊'
    },
    {
      id: 'sky',
      name: 'Langit Pelangi',
      bgClass: 'bg-gradient-to-b from-purple-100 via-pink-100 to-amber-100',
      icon: '🌈'
    },
    {
      id: 'farm',
      name: 'Kebun Ceria',
      bgClass: 'bg-gradient-to-b from-amber-100 via-emerald-50 to-lime-100',
      icon: '🏡'
    }
  ];

  // Select a sticker from collection
  const handleSelectSticker = (sticker: StickerItem) => {
    if (stars < sticker.requiredStars) {
      soundCtrl.playPop(300);
      soundCtrl.speak(`Kumpulkan ${sticker.requiredStars} bintang untuk membuka stiker ${sticker.name}!`, { rate: 0.85 });
      return;
    }

    soundCtrl.playPop(580);
    setActiveStickerToPlace(sticker);
    soundCtrl.speak(`Sentuh papan pemandangan untuk menempelkan stiker ${sticker.name}!`, { rate: 0.85 });
  };

  // Click on the canvas to place active sticker
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeStickerToPlace) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(20, Math.min(rect.width - 60, e.clientX - rect.left - 24));
    const y = Math.max(20, Math.min(rect.height - 60, e.clientY - rect.top - 24));

    const newPlaced: PlacedSticker = {
      instanceId: `${activeStickerToPlace.id}-${Date.now()}`,
      sticker: activeStickerToPlace,
      x,
      y
    };

    soundCtrl.playSparkle();
    setPlacedStickers((prev) => [...prev, newPlaced]);
  };

  const handleClearCanvas = () => {
    soundCtrl.playPop(420);
    setPlacedStickers([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100/90 px-3.5 py-1.5 rounded-full mb-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Koleksi Prestasi & Arena Tempel Stiker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Album Stiker Bintang
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Kumpulkan bintang dari setiap game, buka stiker satwa imut, dan tempelkan di kanvas sesukamu!
        </p>
      </div>

      {/* Canvas Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-white p-3.5 rounded-2xl border border-amber-200 shadow-2xs">
        {/* Background Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">Pemandangan:</span>
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => {
                soundCtrl.playPop(520);
                setBackgroundTheme(bg.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                backgroundTheme === bg.id
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{bg.icon}</span>
              <span>{bg.name}</span>
            </button>
          ))}
        </div>

        {/* Clear Action */}
        <button
          onClick={handleClearCanvas}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-bold text-xs cursor-pointer transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Bersihkan Papan</span>
        </button>
      </div>

      {/* Main Interactive Scenic Canvas */}
      <div
        onClick={handleCanvasClick}
        className={`w-full min-h-[360px] sm:min-h-[440px] rounded-3xl border-4 border-white shadow-md relative overflow-hidden transition-all duration-300 cursor-crosshair select-none ${
          backgrounds.find((b) => b.id === backgroundTheme)?.bgClass
        }`}
      >
        {/* Sun and Clouds visual backdrop */}
        <div className="absolute top-4 right-8 text-5xl opacity-80 pointer-events-none animate-gentle-pulse">
          ☀️
        </div>
        <div className="absolute top-10 left-12 text-4xl opacity-60 pointer-events-none animate-soft-bounce">
          ☁️
        </div>
        <div className="absolute top-16 right-36 text-3xl opacity-50 pointer-events-none">
          ☁️
        </div>

        {/* Prompt overlay if empty */}
        {placedStickers.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
            <Palette className="w-12 h-12 text-slate-500/40 mb-2" />
            <p className="text-slate-600 font-bold text-base sm:text-lg">
              {activeStickerToPlace
                ? `Ketuk di mana saja di kanvas ini untuk menempel ${activeStickerToPlace.name}!`
                : 'Pilih stiker terbuka di bawah, lalu sentuh layar untuk menempelkannya!'}
            </p>
          </div>
        )}

        {/* Placed Stickers on Canvas */}
        {placedStickers.map((item) => (
          <div
            key={item.instanceId}
            style={{
              position: 'absolute',
              left: `${item.x}px`,
              top: `${item.y}px`
            }}
            className="cursor-move group transform hover:scale-115 active:scale-95 transition-transform"
            title={item.sticker.name}
          >
            <span className="text-5xl sm:text-6xl drop-shadow-md block animate-gentle-pulse">
              {item.sticker.emoji}
            </span>
          </div>
        ))}
      </div>

      {/* Stickers Showcase & Tray */}
      <div className="mt-6 bg-white p-6 rounded-3xl border-2 border-amber-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-display">
              Koleksi Stiker Prestasi
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Bintangmu: <strong className="text-amber-600 font-extrabold">{stars} Bintang</strong>
            </p>
          </div>
          {activeStickerToPlace && (
            <div className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span>Siap Ditempel: {activeStickerToPlace.emoji} {activeStickerToPlace.name}</span>
            </div>
          )}
        </div>

        {/* Sticker Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {REWARD_STICKERS.map((st) => {
            const isUnlocked = stars >= st.requiredStars;
            const isSelected = activeStickerToPlace?.id === st.id;

            return (
              <button
                key={st.id}
                onClick={() => handleSelectSticker(st)}
                className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer relative ${
                  !isUnlocked
                    ? 'bg-slate-50 border-2 border-dashed border-slate-200 opacity-60'
                    : isSelected
                    ? 'bg-amber-100 border-3 border-amber-500 shadow-md ring-2 ring-amber-200 scale-105'
                    : 'bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-xs active:scale-95'
                }`}
              >
                {/* Lock Badge */}
                {!isUnlocked && (
                  <div className="absolute top-2 right-2 text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                )}

                <span
                  className={`text-4xl sm:text-5xl my-1.5 ${
                    !isUnlocked ? 'filter grayscale opacity-40' : 'hover:scale-110 transition-transform'
                  }`}
                >
                  {st.emoji}
                </span>

                <span className="text-xs sm:text-sm font-extrabold text-slate-800 font-display line-clamp-1">
                  {st.name}
                </span>

                <span className="text-[11px] text-slate-500 mt-0.5">
                  {isUnlocked ? 'Siap Ditempel' : `Butuh ${st.requiredStars} ⭐`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
