import { Character } from '@/app/characters/models/character.t';
import { Starship } from '../../models/starship.t';
import Link from 'next/link';
import { Film } from '@/app/films/models/film.t';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

interface StarshipDetailProps {
  starship: Starship | undefined;
}

export default function StarshipDetail({ starship }: StarshipDetailProps) {
  return (
    <>
      {!starship && (
        <div className='grid place-content-center h-[400px]'>
          <h1 className='text-2xl'>Nave no encontrada</h1>
        </div>
      )}

      <div className='mb-4'>
        <Link href='/starships' className='flex items-center gap-2 w-fit'>
          <ArrowLeftIcon className='h-6 w-6 text-white' />
          <span className='text-white font-starwarsalternate text-lg'>
            Volver a naves
          </span>
        </Link>
      </div>

      {starship && (
        <div className='flex flex-col gap-4 rounded-lg p-4 justify-center items-center bg-light-gray'>
          <h1 className='sm:text-4xl text-2xl font-starwarsalternate text-white'>
            Nave - {starship.name}
          </h1>
          <div className='w-full h-[1px] bg-gray-600' />

          {/* MAIN CHARACTERISTICS */}
          <div className='flex flex-col gap-4 w-full'>
            <h4 className='sm:text-xl text-lg underline underline-offset-4 text-left font-semibold text-white'>
              Caracteristicas 📝:
            </h4>
            <ul className='flex w-full flex-wrap items-center gap-2'>
              <li className='flex items-center gap-2'>
                <p className='sm:text-lg text-md font-semibold text-white'>
                  Modelo:
                </p>
                <p className='text-base text-gray-300'>
                  {starship.model === 'unknown' ? '- ,' : `${starship.model},`}
                </p>
              </li>

              <li className='flex items-center gap-2'>
                <p className='sm:text-lg text-md font-semibold text-white'>
                  Capacidad de carga:
                </p>
                <p className='text-base text-gray-300'>
                  {starship.cargo_capacity === 'unknown'
                    ? '- ,'
                    : `${starship.cargo_capacity},`}
                </p>
              </li>
              <li className='flex items-center gap-2'>
                <p className='sm:text-lg text-md font-semibold text-white'>
                  Costo en creditos:
                </p>
                <p className='text-base text-gray-300'>
                  {starship.cost_in_credits}.
                </p>
              </li>
            </ul>
          </div>

          {/* CHARACTERS */}
          <div className='flex flex-col gap-4 w-full'>
            <h4 className='sm:text-xl text-lg underline underline-offset-4 text-left font-semibold text-white'>
              Pilotos 👨‍✈️:
            </h4>
            <ul className='flex w-full items-center flex-wrap gap-4'>
              {starship.pilots.length === 0 ? (
                <p className='sm:text-lg text-md text-gray-300'>
                  No se encontrarón personajes que hayan pilotado esta nave.
                </p>
              ) : (
                Array.isArray(starship.pilots) &&
                typeof starship.pilots[0] !== 'string' &&
                (starship.pilots as Character[]).map(
                  (character: Character, index) => (
                    <li
                      key={character.id}
                      className='sm:text-lg text-md text-gray-300 font-starwarsoutline hover:text-yellow-sw transition-colors duration-200 cursor-pointer'
                    >
                      <Link href={`/characters/${character.id}`}>
                        {character.name}
                        {index === starship.pilots.length - 1 ? '.' : ','}
                      </Link>
                    </li>
                  )
                )
              )}
            </ul>
          </div>

          {/* FILMS */}
          <div className='flex flex-col gap-4 w-full'>
            <h4 className='sm:text-xl text-lg underline  underline-offset-4 text-left font-semibold text-white'>
              Peliculas 🍿:
            </h4>
            <ul className='flex gap-8 w-full flex-col'>
              {starship.films.length === 0 ? (
                <p className='text-lg text-gray-300'>
                  No se encontrarón peliculas en las que haya participado este
                  personaje.
                </p>
              ) : (
                Array.isArray(starship.films) &&
                typeof starship.films[0] !== 'string' &&
                (starship.films as Film[]).map((film: Film) => (
                  <li
                    key={film.id}
                    className='flex flex-col items-center gap-3 w-full'
                  >
                    <Link
                      href={`/films/${film.id}`}
                      className='text-lg text-left text-white hover:text-yellow-sw transition-colors duration-200 cursor-pointer font-starwarsalternate'
                    >
                      {film.title}
                    </Link>
                    <p className='text-base text-gray-300'>
                      {film.opening_crawl}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
