import { useCallback, useEffect, useRef, useState } from 'react';
import { playBeep, playHackSound } from '@utils/sound';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

const SECRET_MESSAGES = [
  'AUTHENTICATED_USER_DETECTED',
  'NEURAL_LINK_ESTABLISHED',
  'ENCRYPTION_PROTOCOL_ACTIVE',
  'FIREWALL_STATUS_OPTIMAL',
  'QUANTUM_ENCRYPTION_ENABLED',
  'BIOMETRIC_SCAN_COMPLETE',
  'ACCESS_GRANTED_LEVEL_9',
  'CYBERSEC_PROTOCOLS_ONLINE',
];

const DEVELOPER_QUOTES = [
  'In code we trust, in bugs we debug',
  "Cybersecurity: Because 'password123' isn't enough",
  'Zero-day exploits? More like zero-day fun!',
  'Security through obscurity is like hiding keys under the doormat',
  "There are only 10 types of people: those who understand binary and those who don't",
];

const pick = (list) => list[Math.floor(Math.random() * list.length)];

/** Achievements needed before the effects wind down and everything resets. */
const ACHIEVEMENTS_TO_COMPLETE = 3;

/**
 * Hidden extras for the experience timeline.
 *
 * Nothing happens until one card has been clicked three times. After that:
 * - the 5th and 7th click on a card switch on matrix, glitch and hack effects
 * - the Konami code switches on matrix and hack effects
 * - Ctrl+Shift+D toggles glitch, Alt+H toggles hack
 * - while matrix or hack is on, the pointer leaves a trail
 * Collecting three achievements resets everything.
 *
 * The hook owns all of that state so the timeline itself stays a plain,
 * props-driven component. Pass `effects` and `clickCounts` to `Timeline`, the
 * rest to `TimelineEasterEggOverlay`, and call `registerClick` when a card is
 * toggled.
 *
 * @param {Object} [options]
 * @param {boolean} [options.enabled=true] - Set false to switch the extras off entirely
 * @returns {{
 *   effects: { matrix: boolean, glitch: boolean, hack: boolean, shake: boolean },
 *   clickCounts: Object<number, number>,
 *   secretMessage: string,
 *   achievements: string[],
 *   mouseTrail: Array<{ id: number, x: number, y: number }>,
 *   registerClick: (index: number) => void,
 *   dismissAchievement: (name: string) => void,
 *   reset: () => void,
 * }}
 */
const useTimelineEasterEggs = ({ enabled = true } = {}) => {
  const [active, setActive] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [hack, setHack] = useState(false);
  const [shake, setShake] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');
  const [achievements, setAchievements] = useState([]);
  const [clickCounts, setClickCounts] = useState({});
  const [mouseTrail, setMouseTrail] = useState([]);

  const konamiProgress = useRef(0);
  // Everything earned since the last reset. The visible toasts in
  // `achievements` are dismissed after a few seconds; this is not.
  const earned = useRef(new Set());
  const timers = useRef(new Set());

  // Every delayed state change goes through here so unmounting cancels it.
  const later = useCallback((fn, ms) => {
    const id = setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const reset = useCallback(() => {
    setActive(false);
    setMatrix(false);
    setGlitch(false);
    setHack(false);
    setShake(false);
    setSecretMessage('');
    setAchievements([]);
    setClickCounts({});
    setMouseTrail([]);
    konamiProgress.current = 0;
    earned.current = new Set();
  }, []);

  const flash = useCallback((message, ms) => {
    setSecretMessage(message);
    later(() => setSecretMessage(''), ms);
  }, [later]);

  /**
   * Record an achievement. A finishing achievement (one given `resetAfter`)
   * that brings the earned total to the completion count lets the effects run
   * briefly, then resets and announces it.
   */
  const award = useCallback((name, { resetAfter, farewell } = {}) => {
    earned.current.add(name);
    setAchievements((current) => (current.includes(name) ? current : [...current, name]));
    if (resetAfter && earned.current.size >= ACHIEVEMENTS_TO_COMPLETE) {
      later(() => {
        reset();
        flash(farewell, 2000);
      }, resetAfter);
    }
  }, [flash, later, reset]);

  const dismissAchievement = useCallback((name) => {
    setAchievements((current) => current.filter((item) => item !== name));
  }, []);

  const registerClick = useCallback((index) => {
    if (!enabled) return;
    const count = (clickCounts[index] || 0) + 1;
    setClickCounts((current) => ({ ...current, [index]: count }));

    if (count === 3) {
      setActive(true);
      setShake(true);
      setSecretMessage('AUTHORIZATION REQUIRED - SYSTEM BREACH DETECTED!');
      award('triple-clicker');
      playHackSound();
      later(() => {
        setShake(false);
        setSecretMessage('');
      }, 1500);
    }

    if (count === 5 && active) {
      setMatrix(true);
      setGlitch(true);
      flash('REALITY.EXE HAS STOPPED WORKING - MATRIX PROTOCOL ACTIVE', 3000);
      award('reality-breaker');
    }

    if (count === 7 && active) {
      setHack(true);
      flash('FINAL PROTOCOL INITIATED - SYSTEM OVERRIDE COMPLETE', 3000);
      award('system-override', { resetAfter: 4500, farewell: 'SYSTEM RESTORED TO DEFAULT STATE' });
    }

    if (count >= 3) {
      playBeep(count * 100 + 200, 100);
    }
  }, [active, award, clickCounts, enabled, flash, later]);

  // Keyboard: Konami code and the two shortcut toggles
  useEffect(() => {
    if (!enabled || !active) return undefined;

    const onKeyDown = (event) => {
      if (event.code === KONAMI_CODE[konamiProgress.current]) {
        konamiProgress.current += 1;
        if (konamiProgress.current === KONAMI_CODE.length) {
          konamiProgress.current = 0;
          setMatrix(true);
          setHack(true);
          playHackSound();
          flash('KONAMI CODE ACTIVATED - MATRIX MODE ENABLED', 3000);
          award('konami-master', { resetAfter: 3000, farewell: 'KONAMI MASTER - SYSTEM RESTORED' });
        }
      } else {
        konamiProgress.current = 0;
      }

      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        setGlitch((on) => !on);
        flash(pick(DEVELOPER_QUOTES), 2500);
        award('developer-mode');
        playBeep(800, 200);
      }

      if (event.altKey && event.key === 'h') {
        event.preventDefault();
        setHack((on) => !on);
        flash(pick(SECRET_MESSAGES), 2000);
        award('hacker-mode');
        playHackSound();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, award, enabled, flash]);

  // Pointer trail, only while an effect that shows it is on
  const trailOn = enabled && active && (matrix || hack);
  useEffect(() => {
    if (!trailOn) {
      setMouseTrail((current) => (current.length ? [] : current));
      return undefined;
    }

    const onMouseMove = (event) => {
      const now = Date.now();
      setMouseTrail((current) => [...current.slice(-10), { id: now + Math.random(), x: event.clientX, y: event.clientY }]);
    };
    // Points fade after a second
    const sweep = setInterval(() => {
      const cutoff = Date.now() - 1000;
      setMouseTrail((current) => (current.some((point) => point.id < cutoff) ? current.filter((point) => point.id >= cutoff) : current));
    }, 100);

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearInterval(sweep);
    };
  }, [trailOn]);

  return {
    effects: { matrix, glitch, hack, shake },
    clickCounts,
    secretMessage,
    achievements,
    mouseTrail,
    registerClick,
    dismissAchievement,
    reset,
  };
};

export default useTimelineEasterEggs;
