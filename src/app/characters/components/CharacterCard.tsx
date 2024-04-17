import Link from 'next/link';
import type { Character } from '../models/character.t';

export default function CharacterCard({
  id,
  name,
  height,
  mass,
  gender,
  species,
}: Partial<Character>) {
  return (
    <article className='bg-light-gray rounded-xl p-6 shadow-xl'>
      <div className='mb-4'>
        <Link prefetch={true} href={`/characters/${id}`}>
          <p className='text-xl font-semibold text-white hover:text-yellow-sw transition-colors duration-200 cursor-pointer font-starwarsalternate'>
            {name}
          </p>
        </Link>
        <div className='w-full h-[1px] bg-gray-600' />
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Altura:</h4>
        <p className='text-lg text-gray-300'>
          {height === 'unknown' ? '-' : `${height} cm`}
        </p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Peso:</h4>
        <p className='text-lg text-gray-300'>
          {mass === 'unknown' ? '-' : `${mass} kg`}
        </p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Genero:</h4>
        <p className='text-lg text-gray-300'>{gender}</p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Especie:</h4>
        <p className='text-lg text-gray-300'>{species?.[0] || 'Unknown'}</p>
      </div>

      <div className='flex w-full justify-end'>
        <Link prefetch={true} href={`/characters/${id}`}>
          <button className='common-button'>
            Ver más
          </button>
        </Link>
      </div>
    </article>
  );
}
