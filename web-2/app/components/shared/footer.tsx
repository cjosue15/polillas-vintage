import Image from 'next/image';
import Link from 'next/link';
import Container from './container';

function Footer() {
  return (
    <Container>
      <footer id='contacto' className='border-t border-[#171515] pt-8'>
        <div className='grid gap-8 pb-10 sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-4'>
          <div>
            <Image
              src='/logo.webp'
              alt='Polillas Vintage'
              width={76}
              height={76}
              className='h-14 w-14 object-contain mix-blend-multiply'
            />
            <p className='mt-4 text-sm leading-relaxed opacity-70'>
              Vintage fashion ♡<br />
              Envíos a todo el Perú
              <br />
              Worldwide shipping
            </p>
          </div>
          <div>
            <p className='mb-4 text-[10px] font-bold uppercase tracking-[0.17em]'>Explora</p>
            <div className='flex flex-col gap-2 text-sm'>
              <Link href='/#shop'>Shop all</Link>
              <Link href='/#historia'>Sobre Polillas</Link>
              <Link href='/#contacto'>Escríbenos</Link>
            </div>
          </div>
          <div>
            <p className='mb-4 text-[10px] font-bold uppercase tracking-[0.17em]'>Síguenos</p>
            <div className='flex flex-col gap-2 text-sm'>
              <Link href='/#contacto'>Instagram ↗</Link>
              <Link href='/#contacto'>TikTok ↗</Link>
              <a href='https://wa.me/51953093769'>WhatsApp ↗</a>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between gap-2 border-t border-[#171515] py-4 text-[9px] uppercase tracking-[0.14em] opacity-60 sm:flex-row'>
          <span>© 2026 Polillas Vintage</span>
          <span>Hecho con cariño desde Lima</span>
        </div>
      </footer>
    </Container>
  );
}

export default Footer;
