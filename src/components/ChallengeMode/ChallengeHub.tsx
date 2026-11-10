import React, { useState } from 'react';
import { ChampionExamModal } from './ChampionExamModal';
import { soundCtrl } from '../../utils/audio';
import { Trophy, Award, Sparkles, CheckCircle2, Clock, BookOpen, Calculator, Play } from 'lucide-react';

interface ChallengeHubProps {
  onEarnStars: (amount: number) => void;
  stars: number;
}

export const ChallengeHub: React.FC<ChallengeHubProps> = ({ onEarnStars, stars }) => {
  const [isExamOpen, setIsExamOpen] = useState<boolean>(false);

  const startExam = () => {
    soundCtrl.playPop(620);
    setIsExamOpen(true);
  };

  const topicCoverages = [
    { title: 'Nilai Tempat Puluhan & Satuan', desc: 'Mengurai bilangan 1 - 100 dengan akurat', icon: '📦' },
    { title: 'Struktur Kalimat Bahasa Indonesia', desc: 'Menyusun kalimat runtut SPOK sederhana', icon: '✍️' },
    { title: 'Pola Bilangan Lompat Teratur', desc: 'Kelipatan lompat 2, 3, 5, dan 10', icon: '🚂' },
    { title: 'Soal Cerita Dua Langkah', desc: 'Pemecahan operasi campuran bertahap (+ dan -)', icon: '⚡' },
    { title: 'Membaca Jam Analog & Waktu', desc: 'Mengenal jarum jam dan jarum menit', icon: '⏰' },
    { title: 'Mata Uang Rupiah & Kembalian', desc: 'Menghitung belanja dan uang saku', icon: '💰' },
    { title: 'Pemahaman Bacaan Teks Fabel', desc: 'Memahami alur cerita dan pesan moral 5W1H', icon: '📜' },
    { title: 'Sains Biologi & Klasifikasi Fauna', desc: 'Herbivora, ovipar/vivipar, dan organ napas', icon: '🔬' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 p-6 sm:p-10 shadow-lg border-4 border-white overflow-hidden text-center sm:text-left mb-8">
        <div className="absolute -top-6 -right-6 text-7xl opacity-30 select-none pointer-events-none">
          🏆
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/95 text-amber-950 font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 shadow-xs">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Evaluasi Terpadu · Capaian Level Mahir</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-950 font-display tracking-tight leading-tight mb-3">
            Ujian Tantangan Juara Kelas 1 SD
          </h1>

          <p className="text-amber-950/90 text-base sm:text-lg font-medium leading-relaxed mb-6">
            Uji seluruh kemampuan berhitung, membaca kalimat, pemecahan soal cerita bertahap, dan sains fauna dalam <strong>10 soal tantangan komprehensif</strong> untuk meraih <strong>Sertifikat Kelulusan Juara</strong>!
          </p>

          <button
            onClick={startExam}
            className="py-3.5 px-8 rounded-2xl bg-white text-amber-950 hover:bg-amber-50 font-black text-base sm:text-lg shadow-md hover:shadow-xl active:scale-95 transition-all inline-flex items-center gap-2.5 cursor-pointer"
          >
            <Play className="w-5 h-5 text-amber-600 fill-amber-600" />
            <span>Mulai Ujian 10 Soal Juara</span>
          </button>
        </div>
      </div>

      {/* Topics Matrix Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
              Materi Pengujian Kompetensi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Soal dirancang sesuai standar Kurikulum Merdeka Fase A Sekolah Dasar
            </p>
          </div>
          <div className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl hidden sm:flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Hadiah: +5 Bintang & Sertifikat</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topicCoverages.map((topic, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl mb-2 block">{topic.icon}</span>
                <h3 className="text-sm font-extrabold text-slate-800 font-display mb-1">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {topic.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Diujikan</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal trigger */}
      {isExamOpen && (
        <ChampionExamModal
          onEarnStars={onEarnStars}
          onClose={() => setIsExamOpen(false)}
        />
      )}
    </div>
  );
};
