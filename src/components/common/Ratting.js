import React from 'react';
import '../../styles/components/Ratting.css';

// Star icon component
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD700" width="20" height="20">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

// Customer review data type
const reviews = [
  {
    image: "https://www.lavanyathelabel.com/cdn/shop/files/Aadya_Khanna.jpg?v=1740112603",
    name: "Aadya Khanna",
    review: "Dress quality is good, Dress color so pretty, Dupatta is so beautiful 👌 Embroidery is good.",
    stars: 5
  },
  {
    image: "https://www.lavanyathelabel.com/cdn/shop/files/Gupta_Ritika.jpg?v=1740115458",
    name: "Gupta Ritika", 
    review: "Awesome dress as I expected from the. The material of the cloth is really wonderful and the shine of the dress is fabulous.",
    stars: 5
  },
  {
    image: "https://www.lavanyathelabel.com/cdn/shop/files/Adrija_Saha.jpg?v=1740113179",
    name: "Adrija Saha",
    review: "This outfit is just wow... Super comfortable, good looking color, fabric is so breathable, pretty looking. Definitely go for it without thinking twice.",
    stars: 5
  },
  {
    image: "https://www.lavanyathelabel.com/cdn/shop/files/Aesha_Mayank_Bhavsar_2.jpg?v=1740113766",
    name: "Aesha Mayank Bhavsar",
    review: "The multi purpose lehenga and the look, fit & fabric is really amazing ❤️❤️",
    stars: 5
  },
 
];

const Ratting = () => {
  return (
    <div className="customer-reviews">
      <h2 className="reviews-title">CUSTOMER REVIEWS</h2>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-image-container">
              <img src={review.image} alt={`${review.name}'s review`} className="review-image" />
            </div>
            <div className="review-stars">
              {[...Array(review.stars)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <p className="review-text">{review.review}</p>
            <p className="review-name">{review.name}</p>
          </div>
        ))}
      </div>
      <button className="view-all-btn">VIEW ALL</button>
    </div>
  );
};

export default Ratting;