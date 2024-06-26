'use client';
import React from 'react';
import { Film } from '../../models/film.t';
import { Character } from '@/app/characters/models/character.t';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';

interface FilmDetailProps {
  film: Film | undefined;
}

export default function FilmDetail({ film }: FilmDetailProps) {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <>
      {!film && (
        <div className='grid place-content-center h-[400px]'>
          <h1 className='text-2xl'>Pelicula no econtrada</h1>
        </div>
      )}

      <div className='mb-4'>
        <button onClick={goBack} className='flex items-center gap-2 w-fit'>
          <ArrowLeftIcon className='h-6 w-6 text-white' />
          <span className='text-white font-starwarsalternate text-lg'>
            Volver
          </span>
        </button>
      </div>

      {film && (
        <div className='flex flex-col gap-4 rounded-lg p-4 justify-center items-center bg-light-gray'>
          <h1 className='sm:text-4xl text-2xl  font-starwarsalternate text-white'>
            {film.title}
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
                  Director:
                </p>
                <p className='text-base text-gray-300'>
                  {film.director === 'unknown' ? '- ,' : `${film.director},`}
                </p>
              </li>

              <li className='flex items-center gap-2'>
                <p className='sm:text-lg text-md font-semibold text-white'>
                  Productor:
                </p>
                <p className='text-base text-gray-300'>
                  {film.producer === 'unknown' ? '- ,' : `${film.producer},`}
                </p>
              </li>

              <li className='flex items-center gap-2'>
                <p className='sm:text-lg text-md font-semibold text-white'>
                  Fecha de lanzamiento:
                </p>
                <p className='text-base text-gray-300'>{film.release_date}.</p>
              </li>
            </ul>
          </div>

          {/* CHARACTERS */}
          <div className='flex flex-col gap-4 w-full'>
            <h4 className='sm:text-xl text-lg underline underline-offset-4 text-left font-semibold text-white'>
              Personajes 🧍‍♂️:
            </h4>
            <ul className='flex w-full items-center flex-wrap gap-4'>
              {Array.isArray(film.characters) &&
                typeof film.characters[0] !== 'string' &&
                (film.characters as Character[]).map(
                  (character: Character, index) => (
                    <li
                      key={character.id}
                      className='sm:text-lg text-md text-gray-300 font-starwarsoutline hover:text-yellow-sw transition-colors duration-200 cursor-pointer'
                    >
                      <Link href={`/characters/${character.id}`}>
                        {character.name}
                        {index === film.characters.length - 1 ? '.' : ','}
                      </Link>
                    </li>
                  )
                )}
            </ul>
          </div>

          {/* DESCRIPTION */}
          <div className='flex flex-col gap-4 w-full'>
            <h4 className='sm:text-xl text-lg underline underline-offset-4 text-left font-semibold text-white'>
              Descripción 📜:
            </h4>
            <p className='text-lg text-gray-300'>{film.opening_crawl}</p>
          </div>
        </div>
      )}
    </>
  );
}
