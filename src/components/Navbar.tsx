import React from 'react';
import { GameSection } from '../types';
import { soundCtrl } from '../utils/audio';
import { Volume2, VolumeX, Sparkles, Trophy } from 'lucide-react';

interface NavbarProps {
  currentSection: GameSection;
  onSelectSection: (section: GameSection) => void;
  stars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onSelectSection,
  stars,
  soundEnabled,
  onToggleSound
}) => {
  const navItems: { id: GameSection; label: string; icon: string }[] = [
    { id: 'home', label: 'Beranda', icon: '🏠' },
    { id: 'math', label: 'Matematika 1 SD', icon: '🔢' },
    { id: 'animals', label: 'Membaca Satwa', icon: '📖' },
    { id: 'challenge', label: 'Tantangan Juara', icon: '🏆' },
    { id: 'stickers', label: 'Album Stiker', icon: '🎨' },
    { id: 'parent', label: 'Panduan Guru & Ortu', icon: '📋' }
  ];

  const handleNav = (section: GameSection) => {
    soundCtrl.playPop(580);
    onSelectSection(section);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          title="Ke Halaman Utama"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
            🌟
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-amber-950 font-display whitespace-nowrap block leading-tight">
              Dunia Cilik
            </span>
            <span className="text-xs font-semibold text-amber-700/80 hidden sm:block leading-none">
              Belajar Kelas 1 SD
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (single-line, clean unboxed typography) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-slate-600">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-sm xl:text-base ${
                  isActive
                    ? 'text-amber-900 font-bold border-b-2 border-amber-500'
                    : 'text-slate-600 hover:text-amber-800'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Star Counter & Audio Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Star counter display */}
          <div
            className="flex items-center gap-1.5 bg-amber-100/80 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full font-bold text-sm sm:text-base tabular-nums shadow-xs"
            title={`Total Bintang yang Dikumpulkan: ${stars}`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{stars}</span>
            <span className="text-xs text-amber-700 font-medium hidden sm:inline">Bintang</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600 shadow-sm'
                : 'bg-slate-100 text-slate-400 border-slate-300 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            aria-label={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto py-2 px-3 gap-2 bg-amber-50/90 border-t border-amber-200/50 scrollbar-none">
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors ${
                isActive
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
