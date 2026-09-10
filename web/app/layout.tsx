import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from './shared/CartProvider';
import Footer from './shared/Footer';
import Header from './shared/Header';

export const metadata: Metadata = {
  title: 'Polillas Vintage | Prendas con historia',
  description: 'Tienda de prendas vintage curadas en Lima.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='es'>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
