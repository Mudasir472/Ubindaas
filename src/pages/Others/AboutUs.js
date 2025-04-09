import React, { useEffect } from 'react';
import '../../styles/components/Others/AboutUs.css';
import { Link } from 'react-router-dom';

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

      <div className="content-wrapper">
        <div className="content-card fade-in">
          <h2 className="welcome-text">
            <span className="brand-name text-dark highlight">About Us- UBINDASS</span>
            <span className="accent-line"></span>
          </h2>

          <div className="feature-block fade-in">
            <p className="brand-description">
              At UBINDASS, we believe that fashion is not just about wearing clothes—it's about embracing confidence, attitude, and individuality. Our brand brings you a fusion of trendy Western wear and elegant traditional outfits, crafted with high-quality fabrics and unique designs that make you stand out.
            </p>
          </div>

          <div className="feature-block fade-in">
            <p className="collection-info">
              Whether you love the boldness of modern styles or the grace of ethnic wear, we've got you covered. Our collections are designed for the modern woman who isn't afraid to be bold, be stylish, and be herself.
            </p>
          </div>

          <div className="feature-block fade-in">
            <div className="feature-icon"></div>
            <p className="highlight-text">
              ✨ Designed for the woman who, no matter where she is in the world, passionately wears India on her sleeve. ✨
            </p>
          </div>

          <div className="brand-forte-section fade-in">
            <h3 className="section-title">Brand Forte</h3>
            <ul className="forte-list">
              <li className="forte-item">
                <span className="forte-icon">🔹</span>
                <span className="forte-text"><strong>Fusion of Fashion & Culture</strong> – A seamless blend of contemporary Western styles and India's rich heritage.</span>
              </li>
              <li className="forte-item">
                <span className="forte-icon">🔹</span>
                <span className="forte-text"><strong>Exclusive & Unique Designs</strong> – Every outfit is crafted to make you stand out.</span>
              </li>
              <li className="forte-item">
                <span className="forte-icon">🔹</span>
                <span className="forte-text"><strong>Premium Quality Fabrics</strong> – Comfortable, stylish, and durable materials for a luxury feel.</span>
              </li>
              <li className="forte-item">
                <span className="forte-icon">🔹</span>
                <span className="forte-text"><strong>Trendsetting Styles</strong> – Always ahead of fashion trends, bringing fresh collections regularly.</span>
              </li>
              <li className="forte-item">
                <span className="forte-icon">🔹</span>
                <span className="forte-text"><strong>Empowering Women Through Fashion</strong> – Designed to boost confidence and celebrate individuality.</span>
              </li>
            </ul>
          </div>

          <div className="founder-section fade-in">
            <h3 className="section-title">Founder's Note</h3>
            <p className="founder-text">
              Sahil, the visionary behind UBINDASS, is a passionate entrepreneur with a deep love for fashion and innovation. With years of experience in B2B and B2C marketing, he recognized the need for a brand that blends India's rich traditions with modern trends. His mission is simple—to create fashion that empowers women, makes them feel unique, and connects them to their roots while embracing contemporary styles.
            </p>
            <blockquote className="founder-quote">
              "Ubindass is more than just clothing; it's an expression of who you are. Our goal is to inspire confidence and celebrate individuality through every design we create." – Sahil
            </blockquote>
          </div>

          <div className="cta-section fade-in">
            <p className="closing-text">
              Join the Ubindass Tribe and redefine your style—because fashion is an attitude, and you wear it best!
            </p>
            <Link to={'/'}>
              <button className="shop-now-btn p-3 btn btn-dark">
                Shop Now
                <span className="btn-arrow">→</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;