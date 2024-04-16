import Link from 'next/link';
import { Film } from '../models/film.t';

export default function FilmCard({
  id,
  title,
  opening_crawl,
  release_date,
}: Partial<Film>) {
  return (
    <article className='bg-light-gray rounded-xl p-6 shadow-xl'>
      <div className='mb-4'>
        <Link
          href={`/films/${id}`}
          className='text-xl hover:text-yellow-sw transition-colors duration-200 cursor-pointer
         font-semibold text-white font-starwarsalternate'
        >
          {title}
        </Link>
        <div className='w-full h-[1px] bg-gray-600' />
      </div>
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

      <div className='flex w-full justify-end'>
        <Link href={`/films/${id}`}>
          <button className='bg-yellow-sw hover:bg-[#bc9803] transition-colors duration-200 text-black px-4 py-2 rounded-md font-semibold '>
            Ver más
          </button>
        </Link>
      </div>
    </article>
  );
}
