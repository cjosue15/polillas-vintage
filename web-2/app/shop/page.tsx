import Container from '../components/shared/container';
import { ShopCatalog } from '../components/shop-catalog';

export default function ShopPage() {
  return (
    <main className='min-h-screen'>
      <Container>
        <ShopCatalog />
      </Container>
    </main>
  );
}
