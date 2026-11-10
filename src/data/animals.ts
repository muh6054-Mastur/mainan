import { Animal, SentencePuzzleData, FableStory, ScienceClassificationQuiz, WordFillProblem } from '../types';

export const ANIMALS_DATA: Animal[] = [
  {
    id: 'kucing',
    name: 'Kucing',
    nameEn: 'Cat',
    syllables: ['KU', 'CING'],
    readingSentence: 'Kucing adalah hewan peliharaan berbulu halus yang suka mengeong.',
    secondSentence: 'Kucing berjalan tanpa suara dan gemar makan ikan gurih.',
    foodType: 'Karnivora (Pemakan Daging & Ikan)',
    bodyParts: ['Kumis peraba peka', 'Cakar tajam dapat ditarik', 'Bulu lembut'],
    soundName: 'Mengeong',
    soundText: 'Meooww meooong!',
    habitat: 'peternakan',
    habitatLabel: 'Rumah & Peternakan',
    emoji: '🐱',
    themeColor: '#F59E0B',
    bgColor: '#FEF3C7',
    funFact: 'Kucing mendengkur lembut saat merasa senang, aman, dan disayang.',
    food: 'Ikan Segar & Daging',
    clue: 'Aku memiliki kumis peka dan cakar lentur, suaraku mengeong mencari ikan.',
    iconName: 'cat',
    animalClass: 'Mamalia',
    reproduction: 'Melahirkan (Vivipar)',
    breathingOrgan: 'Paru-paru'
  },
  {
    id: 'gajah',
    name: 'Gajah',
    nameEn: 'Elephant',
    syllables: ['GA', 'JAH'],
    readingSentence: 'Gajah adalah hewan darat terbesar yang memiliki belalai sangat panjang.',
    secondSentence: 'Belalai gajah digunakan untuk mengambil makanan dan menyemprotkan air mandi.',
    foodType: 'Herbivora (Pemakan Tumbuhan & Daun)',
    bodyParts: ['Belalai panjang serbaguna', 'Sepasang gading putih', 'Telinga lebar seperti kipas'],
    soundName: 'Meniup Terompet Belalai',
    soundText: 'Truuuumpheeeet!',
    habitat: 'hutan',
    habitatLabel: 'Hutan Tropis',
    emoji: '🐘',
    themeColor: '#6366F1',
    bgColor: '#EEF2FF',
    funFact: 'Gajah hidup rukun bersama kelompoknya dan saling menolong saat mencari sumber air.',
    food: 'Rumput Hijau, Ranting & Buah',
    clue: 'Badanku sangat besar, telingaku lebar seperti kipas, dan belalaiku sangat panjang.',
    iconName: 'elephant',
    animalClass: 'Mamalia',
    reproduction: 'Melahirkan (Vivipar)',
    breathingOrgan: 'Paru-paru'
  },
  {
    id: 'singa',
    name: 'Singa',
    nameEn: 'Lion',
    syllables: ['SI', 'NGA'],
    readingSentence: 'Singa jantan memiliki surai lebat di leher dan dijuluki raja rimba.',
    secondSentence: 'Singa mengaum keras untuk melindungi wilayah tempat tinggalnya.',
    foodType: 'Karnivora (Pemakan Daging)',
    bodyParts: ['Surai rambut lebat gagah', 'Taring kuat kokoh', 'Kaki berotot lincah'],
    soundName: 'Mengaum Keras',
    soundText: 'Roooaaarrrr! Auumm!',
    habitat: 'padang',
    habitatLabel: 'Padang Rumput Sabana',
    emoji: '🦁',
    themeColor: '#D97706',
    bgColor: '#FFFBEB',
    funFact: 'Auman suara singa sangat kuat hingga dapat terdengar dari jarak lima kilometer!',
    food: 'Daging Segar',
    clue: 'Aku dijuluki si raja rimba, suaraku mengaum dahsyat, dan suraiku sangat gagah.',
    iconName: 'lion',
    animalClass: 'Mamalia',
    reproduction: 'Melahirkan (Vivipar)',
    breathingOrgan: 'Paru-paru'
  },
  {
    id: 'jerapah',
    name: 'Jerapah',
    nameEn: 'Giraffe',
    syllables: ['JE', 'RA', 'PAH'],
    readingSentence: 'Jerapah memiliki leher terpanjang di dunia untuk memetik daun di pohon tinggi.',
    secondSentence: 'Tubuh jerapah dihiasi motif bercak cokelat yang indah dan unik.',
    foodType: 'Herbivora (Pemakan Daun & Tunas)',
    bodyParts: ['Leher sangat panjang', 'Kaki jenjang kuat', 'Lidah panjang kebiruan'],
    soundName: 'Mendengus Lembut',
    soundText: 'Huuuuummm!',
    habitat: 'padang',
    habitatLabel: 'Padang Rumput Sabana',
    emoji: '🦒',
    themeColor: '#EA580C',
    bgColor: '#FFEDD5',
    funFact: 'Lidah jerapah panjangnya sekitar lima puluh sentimeter sehingga mudah memetik pucuk daun akasia berduri.',
    food: 'Pucuk Daun Pohon Akasia',
    clue: 'Tubuhku tinggi menjulang dan leherku paling panjang di seluruh daratan bumi.',
    iconName: 'giraffe',
    animalClass: 'Mamalia',
    reproduction: 'Melahirkan (Vivipar)',
    breathingOrgan: 'Paru-paru'
  },
  {
    id: 'sapi',
    name: 'Sapi',
    nameEn: 'Cow',
    syllables: ['SA', 'PI'],
    readingSentence: 'Sapi adalah hewan ternak yang menghasilkan susu putih segar dan bergizi.',
    secondSentence: 'Sapi suka memakan rumput hijau di padang rumput yang luas.',
    foodType: 'Herbivora (Pemakan Rumput)',
    bodyParts: ['Tanduk pendek tumpul', 'Kantung susu', 'Empat kaki berkuku kokoh'],
    soundName: 'Melenguh Khas',
    soundText: 'Mooooo! Moooo!',
    habitat: 'peternakan',
    habitatLabel: 'Peternakan Hijau',
    emoji: '🐮',
    themeColor: '#10B981',
    bgColor: '#ECFDF5',
    funFact: 'Minum susu sapi setiap pagi membuat tulang dan gigi kita tumbuh kuat dan sehat.',
    food: 'Rumput Segar & Jerami',
    clue: 'Badanku bermotif belang hitam putih, menghasilkan susu bergizi untuk anak sekolah.',
    iconName: 'cow',
    animalClass: 'Mamalia',
    reproduction: 'Melahirkan (Vivipar)',
    breathingOrgan: 'Paru-paru'
  },
  {
    id: 'kelinci',
    name: 'Kelinci',
    nameEn: 'Rabbit',
    syllables: ['KE', 'LIN', 'CI'],
    readingSentence: 'Kelinci melompat gesit dengan dua kaki belakangnya yang sangat kuat.',
    secondSentence: 'Telinga kelinci yang tegak panjang membantunya mendengar suara dari kejauhan.',
    foodType: 'Herbivora (Pemakan Sayur & Umbi)',
    bodyParts: ['Telinga panjang tegak', 'Kaki belakang kuat pelompat', 'Gigi seri depan tajam'],
    soundName: 'Mendecit Ceria',
    soundText: 'Hop hop! Ckit ckit!',
    habitat: 'taman',
    habitatLabel: 'Taman Bunga & Kebun',
    emoji: '🐰',
    themeColor: '#EC4899',
    bgColor: '#FDF2F8',
    funFact: 'Gigi depan kelinci terus tumbuh, sehingga ia suka mengunyah sayur dan wortel renyah.',
    food: 'Wortel Manis & Daun Selada',
    clue: 'Telingaku panjang berdiri tegak, suka makan wortel oranye, dan melompat hop-hop.',
    iconName: 'rabbit',
    animalClass: 'Mamalia',
    reproduction: 'Melahirkan (Vivipar)',
    breathingOrgan: 'Paru-paru'
  },
  {
    id: 'bebek',
    name: 'Bebek',
    nameEn: 'Duck',
    syllables: ['BE', 'BEK'],
    readingSentence: 'Bebek pandai berenang di danau karena memiliki selaput renang di sela jarinya.',
    secondSentence: 'Bulu bebek dilapisi minyak alami sehingga tidak mudah basah saat berenang.',
    foodType: 'Omnivora (Pemakan Biji & Ikan Kecil)',
    bodyParts: ['Paruh pipih penyaring', 'Selaput kaki berenang', 'Bulu tahan air'],
    soundName: 'Kwek-kwek Bersahut',
    soundText: 'Kweeeek kweek kweek!',
    habitat: 'peternakan',
    habitatLabel: 'Danau Peternakan',
    emoji: '🦆',
    themeColor: '#059669',
    bgColor: '#E6FFFA',
    funFact: 'Anak bebek selalu berbaris rapi mengikuti induknya berjalan ke kolam renang.',
    food: 'Biji Padi, Cacing & Ikan Kecil',
    clue: 'Paruhku pipih berwarna kuning, suka berenang di kolam, dan bunyiku kwek-kwek.',
    iconName: 'duck',
    animalClass: 'Unggas (Burung)',
    reproduction: 'Bertelur (Ovipar)',
    breathingOrgan: 'Paru-paru'
  },
  {
    id: 'ayam',
    name: 'Ayam',
    nameEn: 'Rooster',
    syllables: ['A', 'YAM'],
    readingSentence: 'Ayam jantan berkokok nyaring di pagi hari menyapa matahari terbit.',
    secondSentence: 'Ayam betina bertelur dan mengerami telurnya hingga menetas menjadi anak ayam.',
    foodType: 'Omnivora (Pemakan Biji & Serangga)',
    bodyParts: ['Jengger merah di kepala', 'Taji kaki pelindung', 'Paruh runcing pematuk'],
    soundName: 'Berkokok Merdu',
    soundText: 'Kuku-ruyuuuk!',
    habitat: 'peternakan',
    habitatLabel: 'Halaman Peternakan',
    emoji: '🐔',
    themeColor: '#E11D48',
    bgColor: '#FFE4E6',
    funFact: 'Ayam memiliki penglihatan warna yang sangat tajam dan bangun lebih awal dari manusia.',
    food: 'Butir Jagung & Beras',
    clue: 'Jengger merah di atas kepalaku, suaraku kukuruyuk membangunkan orang di pagi hari.',
    iconName: 'chicken',
    animalClass: 'Unggas (Burung)',
    reproduction: 'Bertelur (Ovipar)',
    breathingOrgan: 'Paru-paru'
  },
  {
    id: 'lumba_lumba',
    name: 'Lumba-lumba',
    nameEn: 'Dolphin',
    syllables: ['LUM', 'BA', 'LUM', 'BA'],
    readingSentence: 'Lumba-lumba adalah hewan laut cerdas yang bernapas dengan paru-paru.',
    secondSentence: 'Lumba-lumba sering melompat ke atas permukaan ombak untuk menyapa kapal nelayan.',
    foodType: 'Karnivora (Pemakan Ikan Laut)',
    bodyParts: ['Lubang napas di punggung', 'Sirip dayung lincah', 'Moncong ramah'],
    soundName: 'Bersiul Nyaring',
    soundText: 'Klik klik siuul!',
    habitat: 'laut',
    habitatLabel: 'Samudra Biru',
    emoji: '🐬',
    themeColor: '#0284C7',
    bgColor: '#E0F2FE',
    funFact: 'Lumba-lumba berkomunikasi satu sama lain menggunakan suara siulan dan klik ultrasonik.',
    food: 'Ikan-ikan Laut Kecil',
    clue: 'Aku sahabat laut yang ramah dan pintar, bernapas dengan paru-paru di atas ombak.',
    iconName: 'dolphin',
    animalClass: 'Mamalia',
    reproduction: 'Melahirkan (Vivipar)',
    breathingOrgan: 'Paru-paru'
  },
  {
    id: 'paus',
    name: 'Paus Biru',
    nameEn: 'Blue Whale',
    syllables: ['PA', 'US'],
    readingSentence: 'Paus biru adalah hewan terbesar yang pernah hidup di planet bumi kita.',
    secondSentence: 'Paus menyemprotkan uap air tinggi dari lubang napas di atas punggungnya.',
    foodType: 'Karnivora Laut (Pemakan Udang Krill)',
    bodyParts: ['Ekor dayung raksasa', 'Pelat penyaring makanan', 'Lubang sembur napas'],
    soundName: 'Meniupkan Air',
    soundText: 'Wuuuush splaaash!',
    habitat: 'laut',
    habitatLabel: 'Samudra Luas',
    emoji: '🐳',
    themeColor: '#2563EB',
    bgColor: '#DBEAFE',
    funFact: 'Panjang tubuh seekor paus biru dewasa bisa menyamai panjang deretan tiga bus sekolah!',
    food: 'Kawanan Udang Krill & Plankton',
    clue: 'Badanku sebesar raksasa di lautan lepas, dan menyemburkan air dari punggungku.',
    iconName: 'whale',
    animalClass: 'Mamalia',
    reproduction: 'Melahirkan (Vivipar)',
    breathingOrgan: 'Paru-paru'
  },
  {
    id: 'kupu_kupu',
    name: 'Kupu-kupu',
    nameEn: 'Butterfly',
    syllables: ['KU', 'PU', 'KU', 'PU'],
    readingSentence: 'Kupu-kupu terbang anggun menghisap nektar manis dari kelopak bunga mekar.',
    secondSentence: 'Sayap kupu-kupu memiliki corak warna-warni yang membantu penyerbukan tanaman.',
    foodType: 'Herbivora (Penghisap Madu Bunga)',
    bodyParts: ['Sepasang sayap bercorak indah', 'Belalai hisap nektar', 'Antena peraba'],
    soundName: 'Mengepak Sayap',
    soundText: 'Flap-flap pelan!',
    habitat: 'taman',
    habitatLabel: 'Taman Bunga Asri',
    emoji: '🦋',
    themeColor: '#9333EA',
    bgColor: '#F3E8FF',
    funFact: 'Kupu-kupu mengalami metamorfosis: berawal dari ulat kecil, kepompong, hingga bersayap indah.',
    food: 'Madu Sari Nektar Bunga',
    clue: 'Sayapku beraneka warna menawan, terbang dari bunga ke bunga menghisap madu manis.',
    iconName: 'butterfly',
    animalClass: 'Serangga',
    reproduction: 'Bertelur (Ovipar)',
    breathingOrgan: 'Trakea'
  },
  {
    id: 'penyu',
    name: 'Penyu Laut',
    nameEn: 'Sea Turtle',
    syllables: ['PEN', 'YU'],
    readingSentence: 'Penyu memiliki tempurung keras yang melindungi tubuhnya saat mengarungi samudra.',
    secondSentence: 'Penyu betina akan berenang ke pantai berpasir pada malam hari untuk bertelur.',
    foodType: 'Omnivora Laut (Pemakan Rumput Laut & Ubur-ubur)',
    bodyParts: ['Tempurung keras pelindung', 'Kaki dayung depan panjang', 'Paruh pemotong'],
    soundName: 'Menyelam Tenang',
    soundText: 'Glebuk-glebuk!',
    habitat: 'laut',
    habitatLabel: 'Terumbu Karang',
    emoji: '🐢',
    themeColor: '#059669',
    bgColor: '#D1FAE5',
    funFact: 'Penyu laut dapat berenang ribuan kilometer melintasi benua dan kembali ke pantai asalnya.',
    food: 'Rumput Laut & Ubur-ubur',
    clue: 'Membawa rumah tempurung keras di punggung, berenang tenang menjelajah samudra.',
    iconName: 'turtle',
    animalClass: 'Reptil',
    reproduction: 'Bertelur (Ovipar)',
    breathingOrgan: 'Paru-paru'
  }
];

export const SENTENCE_PUZZLES_DATA: SentencePuzzleData[] = [
  // --- TINGKAT PEMULA (4 - 5 KATA) ---
  {
    id: 'sent-pemula-1',
    difficulty: 'pemula',
    correctSentence: 'Kucing suka makan ikan segar.',
    words: ['ikan', 'Kucing', 'segar.', 'makan', 'suka'],
    animalId: 'kucing',
    animalEmoji: '🐱',
    hint: 'Siapa yang suka makan apa?'
  },
  {
    id: 'sent-pemula-2',
    difficulty: 'pemula',
    correctSentence: 'Sapi menghasilkan susu putih sehat.',
    words: ['menghasilkan', 'putih', 'Sapi', 'sehat.', 'susu'],
    animalId: 'sapi',
    animalEmoji: '🐮',
    hint: 'Sapi menghasilkan minuman apa yang menyehatkan?'
  },
  {
    id: 'sent-pemula-3',
    difficulty: 'pemula',
    correctSentence: 'Kelinci melompat mencari wortel manis.',
    words: ['mencari', 'Kelinci', 'manis.', 'wortel', 'melompat'],
    animalId: 'kelinci',
    animalEmoji: '🐰',
    hint: 'Bagaimana kelinci bergerak dan apa yang dicarinya?'
  },

  // --- TINGKAT MENENGAH (5 - 6 KATA) ---
  {
    id: 'sent-menengah-1',
    difficulty: 'menengah',
    correctSentence: 'Gajah memiliki belalai yang sangat panjang.',
    words: ['belalai', 'yang', 'Gajah', 'sangat', 'memiliki', 'panjang.'],
    animalId: 'gajah',
    animalEmoji: '🐘',
    hint: 'Apa ciri khas belalai gajah?'
  },
  {
    id: 'sent-menengah-2',
    difficulty: 'menengah',
    correctSentence: 'Lumba-lumba melompat gembira di atas ombak.',
    words: ['di', 'Lumba-lumba', 'gembira', 'ombak.', 'atas', 'melompat'],
    animalId: 'lumba_lumba',
    animalEmoji: '🐬',
    hint: 'Di mana lumba-lumba melompat riang?'
  },
  {
    id: 'sent-menengah-3',
    difficulty: 'menengah',
    correctSentence: 'Kupu-kupu terbang anggun menghisap madu bunga.',
    words: ['menghisap', 'bunga.', 'Kupu-kupu', 'anggun', 'terbang', 'madu'],
    animalId: 'kupu_kupu',
    animalEmoji: '🦋',
    hint: 'Apa yang dilakukan kupu-kupu di taman?'
  },

  // --- TINGKAT MAHIR (6 - 8 KATA, KALIMAT KOMPLEKS DENGAN KATA PENGHUBUNG) ---
  {
    id: 'sent-mahir-1',
    difficulty: 'mahir',
    correctSentence: 'Singa mengaum keras untuk melindungi wilayah tempat tinggalnya.',
    words: ['wilayah', 'mengaum', 'tinggalnya.', 'keras', 'Singa', 'melindungi', 'tempat', 'untuk'],
    animalId: 'singa',
    animalEmoji: '🦁',
    hint: 'Mengapa singa mengaum dengan sangat keras?'
  },
  {
    id: 'sent-mahir-2',
    difficulty: 'mahir',
    correctSentence: 'Penyu berenang menyeberangi samudra lalu bertelur di pantai.',
    words: ['pantai.', 'di', 'samudra', 'Penyu', 'lalu', 'menyeberangi', 'berenang', 'bertelur'],
    animalId: 'penyu',
    animalEmoji: '🐢',
    hint: 'Ke mana penyu berenang dan apa tujuannya di pantai?'
  },
  {
    id: 'sent-mahir-3',
    difficulty: 'mahir',
    correctSentence: 'Bebek pandai berenang karena memiliki selaput di kakinya.',
    words: ['di', 'pandai', 'Bebek', 'kakinya.', 'karena', 'berenang', 'selaput', 'memiliki'],
    animalId: 'bebek',
    animalEmoji: '🦆',
    hint: 'Mengapa bebek bisa berenang dengan mahir?'
  }
];

export const FABLE_STORIES_DATA: FableStory[] = [
  {
    id: 'fable-1',
    difficulty: 'pemula',
    title: 'Kisah Gajah dan Kelinci Rukun',
    icon: '🐘',
    moralLesson: 'Saling tolong-menolong membuat kita memiliki banyak sahabat setia.',
    paragraphs: [
      'Di hutan hijau yang asri, ada seekor gajah bertubuh besar bernama Gani.',
      'Gani memiliki sahabat kecil yaitu Kiko si kelinci putih yang lincah.',
      'Suatu sore, Kiko tidak dapat menjangkau buah apel manis di ranting pohon tinggi.',
      'Gani segera mengulurkan belalai panjangnya untuk memetik apel dan membaginya bersama Kiko.'
    ],
    questions: [
      {
        question: 'Siapakah nama gajah bertubuh besar di dalam cerita?',
        options: ['Gani si Gajah', 'Kiko si Kelinci', 'Boni si Beruang', 'Raja Singa'],
        correctIndex: 0,
        explanation: 'Gani adalah nama gajah bertubuh besar yang baik hati.'
      },
      {
        question: 'Mengapa Kiko si kelinci tidak bisa mengambil buah apel?',
        options: ['Karena apelnya busuk', 'Karena ranting pohonnya terlalu tinggi', 'Karena Kiko mengantuk', 'Karena ada burung'],
        correctIndex: 1,
        explanation: 'Ranting pohonnya sangat tinggi sehingga tubuh kecil Kiko tidak sampai.'
      },
      {
        question: 'Alat tubuh apa yang digunakan Gani untuk membantu memetik apel?',
        options: ['Ekornya', 'Telinganya', 'Belalai panjangnya', 'Kakinya'],
        correctIndex: 2,
        explanation: 'Gani mengulurkan belalai panjangnya yang serbaguna untuk memetik apel.'
      }
    ]
  },
  {
    id: 'fable-2',
    difficulty: 'menengah',
    title: 'Lumba-lumba Penolong Nelayan',
    icon: '🐬',
    moralLesson: 'Kebaikan hati akan mendatangkan keselamatan dan berkah bagi sesama.',
    paragraphs: [
      'Pak Budi adalah seorang nelayan yang ramah dan gemar menyapa hewan laut.',
      'Suatu hari, kabut tebal menyelimuti lautan sehingga perahu Pak Budi kehilangan arah pulang.',
      'Tiba-tiba, datanglah seekor lumba-lumba cerdas bernama Luki melompat di depan haluan perahu.',
      'Luki berenang memandu perahu Pak Budi menembus kabut hingga tiba dengan selamat di tepi pantai.'
    ],
    questions: [
      {
        question: 'Apa masalah yang dihadapi oleh Pak Budi di tengah lautan?',
        options: ['Perahunya bocor', 'Kabut tebal membuat perahu tersesat', 'Ikan di laut habis', 'Mesin perahu mati'],
        correctIndex: 1,
        explanation: 'Kabut tebal menyelimuti lautan sehingga Pak Budi tidak dapat melihat arah pulang.'
      },
      {
        question: 'Siapakah yang membantu memandu perahu Pak Budi menembus kabut?',
        options: ['Paus raksasa', 'Penyu laut', 'Luki si lumba-lumba cerdas', 'Burung camar'],
        correctIndex: 2,
        explanation: 'Luki si lumba-lumba berenang di depan perahu untuk menjadi penunjuk arah jalan.'
      },
      {
        question: 'Nilai kebaikan apa yang dapat kita teladani dari cerita di atas?',
        options: ['Suka menolong sesama yang sedang kesulitan', 'Mementingkan diri sendiri', 'Bermain-main saat ada kabut', 'Takut pada hewan laut'],
        correctIndex: 0,
        explanation: 'Saling tolong-menolong adalah perbuatan terpuji yang menyelamatkan orang lain.'
      }
    ]
  },
  {
    id: 'fable-3',
    difficulty: 'mahir',
    title: 'Zebra dan Belang Penyamarannya',
    icon: '🦓',
    moralLesson: 'Setiap karunia dan perbedaan fisik yang kita miliki mempunyai manfaat istimewa.',
    paragraphs: [
      'Di padang rumput sabana yang luas, seekor anak zebra bernama Ziko sempat merasa bingung.',
      'Ziko bertanya kepada ibunya mengapa tubuh zebra memiliki garis-garis belang hitam putih dan tidak berwarna cokelat polos.',
      'Ibu zebra tersenyum bijak lalu mengajak Ziko berdiri di tengah rerumputan yang bergoyang tertiup angin sore.',
      'Ketika singa pemangsa lewat dari kejauhan, singa itu kesulitan melihat kawanan zebra karena garis belang menyatu dengan bayangan rumput.',
      'Ziko pun mengerti bahwa garis belang hitam putih adalah pelindung alami anugerah Tuhan agar mereka tetap aman.'
    ],
    questions: [
      {
        question: 'Apa yang sempat membuat Ziko si anak zebra merasa bingung?',
        options: ['Karena kakinya belang', 'Karena garis belang hitam putih di tubuhnya', 'Karena tidak bisa berlari cepat', 'Karena rumputnya kering'],
        correctIndex: 1,
        explanation: 'Ziko bertanya-tanya mengapa tubuh zebra memiliki garis hitam putih yang mencolok.'
      },
      {
        question: 'Bagaimana garis belang zebra melindungi mereka dari predator seperti singa?',
        options: ['Membuat tubuh zebra tidak terlihat oleh bayangan rumput (kamuflase)', 'Mengeluarkan suara berisik', 'Mengeluarkan aroma tak sedap', 'Membuat zebra bisa terbang'],
        correctIndex: 0,
        explanation: 'Pola garis hitam putih membingungkan pandangan predator saat kawanan zebra bergerak bersama di padang rumput.'
      },
      {
        question: 'Apa pesan moral dari kisah Ziko si anak zebra?',
        options: ['Kita harus bersyukur atas keunikan diri kita karena menyimpan kelebihan bermanfaat', 'Kita harus mengecat warna tubuh kita', 'Jangan mau berteman dengan zebra', 'Menghindari padang sabana'],
        correctIndex: 0,
        explanation: 'Setiap keunikan yang kita miliki merupakan anugerah yang patut disyukuri.'
      }
    ]
  }
];

export const SCIENCE_CLASSIFICATION_DATA: ScienceClassificationQuiz[] = [
  {
    id: 'sci-1',
    difficulty: 'pemula',
    animalName: 'Sapi',
    animalEmoji: '🐮',
    question: 'Berdasarkan jenis makanannya, sapi termasuk kelompok hewan apa?',
    correctAnswer: 'Herbivora (Pemakan Tumbuhan & Rumput)',
    options: [
      'Herbivora (Pemakan Tumbuhan & Rumput)',
      'Karnivora (Pemakan Daging)',
      'Insektivora (Pemakan Serangga)',
      'Piscivora (Pemakan Ikan)'
    ],
    explanation: 'Sapi hanya memakan rumput hijau dan dedaunan, sehingga disebut hewan herbivora.'
  },
  {
    id: 'sci-2',
    difficulty: 'pemula',
    animalName: 'Ayam',
    animalEmoji: '🐔',
    question: 'Bagaimanakah cara ayam berkembang biak untuk menghasilkan keturunan?',
    correctAnswer: 'Bertelur (Ovipar)',
    options: [
      'Bertelur (Ovipar)',
      'Melahirkan (Vivipar)',
      'Membelah diri',
      'Bertunas'
    ],
    explanation: 'Ayam adalah kelompok unggas yang berkembang biak dengan cara bertelur (ovipar).'
  },
  {
    id: 'sci-3',
    difficulty: 'menengah',
    animalName: 'Lumba-lumba',
    animalEmoji: '🐬',
    question: 'Meskipun hidup dan berenang di laut, lumba-lumba bernapas menggunakan apa?',
    correctAnswer: 'Paru-paru melalui lubang napas di punggung',
    options: [
      'Paru-paru melalui lubang napas di punggung',
      'Insang seperti ikan',
      'Kulit basah',
      'Trakea'
    ],
    explanation: 'Lumba-lumba adalah mamalia laut, sehingga ia bernapas dengan paru-paru dan melahirkan anak.'
  },
  {
    id: 'sci-4',
    difficulty: 'menengah',
    animalName: 'Kupu-kupu',
    animalEmoji: '🦋',
    question: 'Tahapan metamorfosis kupu-kupu sebelum menjadi kepompong adalah seekor...',
    correctAnswer: 'Ulat',
    options: ['Ulat', 'Telur ayam', 'Jentik-jentik', 'Berudu'],
    explanation: 'Daur hidup kupu-kupu: Telur -> Ulat (Larva) -> Kepompong (Pupa) -> Kupu-kupu dewasa.'
  },
  {
    id: 'sci-5',
    difficulty: 'mahir',
    animalName: 'Penyu Laut',
    animalEmoji: '🐢',
    question: 'Penyu laut dikelompokkan ke dalam golongan hewan apa?',
    correctAnswer: 'Reptil yang memiliki tempurung pelindung',
    options: [
      'Reptil yang memiliki tempurung pelindung',
      'Ikan bersisik halus',
      'Amfibi berkaki katak',
      'Mamalia air'
    ],
    explanation: 'Penyu adalah reptil berdarah dingin yang bernapas dengan paru-paru dan bertelur di pasir pantai.'
  },
  {
    id: 'sci-6',
    difficulty: 'mahir',
    animalName: 'Singa',
    animalEmoji: '🦁',
    question: 'Dalam rantai makanan di padang sabana, singa menempati peran sebagai...',
    correctAnswer: 'Konsumen puncak (Karnivora pemangsa)',
    options: [
      'Konsumen puncak (Karnivora pemangsa)',
      'Produsen pembuat makanan',
      'Pengurai tanah',
      'Pemakan rumput'
    ],
    explanation: 'Singa adalah predator puncak yang menjaga keseimbangan populasi hewan herbivora di alam liar.'
  }
];

export const WORD_FILL_DATA: WordFillProblem[] = [
  {
    id: 'fill-1',
    difficulty: 'pemula',
    sentenceWithBlank: 'Sapi menghasilkan _____ segar yang bergizi untuk tubuh kita.',
    fullSentence: 'Sapi menghasilkan susu segar yang bergizi untuk tubuh kita.',
    missingWord: 'susu',
    options: ['susu', 'minyak', 'batu', 'madu'],
    animalEmoji: '🐮'
  },
  {
    id: 'fill-2',
    difficulty: 'pemula',
    sentenceWithBlank: 'Gajah menggunakan _____ panjangnya untuk mengambil makanan di pohon.',
    fullSentence: 'Gajah menggunakan belalai panjangnya untuk mengambil makanan di pohon.',
    missingWord: 'belalai',
    options: ['belalai', 'sayap', 'sirip', 'tanduk'],
    animalEmoji: '🐘'
  },
  {
    id: 'fill-3',
    difficulty: 'menengah',
    sentenceWithBlank: 'Bebek pandai berenang karena jari kakinya memiliki _____ renang.',
    fullSentence: 'Bebek pandai berenang karena jari kakinya memiliki selaput renang.',
    missingWord: 'selaput',
    options: ['selaput', 'sepatu', 'cakar', 'kumis'],
    animalEmoji: '🦆'
  },
  {
    id: 'fill-4',
    difficulty: 'menengah',
    sentenceWithBlank: 'Kupu-kupu hinggap di kelopak bunga untuk menghisap sari _____.',
    fullSentence: 'Kupu-kupu hinggap di kelopak bunga untuk menghisap sari madu.',
    missingWord: 'madu',
    options: ['madu', 'garam', 'cuka', 'tanah'],
    animalEmoji: '🦋'
  },
  {
    id: 'fill-5',
    difficulty: 'mahir',
    sentenceWithBlank: 'Garis belang hitam putih pada tubuh zebra berfungsi sebagai _____ alami.',
    fullSentence: 'Garis belang hitam putih pada tubuh zebra berfungsi sebagai penyamaran alami.',
    missingWord: 'penyamaran',
    options: ['penyamaran', 'penerang', 'pemanas', 'pendingin'],
    animalEmoji: '🦓'
  },
  {
    id: 'fill-6',
    difficulty: 'mahir',
    sentenceWithBlank: 'Lumba-lumba adalah hewan mamalia yang bernapas menghirup udara dengan _____.',
    fullSentence: 'Lumba-lumba adalah hewan mamalia yang bernapas menghirup udara dengan paru-paru.',
    missingWord: 'paru-paru',
    options: ['paru-paru', 'insang', 'sisik', 'ekor'],
    animalEmoji: '🐬'
  }
];
