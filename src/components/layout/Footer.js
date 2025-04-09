import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white" style={{ backgroundColor: "#000", color: 'white', padding: "30px 0" }}>
      <Container>
        <Row>
          <Col md={3} sm={6} className="mb-3">
            <h6 className="fw-bold mb-3">POLICIES</h6>
            <ul className="list-unstyled">
              <li><a href="/ShippingPolicy">Shipping policy</a></li>
              <li><a href="/ReturnPolicy">Returns & exchanges</a></li>
              <li><a href="/PrivacyPolicy">Privacy policy</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <h6 className="fw-bold mb-3">SHOP</h6>
            <ul className="list-unstyled">
              <li><a href="/about">Men</a></li>
              <li><a href="/contact">Women</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <h6 className="fw-bold mb-3">DISCOVER</h6>
            <ul className="list-unstyled">
              <li><a href="/AboutUs">About us</a></li>
              <li><a href="/ContactUs">Contact us</a></li>
              <li><a href="/FAQs">FAQs</a></li>
              <li><a href="/sizeguide">Size guide</a></li>
              <li><a href="/TermConditions">Terms & conditions</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <div className="footer-section">
              <h4 className="mb-3">NEWSLETTER</h4>
              <p>Subscribe to get the latest updates and offers.</p>
              <form className="newsletter-form d-flex flex-column align-items-center">
                <div className="w-100 mb-2">
                  <input
                    type="email"
                    className="form-control rounded-pill px-3"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary rounded-pill px-4">
                  Subscribe
                </button>
              </form>
            </div>

          </Col>
        </Row>
        <Row className="mt-3 text-center">
          <Col>
            <h6 className="fw-bold">FOLLOW US</h6>
            <div className="d-flex justify-content-center gap-3">
              <span className="p-2 border border-white rounded">
                <Link to={'https://www.facebook.com'}><FaFacebookF /></Link>
              </span>
              <span className="p-2 border border-white rounded">
                <Link to={'https://www.twitter.com'}><FaTwitter /></Link>
              </span>
              <span className="p-2 border border-white rounded">
                <Link to={'https://www.instagram.com'}> <FaInstagram /></Link>
              </span>
            </div>
          </Col>
        </Row>
        <Row className="mt-3 text-center">
          <Col>
            <p>Designed & developed by </p>
            {/* <a href="https://opamtech.com" target="_blank">Opam Technology</a> */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
