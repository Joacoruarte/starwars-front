import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='w-full grid place-content-center h-[400px]'>
      <div className='flex flex-col gap-4 justify-center items-center p-4'>
        <h2 className='text-2xl text-center'>Pagina no encontrada</h2>
        <p className='text-lg text-center'>
          La pagina que intentas acceder no existe o ha sido eliminada.
        </p>
        <Link href='/' className='underline underline-offset-4 text-center'>
          Return Home
        </Link>
      </div>
    </div>
  );
}
