import React from "react";
import "../../styles/components/Others/TermConditions.css";

const TermConditions = () => {
  return (
    <div className="terms-wrapper">
      <div className="terms-container">
        <h1 className="terms-heading">Terms & Conditions</h1>

        <p>
          Welcome to UBINDASS! These Terms & Conditions govern your use of our website and services. By accessing or using our platform, you agree to comply with these terms. Please read them carefully.
        </p>

        <section>
          <h2>1. General</h2>
          <ul>
            <li>By using Ubindass, you confirm that you are at least 18 years old or have parental consent to use our services.</li>
            <li>We reserve the right to modify these terms at any time. Updates will be posted on our website.</li>
          </ul>
        </section>

        <section>
          <h2>2. Account & User Responsibilities</h2>
          <ul>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>Any unauthorized use of your account must be reported to us immediately.</li>
            <li>You agree not to use our website for fraudulent, unlawful, or malicious activities.</li>
          </ul>
        </section>

        <section>
          <h2>3. Orders & Payments</h2>
          <ul>
            <li>All orders placed on Ubindass are subject to availability and confirmation.</li>
            <li>We reserve the right to cancel or refuse any order at our discretion.</li>
            <li>Prices and product descriptions are subject to change without prior notice.</li>
            <li>Payments must be made through our approved payment methods.</li>
          </ul>
        </section>

        <section>
          <h2>4. Shipping & Delivery</h2>
          <ul>
            <li>Delivery times may vary based on location and unforeseen circumstances.</li>
            <li>Ubindass is not liable for delays caused by third-party logistics providers.</li>
            <li>Shipping fees and policies are detailed in our Shipping Policy.</li>
          </ul>
        </section>

        <section>
          <h2>5. Returns, Refunds & Exchanges</h2>
          <ul>
            <li>Returns and exchanges must comply with our Return & Exchange Policy.</li>
            <li>Refunds will be processed as per the original payment method within the specified timeframe.</li>
            <li>Ubindass reserves the right to refuse returns if the product is not in its original condition.</li>
          </ul>
        </section>

        <section>
          <h2>6. Intellectual Property</h2>
          <ul>
            <li>All content on our website, including text, images, logos, and designs, is the property of Ubindass and protected by copyright laws.</li>
            <li>You may not reproduce, distribute, or use our content without prior written permission.</li>
          </ul>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <ul>
            <li>Ubindass is not responsible for any indirect, incidental, or consequential damages arising from the use of our website.</li>
            <li>We do not guarantee uninterrupted or error-free access to our platform.</li>
          </ul>
        </section>

        <section>
          <h2>8. Governing Law</h2>
          <ul>
            <li>These Terms & Conditions are governed by the laws of India.</li>
            <li>Any disputes shall be subject to the jurisdiction of the courts in Prayagraj, India.</li>
          </ul>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            For any queries related to these terms, please contact us at <a href="mailto:support@ubindass.in">support@ubindass.in</a> or call <a href="tel:+917275999340">+91 7275999340</a>.
          </p>
          <p>Thank you for choosing UBINDASS!</p>
        </section>
      </div>
    </div>
  );
};

export default TermConditions;
