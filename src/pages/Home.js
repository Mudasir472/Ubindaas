import CollectionPills from '../components/layout/CollectionPills';
import ProductGrid from '../components/product/ProductGrid';
import '../styles/pages/home.css';
import Footer from '../components/layout/Footer';

function Home() {
  return (
    <div className="home-page">
      <CollectionPills />
      <ProductGrid />
      <Footer/>
    </div>
  );
}

export default Home;