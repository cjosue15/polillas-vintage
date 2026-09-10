'use client';

import { FormEvent, useMemo, useState } from 'react';
import type { Product } from '../../lib/products';

type Review = {
  id: string;
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
};

const reviewStorageKey = (slug: string) => `polillas-reviews:${slug}`;

function readReviews(slug: string) {
  if (typeof window === 'undefined') return [] as Review[];
  try {
    return JSON.parse(localStorage.getItem(reviewStorageKey(slug)) ?? '[]') as Review[];
  } catch {
    return [] as Review[];
  }
}

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span aria-label={label} className='inline-flex gap-0.5 text-[#f05b7d]'>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden='true' className={index < Math.round(rating) ? 'opacity-100' : 'opacity-20'}>
          ★
        </span>
      ))}
    </span>
  );
}

export function ProductReviews({ product }: { product: Product }) {
  const [reviews, setReviews] = useState<Review[]>(() => readReviews(product.slug));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const averageRating = useMemo(
    () => (reviews.length ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : 0),
    [reviews],
  );

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanedName = name.trim();
    const cleanedComment = comment.trim();
    if (!cleanedName || !cleanedComment) return;

    const nextReviews = [
      {
        id: crypto.randomUUID(),
        name: cleanedName,
        comment: cleanedComment,
        rating,
        createdAt: new Date().toISOString(),
      },
      ...reviews,
    ];

    localStorage.setItem(reviewStorageKey(product.slug), JSON.stringify(nextReviews));
    setReviews(nextReviews);
    setName('');
    setComment('');
    setRating(5);
    setIsFormOpen(false);
  }

  return (
    <section aria-labelledby='reviews-title' className='border-t border-[#232021] py-14 sm:py-20'>
      <div className='grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-[0.17em]'>Después de la prenda</p>
          <h2 id='reviews-title' className='mt-5 max-w-[490px] text-[clamp(2.6rem,5vw,5.3rem)] font-extrabold leading-[.84] tracking-[-.07em]'>
            Las historias siguen cuando una pieza cambia de manos.
          </h2>
          <p className='mt-6 max-w-[400px] text-sm leading-relaxed opacity-70'>
            Si {product.name.toLocaleLowerCase('es-PE')} encontró un lugar en tu clóset, cuéntale a la comunidad cómo
            se siente llevarla.
          </p>
        </div>

        <div>
          <div className='grid gap-5 border-y border-[#232021] py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center'>
            <div className='text-5xl font-extrabold tracking-[-.08em]'>{averageRating ? averageRating.toFixed(1) : '—'}</div>
            <div>
              <Stars
                rating={averageRating}
                label={averageRating ? `${averageRating.toFixed(1)} de 5 estrellas` : 'Aún no hay calificaciones'}
              />
              <p className='mt-2 text-[10px] font-bold uppercase tracking-[0.12em] opacity-55'>
                {reviews.length === 1 ? '1 reseña' : `${reviews.length} reseñas`}
              </p>
            </div>
            <button
              type='button'
              onClick={() => setIsFormOpen((open) => !open)}
              aria-expanded={isFormOpen}
              className='w-fit border border-[#232021] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.13em] transition-colors hover:bg-[#232021] hover:text-[#fcf5ed]'
            >
              {isFormOpen ? 'Cerrar' : 'Calificar mi compra'}
            </button>
          </div>

          {isFormOpen && (
            <form onSubmit={submitReview} className='border-b border-[#232021] py-6'>
              <fieldset>
                <legend className='text-[10px] font-bold uppercase tracking-[0.13em]'>Tu calificación</legend>
                <div className='mt-3 flex gap-1'>
                  {Array.from({ length: 5 }, (_, index) => {
                    const value = index + 1;
                    return (
                      <button
                        key={value}
                        type='button'
                        onClick={() => setRating(value)}
                        aria-label={`${value} ${value === 1 ? 'estrella' : 'estrellas'}`}
                        aria-pressed={rating === value}
                        className={`text-2xl leading-none transition-transform hover:scale-110 ${value <= rating ? 'text-[#f05b7d]' : 'text-[#232021]/20'}`}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className='mt-5 grid gap-4 sm:grid-cols-2'>
                <label className='grid gap-2 text-[10px] font-bold uppercase tracking-[0.13em]'>
                  Tu nombre
                  <input
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className='border border-[#232021] bg-transparent px-3 py-3 text-sm font-normal normal-case tracking-normal outline-none transition-colors focus:border-[#f05b7d]'
                    placeholder='Ej. Camila'
                  />
                </label>
                <label className='grid gap-2 text-[10px] font-bold uppercase tracking-[0.13em]'>
                  Tu comentario
                  <textarea
                    required
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    className='min-h-22 resize-y border border-[#232021] bg-transparent px-3 py-3 text-sm font-normal normal-case tracking-normal outline-none transition-colors focus:border-[#f05b7d]'
                    placeholder='¿Cómo te quedó la pieza?'
                  />
                </label>
              </div>
              <div className='mt-4 flex flex-wrap items-center justify-between gap-4'>
                <p className='text-[10px] leading-relaxed opacity-55'>
                  Las reseñas serán visibles después de validar la compra.
                </p>
                <button
                  type='submit'
                  className='bg-[#171515] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-[#fcf5ed] transition-colors hover:bg-[#300028]'
                >
                  Enviar reseña
                </button>
              </div>
            </form>
          )}

          <div className='divide-y divide-[#232021]'>
            {reviews.length ? (
              reviews.map((review) => (
                <article key={review.id} className='py-6'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <p className='font-bold'>{review.name}</p>
                      <p className='mt-1 text-[9px] font-bold uppercase tracking-[0.11em] opacity-55'>
                        {new Intl.DateTimeFormat('es-PE', { month: 'short', year: 'numeric' }).format(new Date(review.createdAt))}
                      </p>
                    </div>
                    <Stars rating={review.rating} label={`${review.rating} de 5 estrellas`} />
                  </div>
                  <p className='mt-4 max-w-[560px] text-sm leading-relaxed opacity-75'>{review.comment}</p>
                </article>
              ))
            ) : (
              <div className='py-10'>
                <p className='text-[10px] font-bold uppercase tracking-[0.13em] opacity-55'>Aún no hay reseñas</p>
                <p className='mt-3 max-w-[430px] text-lg leading-snug'>La primera experiencia con esta pieza puede ser la tuya.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
