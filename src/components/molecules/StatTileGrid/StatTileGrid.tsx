import StatTile from '@molecules/StatTile';
import type { StatTileTone } from '@molecules/StatTile';
import './StatTileGrid.css';

export interface StatTileGridItem {
  id: string;
  label: string;
  value: string;
  unit?: string;
  tone?: StatTileTone;
}

export interface StatTileGridProps {
  /** Tiles to show. Ignored while `loading`. */
  tiles: StatTileGridItem[];
  /** Shows `placeholders` shimmering tiles instead of figures */
  loading?: boolean;
  /** Captions for the shimmer tiles while loading */
  placeholders?: string[];
  /** Whether the figures count up and the shimmer moves */
  animated?: boolean;
  /** Accessible name for the list of readings */
  ariaLabel?: string;
}

/**
 * A responsive grid of StatTiles. Two columns on a phone, one at large text
 * sizes, four on a wide screen. Props only.
 */
const StatTileGrid = ({
  tiles,
  loading = false,
  placeholders = [],
  animated = true,
  ariaLabel = 'Live readings',
}: StatTileGridProps) => (
  <dl className="stat-tile-grid" aria-label={ariaLabel} aria-busy={loading || undefined}>
    {loading
      ? placeholders.map((label) => <StatTile key={label} label={label} loading animated={animated} />)
      : tiles.map((tile) => (
          <StatTile
            key={tile.id}
            label={tile.label}
            value={tile.value}
            unit={tile.unit}
            tone={tile.tone}
            animated={animated}
          />
        ))}
  </dl>
);

export default StatTileGrid;
