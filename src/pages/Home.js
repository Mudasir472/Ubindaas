import CollectionPills from '../components/layout/CollectionPills';
import '../styles/pages/home.css';

function Home() {
  return (
    <div className="home-page">
      <CollectionPills />
      <div className="home-content">
        {/* Product grid will be added here */}
      </div>
    </div>
  );
}

export default Home;