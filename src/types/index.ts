export type GameSection = 'home' | 'math' | 'animals' | 'stickers' | 'challenge' | 'parent';

export type DifficultyLevel = 'pemula' | 'menengah' | 'mahir';

export type MathGameMode =
  | 'place_value'
  | 'sequence_jump'
  | 'story_math'
  | 'two_step_math'
  | 'clock_time'
  | 'money_math'
  | 'comparison_symbols'
  | 'shapes_grade1';

export type AnimalGameMode =
  | 'reading_cards'
  | 'sentence_builder'
  | 'riddle_quiz'
  | 'fable_reading'
  | 'science_classification'
  | 'word_fill'
  | 'shadow_anatomy'
  | 'habitat_stories';

export type AnimalHabitat = 'peternakan' | 'hutan' | 'laut' | 'padang' | 'taman';

export interface Animal {
  id: string;
  name: string; // Indonesian name
  nameEn: string;
  syllables: string[]; // e.g. ["GA", "JAH"]
  readingSentence: string; // Grade 1 SD reading sentence
  secondSentence: string; // Additional short sentence for reading fluency
  foodType: string; // e.g. "Pemakan Tumbuhan (Herbivora)"
  bodyParts: string[]; // e.g. ["Belalai panjang", "Telinga lebar"]
  soundName: string;
  soundText: string;
  habitat: AnimalHabitat;
  habitatLabel: string;
  emoji: string;
  themeColor: string;
  bgColor: string;
  funFact: string;
  food: string;
  clue: string;
  iconName: string;
  // Advanced biological taxonomy for Mahir level
  animalClass?: 'Mamalia' | 'Unggas (Burung)' | 'Ikan' | 'Reptil' | 'Amfibi' | 'Serangga';
  reproduction?: 'Melahirkan (Vivipar)' | 'Bertelur (Ovipar)';
  breathingOrgan?: 'Paru-paru' | 'Insang' | 'Kulit lembap' | 'Trakea';
}

export interface SentencePuzzleData {
  id: string;
  difficulty: DifficultyLevel;
  correctSentence: string;
  words: string[];
  animalId: string;
  animalEmoji: string;
  hint: string;
}

export interface MathItem {
  id: string;
  emoji: string;
  label: string;
  color: string;
}

export interface PlaceValueItem {
  number: number;
  tens: number; // Puluhan
  ones: number; // Satuan
  hundreds?: number; // Ratusan for level mahir
  itemName: string;
  itemEmoji: string;
  difficulty: DifficultyLevel;
}

export interface GeometricShapeGrade1 {
  id: string;
  nameIndo: string;
  nameEn: string;
  sidesCount: number; // Jumlah sisi
  cornersCount: number; // Jumlah sudut
  color: string;
  clueSentence: string; // Kalimat teka-teki bangun datar
  realExamples: string; // Contoh benda di kelas/rumah
  svgShape: 'circle' | 'square' | 'triangle' | 'rectangle' | 'star' | 'heart';
}

export interface StoryMathProblem {
  id: string;
  difficulty: DifficultyLevel;
  type: 'addition' | 'subtraction';
  storySentence1: string; // Kalimat pertama
  storySentence2: string; // Kalimat kedua
  questionSentence: string; // Kalimat pertanyaan
  numA: number;
  numB: number;
  operator: '+' | '-';
  result: number;
  options: number[];
  itemEmoji: string;
  itemName: string;
}

export interface TwoStepMathProblem {
  id: string;
  difficulty: DifficultyLevel;
  storySentence1: string;
  storySentence2: string;
  storySentence3: string;
  questionSentence: string;
  equationDisplay: string; // e.g. "12 - 4 + 5"
  numA: number;
  numB: number;
  numC: number;
  result: number;
  options: number[];
  itemEmoji: string;
  itemName: string;
}

export interface ClockProblem {
  id: string;
  difficulty: DifficultyLevel;
  hours: number;
  minutes: number;
  timeLabel: string; // e.g. "Pukul 07.00"
  timePeriod: 'Pagi Hari' | 'Siang Hari' | 'Sore Hari' | 'Malam Hari';
  activitySentence: string; // e.g. "Budi sarapan pagi sebelum berangkat ke sekolah."
  options: string[];
}

export interface MoneyProblem {
  id: string;
  difficulty: DifficultyLevel;
  storySentence: string;
  itemBought: string;
  itemPrice: number;
  moneyPaid: number;
  changeNeeded: number;
  options: number[];
  coinsEmoji: string[];
}

export interface SymbolComparisonProblem {
  id: string;
  difficulty: DifficultyLevel;
  numLeft: number;
  numRight: number;
  correctSymbol: '>' | '<' | '=';
  sentenceExplanation: string; // e.g. "15 lebih besar dari 12"
  itemEmoji: string;
  contextSentence: string;
}

export interface FableStory {
  id: string;
  difficulty: DifficultyLevel;
  title: string;
  icon: string;
  paragraphs: string[];
  moralLesson: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface ScienceClassificationQuiz {
  id: string;
  difficulty: DifficultyLevel;
  animalName: string;
  animalEmoji: string;
  question: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export interface WordFillProblem {
  id: string;
  difficulty: DifficultyLevel;
  sentenceWithBlank: string;
  fullSentence: string;
  missingWord: string;
  options: string[];
  animalEmoji: string;
}

export interface StickerItem {
  id: string;
  name: string;
  emoji: string;
  category: 'satwa' | 'angka' | 'bintang' | 'trofi';
  requiredStars: number;
  description: string;
}

export interface UserProgressStats {
  stars: number;
  completedByMode: Record<string, number>;
  masteryPercentage: {
    numerasiDasar: number;
    operasiHitung: number;
    logikaSoalCerita: number;
    pengukuranJamUang: number;
    literasiMembaca: number;
    strukturKalimat: number;
    pemahamanFabel: number;
    klasifikasiSains: number;
  };
}
