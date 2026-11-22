import './VersionChips.css';

export interface VersionChipItem {
  /** Software name, e.g. "Talos" */
  label: string;
  /** Version, e.g. "1.14.5" */
  value: string;
}

export interface VersionChipsProps {
  items: VersionChipItem[];
  /** Quiet text after the chips, e.g. "running for 646 days" */
  note?: string;
  /** Accessible name for the chip list */
  label?: string;
}

/** A row of "name version" chips with an optional quiet note. Props only. */
const VersionChips = ({ items, note, label = 'Software versions' }: VersionChipsProps) => {
  if (items.length === 0 && !note) return null;
  return (
    <div className="version-chips">
      {items.length > 0 && (
        <ul className="version-chips__list" aria-label={label}>
          {items.map((item) => (
            <li className="version-chips__chip" key={item.label}>
              <span className="version-chips__name">{item.label}</span>
              <span className="version-chips__value">{item.value}</span>
            </li>
          ))}
        </ul>
      )}
      {note ? <p className="version-chips__note">{note}</p> : null}
    </div>
  );
};

export default VersionChips;
