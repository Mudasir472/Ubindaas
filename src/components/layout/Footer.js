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
            <li><a href="/ShippingPolicy">SHIPPING POLICY</a></li>
            <li><a href="/ReturnPolicy">RETURNS & EXCHANGES</a></li>
            <li><a href="/PrivacyPolicy">PRIVACY POLICY</a></li>
            <li><a href="/terms">LOYALTY POINTS</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>SHOP</h4>
          <ul>
            <li><a href="/about">Men</a></li>
            <li><a href="/contact">Women</a></li>
           
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h4>COMPANY</h4>
          <ul>
            <li><a href="/AboutUs">ABOUT US</a></li>
            <li><a href="/ContactUs">CONTACT US</a></li>
            <li><a href="/FAQs">FAQs</a></li>
            <li><a href="/sizeguide">SIZE GUIDE</a></li>
            <li><a href="/TermConditions">TERMS & CONDITIONS</a></li>

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
        <p>&copy; 2025 UBINDASS. All rights reserved.</p>
        <div className="social-links">
          <a href="https://www.facebook.com">Facebook</a>
          <a href="https://www.twitter.com">Twitter</a>
          <a href="https://www.instagram.com">Instagram</a>
        </div>
        <p>DESIGNED & DEVELOPED BY <a href="https://opamtech.com" target="_blank">OPAM TECHNOLOGY</a></p>
      </div>
    </footer>
  );
};

export default Footer;