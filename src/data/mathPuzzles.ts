import {
  GeometricShapeGrade1,
  PlaceValueItem,
  StoryMathProblem,
  SymbolComparisonProblem,
  TwoStepMathProblem,
  ClockProblem,
  MoneyProblem,
  DifficultyLevel
} from '../types';

export const PLACE_VALUE_PROBLEMS: PlaceValueItem[] = [
  // --- PEMULA (11 - 15) ---
  {
    number: 14,
    tens: 1,
    ones: 4,
    itemName: 'Buku Cerita Satwa',
    itemEmoji: '📚',
    difficulty: 'pemula'
  },
  {
    number: 12,
    tens: 1,
    ones: 2,
    itemName: 'Ikan Mas Koki',
    itemEmoji: '🐟',
    difficulty: 'pemula'
  },
  {
    number: 15,
    tens: 1,
    ones: 5,
    itemName: 'Wortel Kebun',
    itemEmoji: '🥕',
    difficulty: 'pemula'
  },

  // --- MENENGAH (16 - 30) ---
  {
    number: 18,
    tens: 1,
    ones: 8,
    itemName: 'Bintang Emas Juara',
    itemEmoji: '⭐',
    difficulty: 'menengah'
  },
  {
    number: 24,
    tens: 2,
    ones: 4,
    itemName: 'Apel Merah Manis',
    itemEmoji: '🍎',
    difficulty: 'menengah'
  },
  {
    number: 30,
    tens: 3,
    ones: 0,
    itemName: 'Balon Pesta Ceria',
    itemEmoji: '🎈',
    difficulty: 'menengah'
  },

  // --- MAHIR (35 - 100) ---
  {
    number: 47,
    tens: 4,
    ones: 7,
    itemName: 'Koin Emas Tabungan',
    itemEmoji: '🪙',
    difficulty: 'mahir'
  },
  {
    number: 65,
    tens: 6,
    ones: 5,
    itemName: 'Butir Kelereng Kristal',
    itemEmoji: '🔮',
    difficulty: 'mahir'
  },
  {
    number: 100,
    tens: 10,
    ones: 0,
    hundreds: 1,
    itemName: 'Lembar Kertas Gambar',
    itemEmoji: '📄',
    difficulty: 'mahir'
  }
];

export interface SequenceJumpProblem {
  id: string;
  type: 'lompat_2' | 'lompat_5' | 'lompat_3' | 'lompat_10' | 'maju' | 'mundur';
  title: string;
  sequence: (number | null)[];
  missingIndex: number;
  correctAnswer: number;
  options: number[];
  ruleSentence: string;
  difficulty: DifficultyLevel;
}

export const SEQUENCE_JUMP_PROBLEMS: SequenceJumpProblem[] = [
  // --- PEMULA (LOMPAT 2 & BILANGAN DASAR) ---
  {
    id: 'seq-1',
    type: 'lompat_2',
    title: 'Pola Lompat 2 Dasar',
    sequence: [2, 4, 6, null, 10],
    missingIndex: 3,
    correctAnswer: 8,
    options: [7, 8, 9],
    ruleSentence: 'Bilangan selalu bertambah dua: 2, 4, 6, lalu...',
    difficulty: 'pemula'
  },
  {
    id: 'seq-2',
    type: 'maju',
    title: 'Urutan Bilangan Belasan',
    sequence: [11, null, 13, 14, 15],
    missingIndex: 1,
    correctAnswer: 12,
    options: [10, 12, 16],
    ruleSentence: 'Bilangan berapakah yang berada di antara 11 dan 13?',
    difficulty: 'pemula'
  },

  // --- MENENGAH (LOMPAT 5 & HITUNG MUNDUR BELASAN) ---
  {
    id: 'seq-3',
    type: 'lompat_5',
    title: 'Pola Lompat 5',
    sequence: [5, 10, null, 20, 25],
    missingIndex: 2,
    correctAnswer: 15,
    options: [12, 15, 18],
    ruleSentence: 'Hitung maju lompat lima: lima, sepuluh, lalu...',
    difficulty: 'menengah'
  },
  {
    id: 'seq-4',
    type: 'mundur',
    title: 'Hitung Mundur Dari 20',
    sequence: [20, 19, null, 17, 16],
    missingIndex: 2,
    correctAnswer: 18,
    options: [18, 15, 14],
    ruleSentence: 'Satu angka sebelum sembilan belas saat berhitung mundur adalah...',
    difficulty: 'menengah'
  },

  // --- MAHIR (LOMPAT 3 & LOMPAT 10 HINGGA 50) ---
  {
    id: 'seq-5',
    type: 'lompat_3',
    title: 'Pola Lompat 3 (Mahir)',
    sequence: [3, 6, 9, null, 15],
    missingIndex: 3,
    correctAnswer: 12,
    options: [11, 12, 14],
    ruleSentence: 'Pola bilangan selalu bertambah tiga: 3, 6, 9, lalu...',
    difficulty: 'mahir'
  },
  {
    id: 'seq-6',
    type: 'lompat_10',
    title: 'Pola Puluhan Lompat 10 (Mahir)',
    sequence: [10, 20, 30, null, 50],
    missingIndex: 3,
    correctAnswer: 40,
    options: [35, 40, 45],
    ruleSentence: 'Membilang kelipatan sepuluh: 10, 20, 30, lalu...',
    difficulty: 'mahir'
  }
];

export const STORY_MATH_PROBLEMS: StoryMathProblem[] = [
  // --- PEMULA (BILANGAN 1 - 10) ---
  {
    id: 'story-1',
    difficulty: 'pemula',
    type: 'addition',
    storySentence1: 'Rani memetik 5 butir stroberi manis di kebun sekolah.',
    storySentence2: 'Ibu guru membagikan 3 butir stroberi lagi kepada Rani.',
    questionSentence: 'Berapa jumlah seluruh stroberi yang dimiliki Rani sekarang?',
    numA: 5,
    numB: 3,
    operator: '+',
    result: 8,
    options: [7, 8, 9],
    itemEmoji: '🍓',
    itemName: 'Stroberi'
  },
  {
    id: 'story-2',
    difficulty: 'pemula',
    type: 'subtraction',
    storySentence1: 'Pak Tani mengumpulkan 9 butir telur ayam di kandang.',
    storySentence2: 'Sebanyak 4 butir telur sudah digoreng untuk sarapan pagi.',
    questionSentence: 'Berapa butir sisa telur ayam yang masih tersimpan di keranjang?',
    numA: 9,
    numB: 4,
    operator: '-',
    result: 5,
    options: [4, 5, 6],
    itemEmoji: '🥚',
    itemName: 'Telur Ayam'
  },

  // --- MENENGAH (BILANGAN 10 - 20) ---
  {
    id: 'story-3',
    difficulty: 'menengah',
    type: 'addition',
    storySentence1: 'Di rak perpustakaan kelas 1 ada 9 buku dongeng fabel.',
    storySentence2: 'Pustakawan membawa 7 buku cerita satwa baru yang menarik.',
    questionSentence: 'Berapa total buku dongeng di rak perpustakaan sekarang?',
    numA: 9,
    numB: 7,
    operator: '+',
    result: 16,
    options: [15, 16, 17],
    itemEmoji: '📖',
    itemName: 'Buku Dongeng'
  },
  {
    id: 'story-4',
    difficulty: 'menengah',
    type: 'subtraction',
    storySentence1: 'Budi membawa 15 buah balon warna-warni saat pentas sekolah.',
    storySentence2: 'Sebanyak 6 buah balon terlepas dan terbang tinggi ke angkasa.',
    questionSentence: 'Berapa buah balon yang masih dipegang erat oleh Budi?',
    numA: 15,
    numB: 6,
    operator: '-',
    result: 9,
    options: [8, 9, 10],
    itemEmoji: '🎈',
    itemName: 'Balon'
  },

  // --- MAHIR (BILANGAN SAMPAI 25) ---
  {
    id: 'story-5',
    difficulty: 'mahir',
    type: 'addition',
    storySentence1: 'Kelompok A mengumpulkan 14 botol plastik untuk didaur ulang.',
    storySentence2: 'Kelompok B membawa 11 botol plastik tambahan.',
    questionSentence: 'Berapa jumlah seluruh botol plastik yang berhasil dikumpulkan kedua kelompok?',
    numA: 14,
    numB: 11,
    operator: '+',
    result: 25,
    options: [24, 25, 26],
    itemEmoji: '🍾',
    itemName: 'Botol Daur Ulang'
  },
  {
    id: 'story-6',
    difficulty: 'mahir',
    type: 'subtraction',
    storySentence1: 'Di dalam kolam taman ada 24 ekor ikan mas berenang riang.',
    storySentence2: 'Sebanyak 9 ekor ikan dipindahkan ke kolam budidaya baru.',
    questionSentence: 'Berapa ekor ikan mas yang masih tersisa di kolam taman?',
    numA: 24,
    numB: 9,
    operator: '-',
    result: 15,
    options: [14, 15, 16],
    itemEmoji: '🐟',
    itemName: 'Ikan Mas'
  }
];

export const TWO_STEP_MATH_PROBLEMS: TwoStepMathProblem[] = [
  {
    id: 'two-step-1',
    difficulty: 'mahir',
    storySentence1: 'Paman memetik 12 buah mangga matang dari pohon di halaman.',
    storySentence2: 'Sebanyak 4 buah mangga dibagikan kepada tetangga sebelah.',
    storySentence3: 'Sore harinya, Bibi membawakan 5 buah mangga manis lagi.',
    questionSentence: 'Berapa buah mangga yang ada di meja Paman sekarang?',
    equationDisplay: '12 - 4 + 5 = ?',
    numA: 12,
    numB: 4,
    numC: 5,
    result: 13,
    options: [11, 13, 15],
    itemEmoji: '🥭',
    itemName: 'Buah Mangga'
  },
  {
    id: 'two-step-2',
    difficulty: 'mahir',
    storySentence1: 'Di dalam bus sekolah mulanya ada 10 siswa yang duduk rapi.',
    storySentence2: 'Di halte pertama naik 6 siswa baru yang hendak ke museum.',
    storySentence3: 'Di halte kedua turun 3 siswa yang sudah tiba di tujuannya.',
    questionSentence: 'Berapa banyak siswa yang berada di dalam bus sekolah sekarang?',
    equationDisplay: '10 + 6 - 3 = ?',
    numA: 10,
    numB: 6,
    numC: 3,
    result: 13,
    options: [12, 13, 14],
    itemEmoji: '🚌',
    itemName: 'Siswa di Bus'
  },
  {
    id: 'two-step-3',
    difficulty: 'mahir',
    storySentence1: 'Siti memiliki 15 stiker bintang juara di buku prestasinya.',
    storySentence2: 'Siti menempelkan 5 stiker untuk menghias kartu ulang tahun teman.',
    storySentence3: 'Ibu guru memberi hadiah 8 stiker bintang baru karena Siti rajin membaca.',
    questionSentence: 'Berapa jumlah stiker bintang yang dimiliki Siti sekarang?',
    equationDisplay: '15 - 5 + 8 = ?',
    numA: 15,
    numB: 5,
    numC: 8,
    result: 18,
    options: [17, 18, 19],
    itemEmoji: '⭐',
    itemName: 'Stiker Bintang'
  }
];

export const CLOCK_PROBLEMS: ClockProblem[] = [
  {
    id: 'clock-1',
    difficulty: 'pemula',
    hours: 7,
    minutes: 0,
    timeLabel: 'Pukul 07.00',
    timePeriod: 'Pagi Hari',
    activitySentence: 'Jarum pendek menunjuk angka 7, jarum panjang tepat di angka 12.',
    options: ['Pukul 07.00', 'Pukul 12.00', 'Pukul 06.00']
  },
  {
    id: 'clock-2',
    difficulty: 'menengah',
    hours: 9,
    minutes: 30,
    timeLabel: 'Pukul 09.30',
    timePeriod: 'Pagi Hari',
    activitySentence: 'Jarum pendek berada di antara angka 9 dan 10, jarum panjang di angka 6.',
    options: ['Pukul 09.30', 'Pukul 09.00', 'Pukul 10.30']
  },
  {
    id: 'clock-3',
    difficulty: 'menengah',
    hours: 12,
    minutes: 0,
    timeLabel: 'Pukul 12.00',
    timePeriod: 'Siang Hari',
    activitySentence: 'Kedua jarum jam (panjang dan pendek) sama-sama menunjuk angka 12.',
    options: ['Pukul 12.00', 'Pukul 06.00', 'Pukul 01.00']
  },
  {
    id: 'clock-4',
    difficulty: 'mahir',
    hours: 4,
    minutes: 15,
    timeLabel: 'Pukul 04.15',
    timePeriod: 'Sore Hari',
    activitySentence: 'Jarum pendek lewat sedikit dari angka 4, jarum panjang menunjuk angka 3 (15 menit).',
    options: ['Pukul 04.15', 'Pukul 03.20', 'Pukul 04.45']
  }
];

export const MONEY_PROBLEMS: MoneyProblem[] = [
  {
    id: 'money-1',
    difficulty: 'pemula',
    storySentence: 'Budi membeli sebatang pensil tulis seharga Rp1.000 menggunakan uang pas.',
    itemBought: 'Pensil Tulis 2B',
    itemPrice: 1000,
    moneyPaid: 1000,
    changeNeeded: 0,
    options: [0, 500, 1000],
    coinsEmoji: ['🪙 Rp1.000']
  },
  {
    id: 'money-2',
    difficulty: 'menengah',
    storySentence: 'Siti membeli penghapus seharga Rp1.500. Siti membayar dengan uang Rp2.000.',
    itemBought: 'Penghapus Lucu',
    itemPrice: 1500,
    moneyPaid: 2000,
    changeNeeded: 500,
    options: [500, 1000, 200],
    coinsEmoji: ['💵 Rp2.000']
  },
  {
    id: 'money-3',
    difficulty: 'mahir',
    storySentence: 'Doni membeli buku cerita seharga Rp3.000 dengan selembar uang Rp5.000. Berapa uang kembalian Doni?',
    itemBought: 'Buku Cerita Satwa',
    itemPrice: 3000,
    moneyPaid: 5000,
    changeNeeded: 2000,
    options: [1000, 2000, 3000],
    coinsEmoji: ['💵 Rp5.000']
  }
];

export const SYMBOL_COMPARISON_PROBLEMS: SymbolComparisonProblem[] = [
  {
    id: 'comp-1',
    difficulty: 'pemula',
    numLeft: 16,
    numRight: 12,
    correctSymbol: '>',
    sentenceExplanation: '16 lebih besar (lebih dari) 12.',
    itemEmoji: '🍎',
    contextSentence: 'Piring pertama berisi 16 apel, piring kedua berisi 12 apel.'
  },
  {
    id: 'comp-2',
    difficulty: 'pemula',
    numLeft: 14,
    numRight: 14,
    correctSymbol: '=',
    sentenceExplanation: '14 sama dengan 14.',
    itemEmoji: '🥕',
    contextSentence: 'Keranjang A berisi 14 wortel, keranjang B juga berisi 14 wortel.'
  },
  {
    id: 'comp-3',
    difficulty: 'menengah',
    numLeft: 18,
    numRight: 25,
    correctSymbol: '<',
    sentenceExplanation: '18 kurang dari (lebih kecil dari) 25.',
    itemEmoji: '🐟',
    contextSentence: 'Kolam biru berisi 18 ikan, kolam hijau berisi 25 ikan.'
  },
  {
    id: 'comp-4',
    difficulty: 'mahir',
    numLeft: 42,
    numRight: 39,
    correctSymbol: '>',
    sentenceExplanation: '42 lebih besar dari 39.',
    itemEmoji: '🪙',
    contextSentence: 'Tabungan kotak merah Rp42 koin, tabungan kotak kuning Rp39 koin.'
  }
];

export const GEOMETRIC_SHAPES_GRADE1: GeometricShapeGrade1[] = [
  {
    id: 'segitiga',
    nameIndo: 'Segitiga',
    nameEn: 'Triangle',
    sidesCount: 3,
    cornersCount: 3,
    color: '#F59E0B',
    clueSentence: 'Aku memiliki 3 sisi lurus dan 3 titik sudut lancip.',
    realExamples: 'Contoh: Penggaris segitiga, atap rumah, dan sepotong pizza.',
    svgShape: 'triangle'
  },
  {
    id: 'persegi',
    nameIndo: 'Persegi (Segi Empat)',
    nameEn: 'Square',
    sidesCount: 4,
    cornersCount: 4,
    color: '#10B981',
    clueSentence: 'Aku memiliki 4 sisi yang sama panjang dan 4 sudut siku-siku.',
    realExamples: 'Contoh: Papan catur, ubin lantai kelas, dan biskuit kotak.',
    svgShape: 'square'
  },
  {
    id: 'persegi_panjang',
    nameIndo: 'Persegi Panjang',
    nameEn: 'Rectangle',
    sidesCount: 4,
    cornersCount: 4,
    color: '#3B82F6',
    clueSentence: 'Aku memiliki 2 pasang sisi sejajar yang berhadapan sama panjang.',
    realExamples: 'Contoh: Papan tulis kelas, pintu ruang belajar, dan buku tulis.',
    svgShape: 'rectangle'
  },
  {
    id: 'lingkaran',
    nameIndo: 'Lingkaran',
    nameEn: 'Circle',
    sidesCount: 1,
    cornersCount: 0,
    color: '#8B5CF6',
    clueSentence: 'Aku memiliki 1 sisi lengkung melingkar dan tidak memiliki sudut.',
    realExamples: 'Contoh: Jam dinding sekolah, koin uang saku, dan roda sepeda.',
    svgShape: 'circle'
  }
];
