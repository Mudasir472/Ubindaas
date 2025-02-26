import React, { useEffect } from 'react';
import '../../styles/components/Others/AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    // Add animation class to elements after component mounts
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 200); // Stagger the animations
    });
  }, []);

  return (
    <div className="about-container">
      <div className="hero-section">
        <h1 className="about-title fade-in">About Us</h1>
        
        <div className="breadcrumb fade-in">
          <span className="breadcrumb-item">Home</span>
          <span className="separator">›</span>
          <span className="breadcrumb-item">Pages</span>
          <span className="separator">›</span>
          <span className="breadcrumb-item current">About Us</span>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="content-card fade-in">
          <p className="welcome-text">
                                 Welcome to <span className="brand-name highlight">Ubindass</span>, 
            your one-stop destination for stylish and affordable clothing! 
            <span className="accent-line"></span>
          </p>

          <div className="feature-block fade-in">
            <div className="feature-icon">✨</div>
            <p className="brand-description">
              At <span className="brand-name">Ubindass</span>, we believe that fashion 
              is an expression of individuality, and we're committed to bringing you 
              fresh styles that match your personality, all without breaking the bank. 
              Our brand is all about empowering you to express yourself through your 
              wardrobe while staying comfortable and trendy.
            </p>
          </div>

          <div className="feature-block fade-in">
            <div className="feature-icon">🎯</div>
            <p className="collection-info">
              Whether you're looking for casual wear or a standout piece for a special 
              occasion, Ubindass has got you covered. Our collection is carefully curated 
              to ensure you always have access to the latest trends with the perfect mix 
              of style, quality, and affordability.
            </p>
          </div>

          <div className="cta-section fade-in">
            <p className="closing-text">
              Shop with us today and discover why 
              <span className="brand-name highlight">Ubindass</span> 
              is becoming a favorite among fashion-forward individuals!
            </p>
            <button className="shop-now-btn">
              Shop Now
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;