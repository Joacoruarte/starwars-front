import Link from 'next/link';
import { Planet } from '../models/planet.t';

export default function PlanetCard({ id, name, climate, population, terrain }: Partial<Planet>) {
  return (
    <article className='bg-light-gray rounded-xl p-6 shadow-xl'>
      <div className='mb-4'>
        <Link
          href={`/planets/${id}`}
          className='text-xl hover:text-yellow-sw transition-colors duration-200 cursor-pointer
       font-semibold text-white font-starwarsalternate'
        >
          {name}
        </Link>
        <div className='w-full h-[1px] bg-gray-600' />
      </div>

      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Clima:</h4>
        <p className='text-lg text-gray-300 line-clamp-4 text-ellipsis'>
          {climate}
        </p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>
          Poblacion:
        </h4>
        <p className='text-lg text-gray-300'>{population}</p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Terreno:</h4>
        <p className='text-lg text-gray-300'>{terrain}</p>
      </div>

      <div className='flex w-full justify-end'>
        <Link href={`/planets/${id}`}>
          <button className='bg-yellow-sw hover:bg-[#bc9803] transition-colors duration-200 text-black px-4 py-2 rounded-md font-semibold '>
            Ver más
          </button>
        </Link>
      </div>
    </article>
  );
}
