import React from 'react';
import '../../styles/components/Others/ReturnPolicy.css';

const ReturnPolicy = () => {
  return (
    <div className="return-policy-container">
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Pages</span> &gt; <span>Refund and Return Policy</span>
      </div>
      
      <h1 className="main-title">Refund And Return Policy</h1>
      <h2 className="section-title">Refund and Return Policy</h2>
      
      <p className="intro-text">
        At Ubindass, we want you to be completely satisfied with your purchase. If for any reason you are not, we offer a hassle-free return and exchange policy for 5 days from the date of delivery.
      </p>

      <div className="policy-section">
        <h3>Conditions for Return/Exchange:</h3>
        <ul>
          <li><strong>Return/Exchange Window:</strong> You can request a return or exchange within 5 days from the date of delivery.</li>
          <li><strong>Item Condition:</strong> Items must be unworn, unwashed, and in their original condition with tags intact. Items that are damaged, altered, or show signs of wear will not be accepted.</li>
          <li><strong>Non-Returnable Items:</strong> Certain items such as innerwear, accessories, or sale items may not be eligible for returns or exchanges. These will be clearly marked at the time of purchase.</li>
        </ul>
      </div>

      <div className="policy-section">
        <h3>Return Process:</h3>
        <ol>
          <li><strong>Initiate a Return:</strong> To initiate a return or exchange, please contact our customer service team at returns@ubindass.in or call us at (+91) 7275999340 within 5 days of delivery with your order number and details.</li>
          <li><strong>Approval:</strong> Once your return/exchange request is approved, we will provide instructions on how to send the item back to us.</li>
          <li><strong>Shipping Charges:</strong> Return shipping charges are the customer's responsibility, except in cases where the product was damaged or incorrect. For exchanges, we will cover the cost of shipping the new item to you.</li>
        </ol>
      </div>

      <div className="policy-section">
        <h3>Refunds:</h3>
        <ul>
          <li>Once we receive your return, it will be inspected, and you will be notified of the approval or rejection of your refund.</li>
          <li>Approved refunds will be processed same days and automatically applied to your original payment method.</li>
        </ul>
      </div>

      <div className="policy-section">
        <h3>Exchanges:</h3>
        <ul>
          <li>If you wish to exchange an item for a different size or color, please indicate the details in your return request. We will ship the new item after we receive and inspect the returned item.</li>
        </ul>
      </div>
    </div>
  );
};

export default ReturnPolicy;