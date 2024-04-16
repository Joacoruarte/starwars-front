import Link from 'next/link';
import { Starship } from '../models/starship.t';

export default function StarshipCard({
  id,
  name,
  model,
  cargo_capacity,
  cost_in_credits,
}: Partial<Starship>) {
  return (
    <article className='bg-light-gray rounded-xl p-6 shadow-xl'>
      <div className='mb-4'>
        <Link
          href={`/starships/${id}`}
          className='text-xl hover:text-yellow-sw transition-colors duration-200 cursor-pointer
       font-semibold text-white font-starwarsalternate'
        >
          {name}
        </Link>
        <div className='w-full h-[1px] bg-gray-600' />
      </div>

      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Model:</h4>
        <p className='text-lg text-gray-300 line-clamp-4 text-ellipsis'>
          {model}
        </p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>
          Capacidad de carga:
        </h4>
        <p className='text-lg text-gray-300'>{cargo_capacity}</p>
      </div>
      <div className='mb-4'>
        <h4 className='text-lg font-semibold text-white'>Costo en creditos:</h4>
        <p className='text-lg text-gray-300'>{cost_in_credits}</p>
      </div>

      <div className='flex w-full justify-end'>
        <Link href={`/starships/${id}`}>
          <button className='bg-yellow-sw hover:bg-[#bc9803] transition-colors duration-200 text-black px-4 py-2 rounded-md font-semibold '>
            Ver más
          </button>
        </Link>
      </div>
    </article>
  );
}
