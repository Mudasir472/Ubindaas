import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/components/collection-pills.css';
import axios from 'axios';

const CategoryShowcase = () => {
  const scrollRef = useRef(null);
  const [collections, setCollections] = useState(null)
  

  const scroll = (direction) => {
    if (scrollRef.current) {
      // Calculate scroll amount based on viewport width for better responsiveness
      const scrollAmount = direction === 'left' ? -scrollRef.current.offsetWidth * 0.4 : scrollRef.current.offsetWidth * 0.4;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/collection`)
      setCollections(response?.data);

    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    fetchCollections();
  }, [])

  console.log();

  return (
    <div className="category-container" style={{
      padding: '2vh 0',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: 'var(--background-light, #fff5f8)'
    }}>
      <div className="category-header" style={{
        textAlign: 'center',
        marginBottom: '4vh',
        position: 'relative'
      }}>
        <h2 className="category-title" style={{
          fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 2rem)', // Responsive font size
          fontWeight: '500',
          textTransform: 'uppercase',
          display: 'inline-block',
          padding: '0 3vw',
          position: 'relative'
        }}>
          <span style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            width: 'clamp(20px, 2.5vw, 30px)', // Responsive width
            height: '2px',
            background: 'var(--primary-color, #ff9eb6)',
            transform: 'rotate(-45deg)',
            transformOrigin: 'center',
            transition: 'width 0.3s'
          }}></span>
          SHOP BY COLLECTION
          <span style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            width: 'clamp(20px, 2.5vw, 30px)', // Responsive width
            height: '2px',
            background: 'var(--primary-color, #ff9eb6)',
            transform: 'rotate(45deg)',
            transformOrigin: 'center',
            transition: 'width 0.3s'
          }}></span>
        </h2>
      </div>

      <div className="scroll-container" style={{
        position: 'relative',
        maxWidth: '90vw',
        width: '100%',
        margin: '0 auto',
        padding: '0 3vw'
      }}>
        <button
          onClick={() => scroll('left')}
          className="scroll-button left"
          style={{
            position: 'absolute',
            left: '0.5vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(32px, 4vw, 44px)', // Responsive button size
            height: 'clamp(32px, 4vw, 44px)', // Responsive button size
            borderRadius: '50%',
            background: 'white',
            boxShadow: 'var(--shadow-medium, 0 2px 10px rgba(0,0,0,0.1))',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
        >
          <ChevronLeft size={16} style={{ width: 'clamp(16px, 2vw, 24px)', height: 'clamp(16px, 2vw, 24px)' }} />
        </button>

        <div
          ref={scrollRef}
          className="scroll-wrapper"
          style={{
            display: 'flex',
            gap: 'clamp(15px, 2vw, 30px)', // Responsive gap
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '2vh 0'
          }}
        >
          {Array.isArray(collections) && collections.map((category, index) => (
            <a
              key={index}
              href={`/collections/${category._id}`}
              className="category-item"
              style={{
                flex: '0 0 auto',
                width: 'clamp(140px, 20vw, 220px)', // Responsive width that scales with viewport
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
                boxShadow: 'var(--shadow-small, 0 2px 4px rgba(0,0,0,0.1))',
                transition: 'box-shadow 0.3s'
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
                <div className="image-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 64, 129, 0.2) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s'
                }}></div>
              </div>
              <h3 style={{
                marginTop: '1.5vh',
                fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 1.125rem)', // Responsive font size
                color: 'var(--text-primary, #333)',
                fontWeight: '500',
                transition: 'color 0.2s'
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
            right: '0.5vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(32px, 4vw, 44px)', // Responsive button size
            height: 'clamp(32px, 4vw, 44px)', // Responsive button size
            borderRadius: '50%',
            background: 'white',
            boxShadow: 'var(--shadow-medium, 0 2px 10px rgba(0,0,0,0.1))',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
        >
          <ChevronRight size={16} style={{ width: 'clamp(16px, 2vw, 24px)', height: 'clamp(16px, 2vw, 24px)' }} />
        </button>
      </div>

      <style jsx>{`
        .scroll-wrapper::-webkit-scrollbar {
          display: none;
        }

        .category-item:hover {
          transform: translateY(-1vh);
        }

        .category-item:hover img {
          transform: scale(1.1);
        }
        
        .category-item:hover .image-overlay {
          opacity: 1;
        }
        
        .category-item:hover .image-wrapper {
          box-shadow: var(--shadow-large, 0 8px 16px rgba(0,0,0,0.1));
        }

        .scroll-button:hover {
          background: var(--primary-light, #fce4ec);
          box-shadow: var(--shadow-large, 0 4px 15px rgba(0,0,0,0.15));
        }
        
        .scroll-button:hover svg {
          color: white;
        }

        @media (max-width: 768px) {
          .scroll-container {
            padding: 0 4vw;
          }
        }
        
        @media (hover: none) {
          .category-item:hover {
            transform: none;
          }
          
          .image-overlay {
            opacity: 0.2;
          }
          
          .scroll-button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryShowcase;