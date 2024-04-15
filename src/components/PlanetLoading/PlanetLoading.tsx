import s from './PlanetLoading.module.css';

export default function PlanetLoading({ title = 'Cargando' }: { title?: string}) {
  return (
    <div className={s.content}>
      <div className={s.planet}>
        <div className={s.ring}></div>
        <div className={s.cover_ring}></div>
        <div className={s.spots}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p>{title}</p>
    </div>
  );
}
