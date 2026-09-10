'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function AboutPolillas() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      const range = window.innerHeight + bounds.height;
      setProgress(Math.min(Math.max((window.innerHeight - bounds.top) / range, 0), 1));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const textOffset = -progress * 34;

  return (
    <section
      ref={sectionRef}
      id='historia'
      className='relative overflow-hidden border-y border-negro py-24 sm:min-h-175 lg:min-h-220 sm:py-32'
    >
      <div
        className='relative z-2 mx-auto max-w-290 text-center will-change-transform'
        style={{ transform: `translate3d(0, ${textOffset}px, 0)` }}
      >
        <p className='mb-10 text-[10px] font-bold uppercase tracking-[0.18em]'>Nosotros / Polillas Vintage</p>
        <h2 className='m-0 text-[clamp(3.15rem,13.2vw,6.7rem)] leading-[.9] tracking-[-.065em] sm:text-[clamp(2.65rem,6.1vw,6.7rem)] sm:leading-[.98]'>
          Elegimos piezas con pasado
          <br className='hidden sm:block' />
          <em className='font-serif font-normal italic'> para que sigan contando historias.</em>
          <span aria-hidden='true' className='ml-3 inline-block text-[.65em] align-[.04em] not-italic'>
            🦋
          </span>
        </h2>
        <p className='mx-auto mt-9 max-w-117.5 text-sm leading-relaxed opacity-70'>
          Polillas es una selección viva de prendas vintage y segunda mano, encontrada en Lima para volver a ser usada,
          querida y vista de otra manera.
        </p>
      </div>

      <div className='inset-x-0 bottom-7 h-57.5 sm:hidden' aria-label='Retratos de las dueñas de Polillas'>
        <figure
          className='absolute bottom-0 left-[7%] z-2 m-0 w-[31vw] overflow-hidden bg-[#d8d0c1] will-change-transform'
          style={{ transform: `translate3d(0, ${-progress * 62}px, 0) rotate(-5deg)` }}
        >
          <Image
            src='/dress.avif'
            alt='Retrato temporal de una dueña de Polillas'
            width={320}
            height={426}
            sizes='31vw'
            className='aspect-3/4 w-full object-cover object-[center_35%] mix-blend-multiply'
          />
        </figure>
        <figure
          className='absolute bottom-5 left-[35%] z-3 m-0 w-[34vw] overflow-hidden bg-[#e7d5d0] will-change-transform'
          style={{ transform: `translate3d(0, ${-progress * 82}px, 0) rotate(2deg)` }}
        >
          <Image
            src='/dress.avif'
            alt=''
            aria-hidden='true'
            width={340}
            height={453}
            sizes='34vw'
            className='aspect-3/4 w-full object-cover object-[72%_38%] mix-blend-multiply'
          />
        </figure>
        <figure
          className='absolute -bottom-2 right-[7%] z-1 m-0 w-[29vw] overflow-hidden bg-[#f59eb3] will-change-transform'
          style={{ transform: `translate3d(0, ${-progress * 104}px, 0) rotate(6deg)` }}
        >
          <Image
            src='/dress.avif'
            alt=''
            aria-hidden='true'
            width={290}
            height={386}
            sizes='29vw'
            className='aspect-3/4 w-full object-cover object-[35%_28%] mix-blend-multiply'
          />
        </figure>
      </div>

      <figure
        className='absolute left-[6%] top-[48%] z-3 m-0 hidden w-[22vw] min-w-29 max-w-62.5 overflow-hidden bg-[#d8d0c1] will-change-transform sm:block'
        style={{ transform: `translate3d(0, ${-progress * 138}px, 0) rotate(-3deg)` }}
      >
        <Image
          src='/dress.avif'
          alt='Retrato temporal de una dueña de Polillas'
          width={500}
          height={665}
          sizes='22vw'
          className='aspect-3/4 w-full object-cover object-[center_35%] mix-blend-multiply'
        />
        <figcaption className='border-t border-negro bg-arena px-2 py-2 text-[8px] font-bold uppercase tracking-[0.12em]'>
          Dueña #01
        </figcaption>
      </figure>

      <figure
        className='absolute right-[7%] top-[16%] z-1 m-0 hidden w-[18vw] min-w-35 max-w-55 overflow-hidden bg-[#e7d5d0] sm:block will-change-transform'
        style={{ transform: `translate3d(0, ${-progress * 184}px, 0) rotate(2deg)` }}
      >
        <Image
          src='/dress.avif'
          alt=''
          aria-hidden='true'
          width={440}
          height={585}
          sizes='18vw'
          className='aspect-3/4 w-full object-cover object-[72%_38%] mix-blend-multiply'
        />
      </figure>

      <figure
        className='absolute bottom-[-4%] left-[46%] z-1 m-0 hidden w-[17vw] min-w-32.5 max-w-52.5 overflow-hidden bg-[#f59eb3] sm:block will-change-transform'
        style={{ transform: `translate3d(0, ${-progress * 216}px, 0) rotate(-5deg)` }}
      >
        <Image
          src='/dress.avif'
          alt=''
          aria-hidden='true'
          width={420}
          height={560}
          sizes='17vw'
          className='aspect-3/4 w-full object-cover object-[35%_28%] mix-blend-multiply'
        />
      </figure>
    </section>
  );
}
