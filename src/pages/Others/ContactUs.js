// ContactUs.js
import React from 'react';
import '../../styles/components/Others/ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <nav className="breadcrumb">
        <span>Home</span>
        <span className="separator">&gt;</span>
        <span>Pages</span>
        <span className="separator">&gt;</span>
        <span>Contact</span>
      </nav>

      <div className="contact-content">
        <h2>Hi, friends!</h2>
        <h1>Contact Us</h1>
        
        <p className="welcome-text">
          Welcome to UBINDASS! Step into style with UBINDASS, where fashion meets passion! We're just a call or email away for all your fashion needs.
        </p>

        <div className="contact-info-grid">
          <div className="contact-box">
            <div className="icon">✉</div>
            <h3>Support Email</h3>
            <p>Product Related Queries : store@ubindass.in</p>
            <p>Order Related Queries : order@ubindass.in</p>
          </div>

          <div className="contact-box">
            <div className="icon">📞</div>
            <h3>CONTACT INFO</h3>
            <p>Customer care direct landline or Whatsapp</p>
            <p>(+91) 7275999340</p>
          </div>

          <div className="contact-box">
            <div className="icon">🕒</div>
            <h3>BUSINESS HOURS</h3>
            <p>Everyday</p>
            <p>10:00 AM - 7:00 PM</p>
          </div>
        </div>

        <h2 className="question-heading">Have an question? Contact us!</h2>

        <form className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Name" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
          </div>
          <input type="text" placeholder="Subject" className="form-input full-width" />
          <textarea placeholder="Write Your Comment..." className="form-textarea"></textarea>
          <button type="submit" className="submit-button">SEND MESSAGE</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;