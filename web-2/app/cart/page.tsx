'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatPrice, Product } from '../../lib/products';
import Container from '../components/shared/container';
import { readCart, removeFromCart } from '../components/store';

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  useEffect(() => {
    const timer = window.setTimeout(() => setCart(readCart()), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const subtotal = cart.reduce((sum, product) => sum + product.price, 0);
  const remove = (index: number) => {
    removeFromCart(index);
    setCart(readCart());
  };
  return (
    <main className='min-h-screen'>
      <Container>
        <section className='py-12 sm:py-20'>
          <p className='mb-3 text-[10px] font-bold uppercase tracking-[0.17em]'>Tu selección</p>
          <h1 className='m-0 text-[clamp(2.4rem,5.8vw,5.3rem)] font-extrabold leading-[.86] tracking-[-.07em]'>
            La <em className='font-normal'>bolsa.</em>
          </h1>
          {cart.length === 0 ? (
            <div className='border-y border-negro py-16 text-center'>
              <p className='text-lg'>Todavía no tienes piezas aquí.</p>
              <Link
                className='mt-7 inline-flex items-center gap-4 bg-[#171515] px-4.25 py-3.25 text-[10px] font-bold uppercase tracking-[0.13em] text-arena'
                href='/shop'
              >
                Explorar la tienda ↗
              </Link>
            </div>
          ) : (
            <div className='mt-10 grid gap-10 md:grid-cols-[1fr_360px]'>
              <div className='border-t border-negro'>
                {cart.map((product, index) => (
                  <div className='flex gap-4 border-b border-negro py-5' key={`${product.slug}-${index}`}>
                    <div className={`relative h-28 w-24 shrink-0 overflow-hidden ${product.tone}`}>
                      <Image
                        src='/dress.avif'
                        alt={product.name}
                        fill
                        sizes='96px'
                        className={`object-cover ${product.position} mix-blend-multiply`}
                      />
                    </div>
                    <div className='flex flex-1 justify-between gap-3'>
                      <div>
                        <p className='font-bold'>{product.name}</p>
                        <p className='mt-1 text-[10px] uppercase tracking-[0.12em] opacity-60'>
                          {product.category} · Talla única
                        </p>
                        <button
                          className='mt-5 text-[10px] font-bold uppercase tracking-[0.12em] underline'
                          onClick={() => remove(index)}
                        >
                          Quitar
                        </button>
                      </div>
                      <p className='font-bold'>{formatPrice(product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <aside className='h-fit border border-negro p-5'>
                <p className='mb-5 text-[10px] font-bold uppercase tracking-[0.17em]'>Resumen</p>
                <div className='flex justify-between border-b border-negro pb-4 text-sm'>
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <div className='flex justify-between py-4 text-sm'>
                  <span>Envío</span>
                  <span className='opacity-60'>Se calcula al pagar</span>
                </div>
                <button className='mt-3 w-full bg-[#171515] px-4.25 py-3.25 text-[10px] font-bold uppercase tracking-[0.13em] text-arena'>
                  Continuar compra ↗
                </button>
                <p className='mt-4 text-center text-[10px] uppercase tracking-widest opacity-60'>
                  Pago seguro · Yape · Plin
                </p>
              </aside>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
