// Web Audio API Synthesizer & Indonesian Speech Synthesis for Preschool Learning

class SoundController {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private voiceEnabled: boolean = true;
  private voiceRate: number = 0.85; // slightly slower for clear preschool comprehension

  constructor() {
    // Lazy initialize AudioContext on first user interaction
    const savedSound = localStorage.getItem('duniacilik_sound');
    if (savedSound !== null) {
      this.soundEnabled = savedSound === 'true';
    }
    const savedVoice = localStorage.getItem('duniacilik_voice');
    if (savedVoice !== null) {
      this.voiceEnabled = savedVoice === 'true';
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    localStorage.setItem('duniacilik_sound', String(enabled));
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    localStorage.setItem('duniacilik_voice', String(enabled));
  }

  public isVoiceEnabled(): boolean {
    return this.voiceEnabled;
  }

  public setVoiceRate(rate: number) {
    this.voiceRate = rate;
  }

  public getVoiceRate(): number {
    return this.voiceRate;
  }

  // Playful pop sound for taps & buttons
  public playPop(pitch: number = 520) {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio context might fail in silent mode, safe to ignore
    }
  }

  // Count number pop with rising pitch (1, 2, 3...)
  public playCountNote(step: number = 1) {
    const baseFreq = 340;
    const freq = baseFreq + (step % 12) * 45;
    this.playPop(freq);
  }

  // Cheerful correct chime (Major triad chord arpeggio)
  public playCorrect() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.3);
      });
    } catch {
      // Silent error
    }
  }

  // Gentle cute boing for gentle retry (not harsh buzzer)
  public playTryAgain() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.18);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Silent
    }
  }

  // Twinkling sparkle sound for star awards
  public playSparkle() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [880, 1174, 1318, 1760, 2093];

      freqs.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.05);

        gain.gain.setValueAtTime(0.12, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.22);
      });
    } catch {
      // Silent
    }
  }

  // Victory fanfare
  public playFanfare() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // G4, C5, E5, G5
      const notes = [
        { f: 392.0, d: 0.12, t: 0 },
        { f: 523.25, d: 0.12, t: 0.14 },
        { f: 659.25, d: 0.12, t: 0.28 },
        { f: 783.99, d: 0.45, t: 0.42 }
      ];

      notes.forEach((n) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, now + n.t);

        gain.gain.setValueAtTime(0, now + n.t);
        gain.gain.linearRampToValueAtTime(0.22, now + n.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.05);
      });
    } catch {
      // Silent
    }
  }

  // Animal synth vocalization emulator
  public playAnimalSoundEffect(animalId: string) {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (animalId === 'kucing') {
        // High pitch meow sweep
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(950, now + 0.2);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.5);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (animalId === 'sapi') {
        // Deep mooo
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.3);
        osc.frequency.linearRampToValueAtTime(110, now + 0.7);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.85);
      } else if (animalId === 'burung') {
        // Chirp chirp
        [0, 0.15, 0.3].forEach((t, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1800 + i * 150, now + t);
          osc.frequency.exponentialRampToValueAtTime(2600 + i * 150, now + t + 0.08);

          gain.gain.setValueAtTime(0.18, now + t);
          gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.1);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + t);
          osc.stop(now + t + 0.12);
        });
      } else if (animalId === 'kodok') {
        // Croak ribbed sound
        [0, 0.12].forEach((t) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(160, now + t);
          osc.frequency.exponentialRampToValueAtTime(90, now + t + 0.08);

          gain.gain.setValueAtTime(0.15, now + t);
          gain.gain.exponentialRampToValueAtTime(0.01, now + t + 0.1);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + t);
          osc.stop(now + t + 0.11);
        });
      } else {
        // Default warm friendly cute animal greeting tone
        this.playCorrect();
      }
    } catch {
      // Silent
    }
  }

  // Indonesian Speech Narration & Pronunciation
  public speak(text: string, options?: { rate?: number; pitch?: number; onEnd?: () => void }) {
    if (!this.voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (options?.onEnd) options.onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options?.rate ?? this.voiceRate;
      utterance.pitch = options?.pitch ?? 1.15; // slightly friendly higher pitch for kids
      utterance.lang = 'id-ID';

      // Pick Indonesian voice if available
      const voices = window.speechSynthesis.getVoices();
      const indoVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('ID'));
      if (indoVoice) {
        utterance.voice = indoVoice;
      }

      if (options?.onEnd) {
        utterance.onend = () => {
          options.onEnd?.();
        };
        utterance.onerror = () => {
          options.onEnd?.();
        };
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      if (options?.onEnd) options.onEnd();
    }
  }

  // Pronounce animal name with slow syllable breakdown e.g. "Ga - Jah! Gajah!"
  public speakSyllables(syllables: string[], fullName: string) {
    const formatted = `${syllables.join(' ... ')}! ... ${fullName}!`;
    this.speak(formatted, { rate: 0.75 });
  }
}

export const soundCtrl = new SoundController();
