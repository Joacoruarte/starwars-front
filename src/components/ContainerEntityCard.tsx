import Link from 'next/link';

interface ContainerEntityCardProps {
  id: string;
  entityTitle: string;
  redirectPath: string;
  children: React.ReactNode;
}

export default function ContainerEntityCard({
  id,
  entityTitle,
  redirectPath,
  children,
}: ContainerEntityCardProps) {
  return (
    <article className='bg-light-gray rounded-xl p-6 shadow-xl'>
      <div className='mb-4'>
        <Link prefetch={true} href={`/characters/${id}`}>
          <p className='text-xl font-semibold text-white hover:text-yellow-sw transition-colors duration-200 cursor-pointer font-starwarsalternate'>
            {entityTitle}
          </p>
        </Link>
        <div className='w-full h-[1px] bg-gray-600' />
      </div>
      {children}
      <div className='flex w-full justify-end'>
        <Link prefetch={true} href={`/${redirectPath}/${id}`}>
          <button className='common-button'>Ver más</button>
        </Link>
      </div>
    </article>
  );
}
