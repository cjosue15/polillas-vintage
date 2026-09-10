'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from './CartProvider';

function BagIcon() {
  return (
    <svg viewBox='0 0 24 24' className='size-5' aria-hidden='true'>
      <path
        d='M5.5 8.5h13l-1 12h-11l-1-12ZM9 9V6.7C9 4.7 10.2 3.5 12 3.5s3 1.2 3 3.2V9'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  return (
    <div
      className={`sticky inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300 ${scrolled ? 'bg-[#fcf5ed]/85 shadow-[0_1px_0_rgba(50,27,31,.12)] backdrop-blur-xl' : 'bg-[#fcf5ed]'}`}
    >
      <header className='flex h-28 items-center justify-between border-b border-[#321b1f]/20 px-5 sm:px-10 lg:px-20'>
        <Link href='/' className='flex items-center' aria-label='Polillas Vintage, inicio'>
          <Image width={120} height={90.47} src='/logo.webp' alt='Polillas Vintage' priority />
        </Link>
        <nav className='hidden items-center gap-9 font-mono text-[11px] uppercase tracking-[0.12em] lg:flex'>
          <Link href='/tienda' className='transition hover:text-[#c30028]'>
            Tienda
          </Link>
          <a href='#manifiesto' className='transition hover:text-[#c30028]'>
            Nosotras
          </a>
          <a href='#visitanos' className='transition hover:text-[#c30028]'>
            Visítanos
          </a>
        </nav>
        <Link
          href='/carrito'
          className='flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em]'
          aria-label={`Bolsa, ${itemCount} artículos`}
        >
          <BagIcon />
          <span className='hidden sm:inline'>Bolsa</span>
          <span className='grid size-[18px] place-items-center rounded-full bg-[#c30028] text-[10px] text-[#fcf5ed]'>
            {itemCount}
          </span>
        </Link>
      </header>
    </div>
  );
}

export default Header;
