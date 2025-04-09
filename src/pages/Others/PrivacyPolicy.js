import React from 'react';
import "../../styles/components/Others/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-wrapper">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>

        <p>
          At UBINDASS, we respect your privacy and are committed to protecting your personal
          information. This Privacy Policy outlines how we collect, use, and safeguard your data when
          you visit our website and use our services.
        </p>

        <section>
          <h2>1. Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal Information:</strong> When you place an order, sign up for an account,
              subscribe to our newsletter, or contact us, we may collect details such as your name,
              email address, phone number, shipping address, and payment details.
            </li>
            <li>
              <strong>Non-Personal Information:</strong> We may collect technical information such as
              IP address, browser type, device information, and browsing behavior to improve our
              website performance.
            </li>
            <li>
              <strong>Cookies & Tracking Technologies:</strong> We use cookies to enhance your browsing
              experience and gather analytics about site traffic and interaction.
            </li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To process and fulfill your orders, including payments, shipping, and returns.</li>
            <li>To communicate with you regarding your orders, promotions, and updates.</li>
            <li>To improve our website, products, and customer service.</li>
            <li>To detect and prevent fraudulent transactions and ensure security.</li>
            <li>To personalize your shopping experience based on your preferences.</li>
          </ul>
        </section>

        <section>
          <h2>3. Sharing of Information</h2>
          <ul>
            <li>We do not sell or rent your personal information to third parties.</li>
            <li>
              We may share your data with trusted partners such as payment gateways, logistics
              providers, and marketing platforms to fulfill your orders and improve our services.
            </li>
            <li>
              In compliance with legal obligations, we may disclose information if required by law or
              to protect our rights.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <ul>
            <li>
              We implement industry-standard security measures to protect your personal information
              from unauthorized access, loss, or misuse.
            </li>
            <li>
              However, no online transmission is 100% secure, and we encourage you to use strong
              passwords and keep your login details confidential.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Your Rights & Choices</h2>
          <ul>
            <li>You can update or delete your account details at any time by logging into your profile.</li>
            <li>You can opt-out of marketing communications by clicking the unsubscribe link in emails.</li>
            <li>You can disable cookies in your browser settings, but this may impact your website experience.</li>
          </ul>
        </section>

        <section>
          <h2>6. Changes to this Policy</h2>
          <ul>
            <li>
              We may update this Privacy Policy from time to time. Any changes will be posted on our
              website with the revised date.
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>
            For any privacy-related concerns, please contact us at{" "}
            <a href="mailto:support@ubindass.in">support@ubindass.in</a> or call us at{" "}
            <a href="tel:+917275999340">+91 7275999340</a>.
          </p>
          <p>Thank you for trusting UBINDASS!</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
