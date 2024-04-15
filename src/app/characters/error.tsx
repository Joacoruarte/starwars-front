'use client'; // Error components must be Client Components

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Intentarlo denuevo</button>
      <Link
        prefetch={false}
        href='/characters'
        className='text-underline text-underline-offset-4'
      >
        Volver a personajes
      </Link>
    </div>
  );
}
