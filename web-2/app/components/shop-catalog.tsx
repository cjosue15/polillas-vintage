'use client';

import { useMemo, useState } from 'react';
import { Product, products } from '../../lib/products';
import { ProductCard } from './store';

const categories = ['Todo', ...new Set(products.map((product) => product.category))];

const sortOptions = [
  { value: 'featured', label: 'Selección editorial' },
  { value: 'low', label: 'Precio: menor a mayor' },
  { value: 'high', label: 'Precio: mayor a menor' },
  { value: 'name', label: 'Nombre: A — Z' },
] as const;

type Sort = (typeof sortOptions)[number]['value'];

function FilterMark({ open }: { open: boolean }) {
  return (
    <span aria-hidden='true' className='relative block h-3 w-3'>
      <span className='absolute left-0 right-0 top-1.5 h-px bg-current' />
      <span className={`absolute left-1.5 top-0 h-3 w-px bg-current transition-transform ${open ? 'rotate-90' : ''}`} />
    </span>
  );
}

export function ShopCatalog() {
  const [category, setCategory] = useState('Todo');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('featured');
  const [maxPrice, setMaxPrice] = useState(200);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es-PE');
    const filtered = products.filter((product) => {
      const matchesCategory = category === 'Todo' || product.category === category;
      const matchesPrice = product.price <= maxPrice;
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.category} ${product.tag}`.toLocaleLowerCase('es-PE').includes(normalizedQuery);
      return matchesCategory && matchesPrice && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name, 'es');
      return products.indexOf(a) - products.indexOf(b);
    });
  }, [category, maxPrice, query, sort]);

  const resetFilters = () => {
    setCategory('Todo');
    setQuery('');
    setMaxPrice(200);
    setSort('featured');
  };

  return (
    <section className='pb-12 sm:py-8' aria-labelledby='shop-title'>
      <div className='flex flex-col justify-between gap-6 border-b border-[#232021] pb-8 sm:flex-row sm:items-end'>
        <div>
          <p className='mb-3 text-[10px] font-bold uppercase tracking-[0.17em]'>Polillas / Tienda</p>
          <h1
            id='shop-title'
            className='m-0 text-[clamp(2.8rem,6vw,5.7rem)] font-extrabold leading-[.84] tracking-[-.07em]'
          >
            El archivo
            <br />
            <em className='font-normal'>completo.</em>
          </h1>
        </div>
        <p className='max-w-xs text-sm leading-relaxed opacity-70'>
          Hallazgos vintage seleccionados uno por uno. Stock único, como cada historia.
        </p>
      </div>

      <div className='mt-6 flex flex-col gap-4 border-b border-[#232021] pb-5 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex gap-2 overflow-x-auto pb-1 text-[10px] font-bold uppercase tracking-[0.14em] lg:pb-0'>
          {categories.map((item) => (
            <button
              key={item}
              type='button'
              onClick={() => setCategory(item)}
              className={`shrink-0 border px-4 py-2.5 transition-colors ${
                category === item
                  ? 'border-[#232021] bg-[#232021] text-[#fcf5ed]'
                  : 'border-[#232021] hover:bg-[#f2ddd2]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className='flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.14em]'>
          <span>{visibleProducts.length} piezas</span>
          <button
            type='button'
            onClick={() => setFiltersOpen((open) => !open)}
            className='inline-flex items-center gap-2 border-b border-[#232021] pb-1'
          >
            Filtros <FilterMark open={filtersOpen} />
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className='grid gap-6 border-b border-[#232021] bg-[#f2ddd2] px-4 py-6 sm:grid-cols-3 sm:px-6'>
          <label className='block'>
            <span className='mb-3 block text-[10px] font-bold uppercase tracking-[0.14em]'>Buscar pieza</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Nombre, categoría…'
              className='w-full border-b border-[#232021] bg-transparent py-2 text-sm outline-none placeholder:text-[#232021]/45'
            />
          </label>
          <label className='block'>
            <span className='mb-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.14em]'>
              Precio máximo <span>S/ {maxPrice}</span>
            </span>
            <input
              type='range'
              min='80'
              max='200'
              step='10'
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className='mt-2 w-full accent-[#300028]'
            />
          </label>
          <label className='block'>
            <span className='mb-3 block text-[10px] font-bold uppercase tracking-[0.14em]'>Ordenar por</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className='w-full border-b border-[#232021] bg-transparent py-2 text-sm outline-none'
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {visibleProducts.length ? (
        <div className='mt-9 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4'>
          {visibleProducts.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className='border-b border-[#232021] py-20 text-center'>
          <p className='text-2xl leading-none'>Ninguna pieza por aquí.</p>
          <button
            type='button'
            onClick={resetFilters}
            className='mt-6 border-b border-[#232021] pb-1 text-[10px] font-bold uppercase tracking-[0.14em]'
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </section>
  );
}
