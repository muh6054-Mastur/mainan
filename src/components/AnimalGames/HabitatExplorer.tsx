import React, { useState } from 'react';
import { ANIMALS_DATA } from '../../data/animals';
import { Animal, AnimalHabitat } from '../../types';
import { soundCtrl } from '../../utils/audio';
import { CelebrationModal } from '../UI/CelebrationModal';
import { ArrowLeft, Volume2, Sparkles, Check } from 'lucide-react';

interface HabitatExplorerProps {
  onEarnStars: (amount: number) => void;
  onBack: () => void;
}

export const HabitatExplorer: React.FC<HabitatExplorerProps> = ({ onEarnStars, onBack }) => {
  const [currentHabitat, setCurrentHabitat] = useState<AnimalHabitat>('peternakan');
  const [foundAnimalIds, setFoundAnimalIds] = useState<Set<string>>(new Set());
  const [activeAnimal, setActiveAnimal] = useState<Animal | null>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const habitatConfigs: {
    id: AnimalHabitat;
    title: string;
    description: string;
    bgGradient: string;
    badgeIcon: string;
    accentColor: string;
  }[] = [
    {
      id: 'peternakan',
      title: 'Peternakan Hijau',
      description: 'Halaman asri tempat sapi, bebek, dan ayam bermain bersama!',
      bgGradient: 'from-amber-100 via-emerald-50 to-emerald-100',
      badgeIcon: '🏡',
      accentColor: 'border-emerald-300'
    },
    {
      id: 'hutan',
      title: 'Hutan Tropis',
      description: 'Kanopi pepohonan tinggi tempat gajah dan monyet berayun riang!',
      bgGradient: 'from-emerald-100 via-teal-50 to-green-100',
      badgeIcon: '🌲',
      accentColor: 'border-green-300'
    },
    {
      id: 'laut',
      title: 'Samudra Biru',
      description: 'Air laut jernih tempat lumba-lumba, paus, dan penyu menyelam!',
      bgGradient: 'from-sky-100 via-cyan-50 to-blue-100',
      badgeIcon: '🌊',
      accentColor: 'border-sky-300'
    },
    {
      id: 'padang',
      title: 'Padang Sabana',
      description: 'Padang rumput luas tempat singa, jerapah, dan zebra berkejaran!',
      bgGradient: 'from-amber-100 via-orange-50 to-yellow-100',
      badgeIcon: '🌾',
      accentColor: 'border-amber-300'
    },
    {
      id: 'taman',
      title: 'Taman Bunga Ceria',
      description: 'Taman harum tempat kelinci, kupu-kupu, dan burung bernyanyi!',
      bgGradient: 'from-pink-100 via-rose-50 to-amber-100',
      badgeIcon: '🌸',
      accentColor: 'border-pink-300'
    }
  ];

  const currentConfig = habitatConfigs.find((h) => h.id === currentHabitat)!;
  const habitatAnimals = ANIMALS_DATA.filter((a) => a.habitat === currentHabitat);

  const handleSelectAnimal = (animal: Animal) => {
    soundCtrl.playPop(600);
    setActiveAnimal(animal);

    // Mark as found
    const nextFound = new Set(foundAnimalIds);
    const isNew = !nextFound.has(animal.id);
    if (isNew) {
      nextFound.add(animal.id);
      setFoundAnimalIds(nextFound);
    }

    // Play sound and speak
    soundCtrl.playAnimalSoundEffect(animal.id);
    setTimeout(() => {
      soundCtrl.speak(`${animal.name}! ${animal.funFact}`, { rate: 0.85 });
    }, 450);

    // Check if all in this habitat are found
    const allFoundInHabitat = habitatAnimals.every((a) => nextFound.has(a.id));
    if (allFoundInHabitat && isNew) {
      onEarnStars(2);
      setTimeout(() => {
        setShowCelebration(true);
      }, 1200);
    }
  };

  const handleSwitchHabitat = (h: AnimalHabitat) => {
    soundCtrl.playPop(520);
    setCurrentHabitat(h);
    setActiveAnimal(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6">
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
          <span>Pilih Game Lain</span>
        </button>

        <div className="text-xs sm:text-sm font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Ditemukan: {foundAnimalIds.size} Satwa</span>
        </div>
      </div>

      {/* Habitat Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {habitatConfigs.map((hab) => {
          const isActive = currentHabitat === hab.id;
          return (
            <button
              key={hab.id}
              onClick={() => handleSwitchHabitat(hab.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer transition-all ${
                isActive
                  ? 'bg-amber-500 text-white shadow-sm scale-105'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
              }`}
            >
              <span>{hab.badgeIcon}</span>
              <span>{hab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Exploration Canvas */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-amber-200 text-center">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
            Jelajah Habitat {currentConfig.title}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display mt-2">
            Temukan Hewan yang Sedang Bersembunyi!
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            {currentConfig.description}
          </p>
        </div>

        {/* Scenic Landscape Canvas */}
        <div
          className={`my-6 min-h-64 sm:min-h-80 rounded-3xl border-2 border-dashed ${currentConfig.accentColor} bg-gradient-to-b ${currentConfig.bgGradient} p-6 flex flex-wrap items-center justify-around gap-6 relative overflow-hidden`}
        >
          {habitatAnimals.map((animal) => {
            const isFound = foundAnimalIds.has(animal.id);
            const isCurrentActive = activeAnimal?.id === animal.id;

            return (
              <button
                key={animal.id}
                onClick={() => handleSelectAnimal(animal)}
                className={`flex flex-col items-center group cursor-pointer transition-all transform duration-300 ${
                  isCurrentActive ? 'scale-115' : 'hover:scale-105 active:scale-95 animate-soft-bounce'
                }`}
              >
                {/* Animal Avatar */}
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center text-5xl sm:text-6xl shadow-md transition-all ${
                    isCurrentActive
                      ? 'bg-white ring-4 ring-amber-400 shadow-xl'
                      : isFound
                      ? 'bg-white/95 border-2 border-emerald-400'
                      : 'bg-white/80 border-2 border-dashed border-amber-300'
                  }`}
                >
                  {animal.emoji}
                </div>

                {/* Name Label */}
                <div className="mt-2 bg-white/90 px-3 py-1 rounded-xl shadow-2xs border border-slate-200">
                  <span className="text-sm sm:text-base font-extrabold text-slate-800 font-display block">
                    {animal.name}
                  </span>
                  {isFound && (
                    <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-600">
                      <Check className="w-3 h-3" />
                      <span>Ditemukan</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Animal Detailed Card if selected */}
        {activeAnimal && (
          <div className="p-4 sm:p-5 bg-amber-50/80 rounded-2xl border border-amber-200 max-w-xl mx-auto text-left animate-fadeIn">
            <div className="flex items-start gap-4">
              <span className="text-4xl p-2 bg-white rounded-2xl shadow-xs">
                {activeAnimal.emoji}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-slate-900 font-display">
                    {activeAnimal.name} ({activeAnimal.nameEn})
                  </h3>
                  <button
                    onClick={() => {
                      soundCtrl.playAnimalSoundEffect(activeAnimal.id);
                      soundCtrl.speak(activeAnimal.name);
                    }}
                    className="p-1.5 rounded-full bg-amber-500 text-white hover:bg-amber-600 cursor-pointer"
                    title="Dengarkan Suara"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 font-display mt-2 p-2.5 bg-white/90 rounded-xl border border-amber-200">
                  📖 "{activeAnimal.readingSentence}"
                </p>
                <div className="mt-2 text-xs font-bold text-amber-900 flex flex-wrap items-center gap-2">
                  <span>Makanan: <strong>{activeAnimal.foodType}</strong></span>
                  <span>·</span>
                  <span>Suara: <em>"{activeAnimal.soundText}"</em></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title="Luar Biasa! Semua Satwa Ditemukan!"
        message={`Kamu telah menjelajahi ${currentConfig.title} dan menemukan semua sahabat satwanya!`}
        starsEarned={2}
        onNext={() => {
          setShowCelebration(false);
          // switch to next habitat
          const nextIdx = (habitatConfigs.findIndex((h) => h.id === currentHabitat) + 1) % habitatConfigs.length;
          setCurrentHabitat(habitatConfigs[nextIdx].id);
        }}
        onReplay={() => setShowCelebration(false)}
        nextButtonLabel="Jelajah Habitat Lain"
      />
    </div>
  );
};
