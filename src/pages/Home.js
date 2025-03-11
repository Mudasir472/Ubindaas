import Carousel from '../components/layout/Carousel';
import CollectionPills from '../components/layout/CollectionPills';
import ProductGrid from '../components/product/ProductGrid';
import '../styles/pages/home.css';
import Ratting from '../components/common/Ratting';
import ProductStories from '../components/product/ProductStories';
import FeaturesProducts from '../components/product/FeaturedProducts';


function Home() {
  return (
    <div className="home-page">
      
      <Carousel/>
      <CollectionPills />
      <ProductGrid />
      <FeaturesProducts/>
      <h1 className="shop-heading">Shop Bold. Shop Bindass</h1>

      <ProductStories/>
      
      <Ratting />

    </div>
  );
}

export default Home;