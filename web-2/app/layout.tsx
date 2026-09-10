import type { Metadata } from 'next';
import './globals.css';
import Header from './components/shared/header';
import Footer from './components/shared/footer';

export const metadata: Metadata = {
  title: 'Polillas Vintage | Ropa con otra historia',
  description: 'Vintage fashion curada desde Lima, Perú.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='es' className='h-full scroll-smooth antialiased'>
      <body className='min-h-full flex flex-col'>
        <Header />
        {children}
        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
