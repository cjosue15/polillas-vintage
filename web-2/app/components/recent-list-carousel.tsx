'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { formatPrice, products } from '../../lib/products';

const recentProducts = [...products].reverse();

export function RecentListCarousel() {
  const railRef = useRef<HTMLDivElement>(null);

  const moveRail = (direction: 1 | -1) => {
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.78, behavior: 'smooth' });
  };

  return (
    <section id='shop' className='py-14 sm:py-20' aria-labelledby='recent-title'>
      <div className='grid gap-8 lg:grid-cols-[minmax(210px,.78fr)_minmax(0,2.22fr)] lg:gap-12'>
        <div className='flex flex-col justify-between border-b border-[#232021] pb-6 lg:border-b-0 lg:pb-10'>
          <div>
            <p className='mb-5 text-[10px] font-bold uppercase tracking-[0.17em]'>Recién encontrado</p>
            <h2 id='recent-title' className='m-0 max-w-[260px] text-[clamp(3rem,4.1vw,5rem)] font-extrabold leading-[.84] tracking-[-.07em]'>
              Últimas<br />
              <em className='font-normal'>piezas.</em>
            </h2>
            <p className='mt-7 max-w-[230px] text-sm leading-relaxed opacity-70'>
              Entraron al archivo esta semana. Una vez que se van, no vuelven.
            </p>
          </div>
          <Link href='/shop' className='mt-8 inline-flex w-fit items-center rounded-full border border-[#171515] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[#171515] hover:text-[#fcf5ed]'>
            Ver la tienda ↗
          </Link>
        </div>

        <div className='min-w-0'>
          <div ref={railRef} className='flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] sm:gap-6'>
            {recentProducts.map((product) => (
              <article key={product.slug} className='group w-[min(70vw,340px)] shrink-0 snap-start'>
                <Link href={`/product/${product.slug}`} className={`relative block aspect-[3/4] overflow-hidden border border-[#171515] ${product.tone}`}>
                  <span className='absolute left-3 top-3 z-10 bg-[#fcf5ed] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em]'>
                    {product.tag}
                  </span>
                  <Image
                    src='/dress.avif'
                    alt={product.name}
                    fill
                    sizes='(max-width: 640px) 70vw, 340px'
                    className={`object-cover ${product.position} mix-blend-multiply transition duration-500 group-hover:scale-105`}
                  />
                </Link>
                <div className='mt-3 flex items-start justify-between gap-3 text-sm'>
                  <div>
                    <h3 className='font-bold'>{product.name}</h3>
                    <p className='mt-1 text-[9px] font-bold uppercase tracking-[0.12em] opacity-55'>{product.category}</p>
                  </div>
                  <span className='shrink-0 font-bold'>{formatPrice(product.price)}</span>
                </div>
              </article>
            ))}
          </div>
          <div className='mt-4 flex justify-end gap-2'>
            <button type='button' onClick={() => moveRail(-1)} className='grid h-12 w-12 place-items-center border border-[#171515] text-2xl transition-colors hover:bg-[#171515] hover:text-[#fcf5ed]' aria-label='Ver piezas anteriores'>
              ←
            </button>
            <button type='button' onClick={() => moveRail(1)} className='grid h-12 w-12 place-items-center border border-[#171515] text-2xl transition-colors hover:bg-[#171515] hover:text-[#fcf5ed]' aria-label='Ver más piezas'>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
