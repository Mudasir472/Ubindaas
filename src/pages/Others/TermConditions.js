import React from 'react';
import '../../styles/components/Others/TermConditions.css';

const TermConditions = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms & Conditions</h1>
      
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Pages</span> &gt; <span>Terms & Conditions</span>
      </div>

      <div className="terms-content">
        <section>
          <h2>1. Introduction</h2>
          <p>Welcome to Ubindass. By accessing or using our website (www.ubindass.in) and purchasing products from our online store, you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully. If you do not agree to any part of these Terms, you should not use our website or services.</p>
        </section>

        <section>
          <h2>2. Eligibility</h2>
          <p>To use our website and services, you must be at least 18 years old or have reached the age of majority in your jurisdiction. By using our website, you represent that you meet this requirement.</p>
        </section>

        <section>
          <h2>3. Account Registration</h2>
          <p>When you create an account with Ubindass, you must provide accurate and up-to-date information. You are responsible for maintaining the confidentiality of your account details and password. Any activity conducted through your account is your responsibility.</p>
        </section>

        <section>
          <h2>4. Online Store Terms</h2>
          <div className="subsection">
            <h3>a. Product Availability</h3>
            <p>All products listed on our website are subject to availability. We reserve the right to discontinue any product at any time without notice.</p>
          </div>

          <div className="subsection">
            <h3>b. Pricing and Payments</h3>
            <p>Prices for our products are subject to change without notice. We accept various payment methods, which will be listed during the checkout process. By providing your payment details, you agree to the terms and conditions of the payment provider.</p>
          </div>

          <div className="subsection">
            <h3>c. Order Processing</h3>
            <p>Once you place an order, you will receive a confirmation email or call. Acceptance of your order is not guaranteed until we process and ship it. We reserve the right to refuse or cancel any order for reasons including but not limited to product availability, pricing errors, or fraudulent activity.</p>
          </div>

          <div className="subsection">
            <h3>d. Shipping and Delivery</h3>
            <p>Shipping times and costs will vary based on your location and the selected shipping method. Estimated delivery times are not guaranteed. Ubindass is not responsible for delays or issues caused by the shipping carrier.</p>
          </div>

          <div className="subsection">
            <h3>e. Returns and Refunds</h3>
            <p>You may return or exchange products within [insert return period, e.g., 30 days] of delivery, provided the products are unused, in original condition, and with tags still attached. Return shipping costs will be borne by the customer unless the product received is defective or incorrect.</p>
          </div>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <p>All content on the Ubindass website, including images, text, logos, and graphics, is the intellectual property of Ubindass. You may not use, reproduce, or distribute our content without explicit permission.</p>
        </section>

        <section>
          <h2>6. User Conduct</h2>
          <p>By using our website, you agree not to:</p>
          <ul1>
            <li>Engage in fraudulent activities.</li>
            <li>Violate any local, state, or international laws.</li>
            <li>Attempt to interfere with the operation of our website.</li>
            <li>Post or transmit harmful, offensive, or illegal content.</li>
          </ul1>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>Ubindass is not liable for any direct, indirect, or incidental damages arising from your use of our website, including issues related to products, services, or interactions with third parties.</p>
        </section>

        <section>
          <h2>8. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. These links are provided for your convenience, and Ubindass is not responsible for the content or policies of third-party sites.</p>
        </section>

        <section>
          <h2>9. Modification of Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of the site after changes constitute your acceptance of the new Terms.</p>
        </section>

        <section>
          <h2>10. Governing Law</h2>
          <p>These Terms and your use of the website shall be governed by and construed in accordance with the laws of [insert jurisdiction, e.g., India], without regard to its conflict of law principles.</p>
        </section>

        <section>
          <h2>11. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at support@ubindass.in</p>
        </section>
      </div>
    </div>
  );
};

export default TermConditions;