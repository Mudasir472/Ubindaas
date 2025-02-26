import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';

import { ChevronDown, ChevronUp } from 'lucide-react';
import '../../styles/components/Others/faqs.css';

const FAQSection = ({ title, questions }) => {
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (index) => {
    setOpenQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="faq-section">
      <h2>{title}</h2>
      <div className="questions-container">
        {questions.map((qa, index) => (
          <div key={index} className="faq-item">
            <button
              onClick={() => toggleQuestion(index)}
              className="faq-question"
              aria-expanded={openQuestions[index]}
            >
              <span>{qa.question}</span>
              {openQuestions[index] ? 
                <ChevronUp className="chevron-icon" /> : 
                <ChevronDown className="chevron-icon" />
              }
            </button>
            <div className={`faq-answer ${openQuestions[index] ? 'open' : ''}`}>
              {qa.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQsPage = () => {
  const faqData = {
    'Ordering & Shopping': [
      {
        question: 'How do I place an order?',
        answer: 'Browse our collection, select your desired items, choose your size and color, and add them to your cart. Proceed to checkout, enter your shipping information, and complete payment through our secure payment gateway.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and digital wallets including Apple Pay and Google Pay.'
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'Orders can be modified or canceled within 2 hours of placement. Please contact our customer service team immediately with your order number.'
      }
    ],
    'Shipping & Delivery': [
      {
        question: 'What are your shipping options?',
        answer: 'We offer Standard Shipping (3-5 business days), Express Shipping (1-2 business days), and International Shipping (7-14 business days).'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. Shipping times and costs vary by location.'
      },
      {
        question: 'How can I track my order?',
        answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order through your account dashboard."
      }
    ],
    'Returns & Exchanges': [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy for unworn items in original condition with tags attached. Returns must be initiated through your account dashboard.'
      },
      {
        question: 'How do I initiate a return?',
        answer: 'Log into your account, navigate to "Order History", select the order and items you wish to return, and follow the return instructions provided.'
      },
      {
        question: 'Who pays for return shipping?',
        answer: 'For standard returns, customers are responsible for return shipping costs. For defective items, we provide a prepaid return label.'
      }
    ],
    'Product Information': [
      {
        question: 'How do I care for my Ubindaas clothing?',
        answer: "Each garment comes with specific care instructions on the label. Generally, we recommend machine wash cold, tumble dry low, and iron on medium heat if needed."
      },
      {
        question: 'Are your clothes sustainable?',
        answer: "We're committed to sustainability. Our products use eco-friendly materials where possible, and we're continuously working to reduce our environmental impact."
      },
      {
        question: 'Do you offer plus sizes?',
        answer: 'Yes, most of our collections are available in sizes XS to 3XL. Check individual product pages for specific size availability.'
      }
    ]
  };

  return (
    <div className="faq-page">
      <Navbar />
      
      <main className="faq-main">
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about shopping with Ubindaas</p>
        </div>

        <div className="faq-content">
          {Object.entries(faqData).map(([section, questions]) => (
            <FAQSection 
              key={section} 
              title={section} 
              questions={questions} 
            />
          ))}
        </div>

        <div className="contact-section">
          <h3>Still have questions?</h3>
          <p>Our customer service team is here to help!</p>
          <div className="contact-buttons">
            <a href="mailto:support@ubindaas.com" className="primary-button">
              Email Us
            </a>
            <a href="tel:1-800-UBINDAAS" className="secondary-button">
              Call Us
            </a>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default FAQsPage;