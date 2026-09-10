import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findProduct, formatPrice, products } from '../../../lib/products';
import { ProductGallery } from '../../components/product-gallery';
import { ProductReviews } from '../../components/product-reviews';
import { AddToCartButton } from '../../components/store';
import Container from '@/app/components/shared/container';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  return (
    <main className='min-h-screen'>
      <Container className='max-w-[1200px]'>
        <div className='py-7 text-[10px] font-bold uppercase tracking-[0.13em] opacity-60'>
          <Link className='hover:opacity-100' href='/shop'>
            Tienda
          </Link>
          <span className='mx-2'>/</span>
          {product.category}
        </div>

        <section className='grid gap-10 pb-16 sm:grid-cols-2 lg:items-start lg:gap-16'>
          <ProductGallery product={product} />

          <div className='max-w-155 lg:pt-5'>
            <div className='flex items-start justify-between gap-5'>
              <p className='text-[10px] font-bold uppercase tracking-[0.17em]'>
                {product.tag} · {product.category}
              </p>
              <span className='rounded-full border border-negro px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em]'>
                Pieza única
              </span>
            </div>
            <h1 className='mt-6 text-[clamp(3rem,6.5vw,6rem)] font-extrabold leading-[.82] tracking-[-.075em]'>
              {product.name}
            </h1>
            <p className='mt-6 text-2xl font-bold'>{formatPrice(product.price)}</p>
            <p className='mt-7 max-w-130 text-[15px] leading-relaxed opacity-75'>{product.description}</p>

            <div className='mt-9 border-y border-negro py-4 text-[10px] font-bold uppercase tracking-[0.13em]'>
              <span>Talla única</span>
              <span className='float-right font-normal opacity-60'>Revisa las medidas</span>
            </div>
            <div className='mt-5'>
              <AddToCartButton product={product} />
            </div>
            <p className='mt-5 text-[10px] uppercase tracking-[0.12em] opacity-60'>
              Envíos en Lima y todo el Perú · Cambios dentro de 7 días
            </p>

            <div className='mt-12 grid gap-6 border-t border-negro pt-6 lg:grid-cols-2'>
              <div>
                <p className='mb-3 text-[10px] font-bold uppercase tracking-[0.17em]'>Detalles</p>
                <p className='text-sm leading-relaxed opacity-70'>
                  Pieza vintage seleccionada y revisada por nuestro equipo. Puede conservar pequeñas señales de su
                  historia.
                </p>
              </div>
              <div className='border-t border-l-0 border-negro pt-6 pl-0 lg:pl-6 lg:pt-0 lg:border-t-0 lg:border-l'>
                <p className='mb-3 text-[10px] font-bold uppercase tracking-[0.17em]'>Compra con calma</p>
                <p className='text-sm leading-relaxed opacity-70'>
                  Si tienes dudas sobre fit, talla o estado de la prenda, escríbenos antes de comprar.
                </p>
              </div>
            </div>
          </div>
        </section>
        <ProductReviews key={product.slug} product={product} />
      </Container>
    </main>
  );
}
