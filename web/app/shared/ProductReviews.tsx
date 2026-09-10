type ProductReviewsProps = {
  productName: string;
};

const reviews = [
  {
    name: 'Lucía M.',
    date: 'Agosto 2026',
    rating: 5,
    comment: 'La tela tiene una caída preciosa y se siente incluso mejor puesta. Llegó muy bien cuidada.',
  },
  {
    name: 'Andrea V.',
    date: 'Julio 2026',
    rating: 4,
    comment: 'Una pieza especial, tal como se veía en las fotos. La talla fue la esperada.',
  },
  {
    name: 'Camila R.',
    date: 'Junio 2026',
    rating: 5,
    comment: 'Me encanta saber que tiene otra historia antes de llegar a mí. Se ha vuelto mi favorita.',
  },
];

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span aria-label={label} className='inline-flex gap-0.5 text-[#c30028]'>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden='true' className={index < rating ? 'opacity-100' : 'opacity-20'}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ProductReviews({ productName }: ProductReviewsProps) {
  return (
    <section aria-labelledby='reviews-title' className='border-t border-[#321b1f]/20 px-6 py-20 sm:px-12 lg:px-20 lg:py-28'>
      <div className='grid gap-12 lg:grid-cols-[minmax(0,.7fr)_minmax(420px,1fr)] lg:gap-20'>
        <div>
          <p className='font-mono text-[10px] uppercase tracking-[.14em] text-[#c30028]'>Vidas compartidas</p>
          <h2 id='reviews-title' className='mt-5 max-w-md font-serif text-[clamp(2.7rem,5vw,5.25rem)] leading-[.82] tracking-[-.07em]'>
            Cada prenda tiene algo que contar.
          </h2>
          <p className='mt-6 max-w-sm text-[15px] leading-relaxed text-[#321b1f]/70'>
            Quienes llevaron {productName.toLocaleLowerCase('es-PE')} también dejaron una parte de su historia.
          </p>
        </div>

        <div>
          <div className='grid gap-5 border-y border-[#321b1f]/20 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center'>
            <div className='font-serif text-6xl leading-none tracking-[-.09em]'>4.7</div>
            <div>
              <Stars rating={5} label='4.7 de 5 estrellas' />
              <p className='mt-2 font-mono text-[9px] uppercase tracking-[.12em] text-[#321b1f]/55'>3 reseñas</p>
            </div>
            <span className='w-fit border border-[#321b1f]/25 px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-[#321b1f]/55'>
              Reseñas pronto
            </span>
          </div>

          <div className='divide-y divide-[#321b1f]/15'>
            {reviews.map((review) => (
              <article key={review.name} className='py-6'>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <p className='text-lg'>{review.name}</p>
                    <p className='mt-1 font-mono text-[9px] uppercase tracking-[.1em] text-[#321b1f]/55'>{review.date}</p>
                  </div>
                  <Stars rating={review.rating} label={`${review.rating} de 5 estrellas`} />
                </div>
                <p className='mt-4 max-w-xl text-[15px] leading-relaxed text-[#321b1f]/75'>{review.comment}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
