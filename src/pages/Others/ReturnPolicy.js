import React from 'react';
import '../../styles/components/Others/ReturnPolicy.css';

const ReturnPolicy = () => {
  return (
    <div className="return-wrapper">
      <div className="return-container">
        

        <h1 className="return-title">Return & Refund Policy</h1>

        <p>
          At UBINDASS, we strive to provide high-quality fashion that you love. However, if you are
          not satisfied with your purchase, we offer a hassle-free return policy. Please read the
          following terms carefully.
        </p>

        <section>
          <h2>Return Policy</h2>
          <ul>
            <li>You can initiate a return request within 5 days from the date of delivery.</li>
            <li>
              The product must be unused, unwashed, and in its original condition with all tags and
              packaging intact.
            </li>
            <li>
              We do not accept returns for innerwear, accessories, or customized products due to
              hygiene reasons.
            </li>
            <li>Items on sale or clearance are not eligible for returns.</li>
            <li>
              Return shipping is free for damaged, defective, or incorrect products. For other
              reasons, return shipping charges may apply.
            </li>
          </ul>
        </section>

        <section>
          <h2>Return Process</h2>
          <ol>
            <li>
              Raise a return request through our website{" "}
              <a href="https://www.ubindass.in" target="_blank" rel="noreferrer">
                www.ubindass.in
              </a>{" "}
              or email us at{" "}
              <a href="mailto:support@ubindass.in">support@ubindass.in</a> with your order details
              and reason for return.
            </li>
            <li>Our team will review your request and arrange a pickup if eligible.</li>
            <li>
              Once the returned product is received and inspected, we will initiate the refund or
              exchange as per your preference.
            </li>
          </ol>
        </section>

        <section>
          <h2>Refund Policy</h2>
          <ul>
            <li>Refunds will be processed within 3–5 business days after the return is approved.</li>
            <li>
              The refund will be credited to the original payment method (for prepaid orders) or via
              bank transfer (for COD orders).
            </li>
            <li>
              If you choose to receive a store credit, it will be issued within 48 hours of return
              approval.
            </li>
          </ul>
        </section>

        <section>
          <h2>Exchange Policy</h2>
          <ul>
            <li>You can initiate an exchange request within 5 days from the date of delivery.</li>
            <li>
              The product must be unused, unwashed, and in its original condition with all tags and
              packaging intact.
            </li>
            <li>
              Exchange is only available for size replacement or an alternative product of equal or
              higher value by paying the difference.
            </li>
            <li>
              To request an exchange, click on the ‘Return/Exchange’ link against your order in the
              Order History section under My Account on our website.
            </li>
            <li>Exchanges are subject to stock availability.</li>
          </ul>
        </section>

        <section>
          <p>
            For any further assistance, please contact our support team at{" "}
            <a href="mailto:support@ubindass.in">support@ubindass.in</a> or call us at{" "}
            <a href="tel:+917275999340">+91 7275999340</a>.
          </p>
          <p>Thank you for shopping with Ubindass!</p>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
