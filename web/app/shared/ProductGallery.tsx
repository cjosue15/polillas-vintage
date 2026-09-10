'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type WheelEvent,
} from 'react';

const photoLabels = ['Vista frontal', 'Detalle de tela', 'Vista lateral', 'Vista posterior'];

function imageCrop(index: number) {
  if (index === 1) return 'scale-125 object-[60%_35%]';
  if (index === 2) return 'scale-110 object-[25%_50%]';
  if (index === 3) return 'scale-110 object-[75%_50%]';
  return 'object-center';
}

type ProductGalleryProps = {
  name: string;
  color: string;
};

export default function ProductGallery({ name, color }: ProductGalleryProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomOffset, setZoomOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const zoomFrameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  useEffect(() => {
    if (!isZoomOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsZoomOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isZoomOpen]);

  const selectedLabel = photoLabels[activePhoto];

  function updateZoomPosition(event: MouseEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setZoomPosition({
      x: Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)),
      y: Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100)),
    });
  }

  function clampOffset(offset: { x: number; y: number }, level: number) {
    const bounds = zoomFrameRef.current?.getBoundingClientRect();
    if (!bounds || level <= 1) return { x: 0, y: 0 };

    const maxX = (bounds.width * (level - 1)) / 2;
    const maxY = (bounds.height * (level - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, offset.x)),
      y: Math.max(-maxY, Math.min(maxY, offset.y)),
    };
  }

  function changeZoom(nextLevel: number) {
    const clampedLevel = Math.max(1, Math.min(3, Number(nextLevel.toFixed(2))));
    setZoomLevel(clampedLevel);
    setZoomOffset((currentOffset) => clampOffset(currentOffset, clampedLevel));
  }

  function openZoom() {
    setZoomLevel(1);
    setZoomOffset({ x: 0, y: 0 });
    setIsZoomOpen(true);
  }

  function startPan(event: PointerEvent<HTMLDivElement>) {
    if (zoomLevel <= 1) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: zoomOffset.x,
      offsetY: zoomOffset.y,
    };
    setIsDragging(true);
  }

  function panImage(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    setZoomOffset(
      clampOffset(
        {
          x: drag.offsetX + event.clientX - drag.startX,
          y: drag.offsetY + event.clientY - drag.startY,
        },
        zoomLevel,
      ),
    );
  }

  function stopPan(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function zoomWithWheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    changeZoom(zoomLevel + (event.deltaY < 0 ? 0.2 : -0.2));
  }

  return (
    <div>
      <button
        type='button'
        onMouseMove={updateZoomPosition}
        onClick={openZoom}
        aria-label={`Ampliar ${name}, ${selectedLabel.toLocaleLowerCase('es-PE')}`}
        className={`group relative block aspect-[.8] w-full cursor-zoom-in overflow-hidden text-left ${color} sm:aspect-[1.02]`}
      >
        <Image
          src='/dress.avif'
          alt={`${name}, ${selectedLabel}`}
          fill
          priority
          sizes='(max-width: 1024px) 100vw, 60vw'
          className={`object-cover mix-blend-multiply saturate-[.74] transition-[object-position,transform] duration-500 ${imageCrop(activePhoto)}`}
        />
        <span className='absolute left-4 top-4 bg-[#fcf5ed]/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[.1em]'>
          {activePhoto + 1}/4
        </span>
        <span
          className='absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-[#fcf5ed]/90 text-[#321b1f] shadow-sm transition-transform duration-300 group-hover:scale-110'
          aria-hidden='true'
        >
          <svg viewBox='0 0 24 24' className='size-4 fill-none stroke-current stroke-[1.7]'>
            <circle cx='10.5' cy='10.5' r='5.5' />
            <path d='m15 15 4 4M10.5 8v5M8 10.5h5' />
          </svg>
        </span>
        <span
          className={`absolute inset-0 hidden opacity-0 transition-opacity duration-200 md:block md:group-hover:opacity-100 ${color}`}
          aria-hidden='true'
        >
          <span
            className='absolute inset-0 bg-no-repeat mix-blend-multiply saturate-[.74]'
            style={{
              backgroundImage: "url('/dress.avif')",
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: '220%',
            }}
          />
        </span>
      </button>

      <p className='mt-2 hidden font-mono text-[9px] uppercase tracking-[.1em] text-[#321b1f]/55 md:block'>
        Pasa el cursor para ampliar
      </p>

      <div className='mt-3 grid grid-cols-4 gap-3'>
        {photoLabels.map((label, index) => (
          <button
            key={label}
            type='button'
            onClick={() => setActivePhoto(index)}
            className={`relative aspect-[.77] overflow-hidden ${color} ${activePhoto === index ? 'ring-1 ring-[#c30028] ring-offset-2 ring-offset-[#fcf5ed]' : 'opacity-65 transition-opacity hover:opacity-100'}`}
            aria-label={`Ver ${label}`}
            aria-pressed={activePhoto === index}
          >
            <Image
              src='/dress.avif'
              alt=''
              aria-hidden='true'
              fill
              sizes='20vw'
              className={`object-cover mix-blend-multiply saturate-[.7] ${imageCrop(index)}`}
            />
          </button>
        ))}
      </div>

      {isZoomOpen &&
        createPortal(
          <div
            role='dialog'
            aria-modal='true'
            aria-label={`Vista ampliada de ${name}`}
            className='fixed inset-0 z-[9999] grid place-items-center bg-[#321b1f]/95 p-4'
            onClick={() => setIsZoomOpen(false)}
          >
            <div
              className={`relative h-[min(82vh,780px)] w-[min(92vw,620px)] overflow-hidden shadow-2xl ${color}`}
              onClick={(event) => event.stopPropagation()}
            >
              <div
                ref={zoomFrameRef}
                className={`absolute inset-0 touch-none ${zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`}
                onPointerDown={startPan}
                onPointerMove={panImage}
                onPointerUp={stopPan}
                onPointerCancel={stopPan}
                onWheel={zoomWithWheel}
              >
                <Image
                  src='/dress.avif'
                  alt={`${name}, vista ampliada ${selectedLabel.toLocaleLowerCase('es-PE')}`}
                  fill
                  sizes='(max-width: 640px) 92vw, 620px'
                  draggable={false}
                  className={`pointer-events-none select-none object-cover mix-blend-multiply saturate-[.74] ${imageCrop(activePhoto)}`}
                  style={{
                    transform: `translate3d(${zoomOffset.x}px, ${zoomOffset.y}px, 0) scale(${zoomLevel})`,
                    transition: isDragging ? 'none' : 'transform 180ms ease-out',
                  }}
                />
              </div>
              <button
                type='button'
                onClick={() => setIsZoomOpen(false)}
                className='absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-[#fcf5ed] text-xl leading-none text-[#321b1f] shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fcf5ed]'
                aria-label='Cerrar vista ampliada'
              >
                ×
              </button>
              <div className='absolute bottom-3 left-3 flex items-center gap-1 bg-[#fcf5ed] p-1 text-[#321b1f] shadow-sm'>
                <button
                  type='button'
                  onClick={() => changeZoom(zoomLevel - 0.25)}
                  disabled={zoomLevel === 1}
                  className='grid size-8 place-items-center text-lg transition-colors hover:bg-[#c30028] hover:text-[#fcf5ed] disabled:cursor-not-allowed disabled:opacity-30'
                  aria-label='Alejar imagen'
                >
                  −
                </button>
                <span className='min-w-12 text-center font-mono text-[9px] tabular-nums tracking-[.08em]' aria-live='polite'>
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type='button'
                  onClick={() => changeZoom(zoomLevel + 0.25)}
                  disabled={zoomLevel === 3}
                  className='grid size-8 place-items-center text-lg transition-colors hover:bg-[#c30028] hover:text-[#fcf5ed] disabled:cursor-not-allowed disabled:opacity-30'
                  aria-label='Acercar imagen'
                >
                  +
                </button>
                <button
                  type='button'
                  onClick={() => {
                    changeZoom(1);
                    setZoomOffset({ x: 0, y: 0 });
                  }}
                  className='px-2 font-mono text-[8px] uppercase tracking-widest transition-colors hover:bg-[#c30028] hover:text-[#fcf5ed]'
                >
                  Reiniciar
                </button>
              </div>
              <span className='absolute bottom-4 right-3 hidden bg-[#321b1f]/75 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-[#fcf5ed] sm:block'>
                Rueda para zoom · arrastra para mover
              </span>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
