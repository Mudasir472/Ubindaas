import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white" style={{ backgroundColor: "#000", color: 'white', padding: "30px 0" }}>
      <Container>
        <Row className="gap-5">
          <Col md={2} sm={6} className="mb-3">
            <h6 className="fw-bold mb-3">POLICIES</h6>
            <ul className="list-unstyled">
              <li><a href="/ShippingPolicy">Shipping Policy</a></li>
              <li><a href="/ReturnPolicy">Returns & Pxchanges</a></li>
              <li><a href="/PrivacyPolicy">Privacy Policy</a></li>
              <li><a href="/TermConditions">Terms & Conditions</a></li>
            </ul>
          </Col>
          <Col md={2} sm={6} className="mb-3">
            <h6 className="fw-bold mb-3">SHOP</h6>
            <ul className="list-unstyled">
              <li><a href="/about">Men</a></li>
              <li><a href="/women">Women</a></li>
            </ul>
          </Col>
          <Col md={2} sm={6} className="mb-3">
            <h6 className="fw-bold mb-3">DISCOVER</h6>
            <ul className="list-unstyled">
              <li><a href="/AboutUs">About Us</a></li>
              <li><a href="/ContactUs">Contact Us</a></li>
              <li><a href="/FAQs">FAQs</a></li>
              <li><a href="/sizeguide">Size Guide</a></li>
            </ul>
          </Col>
          <Col md={2} sm={6} className="mb-3">
            <div className="footer-section">
              <h6 className="mb-3 fw-bold">NEWSLETTER</h6>
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
                <button type="submit" style={{ backgroundColor: '#f36478', color: 'white' }} className="btn  rounded-pill px-4">
                  Subscribe
                </button>
              </form>
            </div>

          </Col>
          <Col md={2} sm={6} className="mb-3">
            <div className="footer-section">

              {/* <h4 className="mb-3 d-flex justify-content-center ">Follow Us</h4> */}
              <h6 className="mb-3 fw-bold d-flex justify-content-center">FOLOW US</h6>

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
            </div>
          </Col>
        </Row>
        <div className="d-flex align-items-center justify-content-center mt-3">
          <p>© Copyright 2025 by Ubindaas The Label. All Rights Reserved.</p>
        </div>

      </Container>
    </footer>
  );
};

export default Footer;
