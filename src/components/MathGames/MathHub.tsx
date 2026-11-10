import React, { useState } from 'react';
import { MathGameMode, DifficultyLevel } from '../../types';
import { CountingGame } from './CountingGame';
import { SequencePuzzle } from './SequencePuzzle';
import { VisualMathGame } from './VisualMathGame';
import { TwoStepMathGame } from './TwoStepMathGame';
import { ClockTimeGame } from './ClockTimeGame';
import { MoneyMathGame } from './MoneyMathGame';
import { ShapeMatchingGame } from './ShapeMatchingGame';
import { ScaleCompareGame } from './ScaleCompareGame';
import { soundCtrl } from '../../utils/audio';
import { Sparkles, ArrowRight, Filter } from 'lucide-react';

interface MathHubProps {
  onEarnStars: (amount: number) => void;
}

export const MathHub: React.FC<MathHubProps> = ({ onEarnStars }) => {
  const [activeMode, setActiveMode] = useState<MathGameMode | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');

  const gameModes: {
    id: MathGameMode;
    title: string;
    subtitle: string;
    icon: string;
    badge: string;
    difficultyTier: DifficultyLevel;
    difficultyLabel: string;
    bgGradient: string;
    borderColor: string;
  }[] = [
    {
      id: 'place_value',
      title: 'Nilai Tempat Puluhan & Satuan',
      subtitle: 'Mengurai bilangan hingga puluhan dan satuan secara visual balok konkret!',
      icon: '📦',
      badge: 'Bilangan 1 - 100',
      difficultyTier: 'pemula',
      difficultyLabel: 'Tingkat Pemula - Mahir',
      bgGradient: 'from-amber-400 to-orange-400',
      borderColor: 'border-amber-300'
    },
    {
      id: 'sequence_jump',
      title: 'Kereta Lompat Bilangan',
      subtitle: 'Melengkapi urutan bilangan lompat 2, 5, 3, dan 10 serta hitung mundur!',
      icon: '🚂',
      badge: 'Pola Bilangan',
      difficultyTier: 'menengah',
      difficultyLabel: 'Tingkat Menengah',
      bgGradient: 'from-sky-400 to-blue-500',
      borderColor: 'border-sky-300'
    },
    {
      id: 'story_math',
      title: 'Soal Cerita Kalimat Matematika',
      subtitle: 'Membaca kalimat cerita kontekstual dan memecahkan penjumlahan serta pengurangan!',
      icon: '📖',
      badge: 'Satu Langkah',
      difficultyTier: 'pemula',
      difficultyLabel: 'Tingkat Pemula - Menengah',
      bgGradient: 'from-emerald-400 to-teal-500',
      borderColor: 'border-emerald-300'
    },
    {
      id: 'two_step_math',
      title: 'Soal Cerita Dua Langkah',
      subtitle: 'Operasi campuran bertahap (tambah dan kurang) untuk tantangan logika tingkat tinggi!',
      icon: '⚡',
      badge: 'Dua Langkah Mahir',
      difficultyTier: 'mahir',
      difficultyLabel: 'Tingkat Mahir',
      bgGradient: 'from-purple-500 to-indigo-600',
      borderColor: 'border-purple-300'
    },
    {
      id: 'clock_time',
      title: 'Membaca Jam Analog & Waktu',
      subtitle: 'Membaca jarum pendek jam dan jarum panjang menit pada jam dinding interaktif!',
      icon: '⏰',
      badge: 'Pengukuran Waktu',
      difficultyTier: 'menengah',
      difficultyLabel: 'Tingkat Menengah - Mahir',
      bgGradient: 'from-cyan-400 to-blue-500',
      borderColor: 'border-cyan-300'
    },
    {
      id: 'money_math',
      title: 'Nilai Uang Rupiah & Kembalian',
      subtitle: 'Mengenal koin dan uang kertas rupiah serta menghitung kembalian belanja sederhana!',
      icon: '💰',
      badge: 'Uang Saku Rupiah',
      difficultyTier: 'menengah',
      difficultyLabel: 'Tingkat Menengah - Mahir',
      bgGradient: 'from-amber-500 to-yellow-500',
      borderColor: 'border-amber-300'
    },
    {
      id: 'comparison_symbols',
      title: 'Timbangan Simbol Perbandingan',
      subtitle: 'Membandingkan dua bilangan menggunakan tanda matematika >, <, dan = !',
      icon: '⚖️',
      badge: 'Simbol Matematika',
      difficultyTier: 'pemula',
      difficultyLabel: 'Tingkat Pemula - Menengah',
      bgGradient: 'from-rose-400 to-orange-400',
      borderColor: 'border-rose-300'
    },
    {
      id: 'shapes_grade1',
      title: 'Teka-Teki Bangun Datar',
      subtitle: 'Meneliti jumlah sisi dan sudut bangun datar: segitiga, persegi, persegi panjang, lingkaran!',
      icon: '🔷',
      badge: 'Geometri Sisi & Sudut',
      difficultyTier: 'pemula',
      difficultyLabel: 'Tingkat Pemula',
      bgGradient: 'from-pink-400 to-rose-500',
      borderColor: 'border-pink-300'
    }
  ];

  const handleSelectMode = (mode: MathGameMode) => {
    soundCtrl.playPop(560);
    setActiveMode(mode);
  };

  const filteredModes = gameModes.filter((m) => {
    if (selectedDifficulty === 'all') return true;
    return m.difficultyTier === selectedDifficulty;
  });

  if (activeMode === 'place_value') {
    return <CountingGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'sequence_jump') {
    return <SequencePuzzle onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'story_math') {
    return <VisualMathGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'two_step_math') {
    return <TwoStepMathGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'clock_time') {
    return <ClockTimeGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'money_math') {
    return <MoneyMathGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'comparison_symbols') {
    return <ScaleCompareGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'shapes_grade1') {
    return <ShapeMatchingGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Hero Intro */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100/90 px-3.5 py-1.5 rounded-full mb-3 shadow-2xs">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Matematika Lengkap · Pemula hingga Mahir</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
          Pusat Pembelajaran Matematika
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mt-2 font-medium">
          Kuasai konsep bilangan, operasi hitung dua langkah, membaca jam, uang rupiah, pola bilangan, dan geometri secara terstruktur!
        </p>
      </div>

      {/* Difficulty Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              soundCtrl.playPop(520);
              setSelectedDifficulty('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedDifficulty === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Modul (8)
          </button>
          <button
            onClick={() => {
              soundCtrl.playPop(540);
              setSelectedDifficulty('pemula');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedDifficulty === 'pemula'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🟢 Pemula
          </button>
          <button
            onClick={() => {
              soundCtrl.playPop(560);
              setSelectedDifficulty('menengah');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedDifficulty === 'menengah'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🟡 Menengah
          </button>
          <button
            onClick={() => {
              soundCtrl.playPop(580);
              setSelectedDifficulty('mahir');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedDifficulty === 'mahir'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔴 Mahir (Juara)
          </button>
        </div>
      </div>

      {/* Grid of Math Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredModes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => handleSelectMode(mode.id)}
            className={`bg-white rounded-3xl p-5 border-2 ${mode.borderColor} shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${mode.bgGradient} flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform`}
                >
                  {mode.icon}
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  {mode.badge}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 font-display mb-1 group-hover:text-amber-600 transition-colors leading-tight">
                {mode.title}
              </h3>
              <span className="text-[11px] font-bold text-amber-700 block mb-2">
                {mode.difficultyLabel}
              </span>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {mode.subtitle}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-800">
              <span>Mulai Belajar</span>
              <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
