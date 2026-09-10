'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './shared/CartProvider';
import HeroCarousel from './shared/HeroCarousel';

const arrivals = [
  { name: 'Vestido Colette', price: 'S/ 159', detail: 'Años 70 · talla M', color: 'bg-[#e7c7b6]' },
  { name: 'Blusa Margot', price: 'S/ 89', detail: 'Seda recuperada · única', color: 'bg-[#f59eb3]' },
  { name: 'Abrigo Anaïs', price: 'S/ 220', detail: 'Lana · pieza especial', color: 'bg-[#7f263b]' },
];

export default function Home() {
  const { addItem } = useCart();

  return (
    <main id='top' className='min-h-screen bg-[#fcf5ed] text-[#321b1f] selection:bg-[#f59eb3] selection:text-[#321b1f]'>
      <section className='grid border-b border-[#321b1f]/20 lg:min-h-[650px] lg:grid-cols-[.95fr_1.05fr]'>
        <div className='flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-[clamp(3rem,8vw,8rem)]'>
          <p className='mb-7 font-mono text-[10px] uppercase tracking-[0.15em] text-[#c30028]'>
            Curaduría de segunda mano · Lima
          </p>
          <h1 className='font-serif text-[clamp(3.8rem,7vw,7rem)] leading-[.82] tracking-[-0.075em]'>
            Prendas que
            <br />
            <i className='font-normal'>vuelven a vivir.</i>
          </h1>
          <p className='mt-8 max-w-sm text-[17px] leading-relaxed text-[#321b1f]/80'>
            Una selección pequeña de ropa con historia, textura y personalidad para tu propio archivo.
          </p>
          <Link
            href='/tienda'
            className='mt-8 inline-flex w-fit items-center gap-7 bg-[#c30028] px-5 py-4 font-mono text-[11px] uppercase tracking-[0.1em] text-[#fcf5ed] transition hover:bg-[#321b1f]'
          >
            Explorar la colección <span className='text-lg'>↘</span>
          </Link>
        </div>
        <HeroCarousel items={arrivals} />
      </section>

      <section className='grid gap-12 px-6 py-20 sm:px-12 lg:grid-cols-[.72fr_1.28fr] lg:px-20 lg:py-32'>
        <div>
          <p className='mb-7 font-mono text-[10px] uppercase tracking-[0.15em] text-[#c30028]'>01 — recién llegado</p>
          <h2 className='font-serif text-[clamp(3rem,5.5vw,5.4rem)] leading-[.83] tracking-[-.07em]'>
            El pequeño
            <br />
            <i className='font-normal'>hallazgo</i> de hoy.
          </h2>
          <p className='mt-8 max-w-[16rem] leading-relaxed text-[#321b1f]/75'>
            Cada prenda aparece una sola vez. Cuando se va, queda en tu historia.
          </p>
          <Link
            href='/tienda'
            className='mt-8 inline-flex border-b border-[#c30028] pb-1 font-mono text-[11px] uppercase tracking-[0.11em] text-[#c30028]'
          >
            Ver todas las prendas →
          </Link>
        </div>
        <div className='grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3'>
          {arrivals.map((piece, index) => (
            <article key={piece.name} className={index === 2 ? 'col-span-2 sm:col-span-1' : ''}>
              <div className={`group relative aspect-[.73] overflow-hidden ${piece.color}`}>
                <Image
                  src='/dress.avif'
                  alt={piece.name}
                  fill
                  sizes='(max-width: 640px) 50vw, 30vw'
                  className='object-cover mix-blend-multiply saturate-[.72] transition duration-500 group-hover:scale-105'
                />
                <span className='absolute left-3 top-3 font-mono text-[10px] text-[#321b1f]/70'>0{index + 1}</span>
                <button
                  onClick={addItem}
                  className='absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-[#fcf5ed] text-xl text-[#c30028] transition hover:bg-[#c30028] hover:text-[#fcf5ed] sm:opacity-0 sm:group-hover:opacity-100'
                  aria-label={`Agregar ${piece.name} a la bolsa`}
                >
                  +
                </button>
              </div>
              <div className='mt-3 flex justify-between gap-3'>
                <div>
                  <h3 className='font-serif text-lg'>{piece.name}</h3>
                  <p className='mt-1 text-xs text-[#321b1f]/60'>{piece.detail}</p>
                </div>
                <span className='whitespace-nowrap text-sm'>{piece.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        id='manifiesto'
        className='grid gap-10 bg-[#c30028] px-6 py-20 text-[#fcf5ed] sm:px-12 lg:grid-cols-[1.3fr_.7fr] lg:gap-20 lg:px-[clamp(3rem,13vw,13rem)] lg:py-32'
      >
        <blockquote className='font-serif text-[clamp(2.5rem,4.8vw,4.7rem)] leading-[.95] tracking-[-.065em]'>
          “No buscamos lo nuevo.
          <br />
          Buscamos lo que <i className='font-normal'>aún tiene algo que decir.</i>”
        </blockquote>
        <div className='self-end text-[17px] leading-relaxed text-[#fcf5ed]/85'>
          Polillas Vintage nació para encontrar belleza en las prendas que ya han tenido una vida. Elegimos con ojo
          curioso, cuidamos cada detalle y dejamos espacio para que lo hagas tuyo.
          <a href='#visitanos' className='mt-6 block font-mono text-[11px] uppercase tracking-[.1em] text-[#f59eb3]'>
            Conoce nuestra historia →
          </a>
        </div>
      </section>
      <section id='visitanos' className='px-6 py-24 text-center sm:px-12 sm:py-36'>
        <p className='mb-6 font-mono text-[10px] uppercase tracking-[.15em] text-[#c30028]'>El closet de polillas</p>
        <h2 className='font-serif text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[.84] tracking-[-.075em]'>
          Ven a<br />
          <i className='font-normal'>rebuscar.</i>
        </h2>
        <p className='mt-7 leading-relaxed text-[#321b1f]/75'>
          Próximamente en Lima.
          <br />
          Síguenos para conocer cada pop-up.
        </p>
        <a
          className='mt-7 inline-block border-b border-[#c30028] pb-1 font-mono text-[11px] uppercase tracking-[.1em] text-[#c30028]'
          href='https://instagram.com'
          target='_blank'
          rel='noreferrer'
        >
          @polillasvintage ↗
        </a>
      </section>
    </main>
  );
}
