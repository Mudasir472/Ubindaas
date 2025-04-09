import React from 'react';
import '../../styles/components/Others/ShippingPolicy.css';

const ShippingPolicy = () => {
  return (
    <div className="shipping-wrapper">
      <div className="shipping-container">
        <h1 className="shipping-title">Shipping Policy</h1>

        <p>
          Welcome to UBINDASS! We aim to provide you with the best shopping experience, ensuring that your orders reach you in a timely and efficient manner. Please read our shipping policy carefully to understand our shipping procedures.
        </p>

        <section>
          <h2>Shipping & Delivery</h2>
          <ul>
            <li>We offer free shipping on all prepaid orders across India.</li>
            <li>For Cash on Delivery (COD) orders, a nominal charge may be applicable and will be displayed at checkout.</li>
            <li>Orders are processed and dispatched within 24–48 business hours after confirmation.</li>
            <li>The estimated delivery time is 7–10 business days depending on your location.</li>
            <li>We partner with trusted courier services to ensure safe and timely deliveries.</li>
          </ul>
        </section>

        <section>
          <h2>Order Tracking</h2>
          <ul>
            <li>Once your order is shipped, you will receive a tracking link via email or SMS.</li>
            <li>You can track your order status through our website by entering your tracking ID.</li>
          </ul>
        </section>

        <section>
          <h2>Shipping Restrictions</h2>
          <ul>
            <li>We currently ship only within India.</li>
            <li>
              Shipping to remote or non-serviceable areas may take longer or may not be possible. In such cases, we will inform you and process a refund if necessary.
            </li>
          </ul>
        </section>

        <section>
          <h2>Address Changes & Order Modifications</h2>
          <ul>
            <li>Address changes or modifications can be made only before the order is shipped.</li>
            <li>Once dispatched, no modifications can be made to the order.</li>
          </ul>
        </section>

        <section>
          <h2>Non-Delivery or Delay</h2>
          <ul>
            <li>
              If a package is delayed due to unforeseen circumstances (such as weather conditions,
              strikes, or natural disasters), we will do our best to keep you updated.
            </li>
            <li>
              In case of non-delivery due to incorrect address or customer unavailability, the order
              may be returned to us. Additional shipping charges may apply for re-shipment.
            </li>
          </ul>
        </section>

        <section>
          <h2>Lost or Damaged Shipments</h2>
          <ul>
            <li>
              If your order is lost in transit or arrives damaged, please contact our support team at{" "}
              <a href="mailto:support@ubindass.in">support@ubindass.in</a> within 48 hours of delivery.
            </li>
            <li>We will investigate and provide a resolution, which may include a replacement or refund.</li>
          </ul>
        </section>

        <section>
          <h2>International Shipping</h2>
          <ul>
            <li>Currently, we do not offer international shipping. Stay tuned for updates as we expand our services.</li>
          </ul>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            For any further queries, please reach out to us at{" "}
            <a href="mailto:support@ubindass.in">support@ubindass.in</a> or call our customer support at{" "}
            <a href="tel:+917275999340">+91 7275999340</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
