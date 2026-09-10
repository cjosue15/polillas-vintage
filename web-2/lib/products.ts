export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  tag: string;
  description: string;
  tone: string;
  position: string;
};

export const products: Product[] = [
  { slug: "vestido-luna", name: "Vestido Luna", category: "Vestidos", price: 189, tag: "Nuevo", description: "Vestido negro de silueta envolvente, liviano y fácil de llevar de día o de noche.", tone: "bg-[#e7d5d0]", position: "object-[center_30%]" },
  { slug: "top-sombra", name: "Top Sombra", category: "Tops", price: 89, tag: "Favorito", description: "Top de malla suave con transparencias sutiles y actitud noventera.", tone: "bg-[#d4c8be]", position: "object-[center_45%]" },
  { slug: "falda-roma", name: "Falda Roma", category: "Faldas", price: 159, tag: "Edición limitada", description: "Falda midi de caída fluida. Una pieza para repetir toda la temporada.", tone: "bg-[#c8d0c8]", position: "object-[center_25%]" },
  { slug: "pantalon-club", name: "Pantalón Club", category: "Pantalones", price: 179, tag: "Nuevo", description: "Pantalón de tiro alto con pierna amplia y carácter de archivo.", tone: "bg-[#d8d0c1]", position: "object-[center_65%]" },
];

export function formatPrice(price: number) {
  return `S/ ${price}`;
}

export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
