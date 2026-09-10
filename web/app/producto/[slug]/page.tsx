'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '../../shared/CartProvider';
import ProductGallery from '../../shared/ProductGallery';
import ProductReviews from '../../shared/ProductReviews';

const catalogue: Record<
  string,
  { name: string; category: string; price: number; size: string; color: string; description: string }
> = {
  'vestido-colette': {
    name: 'Vestido Colette',
    category: 'Vestidos',
    price: 159,
    size: 'M',
    color: 'bg-[#e7c7b6]',
    description:
      'Un vestido de los años 70 con silueta suave y un estampado pequeño que se descubre de cerca. Una pieza ligera para usar hoy y guardar siempre.',
  },
  'blusa-margot': {
    name: 'Blusa Margot',
    category: 'Blusas',
    price: 89,
    size: 'S',
    color: 'bg-[#f59eb3]',
    description:
      'Blusa de seda recuperada, delicada y luminosa. Su caída natural hace que sea una de esas prendas que resuelven cualquier día.',
  },
  'abrigo-anais': {
    name: 'Abrigo Anaïs',
    category: 'Abrigos',
    price: 220,
    size: 'M',
    color: 'bg-[#7f263b]',
    description:
      'Abrigo de lana con una presencia silenciosa. Conserva una estructura impecable y detalles propios de una pieza elegida con paciencia.',
  },
  'falda-elodie': {
    name: 'Falda Elodie',
    category: 'Faldas',
    price: 98,
    size: 'S',
    color: 'bg-[#e3c4b6]',
    description:
      'Una falda de algodón con movimiento y una caída cómoda. Hecha en Perú, lista para escribir una nueva historia.',
  },
  'camisa-simone': {
    name: 'Camisa Simone',
    category: 'Blusas',
    price: 110,
    size: 'M',
    color: 'bg-[#d5d1b8]',
    description:
      'Camisa de lino de corte relajado. Una prenda respirable, suave y versátil para superponer o llevar sola.',
  },
  'vestido-noemie': {
    name: 'Vestido Noémie',
    category: 'Vestidos',
    price: 175,
    size: 'S',
    color: 'bg-[#d8949e]',
    description:
      'Vestido de satén de los años 80, con caída fluida y brillo discreto. Una pieza especial para una ocasión que merezca recordar.',
  },
  'chaqueta-solange': {
    name: 'Chaqueta Solange',
    category: 'Abrigos',
    price: 195,
    size: 'L',
    color: 'bg-[#9c4153]',
    description:
      'Chaqueta de gabardina de estructura cómoda y carácter atemporal. Solo existe una, como todas nuestras piezas.',
  },
  'falda-louise': {
    name: 'Falda Louise',
    category: 'Faldas',
    price: 105,
    size: 'M',
    color: 'bg-[#d5ad9e]',
    description:
      'Falda ligera de cuadros en lana, hecha para combinar con lo que ya tienes y quedarte por mucho tiempo.',
  },
};

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const productSlug = catalogue[params.slug] ? params.slug : 'vestido-colette';
  const product = catalogue[productSlug];
  const [selectedSize, setSelectedSize] = useState(product.size);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const addToCart = () => {
    addItem();
    setAdded(true);
  };
  return (
    <main className='min-h-screen bg-[#fcf5ed] text-[#321b1f] selection:bg-[#f59eb3]'>
      <div className='px-6 pt-6 sm:px-12 lg:px-20'>
        <Link
          href='/tienda'
          className='font-mono text-[10px] uppercase tracking-[.12em] text-[#321b1f]/60 transition hover:text-[#c30028]'
        >
          ← Volver a tienda
        </Link>
      </div>
      <section className='grid gap-9 px-6 pb-20 pt-6 sm:px-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(340px,.7fr)] lg:gap-14 lg:px-20 lg:pb-32'>
        <ProductGallery name={product.name} color={product.color} />
        <div className='lg:sticky lg:top-6 lg:self-start'>
          <p className='font-mono text-[10px] uppercase tracking-[.14em] text-[#c30028]'>
            {product.category} · pieza única
          </p>
          <div className='mt-5 flex items-start justify-between gap-4 border-b border-[#321b1f]/20 pb-7'>
            <h1 className='font-serif text-[clamp(3rem,4vw,4.5rem)] leading-[.8] tracking-[-.075em]'>{product.name}</h1>
            <span className='whitespace-nowrap pt-1 text-lg'>S/ {product.price}</span>
          </div>
          <p className='py-7 text-[17px] leading-relaxed text-[#321b1f]/75'>{product.description}</p>
          <div className='border-y border-[#321b1f]/20 py-6'>
            <div className='mb-4 flex justify-between font-mono text-[10px] uppercase tracking-[.1em]'>
              <span>Talla</span>
              <span className='text-[#321b1f]/55'>Etiqueta: {product.size}</span>
            </div>
            <div className='flex gap-2'>
              {['S', 'M', 'L'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`grid size-11 place-items-center border font-mono text-[11px] transition ${selectedSize === size ? 'border-[#c30028] bg-[#c30028] text-[#fcf5ed]' : 'border-[#321b1f]/25 hover:border-[#c30028]'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className='mt-6 grid gap-3'>
            <button
              onClick={addToCart}
              className='bg-[#c30028] px-5 py-4 font-mono text-[11px] uppercase tracking-[.12em] text-[#fcf5ed] transition hover:bg-[#321b1f]'
            >
              {added ? 'Agregada a tu bolsa ✓' : 'Agregar a la bolsa'}
            </button>
            <button
              onClick={addToCart}
              className='border border-[#c30028] px-5 py-4 font-mono text-[11px] uppercase tracking-[.12em] text-[#c30028] transition hover:bg-[#c30028] hover:text-[#fcf5ed]'
            >
              Comprar ahora
            </button>
          </div>
          <div className='mt-7 divide-y divide-[#321b1f]/15 border-y border-[#321b1f]/15 font-mono text-[10px] uppercase tracking-[.08em]'>
            <div className='flex justify-between py-4'>
              <span>Estado</span>
              <span>Excelente</span>
            </div>
            <div className='flex justify-between py-4'>
              <span>Envío</span>
              <span>1 — 3 días hábiles</span>
            </div>
            <div className='flex justify-between py-4'>
              <span>Devoluciones</span>
              <span>Hasta 7 días</span>
            </div>
          </div>
        </div>
      </section>
      <ProductReviews productName={product.name} />
      <section className='bg-[#c30028] px-6 py-12 text-[#fcf5ed] sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-20'>
        <div>
          <p className='font-mono text-[10px] uppercase tracking-[.14em] text-[#f59eb3]'>Una última cosa</p>
          <p className='mt-3 font-serif text-3xl tracking-[-.05em]'>Esta prenda no se repite.</p>
        </div>
        <Link
          href='/tienda'
          className='mt-6 inline-flex border border-[#fcf5ed]/70 px-5 py-4 font-mono text-[11px] uppercase tracking-[.1em] transition hover:bg-[#fcf5ed] hover:text-[#c30028] lg:mt-0'
        >
          Seguir explorando →
        </Link>
      </section>
    </main>
  );
}
