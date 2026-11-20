import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import TerminalTitleBar from '@molecules/TerminalTitleBar';
import './TerminalWindow.css';

export type TerminalLineKind = 'input' | 'output' | 'muted' | 'success' | 'error';

export interface TerminalWindowLine {
  /** Stable key for the line */
  id: string;
  /** input is a typed command (shown after the prompt); the rest are output */
  kind: TerminalLineKind;
  /** The text; line breaks are kept */
  text: string;
}

export interface TerminalWindowProps {
  /** Lines to show, in order */
  lines: TerminalWindowLine[];
  /** Called with the trimmed command when the visitor presses Enter */
  onCommand?: (command: string) => void;
  /** Type out the lines that are present on first render, then show the prompt */
  animated?: boolean;
  /** Prompt text */
  prompt?: string;
  /** Title bar text */
  title?: string;
  /** Content above the lines, such as the page heading */
  header?: React.ReactNode;
  /** Commands offered as buttons under the prompt, for touch screens */
  suggestions?: string[];
  /** Accessible label for the command input */
  inputLabel?: string;
  /** Milliseconds per typed character */
  typingSpeed?: number;
  /** Called once the opening lines have finished or were skipped */
  onBootComplete?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const LINE_PAUSE = 260;
const MAX_HISTORY = 30;

/**
 * Terminal window that types its opening lines, then leaves a prompt.
 * Props-only: the parent decides what each command does.
 *
 * @component
 */
const TerminalWindow = ({
  lines,
  onCommand,
  animated = true,
  prompt = 'guest@derek:~$',
  title = 'guest@derek: ~',
  header,
  suggestions = [],
  inputLabel = 'Terminal command. Type help for a list of commands.',
  typingSpeed = 24,
  onBootComplete,
  className = '',
}: TerminalWindowProps) => {
  const motionOn = useMotionEnabled(animated);
  const bootLength = useRef(lines.length);
  const [booted, setBooted] = useState(!motionOn || lines.length === 0);
  const [bootLine, setBootLine] = useState(0);
  const [bootChars, setBootChars] = useState(0);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyPos, setHistoryPos] = useState<number | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onBootComplete);
  completeRef.current = onBootComplete;

  const finishBoot = useCallback(() => {
    setBooted(true);
  }, []);

  // Tell the parent once, when the opening ends
  const announced = useRef(false);
  useEffect(() => {
    if (booted && !announced.current) {
      announced.current = true;
      completeRef.current?.();
    }
  }, [booted]);

  // Reduced motion (or animated off) shows everything straight away
  useEffect(() => {
    if (!motionOn) finishBoot();
  }, [motionOn, finishBoot]);

  // Any key or click finishes the opening
  useEffect(() => {
    if (booted) return;
    const skip = () => finishBoot();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [booted, finishBoot]);

  // Type the opening lines one at a time
  useEffect(() => {
    if (booted) return;
    const line = lines[bootLine];
    if (bootLine >= bootLength.current || !line) {
      finishBoot();
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    if (line.kind === 'input' && bootChars < line.text.length) {
      timer = setTimeout(() => setBootChars((c) => c + 1), typingSpeed);
    } else {
      timer = setTimeout(() => {
        setBootLine((l) => l + 1);
        setBootChars(0);
      }, LINE_PAUSE);
    }
    return () => clearTimeout(timer);
  }, [booted, bootLine, bootChars, lines, typingSpeed, finishBoot]);

  // Keep the newest line in view inside the log, without scrolling the page
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines, bootLine, bootChars]);

  const submit = (command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;
    setHistory((h) => [...h.slice(-(MAX_HISTORY - 1)), trimmed]);
    setHistoryPos(null);
    setValue('');
    onCommand?.(trimmed);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit(value);
    } else if (e.key === 'ArrowUp' && history.length > 0) {
      e.preventDefault();
      const pos = historyPos === null ? history.length - 1 : Math.max(0, historyPos - 1);
      setHistoryPos(pos);
      setValue(history[pos]);
    } else if (e.key === 'ArrowDown' && historyPos !== null) {
      e.preventDefault();
      const pos = historyPos + 1;
      if (pos >= history.length) {
        setHistoryPos(null);
        setValue('');
      } else {
        setHistoryPos(pos);
        setValue(history[pos]);
      }
    }
  };

  const visible = booted ? lines : lines.slice(0, bootLine + 1);

  return (
    <motion.div
      className={`terminal-window ${className}`.trim()}
      initial={motionOn ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <TerminalTitleBar variant="kitty" title={title} animated={animated} />
      <div className="terminal-window__body">
        {header && <div className="terminal-window__header">{header}</div>}
        <div
          ref={logRef}
          className="terminal-window__log"
          role="log"
          aria-live={booted ? 'polite' : 'off'}
          aria-label="Terminal output"
          tabIndex={0}
        >
          {visible.map((line, i) => {
            const typing = !booted && i === bootLine && line.kind === 'input';
            const shown = typing ? line.text.slice(0, bootChars) : line.text;
            return (
              <div key={line.id} className={`terminal-window__line terminal-window__line--${line.kind}`}>
                {line.kind === 'input' && (
                  <span className="terminal-window__prompt" aria-hidden="true">
                    {prompt}{' '}
                  </span>
                )}
                <span aria-hidden={typing || undefined}>{shown}</span>
                {typing && <span className="sr-only">{line.text}</span>}
                {typing && <span className="terminal-window__caret" aria-hidden="true" />}
              </div>
            );
          })}
        </div>
        {booted && (
          <>
            <label className="terminal-window__input-row">
              <span className="terminal-window__prompt" aria-hidden="true">{prompt}</span>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                className="terminal-window__input"
                aria-label={inputLabel}
                placeholder="try: help"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
              />
            </label>
            {suggestions.length > 0 && (
              <div className="terminal-window__suggestions" role="group" aria-label="Quick commands">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="terminal-window__chip"
                    onClick={() => submit(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default memo(TerminalWindow);
