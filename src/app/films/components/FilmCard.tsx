import ContainerEntityCard from '@/components/ContainerEntityCard';
import { Film } from '../models/film.t';

export default function FilmCard({
  id,
  title,
  opening_crawl,
  release_date,
}: Pick<Film, 'id' | 'title' | 'opening_crawl' | 'release_date'>) {
  return (
    <ContainerEntityCard id={id} entityTitle={title} redirectPath={'films'}>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Descripción:</h4>
        <p className='text-lg text-gray-300 line-clamp-4 text-ellipsis'>
          {opening_crawl}
        </p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Creada el:</h4>
        <p className='text-lg text-gray-300'>{release_date}</p>
      </div>
    </ContainerEntityCard>
  );
}
