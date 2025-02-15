import React from 'react';

import '../../styles/components/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="footer-section">
          <h4>INFORMATION</h4>
          <ul>
            <li><a href="/about">SHIPPING POLICY</a></li>
            <li><a href="/contact">RETURNS & EXCHANGES</a></li>
            <li><a href="/privacy-policy">PRIVACY POLICY</a></li>
            <li><a href="/terms">LOYALTY POINTS</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>SHOP</h4>
          <ul>
            <li><a href="/about">DRESSES</a></li>
            <li><a href="/contact">TOPS</a></li>
            <li><a href="/privacy-policy">TROUSERS</a></li>
            <li><a href="/terms">SKIRTS</a></li>
            <li><a href="/terms">SKIRTS</a></li>
            <li><a href="/terms">SETS</a></li>
            <li><a href="/terms">WORK WEAR</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h4>COMPANY</h4>
          <ul>
            <li><a href="/faq">ABOUT US</a></li>
            <li><a href="/help-center">CONTACT US</a></li>
            <li><a href="/shipping">FAQs</a></li>
            <li><a href="/shipping">SIZE GUIDE</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to get the latest updates and offers.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Social Links & Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2025 DEST UBINDASS. All rights reserved.</p>
        <div className="social-links">
          <a href="https://www.facebook.com">Facebook</a>
          <a href="https://www.twitter.com">Twitter</a>
          <a href="https://www.instagram.com">Instagram</a>
        </div>
        <p>&copy; DESIGNED & DEVELOPED BY <a href="https://opamtech.com" target="_blank">OPAM TECHNOLOGY</a></p>
      </div>
    </footer>
  );
};

export default Footer;