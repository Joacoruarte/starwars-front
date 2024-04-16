import s from './HamburguerMenu.module.css';

interface HamburguerMenuProps {
  isActive: boolean;
  onToggle: (isActive: boolean) => void;
}

export default function HamburguerMenu({
  isActive,
  onToggle,
}: HamburguerMenuProps) {
  return (
    <div
      style={{ zIndex: isActive ? 1000 : 0 }}
      onClick={() => onToggle(!isActive)}
      className={`${s.hamburger_lines} ${isActive ? s.active : ''}`}
    >
      <span className={`${s.line} ${s.line1}`}></span>
      <span className={`${s.line} ${s.line2}`}></span>
      <span className={`${s.line} ${s.line3}`}></span>
    </div>
  );
}
