import React, { useState } from 'react';
import { AnimalGameMode, DifficultyLevel } from '../../types';
import { AnimalFlashcards } from './AnimalFlashcards';
import { ShadowPuzzleGame } from './ShadowPuzzleGame';
import { SyllableSpellingGame } from './SyllableSpellingGame';
import { AnimalSoundQuiz } from './AnimalSoundQuiz';
import { FableReadingGame } from './FableReadingGame';
import { ScienceClassificationGame } from './ScienceClassificationGame';
import { WordFillGame } from './WordFillGame';
import { HabitatExplorer } from './HabitatExplorer';
import { soundCtrl } from '../../utils/audio';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AnimalHubProps {
  onEarnStars: (amount: number) => void;
}

export const AnimalHub: React.FC<AnimalHubProps> = ({ onEarnStars }) => {
  const [activeMode, setActiveMode] = useState<AnimalGameMode | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');

  const gameModes: {
    id: AnimalGameMode;
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
      id: 'reading_cards',
      title: 'Kartu Baca & Fakta Satwa',
      subtitle: 'Membaca kalimat deskriptif tentang satwa, ciri tubuh, dan jenis makanannya!',
      icon: '📖',
      badge: 'Membaca Kalimat',
      difficultyTier: 'pemula',
      difficultyLabel: 'Tingkat Pemula - Menengah',
      bgGradient: 'from-emerald-400 to-teal-500',
      borderColor: 'border-emerald-300'
    },
    {
      id: 'sentence_builder',
      title: 'Susun Kalimat Satwa',
      subtitle: 'Rangkai kepingan kata acak menjadi kalimat utuh (tersedia tingkat pemula hingga mahir)!',
      icon: '🧩',
      badge: 'Struktur Kalimat',
      difficultyTier: 'menengah',
      difficultyLabel: 'Tingkat Pemula - Mahir',
      bgGradient: 'from-amber-400 to-orange-400',
      borderColor: 'border-amber-300'
    },
    {
      id: 'fable_reading',
      title: 'Membaca Cerita Fabel',
      subtitle: 'Membaca fabel penuh makna dan menjawab pertanyaan pemahaman bacaan 5W1H!',
      icon: '📜',
      badge: 'Pemahaman Mahir',
      difficultyTier: 'mahir',
      difficultyLabel: 'Tingkat Mahir',
      bgGradient: 'from-purple-500 to-indigo-600',
      borderColor: 'border-purple-300'
    },
    {
      id: 'science_classification',
      title: 'Klasifikasi Sains Satwa',
      subtitle: 'Mempelajari golongan mamalia, unggas, reptil, perkembangbiakan, dan organ pernapasan!',
      icon: '🔬',
      badge: 'Sains Biologi',
      difficultyTier: 'mahir',
      difficultyLabel: 'Tingkat Mahir',
      bgGradient: 'from-indigo-400 to-blue-600',
      borderColor: 'border-indigo-300'
    },
    {
      id: 'word_fill',
      title: 'Melengkapi Kalimat Rumpang',
      subtitle: 'Memilih kata yang tepat secara tata bahasa untuk mengisi bagian kalimat yang kosong!',
      icon: '✍️',
      badge: 'Kosakata Kontekstual',
      difficultyTier: 'menengah',
      difficultyLabel: 'Tingkat Menengah',
      bgGradient: 'from-teal-400 to-emerald-500',
      borderColor: 'border-teal-300'
    },
    {
      id: 'riddle_quiz',
      title: 'Teka-Teki Kalimat Ciri',
      subtitle: 'Bacalah kalimat teka-teki fabel, pahami petunjuknya, lalu tebak hewan yang tepat!',
      icon: '❓',
      badge: 'Daya Ingat & Nalar',
      difficultyTier: 'pemula',
      difficultyLabel: 'Tingkat Pemula - Menengah',
      bgGradient: 'from-rose-400 to-pink-500',
      borderColor: 'border-rose-300'
    },
    {
      id: 'shadow_anatomy',
      title: 'Puzzle Bayangan & Anatomi',
      subtitle: 'Pasangkan siluet satwa dan teliti bentuk ciri khas tubuhnya!',
      icon: '🐾',
      badge: 'Visual & Ciri Tubuh',
      difficultyTier: 'pemula',
      difficultyLabel: 'Tingkat Pemula',
      bgGradient: 'from-amber-400 to-yellow-500',
      borderColor: 'border-amber-300'
    },
    {
      id: 'habitat_stories',
      title: 'Jelajah Habitat & Ekosistem',
      subtitle: 'Eksplorasi cerita lingkungan peternakan, hutan tropis, samudra, dan sabana!',
      icon: '🌍',
      badge: 'Eksplorasi Lingkungan',
      difficultyTier: 'pemula',
      difficultyLabel: 'Tingkat Pemula - Menengah',
      bgGradient: 'from-sky-400 to-blue-500',
      borderColor: 'border-sky-300'
    }
  ];

  const handleSelectMode = (mode: AnimalGameMode) => {
    soundCtrl.playPop(560);
    setActiveMode(mode);
  };

  const filteredModes = gameModes.filter((m) => {
    if (selectedDifficulty === 'all') return true;
    return m.difficultyTier === selectedDifficulty;
  });

  if (activeMode === 'reading_cards') {
    return <AnimalFlashcards onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'sentence_builder') {
    return <SyllableSpellingGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'fable_reading') {
    return <FableReadingGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'science_classification') {
    return <ScienceClassificationGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'word_fill') {
    return <WordFillGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'riddle_quiz') {
    return <AnimalSoundQuiz onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'shadow_anatomy') {
    return <ShadowPuzzleGame onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }
  if (activeMode === 'habitat_stories') {
    return <HabitatExplorer onEarnStars={onEarnStars} onBack={() => setActiveMode(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Hero Intro */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-100 px-3.5 py-1.5 rounded-full mb-3 shadow-2xs">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Literasi & Sains Fauna · Pemula hingga Mahir</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
          Pusat Literasi Satwa & Membaca
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mt-2 font-medium">
          Tingkatkan kelancaran membaca kalimat, susun struktur kata, fahami cerita fabel, serta pelajari klasifikasi sains dunia fauna!
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

      {/* Grid of Animal Activities */}
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

              <h3 className="text-lg font-extrabold text-slate-900 font-display mb-1 group-hover:text-emerald-700 transition-colors leading-tight">
                {mode.title}
              </h3>
              <span className="text-[11px] font-bold text-emerald-800 block mb-2">
                {mode.difficultyLabel}
              </span>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {mode.subtitle}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>Mulai Belajar</span>
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
