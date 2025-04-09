import Carousel from '../components/layout/Carousel';
import CollectionPills from '../components/layout/CollectionPills';
import ProductGrid from '../components/product/ProductGrid';
import '../styles/pages/home.css';
import Ratting from '../components/common/Ratting';
import ProductStories from '../components/product/ProductStories';
import FeaturesProducts from '../components/product/FeaturedProducts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DiscoverUbindass from './DiscoverUbindass';


function Home() {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/offerBanners`);
        setOffer(response.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOffer();
  }, []);

  return (
    <div className="home-page">
      <Carousel />
      <CollectionPills />
      <div className="sort-options">
        <div >
          <img src={`${process.env.REACT_APP_API_BASE_URL}/uploads/offerbanners/${Array.isArray(offer) && offer[0]?.image}`} style={{ width: '100%', height: '25rem' }} alt="New Arrivals Banner" />
        </div>

      </div>
      <ProductGrid />
      <div className="sort-options">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* <img src="/new-arrival.png" style={{ width: '100%', height: '174px' }} alt="New Arrivals Banner" /> */}
          <img src={`${process.env.REACT_APP_API_BASE_URL}/uploads/offerbanners/${Array.isArray(offer) && offer[1]?.image}`} style={{ width: '100%', height: '25rem' }} alt="New Arrivals Banner" />

        </div>
      </div>
      <FeaturesProducts />

      <h1 className="shop-heading">Shop Bold. Shop Bindass</h1>

      <ProductStories />

      <Ratting />
      <DiscoverUbindass />

    </div>
  );
}

export default Home;