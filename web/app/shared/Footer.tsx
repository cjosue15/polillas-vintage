import Link from 'next/link';

function Footer() {
  return (
    <footer className='flex flex-col gap-3 border-t border-[#321b1f]/20 bg-[#fcf5ed] px-6 py-6 font-mono text-[9px] uppercase tracking-[.07em] text-[#321b1f]/65 sm:flex-row sm:items-center sm:justify-between sm:px-12 lg:px-20'>
      <span>© 2025 Polillas Vintage</span>
      <span>Hecho despacio, elegido con intención.</span>
      <Link href='/' className='transition hover:text-[#c30028]'>
        Volver al inicio ↑
      </Link>
    </footer>
  );
}

export default Footer;
