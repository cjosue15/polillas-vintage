'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type CartContextValue = {
  itemCount: number;
  addItem: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [itemCount, setItemCount] = useState(0);
  const value = useMemo(
    () => ({
      itemCount,
      addItem: () => setItemCount((count) => count + 1),
    }),
    [itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error('useCart debe usarse dentro de CartProvider.');
  }

  return cart;
}
