'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import HamburguerMenu from './HamburguerMenu/HamburguerMenu';

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

export default function Navbar() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  const handleToggle = (isActive: boolean) => {
    setIsActive(isActive);
  };

  const handleClickLink = () => {
    if (window.innerWidth <= 640) setIsActive(false);
  };

  return (
    <nav className='mb-8 sm:bg-none bg-gray-900 p-4 flex items-center lg:flex-row sm:flex-col flex-row justify-between gap-8'>
      <div className='sm:w-max sm:h-max w-[120px]'>
        <Link href={'/'}>
          <Image
            src={'/images/starwars-logo.png'}
            className='starwars-logo'
            width={150}
            height={150}
            priority
            alt='Starwars logo'
          />
        </Link>
      </div>

      <HamburguerMenu isActive={isActive} onToggle={handleToggle} />

      <ul
        className={clsx({
          ['sm:flex hidden sm:gap-8']: !isActive,
          ['navbar-list-container']:
            isActive,
        })}
      >
        {routes.map((route) => (
          <li
            key={route.path}
            className={clsx(
              'cursor-pointer sm:text-xl text-3xl font-starwarsoutline hover:text-yellow-400 transition-all duration-200',
              {
                ['underline underline-offset-8 text-yellow-400']:
                  pathname === route.path,
                ['animate-jump animate-once animate-ease-out animate-duration-500']:
                  isActive,
              }
            )}
          >
            <Link onClick={handleClickLink} prefetch={false} href={route.path}>
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
