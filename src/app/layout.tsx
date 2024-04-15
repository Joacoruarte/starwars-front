import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Navbar } from '../components';

export const metadata: Metadata = {
  title: 'Starwars App - conexa',
  description: 'this is a starwars app made with nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main className='pb-10'>{children}</main>
      </body>
    </html>
  );
}
