import React, { useState } from 'react';
import { soundCtrl } from '../utils/audio';
import { CheckCircle2, RotateCcw, Volume2, ShieldCheck, Heart, BookOpen } from 'lucide-react';

interface ParentDashboardProps {
  stars: number;
  onResetProgress: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  stars,
  onResetProgress,
  soundEnabled,
  onToggleSound
}) => {
  const [speechRate, setSpeechRate] = useState<number>(soundCtrl.getVoiceRate());
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const handleRateChange = (newRate: number) => {
    setSpeechRate(newRate);
    soundCtrl.setVoiceRate(newRate);
  };

  const testVoice = () => {
    soundCtrl.speak('Halo bapak dan ibu guru serta orang tua! Aplikasi ini disesuaikan untuk siswa kelas satu sekolah dasar.', {
      rate: speechRate
    });
  };

  const handleReset = () => {
    onResetProgress();
    setShowResetConfirm(false);
    soundCtrl.playPop(400);
  };

  const milestones = [
    {
      title: 'Literasi: Membaca Kalimat Deskriptif Satwa',
      desc: 'Membaca kalimat deskriptif dengan intonasi tepat, memahami kosakata ciri tubuh, dan menjawab teka-teki satwa.',
      level: 'Pemula 🟢',
      status: 'Fase A Kelas 1'
    },
    {
      title: 'Literasi: Merangkai Struktur Kata Runtut (SPOK)',
      desc: 'Merangkai kepingan kata acak menjadi kalimat utuh yang bermakna dari 3 hingga 8 kata terstruktur.',
      level: 'Pemula 🟢 & Menengah 🟡',
      status: 'Fase A Kelas 1'
    },
    {
      title: 'Literasi: Cerita Fabel Bergambar & Pemahaman Teks (5W1H)',
      desc: 'Membaca fabel pendek sarat nilai budi pekerti, menjawab pertanyaan pemahaman isi cerita, dan menyimpulkan pesan moral.',
      level: 'Menengah 🟡 & Mahir 🔴',
      status: 'Fase A Kelas 1'
    },
    {
      title: 'Sains Fauna: Klasifikasi Makanan, Perkembangbiakan & Napas',
      desc: 'Mengelompokkan satwa berdasarkan jenis makanannya (herbivora, karnivora, omnivora), cara berkembang biak (ovipar, vivipar), dan alat pernapasan.',
      level: 'Mahir 🔴',
      status: 'Fase A IPAS'
    },
    {
      title: 'Numerasi: Nilai Tempat Puluhan & Satuan hingga 100',
      desc: 'Mengurai bilangan cacah hingga 100 ke dalam bentuk ikatan puluhan (10) dan balok satuan secara konkret visual.',
      level: 'Pemula 🟢 hingga Mahir 🔴',
      status: 'Fase A Kelas 1'
    },
    {
      title: 'Numerasi: Pola Bilangan Lompat Maju & Mundur',
      desc: 'Menemukan pola bilangan teratur (lompat 2, 3, 5, 10) serta membilang urut maju dan mundur hingga puluhan.',
      level: 'Menengah 🟡 & Mahir 🔴',
      status: 'Fase A Kelas 1'
    },
    {
      title: 'Pemecahan Masalah: Soal Cerita Matematika Kontekstual',
      desc: 'Membaca soal cerita 1 langkah dan 2 langkah (operasi campuran beli-tambah-pakai) dengan penalaran logis bertahap.',
      level: 'Menengah 🟡 & Mahir 🔴',
      status: 'Fase A Kelas 1'
    },
    {
      title: 'Pengukuran: Membaca Jam Analog & Waktu Keseharian',
      desc: 'Membaca jarum pendek jam dan jarum panjang menit pada jam analog serta mencocokkannya dengan jam digital dan waktu aktivitas pagi/siang/malam.',
      level: 'Menengah 🟡 & Mahir 🔴',
      status: 'Fase A Kelas 1'
    },
    {
      title: 'Literasi Finansial: Mengenal Nilai Uang Rupiah & Kembalian',
      desc: 'Mengenal pecahan uang koin dan kertas rupiah (Rp 1.000 s.d. Rp 20.000) serta menghitung uang kembalian saat simulasi belanja.',
      level: 'Mahir 🔴',
      status: 'Fase A Kelas 1'
    },
    {
      title: 'Evaluasi Terpadu: Ujian Tantangan Juara 10 Soal',
      desc: 'Ujian komprehensif menguji pemahaman lintas topik matematika dan satwa secara mandiri dengan reward sertifikat digital kelulusan.',
      level: 'Ujian Akhir 🏆',
      status: 'Evaluasi Fase A'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100/90 px-3.5 py-1.5 rounded-full mb-2">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Panduan Pendidik, Guru Kelas 1 SD & Orang Tua</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          Capaian Pembelajaran Kelas 1 SD
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Disesuaikan dengan Capaian Pembelajaran (CP) Fase A Kurikulum Merdeka untuk membimbing siswa kelas 1 SD yang sedang lancar membaca kalimat.
        </p>
      </div>

      {/* Progress Metric Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl">
            ⭐
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">Bintang Prestasi</span>
            <span className="text-2xl font-extrabold text-slate-900 font-display tabular-nums">
              {stars} Bintang
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-emerald-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl">
            📖
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">Literasi & Sains</span>
            <span className="text-sm font-extrabold text-emerald-700 font-display">
              8 Modul (Fabel & Fauna)
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-sky-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl">
            🔢
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">Matematika SD</span>
            <span className="text-sm font-extrabold text-sky-800 font-display">
              8 Modul (Jam & Uang)
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-purple-200 shadow-2xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">
            🏆
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">Ujian Juara</span>
            <span className="text-sm font-extrabold text-purple-800 font-display">
              10 Soal + Sertifikat
            </span>
          </div>
        </div>
      </div>

      {/* Milestones Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-2xs mb-8">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-extrabold text-slate-900 font-display">
            Target Capaian Pembelajaran (Fase A Kelas 1 SD)
          </h2>
        </div>

        <div className="space-y-3.5">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <h3 className="text-base font-extrabold text-slate-800 font-display">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full">
                      {item.level}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      {item.status}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voice & Accessibility Settings */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-2xs mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Volume2 className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-extrabold text-slate-900 font-display">
            Pengaturan Kecepatan Pembacaan Kalimat
          </h2>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl">
            <div>
              <span className="text-sm font-bold text-slate-800 block">Efek Suara Permainan</span>
              <span className="text-xs text-slate-500">
                Bunyi nada responsif saat anak memilih jawaban
              </span>
            </div>
            <button
              onClick={onToggleSound}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                soundEnabled ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {soundEnabled ? 'Aktif' : 'Mati'}
            </button>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-800">
                Kecepatan Narasi Suara: <span className="text-amber-700 font-extrabold">{speechRate}x</span>
              </span>
              <button
                onClick={testVoice}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 underline cursor-pointer"
              >
                Uji Suara Contoh
              </button>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.15"
              step="0.05"
              value={speechRate}
              onChange={(e) => handleRateChange(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
              <span>Mengeja Lambat (0.7x)</span>
              <span>Lancar Kelas 1 (0.85x - 0.9x)</span>
              <span>Cepat (1.15x)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Tips for Grade 1 Parents & Teachers */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-7 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-rose-500" />
          <h2 className="text-lg font-extrabold text-amber-950 font-display">
            Tips Mendampingi Siswa Kelas 1 SD Belajar Membaca & Berhitung
          </h2>
        </div>
        <ul className="text-xs sm:text-sm text-slate-700 space-y-2.5 list-disc list-inside leading-relaxed font-medium">
          <li><strong>Ajak Anak Menunjuk Kata dengan Jari:</strong> Saat membaca kalimat pada kartu satwa atau soal cerita, biasakan anak menunjuk kata dari kiri ke kanan untuk melatih arah pandang membaca.</li>
          <li><strong>Gunakan Tombol Speaker Sebagai Konfirmasi:</strong> Biarkan anak membaca kalimatnya sendiri terlebih dahulu, lalu tekan tombol pengeras suara untuk memeriksa apakah lafal bacaannya sudah tepat.</li>
          <li><strong>Hubungkan Soal Cerita ke Benda Nyata:</strong> Ketika anak menyelesaikan soal cerita penjumlahan atau pengurangan, ajak mereka mempraktikkannya dengan pensil warna atau kelereng nyata di meja belajar.</li>
        </ul>
      </div>

      {/* Reset Progress Action */}
      <div className="text-center pt-2">
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Seluruh Bintang & Kemajuan Belajar</span>
          </button>
        ) : (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl max-w-md mx-auto animate-fadeIn">
            <p className="text-xs text-rose-800 font-bold mb-3">
              Apakah Anda yakin ingin mereset seluruh bintang anak?
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="py-1.5 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleReset}
                className="py-1.5 px-3 rounded-xl bg-rose-600 text-white text-xs font-bold cursor-pointer hover:bg-rose-700"
              >
                Ya, Reset Bintang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
