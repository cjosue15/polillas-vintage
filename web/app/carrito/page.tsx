import Image from 'next/image';
import Link from 'next/link';

const bagItems = [
  { name: 'Vestido Colette', category: 'Vestidos', size: 'M', price: 159, color: 'bg-[#e7c7b6]' },
  { name: 'Blusa Margot', category: 'Blusas', size: 'S', price: 89, color: 'bg-[#f59eb3]' },
];

export default function CartPage() {
  const subtotal = bagItems.reduce((total, item) => total + item.price, 0);
  return (
    <main className='min-h-screen bg-[#fcf5ed] text-[#321b1f] selection:bg-[#f59eb3]'>
      <section className='px-6 pb-20 pt-10 sm:px-12 lg:px-20 lg:pb-32 lg:pt-16'>
        <div className='mb-10 flex items-end justify-between border-b border-[#321b1f]/20 pb-6'>
          <div>
            <p className='mb-4 font-mono text-[10px] uppercase tracking-[.14em] text-[#c30028]'>Tu selección</p>
            <h1 className='font-serif text-[clamp(3.5rem,6vw,6rem)] leading-[.78] tracking-[-.075em]'>La bolsa.</h1>
          </div>
          <p className='pb-1 font-mono text-[10px] uppercase tracking-[.1em] text-[#321b1f]/55'>2 piezas</p>
        </div>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start'>
          <div>
            {bagItems.map((item, index) => (
              <article
                key={item.name}
                className='grid grid-cols-[112px_1fr] gap-5 border-b border-[#321b1f]/15 py-5 first:pt-0 sm:grid-cols-[145px_1fr] sm:gap-7'
              >
                <div className={`relative aspect-[.76] overflow-hidden ${item.color}`}>
                  <Image
                    src='/dress.avif'
                    alt={item.name}
                    fill
                    sizes='145px'
                    className='object-cover mix-blend-multiply saturate-[.72]'
                  />
                  <span className='absolute left-2 top-2 bg-[#fcf5ed]/90 px-1.5 py-1 font-mono text-[8px] uppercase tracking-[.08em]'>
                    0{index + 1}
                  </span>
                </div>
                <div className='flex min-w-0 flex-col justify-between py-1'>
                  <div className='flex justify-between gap-4'>
                    <div>
                      <p className='mb-2 font-mono text-[9px] uppercase tracking-[.12em] text-[#c30028]'>
                        {item.category}
                      </p>
                      <h2 className='font-serif text-2xl leading-none sm:text-3xl'>{item.name}</h2>
                      <p className='mt-3 text-sm text-[#321b1f]/65'>Talla {item.size} · pieza única</p>
                    </div>
                    <span className='whitespace-nowrap text-[15px]'>S/ {item.price}</span>
                  </div>
                  <div className='mt-6 flex items-center justify-between'>
                    <div className='flex h-9 items-center border border-[#321b1f]/20 font-mono text-[11px]'>
                      <button
                        type='button'
                        className='grid size-9 place-items-center text-[#321b1f]/55'
                        aria-label={`Disminuir cantidad de ${item.name}`}
                      >
                        −
                      </button>
                      <span className='grid w-8 place-items-center'>1</span>
                      <button
                        type='button'
                        className='grid size-9 place-items-center text-[#321b1f]/55'
                        aria-label={`Aumentar cantidad de ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type='button'
                      className='font-mono text-[9px] uppercase tracking-[.1em] text-[#321b1f]/55 underline decoration-[#321b1f]/30 underline-offset-4'
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </article>
            ))}
            <Link
              href='/tienda'
              className='mt-7 inline-flex border-b border-[#c30028] pb-1 font-mono text-[10px] uppercase tracking-[.1em] text-[#c30028]'
            >
              ← Seguir buscando
            </Link>
          </div>
          <aside className='border border-[#321b1f]/20 p-6 sm:p-8 lg:sticky lg:top-6'>
            <p className='font-mono text-[10px] uppercase tracking-[.14em] text-[#c30028]'>Resumen</p>
            <div className='mt-7 space-y-4 border-b border-[#321b1f]/15 pb-6 text-[15px]'>
              <div className='flex justify-between'>
                <span className='text-[#321b1f]/65'>Subtotal</span>
                <span>S/ {subtotal}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-[#321b1f]/65'>Envío</span>
                <span className='font-mono text-[10px] uppercase tracking-[.08em] text-[#c30028]'>
                  Se calcula después
                </span>
              </div>
            </div>
            <div className='flex justify-between py-6 font-serif text-2xl'>
              <span>Total</span>
              <span>S/ {subtotal}</span>
            </div>
            <button
              type='button'
              className='w-full bg-[#c30028] px-5 py-4 font-mono text-[11px] uppercase tracking-[.12em] text-[#fcf5ed] transition hover:bg-[#321b1f]'
            >
              Continuar con el pago
            </button>
            <p className='mt-5 text-center font-mono text-[9px] uppercase tracking-[.08em] leading-relaxed text-[#321b1f]/55'>
              El checkout seguro estará disponible pronto.
            </p>
            <div className='mt-7 border-t border-[#321b1f]/15 pt-5'>
              <p className='font-mono text-[9px] uppercase tracking-[.1em] text-[#321b1f]/55'>Compras con intención</p>
              <p className='mt-2 text-sm leading-relaxed text-[#321b1f]/70'>
                Tus piezas se preparan con cuidado y se envían desde Lima.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
