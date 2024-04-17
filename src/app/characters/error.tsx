'use client'; // Error components must be Client Components

import Link from 'next/link';
import { useEffect } from 'react';
import { poppins } from '../fonts';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const goBack = () => router.back();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={`${poppins.className} grid place-content-center h-[60dvh]`}>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl'>¡Ups! algo salio mal</h2>
        <button className='common-button' onClick={() => reset()}>
          Intentarlo denuevo
        </button>
        <button
          onClick={goBack}
          className='underline text-center underline-offset-4'
        >
          Volver
        </button>
      </div>
    </div>
  );
}
