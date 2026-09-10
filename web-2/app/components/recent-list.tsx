import Link from 'next/link';
import { ProductCard } from './store';
import { products } from '../../lib/products';

function ArrowUpRight() {
  return <span aria-hidden='true' className='text-lg leading-none'>↗</span>;
}

// Versión editorial original: se conserva como alternativa al carrusel.
export function RecentList() {
  return (
    <section id='shop' className='py-14 sm:py-20'>
      <div className='mb-8 flex items-end justify-between gap-4'>
        <div>
          <p className='mb-3 text-[10px] font-bold uppercase tracking-[0.17em]'>Selección editorial</p>
          <h2 className='m-0 text-[clamp(2.4rem,5.8vw,5.3rem)] font-extrabold leading-[.86] tracking-[-.07em]'>
            Piezas que
            <br />
            <em className='font-normal'>encuentran</em> dueño.
          </h2>
        </div>
        <Link className='hidden items-center gap-3 border-b border-[#171515] pb-1 text-[10px] font-bold uppercase tracking-[0.13em] sm:flex' href='/shop'>
          Ver todo <ArrowUpRight />
        </Link>
      </div>
      <div className='grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 md:gap-x-5'>
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  );
}
