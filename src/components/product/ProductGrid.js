import ProductCard from './ProductCard';
import '../../styles/components/product-grid.css';

function ProductGrid() {
  // Sample product data
  const products = [
    {
      id: 1,
      title: "CAVIAR BLACK KOREAN MINI SKORT",
      price: 1199,
      originalPrice: 1899,
      discount: 37,
      rating: 4.33,
      image: "https://freakins.com/cdn/shop/files/4thjuly24_14382_20ecb707-0627-4380-b13c-3eb8e885116b.jpg?v=1720520146&width=700"
    },
    {
      id: 2,
      title: "GOTHIC CHAINED BLACK DENIM TOP",
      price: 1099,
      originalPrice: 2899,
      discount: 62,
      rating: 4.62,
      image: "https://freakins.com/cdn/shop/products/MyFreakins01272.jpg?v=1670596442&width=700"
    },
    {
      id: 3,
      title: "DENIM BUSTIER TOP",
      price: 999,
      originalPrice: 2699,
      discount: 63,
      rating: 4.75,
      image: "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700"
    },
    {
      id: 4,
      title: "JEAN CORSET TOP CURVE",
      price: 999,
      originalPrice: 2199,
      discount: 55,
      rating: 4.62,
      image: "https://freakins.com/cdn/shop/files/09JUNEPART2_8062-Edit.jpg?v=1718194545&width=700"
    },

    {id: 5,
    title: "CAVIAR BLACK KOREAN MINI SKORT",
    price: 1199,
    originalPrice: 1899,
    discount: 37,
    rating: 4.33,
    image: "https://freakins.com/cdn/shop/files/4thjuly24_14382_20ecb707-0627-4380-b13c-3eb8e885116b.jpg?v=1720520146&width=700"
  },
  {
    id: 6,
    title: "GOTHIC CHAINED BLACK DENIM TOP",
    price: 1099,
    originalPrice: 2899,
    discount: 62,
    rating: 4.62,
    image: "https://freakins.com/cdn/shop/products/MyFreakins01272.jpg?v=1670596442&width=700"
  },
  {
    id: 7,
    title: "DENIM BUSTIER TOP",
    price: 999,
    originalPrice: 2699,
    discount: 63,
    rating: 4.75,
    image: "https://freakins.com/cdn/shop/files/DSC08030_1411f6b1-7db5-484a-b5cc-25a8ee9480b2.jpg?v=1719254956&width=700"
  },
  {
    id: 8,
    title: "JEAN CORSET TOP CURVE",
    price: 999,
    originalPrice: 2199,
    discount: 55,
    rating: 4.62,
    image: "https://freakins.com/cdn/shop/files/09JUNEPART2_8062-Edit.jpg?v=1718194545&width=700"
  }
  ];

  return (
    <div className="products-section">
      <div className="filters-bar">
        <button className="filter-btn">
          Show filters (1)
        </button>
        <div className="sort-options">
          <button className="filter-btn">Size</button>
          <select className="sort-select">
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;