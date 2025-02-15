import Carousel from '../components/layout/Carousel';
import CollectionPills from '../components/layout/CollectionPills';
import ProductGrid from '../components/product/ProductGrid';
import '../styles/pages/home.css';


function Home() {
  return (
    <div className="home-page">
      <CollectionPills />
      <Carousel/>
      <ProductGrid />
      
    </div>
  );
}

export default Home;