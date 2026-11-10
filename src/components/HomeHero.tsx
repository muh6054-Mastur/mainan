import React from 'react';
import { GameSection } from '../types';
import { soundCtrl } from '../utils/audio';
import { Sparkles, ArrowRight, BookOpen, Calculator, Trophy, Award, CheckCircle2 } from 'lucide-react';

interface HomeHeroProps {
  onNavigate: (section: GameSection) => void;
  stars: number;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate, stars }) => {
  const handleGo = (section: GameSection) => {
    soundCtrl.playPop(580);
    onNavigate(section);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      {/* Grade 1 Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-amber-300 via-orange-300 to-amber-400 p-6 sm:p-10 shadow-lg border-4 border-white overflow-hidden text-center sm:text-left mb-8">
        <div className="absolute -top-6 -right-6 text-7xl opacity-40 select-none pointer-events-none animate-gentle-pulse">
          📚
        </div>
        <div className="absolute bottom-2 right-4 text-7xl opacity-30 select-none pointer-events-none">
          🌟
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/95 text-amber-950 font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Fase A Kelas 1 SD · Tingkat Pemula hingga Mahir</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-amber-950 font-display tracking-tight leading-tight mb-3">
            Pusat Belajar Pintar Kelas 1 SD
          </h1>

          <p className="text-amber-950/90 text-base sm:text-lg font-medium leading-relaxed mb-6">
            Kuasai kelancaran <strong>membaca kalimat & fabel</strong>, struktur kata, operasi matematika <strong>dua langkah</strong>, membaca jam, uang rupiah, dan ikuti <strong>Ujian Tantangan Juara</strong>!
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button
              onClick={() => handleGo('math')}
              className="py-3.5 px-6 rounded-2xl bg-white text-amber-950 hover:bg-amber-50 font-black text-base sm:text-lg shadow-md hover:shadow-xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-5 h-5 text-amber-600" />
              <span>Matematika (8 Modul)</span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </button>

            <button
              onClick={() => handleGo('animals')}
              className="py-3.5 px-6 rounded-2xl bg-amber-950 text-white hover:bg-amber-900 font-black text-base sm:text-lg shadow-md hover:shadow-xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-amber-300" />
              <span>Literasi Satwa (8 Modul)</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            <button
              onClick={() => handleGo('challenge')}
              className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-base sm:text-lg shadow-md hover:shadow-xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span>Ujian Tantangan Juara</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Main Portals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Math Portal */}
        <div
          onClick={() => handleGo('math')}
          className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                🔢
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                8 Modul Lengkap
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mb-2 group-hover:text-amber-600 transition-colors">
              Matematika Progresif
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4">
              Nilai tempat puluhan & satuan, pola lompat bilangan, soal cerita 2 langkah mahir, membaca jam dinding, uang rupiah, dan bangun datar!
            </p>

            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-amber-800/80 mb-6">
              <span>Nilai Tempat</span>
              <span>·</span>
              <span>Lompat Bilangan</span>
              <span>·</span>
              <span>Dua Langkah</span>
              <span>·</span>
              <span>Jam</span>
              <span>·</span>
              <span>Uang</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-bold text-xs sm:text-sm text-amber-700 group-hover:text-amber-800">
            <span>Buka Arena Matematika</span>
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Animals & Reading Portal */}
        <div
          onClick={() => handleGo('animals')}
          className="bg-white rounded-3xl p-6 border-2 border-emerald-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                📖
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                8 Modul Literasi
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mb-2 group-hover:text-emerald-700 transition-colors">
              Literasi Satwa & Fabel
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4">
              Membaca kalimat deskripsi, menyusun struktur kalimat runtut, teks fabel 5W1H, kalimat rumpang, dan sains biologi fauna!
            </p>

            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-emerald-800/80 mb-6">
              <span>Kartu Baca</span>
              <span>·</span>
              <span>Susun Kalimat</span>
              <span>·</span>
              <span>Cerita Fabel</span>
              <span>·</span>
              <span>Sains Fauna</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-bold text-xs sm:text-sm text-emerald-700 group-hover:text-emerald-800">
            <span>Buka Literasi Satwa</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Challenge Portal */}
        <div
          onClick={() => handleGo('challenge')}
          className="bg-white rounded-3xl p-6 border-2 border-purple-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                🏆
              </div>
              <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full">
                Evaluasi Terpadu
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mb-2 group-hover:text-purple-600 transition-colors">
              Ujian Tantangan Juara
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4">
              Evaluasi 10 soal acak menyeluruh dari level pemula sampai mahir. Dapatkan sertifikat kelulusan digital atas namamu!
            </p>

            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-purple-800/80 mb-6">
              <span>10 Soal Acak</span>
              <span>·</span>
              <span>Sertifikat Juara</span>
              <span>·</span>
              <span>Bonus +5 Bintang</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-bold text-xs sm:text-sm text-purple-700 group-hover:text-purple-800">
            <span>Mulai Ujian Juara</span>
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Strip */}
      <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-3xl shadow-sm">
            ⭐
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-amber-950 font-display">
              Bintang Prestasimu: {stars} Bintang
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Selesaikan modul matematika, cerita fabel, dan ujian juara untuk mengoleksi 12 stiker dan trofi emas di Album Stiker!
            </p>
          </div>
        </div>

        <button
          onClick={() => handleGo('stickers')}
          className="py-2.5 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-xs transition-all active:scale-95 shrink-0 cursor-pointer"
        >
          Buka Album Stiker & Kanvas
        </button>
      </div>
    </div>
  );
};
