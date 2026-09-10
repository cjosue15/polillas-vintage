'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function ArrowUpRight() {
  return (
    <span aria-hidden='true' className='text-lg leading-none'>
      ↗
    </span>
  );
}

export function EditorialHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const scrollStart = window.scrollY;
    const updateTravel = () => {
      frame = 0;
      const distance = Math.min(Math.max(window.scrollY - scrollStart, 0), 520);
      setTravel(distance);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTravel);
    };

    updateTravel();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id='inicio'
      className='relative isolate overflow-hidden border-b border-[#171515] py-10 md:min-h-[clamp(600px,58vw,900px)] md:py-20'
      aria-labelledby='hero-title'
    >
      <div className='md:hidden'>
        <h1
          id='hero-title'
          className="whitespace-nowrap font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-[clamp(5rem,25vw,9.5rem)] font-black uppercase leading-[0.64] tracking-normal text-[#050505]"
          aria-label='Polillas Vintage'
        >
          <span className='block'>Polillas</span>
          <i className='mt-8 ml-[22%] block font-serif text-[0.38em] font-normal italic leading-[0.7] -tracking-widest normal-case'>
            Vintage
          </i>
        </h1>

        <figure
          className='relative z-2 ml-auto mt-12 w-[80%] sm:w-[70%] md:w-[60%] overflow-hidden bg-[#e8d8d0] shadow-[0_15px_35px_#241d1922] will-change-transform'
          style={{ aspectRatio: '0.72', transform: `translate3d(0, ${-travel * 0.08}px, 0)` }}
        >
          <Image
            src='/dress.avif'
            alt='Selección vintage Polillas'
            fill
            priority
            sizes='82vw'
            className='object-cover object-[center_38%]'
          />
          <figcaption className='absolute inset-x-0 bottom-0 flex justify-between bg-[#fcf5edd9] px-3 py-2.75 text-[9px] font-bold uppercase tracking-[0.12em]'>
            <span>01 / 03</span>
            <span>La pieza encontrada</span>
          </figcaption>
        </figure>

        <div className='mt-9 max-w-67.5'>
          <p className='m-0 text-[10px] font-bold uppercase tracking-[0.17em]'>Prendas con otra historia</p>

          <a
            className='inline-flex items-center gap-3.25 border-b border-current pb-1.25 text-[9px] font-bold uppercase tracking-[0.14em]'
            href='#shop'
          >
            Descubrir la colección <ArrowUpRight />
          </a>
        </div>
      </div>

      <div className='mt-8 hidden justify-center md:flex'>
        <h1
          className="relative z-1 whitespace-nowrap text-left font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-[clamp(7rem,18.2vw,19.5rem)] font-black uppercase leading-[0.63] tracking-normal text-[#050505]"
          aria-label='Polillas Vintage'
        >
          <span className='block'>Polillas</span>
          <i className='mt-8 ml-25 block font-serif text-[0.38em] font-normal italic leading-[0.7] -tracking-widest normal-case'>
            Vintage
          </i>
        </h1>
      </div>

      <figure
        className='absolute left-[53%] top-[clamp(175px,20vw,300px)] z-2 m-0 hidden w-[clamp(190px,25vw,390px)] overflow-hidden bg-[#e8d8d0] shadow-[0_15px_35px_#241d1922] will-change-transform md:block'
        style={{ aspectRatio: '0.72', transform: `translate3d(0, ${-travel * 0.15}px, 0)` }}
      >
        <Image
          src='/dress.avif'
          alt='Selección vintage Polillas'
          fill
          priority
          sizes='27vw'
          className='object-cover object-[center_38%]'
        />
        <figcaption className='absolute inset-x-0 bottom-0 flex justify-between bg-[#fcf5edd9] px-3 py-2.75 text-[9px] font-bold uppercase tracking-[0.12em]'>
          <span>01 / 03</span>
          <span>La pieza encontrada</span>
        </figcaption>
      </figure>

      <div className='absolute left-[20%] top-[clamp(395px,35vw,480px)] z-3 hidden w-[min(245px,21vw)] md:block'>
        <p className='m-0 text-[10px] font-bold uppercase tracking-[0.17em]'>Prendas con otra historia</p>

        <a
          className='inline-flex items-center gap-3.25 border-b border-current pb-1.25 text-[9px] font-bold uppercase tracking-[0.14em]'
          href='#shop'
        >
          Descubrir la colección <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}
