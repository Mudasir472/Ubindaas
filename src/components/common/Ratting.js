import React, { useEffect, useState, useRef } from 'react';
import '../../styles/components/Ratting.css';
import axios from 'axios';

// Star icon component
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD700" width="20" height="20">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

// Arrow icons for scrolling
const LeftArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const RightArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
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
  // Adding more dummy reviews to test scrolling
  {
    image: "https://www.lavanyathelabel.com/cdn/shop/files/Aadya_Khanna.jpg?v=1740112603",
    name: "Priya Sharma",
    review: "I absolutely love this outfit! The fit is perfect and the material feels so luxurious.",
    stars: 5
  },
  {
    image: "https://www.lavanyathelabel.com/cdn/shop/files/Gupta_Ritika.jpg?v=1740115458",
    name: "Neha Patel",
    review: "The color is exactly as shown in the pictures. Got so many compliments when I wore it!",
    stars: 4
  },
  {
    image: "https://www.lavanyathelabel.com/cdn/shop/files/Adrija_Saha.jpg?v=1740113179",
    name: "Meera Reddy",
    review: "Shipping was fast and the quality exceeded my expectations. Will definitely order again.",
    stars: 5
  },
];

const Ratting = () => {
  const [allReviews, setAllReviews] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/ratings/getAllRatings`);
      setAllReviews(response?.data?.ratings);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Function to handle scroll buttons
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -330 : 330; // Width of card + margin
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      // Update scroll position for arrow visibility
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  // Update scroll position when scrolling manually
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  // Determine if arrows should be visible based on scroll position
  const showLeftArrow = scrollPosition > 0;
  const showRightArrow = scrollContainerRef.current ?
    scrollPosition < scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10 :
    true;

  // Use actual reviews if available, otherwise use dummy data
  const displayReviews = allReviews || reviews;

  return (
    <div className="customer-reviews">
      <h2 className="reviews-title">CUSTOMER REVIEWS</h2>

      <div className="reviews-scroll-container">
        {showLeftArrow && (
          <button className="scroll-arrow scroll-left" onClick={() => scroll('left')}>
            <LeftArrow />
          </button>
        )}

        <div
          className="reviews-container"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {displayReviews?.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-image-container">
                {/* <img src={review?.userId?.image?.url} alt={`${review?.userId?.name}'s review`} className="review-image" /> */}
              </div>
              <div className="review-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="review-text">{review.review}</p>
              <p className="review-name">{review?.userId?.name}</p>
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button className="scroll-arrow scroll-right" onClick={() => scroll('right')}>
            <RightArrow />
          </button>
        )}
      </div>

    </div>
  );
};

export default Ratting;