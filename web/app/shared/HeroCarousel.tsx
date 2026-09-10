'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type Arrival = {
  name: string;
  price: string;
  detail: string;
  color: string;
};

type HeroCarouselProps = {
  items: Arrival[];
};

function HeroCarousel({ items }: HeroCarouselProps) {
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [captionVisible, setCaptionVisible] = useState(true);
  const transitionTimeout = useRef<number | undefined>(undefined);
  const current = items[slide];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(
    () => () => {
      if (transitionTimeout.current !== undefined) {
        window.clearTimeout(transitionTimeout.current);
      }
    },
    [],
  );

  const showSlide = useCallback(
    (nextSlide: number) => {
      if (isTransitioning || nextSlide === slide) return;

      setIsTransitioning(true);
      setCaptionVisible(false);
      transitionTimeout.current = window.setTimeout(() => {
        setSlide(nextSlide);
        window.requestAnimationFrame(() => {
          setCaptionVisible(true);
          setIsTransitioning(false);
        });
      }, 180);
    },
    [isTransitioning, slide],
  );

  const next = useCallback(() => showSlide((slide + 1) % items.length), [items.length, showSlide, slide]);
  const previous = useCallback(
    () => showSlide((slide - 1 + items.length) % items.length),
    [items.length, showSlide, slide],
  );

  useEffect(() => {
    if (isPaused || prefersReducedMotion || items.length < 2) return;

    const interval = window.setInterval(next, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused, items.length, next, prefersReducedMotion]);

  return (
    <div
      className={`relative min-h-[490px] overflow-hidden transition-colors duration-700 ${current.color}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-roledescription='carrusel'
      aria-label='Últimas prendas'
    >
      {items.map((item, index) => (
        <div
          key={item.name}
          aria-hidden={index !== slide}
          className={`absolute inset-0 transition-[opacity,transform] duration-1000 ease-out ${index === slide ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
        >
          <Image
            src='/dress.avif'
            alt={index === slide ? item.name : ''}
            fill
            priority={index === 0}
            sizes='(max-width: 1024px) 100vw, 55vw'
            className='object-cover object-center mix-blend-multiply saturate-[.78] contrast-[.92]'
          />
        </div>
      ))}
      <div className='absolute inset-0 bg-gradient-to-t from-[#321b1f]/45 via-transparent to-transparent' />
      <div
        className={`absolute left-5 top-5 rounded-full border border-[#fcf5ed]/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#fcf5ed] transition-[opacity,transform] duration-300 ease-out ${captionVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
      >
        Últimas piezas · 0{slide + 1}/0{items.length}
      </div>
      <div className='absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-[#fcf5ed] sm:p-9'>
        <div
          aria-live='polite'
          className={`transition-[opacity,transform] duration-300 ease-out ${captionVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
        >
          <p className='mb-1 font-mono text-[10px] uppercase tracking-[0.13em] text-[#fcf5ed]/70'>Recién llegada</p>
          <h2 className='font-serif text-4xl tracking-[-.06em]'>{current.name}</h2>
          <p className='mt-1 text-sm'>
            {current.price} · {current.detail}
          </p>
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={previous}
            className='grid size-10 place-items-center border border-[#fcf5ed]/70 transition hover:bg-[#fcf5ed] hover:text-[#321b1f]'
            aria-label='Prenda anterior'
          >
            ←
          </button>
          <button
            type='button'
            onClick={next}
            className='grid size-10 place-items-center border border-[#fcf5ed]/70 transition hover:bg-[#fcf5ed] hover:text-[#321b1f]'
            aria-label='Siguiente prenda'
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
