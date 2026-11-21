import { useEffect, useRef, useState } from 'react';
import { useMotionEnabled } from '@utils/motion';
import './StatTile.css';

export type StatTileTone = 'default' | 'success' | 'warning';

export interface StatTileProps {
  /** Small caption, e.g. "Pods" */
  label: string;
  /** The figure as written, e.g. "1,074" or "13.8". Omit while loading. */
  value?: string;
  /** Small unit after the figure, e.g. "W", "%" */
  unit?: string;
  /** default: neutral; success: good news; warning: needs a look (amber, never red) */
  tone?: StatTileTone;
  /** Shows a shimmer instead of a figure */
  loading?: boolean;
  /** Count up from 0 the first time the tile is seen */
  animated?: boolean;
}

const COUNT_MS = 800;

const decimalsOf = (figure: string): number => figure.split('.')[1]?.length ?? 0;

const toNumber = (figure: string): number | null => {
  const n = Number(figure.replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
};

const format = (n: number, decimals: number): string =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts from 0 to the figure once the element is on screen. Returns the text to show. */
const useCountUp = (figure: string | undefined, enabled: boolean, target: React.RefObject<HTMLElement | null>) => {
  const end = figure === undefined ? null : toNumber(figure);
  const counts = enabled && end !== null;
  const [text, setText] = useState<string | undefined>(
    figure !== undefined && counts ? format(0, decimalsOf(figure)) : figure,
  );
  const played = useRef(false);

  useEffect(() => {
    if (figure === undefined) {
      setText(undefined);
      return;
    }
    if (!counts || end === null || played.current) {
      setText(figure);
      return;
    }

    const decimals = decimalsOf(figure);
    let frame = 0;
    let observer: IntersectionObserver | null = null;

    const run = () => {
      played.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / COUNT_MS);
        const eased = 1 - Math.pow(1 - t, 3);
        setText(t >= 1 ? figure : format(end * eased, decimals));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const node = target.current;
    if (node && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer?.disconnect();
          run();
        }
      }, { threshold: 0.4 });
      observer.observe(node);
    } else {
      run();
    }

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [figure, counts, end, target]);

  return { text, done: text === figure };
};

/**
 * One live number: a big monospace figure with a small unit and a caption.
 * Shows a shimmer while loading. Props only; the parent supplies the data.
 */
const StatTile = ({ label, value, unit, tone = 'default', loading = false, animated = true }: StatTileProps) => {
  const motionOn = useMotionEnabled(animated);
  const ref = useRef<HTMLDivElement>(null);
  const { text, done } = useCountUp(loading ? undefined : value, motionOn, ref);

  return (
    <div
      ref={ref}
      className={`stat-tile stat-tile--${tone}${loading ? ' stat-tile--loading' : ''}${motionOn ? ' stat-tile--animated' : ''}`}
      data-testid="stat-tile"
    >
      <dt className="stat-tile__label">{label}</dt>
      <dd className="stat-tile__reading">
        {loading ? (
          <span className="stat-tile__skeleton" role="presentation">
            <span className="stat-tile__sr">Loading</span>
          </span>
        ) : (
          <>
            <span className="stat-tile__value" aria-hidden={done ? undefined : true}>
              {text}
            </span>
            {unit ? <span className="stat-tile__unit">{unit}</span> : null}
          </>
        )}
      </dd>
    </div>
  );
};

export default StatTile;
