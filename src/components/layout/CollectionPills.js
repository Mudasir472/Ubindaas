import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/components/collection-pills.css';
import axios from 'axios';
import config from '../../config';

const CategoryShowcase = () => {
  const scrollRef = useRef(null);
  const [collections, setCollections] = useState(null)
  const API_BASE_URL = config.API_BASE_URL;
  const categories = [
    {
      name: "Anushka\u2019s Collection",
      image: 'https://www.lavanyathelabel.com/cdn/shop/files/Saree_d2031e56-de46-4b42-b13f-194d70e87ff6.png?v=1735369166'
    },
    {
      name: "Khushi's Collection",
      image: 'https://www.lavanyathelabel.com/cdn/shop/files/Anarkali_1924d254-fd94-45da-bbca-8e41bffad806.png?v=1735369287'
    },
    {
      name: "Nayara's Collections",
      image: 'https://www.lavanyathelabel.com/cdn/shop/files/Patiala2.png?v=1735807812'
    },
    {
      name: "Manya's Collections",
      image: 'https://www.lavanyathelabel.com/cdn/shop/files/Lehenga_d96062c2-b3bc-4468-8052-3f0dd8332b85.png?v=1735369417'
    },
    {
      name: "Raziya's Collections",
      image: 'https://www.lavanyathelabel.com/cdn/shop/files/Suit.png?v=1735369491'
    },
    {
      name: "Swati's Collection",
      image: 'https://www.lavanyathelabel.com/cdn/shop/files/SHARARA_adb5ea37-a576-4125-bc42-d314c329768e.png?v=1735369557'
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/collection`)
      setCollections(response?.data);

    } catch (error) {
      console.log(error);

    }
  }
  console.log(collections);

  useEffect(() => {
    fetchCollections();
  }, [])
  return (
    <div className="category-container" style={{ padding: '20px 0', width: '100%', overflow: 'hidden' }}>
      <div className="category-header" style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
        <h2 className="category-title" style={{
          fontSize: '24px',
          fontWeight: '500',
          textTransform: 'uppercase',
          display: 'inline-block',
          padding: '0 40px',
          position: 'relative'
        }}>
          <span style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            width: '30px',
            height: '2px',
            background: '#ff9eb6',
            transform: 'rotate(-45deg)',
            transformOrigin: 'center'
          }}></span>
          SHOP BY CATEGORIES
          <span style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            width: '30px',
            height: '2px',
            background: '#ff9eb6',
            transform: 'rotate(45deg)',
            transformOrigin: 'center'
          }}></span>
        </h2>
      </div>

      <div className="scroll-container" style={{
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px'
      }}>
        <button
          onClick={() => scroll('left')}
          className="scroll-button left"
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={scrollRef}
          className="scroll-wrapper"
          style={{
            display: 'flex',
            gap: '30px',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '20px 0'
          }}
        >
          {Array.isArray(collections) && collections.map((category, index) => (
            <a
              key={index}
              href={`/collections/${category._id}`}
              className="category-item"
              style={{
                flex: '0 0 auto',
                width: '200px',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'transform 0.3s ease'
              }}
            >
              <div className="image-wrapper" style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
              }}>
                <img
                  src={`${category?.modelImageUrl}` || `https://www.lavanyathelabel.com/cdn/shop/files/Patiala2.png?v=1735807812`}
                  alt={category.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
              </div>
              <h3 style={{
                marginTop: '15px',
                fontSize: '16px',
                color: '#333',
                fontWeight: '500'
              }}>
                {category.name}
              </h3>
            </a>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="scroll-button right"
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <style jsx>{`
        .scroll-wrapper::-webkit-scrollbar {
          display: none;
        }

        .category-item:hover {
          transform: translateY(-10px);
        }

        .category-item:hover img {
          transform: scale(1.1);
        }

        .scroll-button:hover {
          background: #fce4ec;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }

        @media (max-width: 768px) {
          .scroll-container {
            padding: 0 20px;
          }

          .category-item {
            width: 150px;
          }

          .scroll-button {
            width: 35px;
            height: 35px;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryShowcase;