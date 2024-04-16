import { Character } from '@/app/characters/models/character.t';
import { Film } from '@/app/films/models/film.t';
import { Planet } from '@/app/planets/models/planet.t';
import Link from 'next/link';
import React from 'react';

interface PlanetDetailProps {
  planet: Planet | undefined;
}

export default function PlanetDetail({ planet }: PlanetDetailProps) {
  return (
    <>
      {!planet && (
        <div>
          <h1>Planet not found</h1>
        </div>
      )}

      {planet && (
        <div className='flex flex-col gap-4 rounded-lg p-4 justify-center items-center bg-light-gray'>
          <h1 className='text-4xl font-starwarsalternate text-white'>
            {planet.name}
          </h1>
          <div className='w-full h-[1px] bg-gray-600' />

          {/* MAIN CHARACTERISTICS */}
          <div className='flex flex-col gap-4 w-full'>
            <h4 className='text-xl underline underline-offset-4 text-left font-semibold text-white'>
              Caracteristicas 📝:
            </h4>
            <ul className='flex w-full items-center gap-2'>
              <li className='flex items-center gap-2'>
                <p className='text-lg font-semibold text-white'>Clima:</p>
                <p className='text-base text-gray-300'>
                  {planet.climate === 'unknown' ? '- ,' : `${planet.climate},`}
                </p>
              </li>

              <li className='flex items-center gap-2'>
                <p className='text-lg font-semibold text-white'>Gravedad:</p>
                <p className='text-base text-gray-300'>
                  {planet.gravity === 'unknown' ? '- ,' : `${planet.gravity},`}
                </p>
              </li>
              <li className='flex items-center gap-2'>
                <p className='text-lg font-semibold text-white'>Poblacion:</p>
                <p className='text-base text-gray-300'>{planet.population}</p>
              </li>
              <li className='flex items-center gap-2'>
                <p className='text-lg font-semibold text-white'>Terreno:</p>
                <p className='text-base text-gray-300'>{planet.terrain}.</p>
              </li>
            </ul>
          </div>

          {/* CHARACTERS */}
          <div className='flex flex-col gap-4 w-full'>
            <h4 className='text-xl underline underline-offset-4 text-left font-semibold text-white'>
              Pilotos 👨‍✈️:
            </h4>
            <ul className='flex w-full items-center flex-wrap gap-4'>
              {Array.isArray(planet.residents) &&
                typeof planet.residents[0] !== 'string' &&
                (planet.residents as Character[]).map(
                  (character: Character, index) => (
                    <li
                      key={character.id}
                      className='text-lg text-gray-300 font-starwarsoutline hover:text-yellow-sw transition-colors duration-200 cursor-pointer'
                    >
                      <Link href={`/characters/${character.id}`}>
                        {character.name}
                        {index === planet.residents.length - 1 ? '.' : ','}
                      </Link>
                    </li>
                  )
                )}
            </ul>
          </div>

          {/* FILMS */}
          <div className='flex flex-col gap-4 w-full'>
            <h4 className='text-xl underline  underline-offset-4 text-left font-semibold text-white'>
              Peliculas 🍿:
            </h4>
            <ul className='flex gap-8 w-full flex-col'>
              {planet.films.length === 0 ? (
                <p className='text-lg text-gray-300'>
                  No se encontrarón peliculas en las que haya participado este
                  personaje.
                </p>
              ) : (
                Array.isArray(planet.films) &&
                typeof planet.films[0] !== 'string' &&
                (planet.films as Film[]).map((film: Film) => (
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
