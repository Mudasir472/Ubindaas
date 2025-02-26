import React from 'react';
import '../../styles/components/Others/ShippingPolicy.css';

const ShippingPolicy = () => {
  return (
    <div className="shipping-policy">
     

      <h1>Shipping Policy</h1>

      <p className="welcome">
        Welcome to Ubindass! We are committed to delivering your order quickly and efficiently. Please read our shipping policy below:
      </p>

      <section className="policy-section">
        <h2>Processing Time</h2>
        <p>All orders are processed within 3-4 business days (excluding weekends and holidays) after receiving your order confirmation email.</p>
        <p>You will receive another notification when your order has shipped.</p>
      </section>

      <section className="policy-section">
        <h2>Shipping Rates & Delivery</h2>
        <div className="shipping-types">
          <h3>Domestic Shipping:</h3>
          <p>We offer free standard shipping on all orders above ₹999 within India. For orders below ₹999, a flat shipping fee of ₹100 will be applied.</p>
          
          <div className="shipping-options">
            <p><strong>- Standard Shipping :</strong> 4-7 business days</p>
            <p><strong>- Express Shipping :</strong> 2-4 business days (charges may apply)</p>
          </div>
          
          <h3>- International Shipping:</h3>
          <p>Shipping rates vary based on the destination country and will be calculated at checkout. Delivery time varies between 7-15 business days.</p>
        </div>
      </section>

      <section className="policy-section">
        <h2>Order Tracking</h2>
        <p>Once your order is shipped, you will receive a confirmation email with tracking details. You can track your order through the link provided.</p>
      </section>

      <section className="policy-section">
        <h2>Shipping Restrictions</h2>
        <p>We currently do not ship to P.O. boxes</p>
        <p>International shipping may be subject to customs duties and taxes, which are the responsibility of the customer.</p>
      </section>

      <section className="policy-section">
        <h2>Delayed or Lost Packages</h2>
        <p>If your package is delayed or lost, please contact our customer service at support@ubindass.in. We will work with the carrier to locate your package or arrange a replacement if necessary.</p>
      </section>

      <section className="policy-section">
        <h2>Address Changes</h2>
        <p>- Please ensure your shipping address is correct before finalizing your order. We are not responsible for orders delivered to incorrect or outdated addresses.</p>
      </section>

      <section className="policy-section">
        <h2>Contact Us</h2>
        <p>For any shipping-related inquiries, feel free to contact us at support@ubindass.com</p>
      </section>
    </div>
  );
};

export default ShippingPolicy;