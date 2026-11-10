import React, { useState, useEffect } from 'react';
import { soundCtrl } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Trophy, Check, X, ArrowRight, RotateCcw, Award, Sparkles, Volume2, ShieldCheck, Printer } from 'lucide-react';

interface ExamQuestion {
  id: number;
  category: 'Matematika' | 'Membaca' | 'Sains Fauna' | 'Waktu & Uang';
  question: string;
  context?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    category: 'Matematika',
    question: 'Bilangan 28 terdiri dari...',
    options: [
      '2 Puluhan dan 8 Satuan',
      '8 Puluhan dan 2 Satuan',
      '20 Puluhan dan 8 Satuan',
      '2 Ratusan dan 8 Puluhan'
    ],
    correctAnswer: '2 Puluhan dan 8 Satuan',
    explanation: 'Angka 2 di depan bernilai puluhan (20) dan angka 8 di belakang bernilai satuan (8).'
  },
  {
    id: 2,
    category: 'Membaca',
    question: 'Susunan kalimat yang benar dan runtut adalah...',
    options: [
      'Kucing suka makan ikan segar.',
      'Suka ikan segar kucing makan.',
      'Ikan makan segar kucing suka.',
      'Segar kucing makan suka ikan.'
    ],
    correctAnswer: 'Kucing suka makan ikan segar.',
    explanation: 'Kalimat yang benar mengikuti urutan Subjek (Kucing) + Predikat (suka makan) + Objek (ikan segar).'
  },
  {
    id: '3' as any,
    category: 'Matematika',
    question: 'Lengkapi pola bilangan lompat tiga: 3, 6, 9, ... , 15. Angka yang hilang adalah?',
    options: ['10', '11', '12', '13'],
    correctAnswer: '12',
    explanation: 'Pola selalu bertambah tiga: 9 + 3 = 12.'
  },
  {
    id: 4,
    category: 'Sains Fauna',
    question: 'Berdasarkan jenis makanannya, sapi dan kelinci dikelompokkan sebagai...',
    options: [
      'Herbivora (Pemakan Tumbuhan & Rumput)',
      'Karnivora (Pemakan Daging)',
      'Omnivora (Pemakan Segala)',
      'Insektivora (Pemakan Serangga)'
    ],
    correctAnswer: 'Herbivora (Pemakan Tumbuhan & Rumput)',
    explanation: 'Sapi memakan rumput dan kelinci memakan wortel serta sayuran, sehingga keduanya adalah herbivora.'
  },
  {
    id: 5,
    category: 'Matematika',
    question: 'Manakah pernyataan perbandingan yang menggunakan simbol dengan tepat?',
    options: [
      '18 > 14',
      '12 > 16',
      '15 < 10',
      '20 = 12'
    ],
    correctAnswer: '18 > 14',
    explanation: 'Simbol > dibaca "lebih besar dari". Bilangan 18 lebih besar dari 14.'
  },
  {
    id: 6,
    category: 'Waktu & Uang',
    question: 'Jarum pendek menunjuk angka 7, jarum panjang tepat di angka 12. Jam berapakah itu?',
    options: [
      'Pukul 07.00',
      'Pukul 12.00',
      'Pukul 06.30',
      'Pukul 01.00'
    ],
    correctAnswer: 'Pukul 07.00',
    explanation: 'Ketika jarum panjang tepat di angka 12, waktu dibaca pas sesuai angka jarum pendek (07.00).'
  },
  {
    id: 7,
    category: 'Matematika',
    question: 'Doni punya 14 kelereng. Diberi Ayah 6 kelereng, lalu hilang 3 kelereng saat main. Berapa sisa kelereng Doni sekarang?',
    context: 'Hitung bertahap: 14 + 6 - 3 = ?',
    options: ['15', '16', '17', '18'],
    correctAnswer: '17',
    explanation: 'Langkah 1: 14 + 6 = 20. Langkah 2: 20 - 3 = 17 kelereng.'
  },
  {
    id: 8,
    category: 'Waktu & Uang',
    question: 'Rani membeli buku tulis seharga Rp3.000 dengan uang Rp5.000. Berapa uang kembalian yang diterima Rani?',
    options: [
      'Rp1.000',
      'Rp2.000',
      'Rp3.000',
      'Rp4.000'
    ],
    correctAnswer: 'Rp2.000',
    explanation: 'Rp5.000 dikurangi Rp3.000 sama dengan Rp2.000.'
  },
  {
    id: 9,
    category: 'Sains Fauna',
    question: 'Meskipun berenang di laut, lumba-lumba adalah hewan mamalia yang bernapas dengan...',
    options: [
      'Paru-paru melalui lubang napas di punggung',
      'Insang seperti ikan bandeng',
      'Kulit basah seperti cacing',
      'Selaput renang di sirip'
    ],
    correctAnswer: 'Paru-paru melalui lubang napas di punggung',
    explanation: 'Lumba-lumba adalah mamalia air yang melahirkan anak dan menghirup udara menggunakan paru-paru.'
  },
  {
    id: 10,
    category: 'Membaca',
    question: 'Bangun datar yang memiliki 3 sisi lurus dan 3 titik sudut lancip adalah...',
    options: [
      'Segitiga',
      'Persegi',
      'Persegi Panjang',
      'Lingkaran'
    ],
    correctAnswer: 'Segitiga',
    explanation: 'Segitiga dibentuk oleh 3 sisi dan memiliki 3 buah titik sudut.'
  }
];

interface ChampionExamModalProps {
  onEarnStars: (amount: number) => void;
  onClose: () => void;
}

export const ChampionExamModal: React.FC<ChampionExamModalProps> = ({ onEarnStars, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Bintang Juara');

  const currentQ = EXAM_QUESTIONS[currentIdx];

  useEffect(() => {
    soundCtrl.speak(`Ujian Tantangan Juara Soal nomor ${currentIdx + 1}. ${currentQ.question}`, { rate: 0.85 });
  }, [currentIdx]);

  const handleSelect = (opt: string) => {
    if (isAnswerChecked) return;
    soundCtrl.playPop(560);
    setSelectedOption(opt);
    setIsAnswerChecked(true);

    if (opt === currentQ.correctAnswer) {
      soundCtrl.playCorrect();
      setScore((prev) => prev + 10);
      soundCtrl.speak('Jawabanmu benar! Hebat sekali!', { rate: 0.85 });
    } else {
      soundCtrl.playTryAgain();
      soundCtrl.speak(`Kurang tepat. ${currentQ.explanation}`, { rate: 0.85 });
    }
  };

  const handleNext = () => {
    soundCtrl.playPop(520);
    if (currentIdx < EXAM_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      // Finished exam!
      setIsFinished(true);
      soundCtrl.playFanfare();
      onEarnStars(5); // bonus 5 stars for completing the champion exam!

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border-4 border-amber-300 relative text-left my-8">
        {!isFinished ? (
          <div>
            {/* Exam Header */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="font-extrabold text-slate-800 font-display text-base sm:text-lg">
                  Ujian Tantangan Juara Kelas 1 SD
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar & Score */}
            <div className="flex items-center justify-between mb-4 text-xs font-bold text-slate-500">
              <span>Soal #{currentIdx + 1} dari {EXAM_QUESTIONS.length}</span>
              <span className="text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Skor Akurasi: {score} Poin
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div
                style={{ width: `${((currentIdx + 1) / EXAM_QUESTIONS.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
              />
            </div>

            {/* Question Category & Text */}
            <div className="mb-6">
              <div className="inline-block text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg mb-2">
                Bidang: {currentQ.category}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display leading-relaxed">
                {currentQ.question}
              </h3>
              {currentQ.context && (
                <p className="text-sm font-semibold text-amber-900 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200 mt-2">
                  💡 {currentQ.context}
                </p>
              )}
            </div>

            {/* 4 Choices */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === currentQ.correctAnswer;

                let style = 'bg-white border-slate-200 hover:border-amber-400 text-slate-800';
                if (isAnswerChecked) {
                  if (isCorrect) {
                    style = 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    style = 'bg-rose-50 border-rose-400 text-rose-900';
                  } else {
                    style = 'bg-white border-slate-200 opacity-60 text-slate-500';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    disabled={isAnswerChecked}
                    className={`w-full p-4 rounded-2xl border-2 text-left text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-between ${style}`}
                  >
                    <span>{opt}</span>
                    {isAnswerChecked && isCorrect && (
                      <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Button */}
            {isAnswerChecked && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  💡 <strong>Penjelasan:</strong> {currentQ.explanation}
                </p>

                <button
                  onClick={handleNext}
                  className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 transition-all"
                >
                  <span>{currentIdx < EXAM_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Rapor'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Certificate & Results Screen */
          <div className="text-center py-2">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-white flex items-center justify-center text-4xl shadow-lg border-4 border-white mb-4 animate-bounce">
              🏆
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mb-1">
              Ujian Tantangan Juara Selesai!
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Selamat! Kamu telah menyelesaikan 10 soal evaluasi komprehensif tingkat mahir.
            </p>

            {/* Printable / Display Certificate Card */}
            <div className="p-6 bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl border-4 border-amber-300 shadow-md text-center max-w-lg mx-auto mb-6 relative overflow-hidden">
              <div className="absolute top-2 right-2 text-4xl opacity-20">⭐</div>
              <div className="absolute bottom-2 left-2 text-4xl opacity-20">📜</div>

              <span className="text-xs font-black tracking-widest uppercase text-amber-800 block mb-1">
                SERTIFIKAT KELULUSAN SISWA JUARA
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-display mb-3">
                FASE A KELAS 1 SEKOLAH DASAR
              </h3>

              <div className="my-3 py-2 px-4 bg-white/90 rounded-2xl border border-amber-200 inline-block">
                <span className="text-xs text-slate-400 block font-bold">Diberikan Kepada Siswa Berprestasi:</span>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="text-lg sm:text-xl font-black text-amber-900 font-display text-center focus:outline-none border-b border-amber-300 w-full"
                  title="Klik untuk mengubah nama siswa"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto my-3 text-xs sm:text-sm font-bold">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Nilai Akhir:</span>
                  <span className="text-xl font-black text-emerald-600 font-display">{score} / 100</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[11px]">Predikat:</span>
                  <span className="text-base font-extrabold text-amber-700 font-display">
                    {score >= 80 ? 'Sangat Mahir 🥇' : score >= 60 ? 'Mahir 🥈' : 'Terus Berlatih 🥉'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic mt-2">
                "Telah menguasai konsep nilai tempat, pola bilangan, soal cerita bertahap, membaca jam, uang rupiah, serta literasi kalimat fabel."
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="py-3 px-5 rounded-2xl border-2 border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm cursor-pointer active:scale-95 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Ujian</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md cursor-pointer active:scale-95 transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Hasil & Kembali</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
