'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { readCart } from '../store';
import Container from './container';

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const previousPathname = useRef<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setCartCount(readCart().length);
    update();
    window.addEventListener('cart-updated', update);
    return () => window.removeEventListener('cart-updated', update);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 8) {
        setIsHidden(false);
      } else if (Math.abs(scrollDelta) > 5) {
        setIsHidden(scrollDelta > 0);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (previousPathname.current && previousPathname.current !== pathname && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      lastScrollY.current = 0;
      setIsHidden(false);
    }

    previousPathname.current = pathname;
  }, [pathname]);

  return (
    <div
      className={`sticky top-0 z-50 bg-arena transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
      onFocusCapture={() => setIsHidden(false)}
    >
      <Container>
        <header className='relative z-20 flex items-center justify-between border-b border-negro pb-5'>
          <Link className='flex items-center gap-3' href='/#inicio' aria-label='Polillas Vintage, inicio'>
            <Image
              src='/logo.webp'
              alt='Polillas Vintage'
              width={80}
              height={60}
              className='object-contain mix-blend-multiply'
              priority
            />
            {/* <span className='hidden text-[10px] font-bold uppercase leading-[1.05] tracking-[0.18em] sm:block'>
              Polillas
              <br />
              Vintage
            </span> */}
          </Link>

          <nav
            className='hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[0.15em] md:flex'
            aria-label='Navegación principal'
          >
            <Link className='border-b border-transparent pb-1 transition-colors hover:border-current' href='/'>
              Inicio
            </Link>
            <Link className='border-b border-transparent pb-1 transition-colors hover:border-current' href='/shop'>
              Tienda
            </Link>
            <Link className='border-b border-transparent pb-1 transition-colors hover:border-current' href='/#historia'>
              Historia
            </Link>
            <Link className='border-b border-transparent pb-1 transition-colors hover:border-current' href='/#contacto'>
              Contacto
            </Link>
          </nav>

          <div className='flex items-center gap-2'>
            <Link
              className='flex items-center gap-2 rounded-full border border-[#171515] px-3.5 py-2.75 text-[10px] font-bold uppercase tracking-[0.14em]'
              href='/cart'
              aria-label={`${cartCount} productos en carrito`}
            >
              Bolsa{' '}
              <span className='inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#f59eb3] text-[9px]'>
                {cartCount}
              </span>
            </Link>
            <button
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#171515] md:hidden'
              onClick={() => {
                setMenuOpen((open) => !open);
                setIsHidden(false);
              }}
              aria-expanded={menuOpen}
              aria-label='Abrir menú'
            >
              <span className='flex flex-col gap-1.5'>
                <span className='block h-px w-5 bg-current' />
                <span className='block h-px w-5 bg-current' />
              </span>
            </button>
          </div>

          {menuOpen && (
            <nav
              className='absolute left-0 right-0 top-full flex flex-col gap-4 border-b border-negro bg-arena px-5 py-5 text-xs font-bold uppercase tracking-[0.15em] md:hidden'
              aria-label='Menú móvil'
            >
              <Link href='/#inicio' onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
              <Link href='/#shop' onClick={() => setMenuOpen(false)}>
                Tienda
              </Link>
              <Link href='/#historia' onClick={() => setMenuOpen(false)}>
                Historia
              </Link>
              <Link href='/#contacto' onClick={() => setMenuOpen(false)}>
                Contacto
              </Link>
            </nav>
          )}
        </header>
      </Container>
    </div>
  );
}

export default Header;
