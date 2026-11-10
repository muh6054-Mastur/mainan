/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameSection } from './types';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { MathHub } from './components/MathGames/MathHub';
import { AnimalHub } from './components/AnimalGames/AnimalHub';
import { StickerAlbum } from './components/Rewards/StickerAlbum';
import { ChallengeHub } from './components/ChallengeMode/ChallengeHub';
import { ParentDashboard } from './components/ParentDashboard';
import { soundCtrl } from './utils/audio';

export default function App() {
  const [currentSection, setCurrentSection] = useState<GameSection>('home');
  const [stars, setStars] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Load saved stars and settings on mount
  useEffect(() => {
    const savedStars = localStorage.getItem('duniacilik_stars');
    if (savedStars !== null) {
      setStars(parseInt(savedStars, 10) || 0);
    }
    setSoundEnabled(soundCtrl.isSoundEnabled());
  }, []);

  const handleEarnStars = (amount: number) => {
    setStars((prev) => {
      const next = prev + amount;
      localStorage.setItem('duniacilik_stars', String(next));
      return next;
    });
  };

  const handleResetProgress = () => {
    setStars(0);
    localStorage.removeItem('duniacilik_stars');
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundCtrl.setSoundEnabled(next);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      {/* Top Navigation Bar */}
      <Navbar
        currentSection={currentSection}
        onSelectSection={setCurrentSection}
        stars={stars}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Game & Learning Viewport */}
      <main className="flex-1 pb-12">
        {currentSection === 'home' && (
          <HomeHero onNavigate={setCurrentSection} stars={stars} />
        )}

        {currentSection === 'math' && (
          <MathHub onEarnStars={handleEarnStars} />
        )}

        {currentSection === 'animals' && (
          <AnimalHub onEarnStars={handleEarnStars} />
        )}

        {currentSection === 'stickers' && (
          <StickerAlbum stars={stars} />
        )}

        {currentSection === 'challenge' && (
          <ChallengeHub onEarnStars={handleEarnStars} stars={stars} />
        )}

        {currentSection === 'parent' && (
          <ParentDashboard
            stars={stars}
            onResetProgress={handleResetProgress}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
          />
        )}
      </main>

      {/* Quiet Preschool Educational Footer */}
      <footer className="border-t border-amber-200/60 bg-white/70 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-black text-sm">🌟 Dunia Cilik</span>
            <span>·</span>
            <span>Game Edukasi Siswa Kelas 1 SD (Fase A)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setCurrentSection('parent')}
              className="hover:text-amber-800 transition-colors font-semibold cursor-pointer"
            >
              Panduan Guru & Ortu
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentSection('math')}
              className="hover:text-amber-800 transition-colors font-semibold cursor-pointer"
            >
              Matematika
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentSection('animals')}
              className="hover:text-amber-800 transition-colors font-semibold cursor-pointer"
            >
              Satwa
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
