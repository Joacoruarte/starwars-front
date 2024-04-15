'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const routes = [
    {
      name: 'Personajes',
      path: '/characters',
    },
    {
      name: 'Peliculas',
      path: '/films',
    },
    {
      name: 'Naves',
      path: '/starships',
    },
    {
      name: 'Planetas',
      path: '/planets',
    },
  ];

  return (
    <nav className='my-8 flex flex-col gap-8'>
      <Image
        src={'/images/starwars-logo.png'}
        className='starwars-logo'
        width={200}
        height={200}
        priority
        alt='Starwars logo'
      />

      <ul className={`flex flex-row sm:gap-8 gap-4 sm:flex-nowrap flex-wrap`}>
        {routes.map((route) => (
            <li
                key={route.path}
                className={clsx(
                'cursor-pointer sm:text-2xl text-base font-starwarsoutline hover:text-yellow-400 transition-all duration-200',
                {
                    ['underline underline-offset-8 text-yellow-400']: pathname === route.path,
                }
                )}
            >
                <Link prefetch={false} href={route.path}>{route.name}</Link>
            </li>
        ))}
      </ul>
    </nav>
  );
}
