import { Film } from '@/app/films/models/film.t';
import { Character } from '../../models/character.t';
import Link from 'next/link';
import { Starship } from '@/app/starships/models/starship.t';

interface CharacterDetailProps {
  character: Character | undefined;
}

export default function CharacterDetail({ character }: CharacterDetailProps) {
  return (
    <>
      {!character && (
        <div className='grid place-content-center h-[400px]'>
          <h1 className='text-2xl'>Personaje no encontrado</h1>
        </div>
      )}

      {character && (
        <div className='flex flex-col gap-4 rounded-lg p-4 justify-center items-center bg-light-gray'>
          <h1 className='text-4xl font-starwarsalternate text-white'>
            {character.name}
          </h1>
          <div className='w-full h-[1px] bg-gray-600' />

          {/* MAIN CHARACTERISTICS */}
          <div className='flex flex-col gap-4 w-full'>
            <h4 className='text-xl underline underline-offset-4 text-left font-semibold text-white'>
              Caracteristicas 📝:
            </h4>
            <ul className='flex w-full items-center gap-2'>
              <li className='flex items-center gap-2'>
                <p className='text-lg font-semibold text-white'>Altura:</p>
                <p className='text-base text-gray-300'>
                  {character.height === 'unknown'
                    ? '- ,'
                    : `${character.height} cm,`}
                </p>
              </li>

              <li className='flex items-center gap-2'>
                <p className='text-lg font-semibold text-white'>Peso:</p>
                <p className='text-base text-gray-300'>
                  {character.mass === 'unknown'
                    ? '- ,'
                    : `${character.mass} kg,`}
                </p>
              </li>

              <li className='flex items-center gap-2'>
                <p className='text-lg font-semibold text-white'>Genero:</p>
                <p className='text-base text-gray-300'>{character.gender},</p>
              </li>

              <li className='flex items-center gap-2'>
                <p className='text-lg font-semibold text-white'>Especie:</p>
                <p className='text-base text-gray-300'>
                  {character.species?.[0]},
                </p>
              </li>
              <li className='flex items-center gap-2'>
                <p className='text-base font-semibold text-white'>
                  Color de pelo:
                </p>
                <p className='text-base text-gray-300'>
                  {character.hair_color}.
                </p>
              </li>
            </ul>
          </div>

          {/* STARSHIPS */}
          <div className='flex flex-col gap-4 w-full'>
            <h4 className='text-xl underline  underline-offset-8 text-left font-semibold text-white'>
              Naves espaciales 🚀:
            </h4>

            <ul className='flex gap-8 w-full items-center'>
              {character.starships.length === 0 ? (
                <p className='text-lg  text-gray-300'>
                  No cuenta con naves espaciales este personaje.
                </p>
              ) : (
                Array.isArray(character.starships) &&
                typeof character.starships[0] !== 'string' &&
                (character.starships as Starship[]).map(
                  (starship: Starship) => (
                    <li key={starship.id} className='flex items-center gap-3'>
                      <Link
                        href={`/starships/${starship.id}`}
                        className='text-lg text-left text-white hover:text-yellow-sw transition-colors duration-200 cursor-pointer font-starwarsoutline'
                      >
                        {starship.name}
                      </Link>
                    </li>
                  )
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
              {character.films.length === 0 ? (
                <p className='text-lg text-gray-300'>
                  No se encontrarón peliculas en las que haya participado este
                  personaje.
                </p>
              ) : (
                Array.isArray(character.films) &&
                typeof character.films[0] !== 'string' &&
                (character.films as Film[]).map((film: Film) => (
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
