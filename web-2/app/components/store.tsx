'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatPrice, Product } from '../../lib/products';

const CART_KEY = 'polillas-cart';

export function readCart() {
  if (typeof window === 'undefined') return [] as Product[];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]') as Product[];
  } catch {
    return [];
  }
}

export function addToCart(product: Product) {
  const cart = readCart();
  localStorage.setItem(CART_KEY, JSON.stringify([...cart, product]));
  window.dispatchEvent(new Event('cart-updated'));
}

export function removeFromCart(index: number) {
  const cart = readCart();
  cart.splice(index, 1);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className='group'>
      <Link
        href={`/product/${product.slug}`}
        className={`relative block aspect-3/4 overflow-hidden border border-[#171515] ${product.tone}`}
      >
        <span className='absolute left-3 top-3 z-10 bg-arena px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em]'>
          {product.tag}
        </span>
        <Image
          src='/dress.avif'
          alt={product.name}
          fill
          sizes='(max-width: 768px) 50vw, 25vw'
          className={`object-cover ${product.position} mix-blend-multiply transition duration-500 group-hover:scale-105`}
        />
        <span className='absolute bottom-3 left-3 right-3 translate-y-2 bg-[#300028] py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-arena opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
          Ver producto
        </span>
      </Link>
      <div className='mt-3 flex items-start justify-between gap-2 text-xs'>
        <div>
          <h2 className='font-bold'>{product.name}</h2>
          <p className='mt-1 text-[10px] uppercase tracking-widest opacity-60'>{product.category}</p>
        </div>
        <span className='font-bold'>{formatPrice(product.price)}</span>
      </div>
    </article>
  );
}

export function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  return (
    <button
      className='inline-flex items-center justify-center gap-4 bg-[#171515] px-4.25 py-3.25 text-[10px] font-bold uppercase tracking-[0.13em] text-arena'
      onClick={() => {
        addToCart(product);
        setAdded(true);
      }}
    >
      {added ? 'Agregado a la bolsa ✓' : `Agregar a la bolsa · ${formatPrice(product.price)}`}
    </button>
  );
}
