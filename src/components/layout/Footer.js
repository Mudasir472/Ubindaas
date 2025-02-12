import React from 'react';
import { 
  FiMapPin, FiPhone, FiMail, FiClock,
  FiFacebook, FiInstagram, FiTwitter, FiYoutube,
  FiCreditCard, FiShield, FiTruck, FiRefreshCw
} from 'react-icons/fi';
import '../../styles/components/footer.css';

function Footer() {
  return (
    <footer className="footer">
      {/* Trust Badges Section */}
      <div className="trust-badges">
        <div className="badge">
          <FiTruck className="badge-icon" />
          <div className="badge-content">
            <h4>Free Shipping</h4>
            <p>On orders above ₹999</p>
          </div>
        </div>
        <div className="badge">
          <FiRefreshCw className="badge-icon" />
          <div className="badge-content">
            <h4>Easy Returns</h4>
            <p>7-day return policy</p>
          </div>
        </div>
        <div className="badge">
          <FiCreditCard className="badge-icon" />
          <div className="badge-content">
            <h4>Secure Payment</h4>
            <p>100% secure checkout</p>
          </div>
        </div>
        <div className="badge">
          <FiShield className="badge-icon" />
          <div className="badge-content">
            <h4>Premium Quality</h4>
            <p>Quality guaranteed</p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter">
        <div className="newsletter-content">
          <h3>Join Our Newsletter</h3>
          <p>Subscribe to get special offers, free giveaways, and trending updates</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p className="about-text">
            UbinDaas is your one-stop fashion destination, offering premium quality clothing
            with a perfect blend of contemporary and traditional designs.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <FiMapPin />
              <span>123 Fashion Street, Design District, City</span>
            </div>
            <div className="contact-item">
              <FiPhone />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <FiMail />
              <span>hello@ubindaas.com</span>
            </div>
            <div className="contact-item">
              <FiClock />
              <span>Mon - Sat: 10:00 - 19:00</span>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/new-arrivals">New Arrivals</a></li>
            <li><a href="/bestsellers">Bestsellers</a></li>
            <li><a href="/trending">Trending Now</a></li>
            <li><a href="/sale">Sale</a></li>
            <li><a href="/collections">Collections</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul className="footer-links">
            <li><a href="/track-order">Track Order</a></li>
            <li><a href="/shipping">Shipping Policy</a></li>
            <li><a href="/returns">Returns & Exchanges</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Download Our App</h3>
          <div className="app-buttons">
            <img src="/images/app-store.png" alt="Download on App Store" />
            <img src="/images/play-store.png" alt="Get it on Play Store" />
          </div>
          <div className="social-links">
            <a href="#" className="social-link"><FiFacebook /></a>
            <a href="#" className="social-link"><FiInstagram /></a>
            <a href="#" className="social-link"><FiTwitter /></a>
            <a href="#" className="social-link"><FiYoutube /></a>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-methods">
        <img src="/images/payment-methods.png" alt="Accepted Payment Methods" />
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="copyright">
          © 2024 UbinDaas. All rights reserved.
        </div>
        <div className="bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/sitemap">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;