'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useCart } from '../shared/CartProvider';

const products = [
  {
    name: 'Vestido Colette',
    category: 'Vestidos',
    price: 159,
    size: 'M',
    note: 'Años 70 · flores pequeñas',
    color: 'bg-[#e7c7b6]',
  },
  {
    name: 'Blusa Margot',
    category: 'Blusas',
    price: 89,
    size: 'S',
    note: 'Seda recuperada · única',
    color: 'bg-[#f59eb3]',
  },
  {
    name: 'Abrigo Anaïs',
    category: 'Abrigos',
    price: 220,
    size: 'M',
    note: 'Lana · pieza especial',
    color: 'bg-[#7f263b]',
  },
  {
    name: 'Falda Elodie',
    category: 'Faldas',
    price: 98,
    size: 'S',
    note: 'Algodón · hecha en Perú',
    color: 'bg-[#e3c4b6]',
  },
  {
    name: 'Camisa Simone',
    category: 'Blusas',
    price: 110,
    size: 'M',
    note: 'Lino · corte relajado',
    color: 'bg-[#d5d1b8]',
  },
  {
    name: 'Vestido Noémie',
    category: 'Vestidos',
    price: 175,
    size: 'S',
    note: 'Años 80 · satén',
    color: 'bg-[#d8949e]',
  },
  {
    name: 'Chaqueta Solange',
    category: 'Abrigos',
    price: 195,
    size: 'L',
    note: 'Gabardina · una sola pieza',
    color: 'bg-[#9c4153]',
  },
  {
    name: 'Falda Louise',
    category: 'Faldas',
    price: 105,
    size: 'M',
    note: 'Lana ligera · cuadros',
    color: 'bg-[#d5ad9e]',
  },
];

const categories = ['Todo', 'Vestidos', 'Blusas', 'Abrigos', 'Faldas'];

export default function Shop() {
  const [category, setCategory] = useState('Todo');
  const [sort, setSort] = useState('recent');
  const { addItem } = useCart();
  const filtered = useMemo(() => {
    const selection = category === 'Todo' ? products : products.filter((product) => product.category === category);
    return [...selection].sort((a, b) =>
      sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0,
    );
  }, [category, sort]);
  return (
    <main className='min-h-screen bg-[#fcf5ed] text-[#321b1f] selection:bg-[#f59eb3]'>
      <section className='px-6 py-10 sm:px-12 sm:py-12 lg:px-20'>
        <div className='flex flex-col gap-5 border-b border-[#321b1f]/20 pb-5 lg:flex-row lg:items-center lg:justify-between'>
          <div className='-mb-1 flex max-w-full gap-5 overflow-x-auto pb-1 font-mono text-[11px] uppercase tracking-[.08em]'>
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 pb-1 transition ${category === item ? 'border-b border-[#c30028] text-[#c30028]' : 'text-[#321b1f]/55 hover:text-[#c30028]'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className='flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.1em] text-[#321b1f]/60'>
            Ordenar
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className='border-0 bg-transparent px-1 py-1 font-mono text-[11px] uppercase tracking-[.08em] text-[#321b1f] outline-none'
            >
              <option value='recent'>Recientes</option>
              <option value='low'>Menor precio</option>
              <option value='high'>Mayor precio</option>
            </select>
          </label>
        </div>
        <div className='mt-5 flex justify-between font-mono text-[10px] uppercase tracking-[.1em] text-[#321b1f]/55'>
          <span>{filtered.length} piezas encontradas</span>
          <span>Todas son únicas</span>
        </div>
        <div className='mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12'>
          {filtered.map((product, index) => {
            const slug = product.name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replaceAll(' ', '-');
            return (
              <article key={product.name}>
                <div className={`group relative aspect-[.73] overflow-hidden ${product.color}`}>
                  <Image
                    src='/dress.avif'
                    alt={product.name}
                    fill
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                    className='object-cover mix-blend-multiply saturate-[.72] transition duration-500 group-hover:scale-105'
                  />
                  <Link
                    href={`/producto/${slug}`}
                    className='absolute inset-0 z-10'
                    aria-label={`Ver ${product.name}`}
                  />
                  <div className='pointer-events-none absolute left-3 top-3 z-20 flex gap-2'>
                    <span className='bg-[#fcf5ed]/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[.08em]'>
                      {product.size}
                    </span>
                    <span className='bg-[#fcf5ed]/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[.08em]'>
                      0{index + 1}
                    </span>
                  </div>
                  <button
                    onClick={addItem}
                    className='absolute bottom-3 right-3 z-20 grid size-9 place-items-center rounded-full bg-[#fcf5ed] text-xl text-[#c30028] transition hover:bg-[#c30028] hover:text-[#fcf5ed] sm:opacity-0 sm:group-hover:opacity-100'
                    aria-label={`Agregar ${product.name} a la bolsa`}
                  >
                    +
                  </button>
                </div>
                <div className='mt-3 flex justify-between gap-3'>
                  <div>
                    <p className='mb-1 font-mono text-[9px] uppercase tracking-[.1em] text-[#c30028]'>
                      {product.category}
                    </p>
                    <h2 className='font-serif text-[19px] leading-none'>
                      <Link href={`/producto/${slug}`} className='hover:text-[#c30028]'>
                        {product.name}
                      </Link>
                    </h2>
                    <p className='mt-2 text-xs text-[#321b1f]/60'>{product.note}</p>
                  </div>
                  <span className='whitespace-nowrap text-sm'>S/ {product.price}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className='mx-6 mt-16 bg-[#c30028] px-7 py-12 text-[#fcf5ed] sm:mx-12 sm:px-12 lg:mx-20 lg:flex lg:items-center lg:justify-between lg:px-16'>
        <div>
          <p className='font-mono text-[10px] uppercase tracking-[.15em] text-[#f59eb3]'>¿Buscas algo especial?</p>
          <h2 className='mt-4 font-serif text-4xl tracking-[-.06em]'>Escríbenos tu lista de deseos.</h2>
        </div>
        <a
          href='https://instagram.com'
          target='_blank'
          rel='noreferrer'
          className='mt-7 inline-flex border border-[#fcf5ed]/70 px-5 py-4 font-mono text-[11px] uppercase tracking-[.1em] transition hover:bg-[#fcf5ed] hover:text-[#c30028] lg:mt-0'
        >
          Hablar por Instagram ↗
        </a>
      </section>
    </main>
  );
}
