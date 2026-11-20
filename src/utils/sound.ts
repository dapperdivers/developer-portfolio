/**
 * Small Web Audio helpers for interface sound effects.
 *
 * The audio context is created lazily, and only in a browser. Browsers keep it
 * suspended until the first user gesture, so nothing plays uninvited.
 */

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (audioContext || typeof window === 'undefined') return audioContext;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  try {
    audioContext = new Ctor();
  } catch {
    audioContext = null;
  }
  return audioContext;
};

/**
 * Play a short sine beep.
 * @param {number} [frequency=440] - Pitch in hertz
 * @param {number} [duration=100] - Length in milliseconds
 */
export const playBeep = (frequency = 440, duration = 100) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration / 1000);
};

/** Play a rising four-note sequence. */
export const playHackSound = () => {
  [200, 300, 400, 500].forEach((frequency, index) => {
    setTimeout(() => playBeep(frequency, 50), index * 50);
  });
};
