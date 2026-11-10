import React, { useState } from 'react';
import { ANIMALS_DATA } from '../../data/animals';
import { Animal, AnimalHabitat } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface AnimalFlashcardsProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const AnimalFlashcards: React.FC<AnimalFlashcardsProps> = ({ onEarnStars, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedHabitat, setSelectedHabitat] = useState<AnimalHabitat | 'all'>('all');
  const [readSet, setReadSet] = useState<Set<string>>(new Set());
  const [showSyllables, setShowSyllables] = useState<boolean>(false);

  const filteredAnimals = ANIMALS_DATA.filter(
    (a) => selectedHabitat === 'all' || a.habitat === selectedHabitat
  );

  const safeIndex = currentIndex % (filteredAnimals.length || 1);
  const currentAnimal: Animal = filteredAnimals[safeIndex] || ANIMALS_DATA[0];

  const handleNext = () => {
    soundCtrl.playPop(520);
    setCurrentIndex((prev) => (prev + 1) % filteredAnimals.length);
    recordRead(currentAnimal.id);
  };

  const handlePrev = () => {
    soundCtrl.playPop(480);
    setCurrentIndex((prev) => (prev - 1 + filteredAnimals.length) % filteredAnimals.length);
  };

  const recordRead = (id: string) => {
    if (!readSet.has(id)) {
      const next = new Set(readSet);
      next.add(id);
      setReadSet(next);
      if (next.size % 3 === 0) {
        onEarnStars(1);
        soundCtrl.playSparkle();
      }
    }
  };

  // Read the full sentence for the child
  const readFullSentence = () => {
    soundCtrl.playPop();
    const fullText = `${currentAnimal.readingSentence} ${currentAnimal.secondSentence}`;
    soundCtrl.speak(fullText, { rate: 0.85 });
    recordRead(currentAnimal.id);
  };

  // Read animal name
  const readName = () => {
    soundCtrl.playPop(550);
    soundCtrl.speak(currentAnimal.name, { rate: 0.85 });
  };

  // Read sound effect
  const playSoundEffect = () => {
    soundCtrl.playAnimalSoundEffect(currentAnimal.id);
    setTimeout(() => {
      soundCtrl.speak(`Suara ${currentAnimal.name}: ${currentAnimal.soundText}`, { rate: 0.85 });
    }, 400);
  };

  const habitats: { id: AnimalHabitat | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'Semua Satwa', icon: '🐾' },
    { id: 'peternakan', label: 'Peternakan', icon: '🏡' },
    { id: 'hutan', label: 'Hutan Tropis', icon: '🌲' },
    { id: 'laut', label: 'Samudra Laut', icon: '🌊' },
    { id: 'padang', label: 'Padang Sabana', icon: '🌾' },
    { id: 'taman', label: 'Taman Bunga', icon: '🌸' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
      {/* Top Header */}
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

        <div className="text-xs sm:text-sm font-bold text-emerald-900 bg-emerald-100 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Kalimat Dibaca: {readSet.size} dari {ANIMALS_DATA.length} Satwa</span>
        </div>
      </div>

      {/* Habitat Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {habitats.map((h) => (
          <button
            key={h.id}
            onClick={() => {
              soundCtrl.playPop(540);
              setSelectedHabitat(h.id);
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer transition-all ${
              selectedHabitat === h.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
            }`}
          >
            <span>{h.icon}</span>
            <span>{h.label}</span>
          </button>
        ))}
      </div>

      {/* Main Reading Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-emerald-200 relative overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-emerald-50 active:scale-90 transition-all cursor-pointer z-10"
          title="Satwa Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:bg-emerald-50 active:scale-90 transition-all cursor-pointer z-10"
          title="Satwa Selanjutnya"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Card Header Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-semibold text-slate-500 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg">
              {currentAnimal.habitatLabel}
            </span>
            <span>·</span>
            <span>Bahasa Inggris: <strong>{currentAnimal.nameEn}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSyllables(!showSyllables)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
            >
              {showSyllables ? 'Sembunyikan Suku Kata' : 'Bantuan Suku Kata'}
            </button>
          </div>
        </div>

        {/* Animal Hero Header */}
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 mb-6">
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center text-6xl sm:text-7xl shadow-inner border-2 border-white shrink-0 animate-soft-bounce"
            style={{ backgroundColor: currentAnimal.bgColor }}
          >
            {currentAnimal.emoji}
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                {currentAnimal.name}
              </h2>
              <button
                onClick={readName}
                className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors cursor-pointer"
                title="Lafalkan Nama"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Syllable guide for early reading assistance */}
            {showSyllables && (
              <div className="flex items-center justify-center sm:justify-start gap-1.5 my-1.5">
                {currentAnimal.syllables.map((s, idx) => (
                  <span
                    key={idx}
                    className="bg-amber-100 border border-amber-300 text-amber-900 font-bold px-2.5 py-0.5 rounded-lg text-sm font-display"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
              Golongan: <span className="text-emerald-700">{currentAnimal.foodType}</span>
            </p>
          </div>
        </div>

        {/* Latihan Membaca Kalimat (Grade 1 SD Reading Stage) */}
        <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-5 sm:p-6 mb-6 text-left relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 font-display">
                Ayo Membaca Kalimat:
              </span>
            </div>

            <button
              onClick={readFullSentence}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-2xs active:scale-95 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Pembacaan</span>
            </button>
          </div>

          {/* Sentence 1 in large readable type */}
          <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed font-display mb-2">
            1. {currentAnimal.readingSentence}
          </p>

          {/* Sentence 2 */}
          <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed font-display">
            2. {currentAnimal.secondSentence}
          </p>
        </div>

        {/* Anatomy & Sound Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {/* Anatomy traits */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">
              Ciri Khusus Tubuh:
            </span>
            <ul className="space-y-1">
              {currentAnimal.bodyParts.map((part, i) => (
                <li key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{part}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sound card button */}
          <button
            onClick={playSoundEffect}
            className="p-4 rounded-2xl bg-amber-50 border border-amber-200 hover:bg-amber-100/70 transition-all text-left cursor-pointer flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block mb-1">
                Suara & Komunikasi:
              </span>
              <span className="text-base font-extrabold text-amber-950 block font-display">
                "{currentAnimal.soundText}"
              </span>
              <span className="text-xs text-slate-600 block mt-1">
                {currentAnimal.soundName}
              </span>
            </div>
            <div className="mt-2 text-[11px] font-bold text-amber-700 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Sentuh untuk mendengar suara hewan</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
