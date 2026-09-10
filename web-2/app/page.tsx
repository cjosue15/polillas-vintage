'use client';

import { AboutPolillas } from './components/about-polillas';
import { EditorialHero } from './components/editorial-hero';
import { RecentListCarousel } from './components/recent-list-carousel';
import Container from './components/shared/container';

export default function Home() {
  return (
    <main className='min-h-screen overflow-hidden'>
      <Container>
        <EditorialHero />

        <RecentListCarousel />

        <AboutPolillas />

        <section className='py-14 text-center sm:py-20'>
          <p className='mb-4 text-[10px] font-bold uppercase tracking-[0.17em]'>El correo secreto</p>
          <h2 className='mx-auto max-w-xl text-[clamp(2.4rem,5.8vw,5.3rem)] font-extrabold leading-[.86] tracking-[-.07em]'>
            Primero ves lo
            <br />
            <em className='font-normal'>nuevo.</em>
          </h2>
          <p className='mx-auto mt-5 max-w-sm text-sm opacity-70'>
            Novedades, drops y hallazgos directo a tu bandeja. Sin ruido.
          </p>
          <form
            className='mx-auto mt-7 flex max-w-md border-b border-[#171515]'
            onSubmit={(event) => event.preventDefault()}
          >
            <label className='sr-only' htmlFor='email'>
              Tu correo
            </label>
            <input
              id='email'
              type='email'
              placeholder='tu@email.com'
              className='min-w-0 flex-1 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-negro/50'
              required
            />
            <button type='submit' className='py-3 pl-3 text-[10px] font-bold uppercase tracking-[0.16em]'>
              Suscribirme ↗
            </button>
          </form>
        </section>
      </Container>
    </main>
  );
}
