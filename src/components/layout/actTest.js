import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
    return (
        <footer className="text-white" style={{ backgroundColor: "#000", color: 'white', padding: "30px 0" }}>
            <Container>
                <Row>
                    <Col md={3} sm={6} className="mb-3">
                        <h6 className="fw-bold">TOP CATEGORIES</h6>
                        <ul className="list-unstyled">
                            <li>Lehenga Sets</li>
                            <li>Ethnicwear</li>
                            <li>Saree</li>
                            <li>Indo Western</li>
                            <li>Gowns</li>
                            <li>Western Wear</li>
                        </ul>
                    </Col>
                    <Col md={3} sm={6} className="mb-3">
                        <h6 className="fw-bold">DISCOVER</h6>
                        <ul className="list-unstyled">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Blogs</li>
                            <li>Media</li>
                        </ul>
                    </Col>
                    <Col md={3} sm={6} className="mb-3">
                        <h6 className="fw-bold">SUPPORT</h6>
                        <ul className="list-unstyled">
                            <li>Track Order</li>
                            <li>Terms & Services</li>
                            <li>Raise a Return and Exchange</li>
                            <li>Contact Us</li>
                            <li>Buy in Bulk</li>
                        </ul>
                    </Col>
                    <Col md={3} sm={6} className="mb-3">
                        <h6 className="fw-bold">POLICIES</h6>
                        <ul className="list-unstyled">
                            <li>Shipping Policy</li>
                            <li>Privacy Policy</li>
                            <li>Cancellation Policy</li>
                            <li>Refund Policy</li>
                            <li>Return/Exchange Policy</li>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-3 text-center">
                    <Col>
                        <h6 className="fw-bold">FOLLOW US</h6>
                        <div className="d-flex justify-content-center gap-3">
                            <span className="p-2 border border-white rounded">
                                <FaFacebookF />
                            </span>
                            <span className="p-2 border border-white rounded">
                                <FaTwitter />
                            </span>
                            <span className="p-2 border border-white rounded">
                                <FaInstagram />
                            </span>
                            <span className="p-2 border border-white rounded">
                                <FaPinterestP />
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3 text-center">
                    <Col>
                        <p className="m-0">&copy; Copyright 2025 by Lavanya The Label. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
