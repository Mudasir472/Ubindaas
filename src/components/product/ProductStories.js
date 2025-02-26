import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heading1 } from 'lucide-react';
import '../../styles/components/Others/product-stories.css';

const ProductStories = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [modalDimensions, setModalDimensions] = useState({ width: 0, height: 0 });
  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);

  // Sample product data - replace with your actual data
  const stories = [
    {
      id: 1,
      title: 'Black Chiffon Saree',
      price: '₹9,500',
      thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3755/8034/files/SV-20240903-0673_f373d5fb-eaf1-4936-8719-085d35e04a5e.jpg?v=1735126439&width=400&height=400',
      video: 'https://cdn.shopify.com/s/files/1/0682/3755/8034/files/whatmore_tn_8211d305-224f-4f8e-bc2c-c768ab5026c7.mp4?v=1732949816'
    },
    {
      id: 2,
      title: 'Pink Evening Gown',
      price: '₹15,500',
      thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3755/8034/files/1_2453d61e-4f7e-4d16-963c-09128e230a59.jpg?v=1735126492&width=400&height=400',
      video: 'https://cdn.shopify.com/s/files/1/0682/3755/8034/files/whatmore_tn_debd0618-56ec-4148-83af-7357f57f5505.mp4?v=1732091074'
    },
    {
      id: 3,
      title: 'Golden Lehenga Set',
      price: '₹12,500',
      thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3755/8034/files/1_444324f3-1cd4-4a0d-842e-64b45ce71b05.jpg?v=1740034083&width=400&height=400',
      video: 'https://cdn.shopify.com/s/files/1/0682/3755/8034/files/whatmore_tn_a5d15fb1-f33d-4622-9f1f-8e56f1c47feb.mp4?v=1732091261'
    },
    {
      id: 4,
      title: 'Blue Silk Saree',
      price: '₹8,500',
      thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3755/8034/files/SV-20240903-1606_a7882608-0628-4400-b8fd-4e5b5e7d539e.jpg?v=1740034008&width=400&height=400',
      video: 'https://cdn.shopify.com/s/files/1/0682/3755/8034/files/whatmore_tn_62184a8c-2e95-4aef-9482-16f087d432cd.mp4?v=1732947435'
    },
    {
      id: 5,
      title: 'Designer Anarkali',
      price: '₹11,500',
      thumbnail: 'https://cdn.shopify.com/s/files/1/0682/3755/8034/files/1_444324f3-1cd4-4a0d-842e-64b45ce71b05.jpg?v=1740034083&width=400&height=400',
      video: 'https://cdn.shopify.com/s/files/1/0682/3755/8034/files/whatmore_tn_d5a42324-3ae2-4ba1-9088-13667edbd391.mp4?v=1732356693'
    }
  ];


  useEffect(() => {
    if (modalVideoRef.current) {
      const video = modalVideoRef.current;
      const updateDimensions = () => {
        setModalDimensions({
          width: video.videoWidth,
          height: video.videoHeight
        });
      };
      
      video.addEventListener('loadedmetadata', updateDimensions);
      return () => video.removeEventListener('loadedmetadata', updateDimensions);
    }
  }, [selectedVideo]);

  const handleMouseEnter = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].play().catch(error => {
        console.log("Video play failed:", error);
      });
    }
  };

  const handleMouseLeave = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].pause();
      videoRefs.current[id].currentTime = 0;
    }
  };

  const scrollLeft = () => {
    const container = document.getElementById('stories-scroll');
    container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.getElementById('stories-scroll');
    container.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const VideoModal = ({ story, onClose }) => {
    const nextStory = () => {
      if (activeStoryIndex < stories.length - 1) {
        setActiveStoryIndex(activeStoryIndex + 1);
        setSelectedVideo(stories[activeStoryIndex + 1]);
      }
    };

    const prevStory = () => {
      if (activeStoryIndex > 0) {
        setActiveStoryIndex(activeStoryIndex - 1);
        setSelectedVideo(stories[activeStoryIndex - 1]);
      }
    };

    return (
      <div className="story-modal" onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}>
        <div className="modal-content" style={{
          width: modalDimensions.width || 'auto',
          height: modalDimensions.height || 'auto'
        }}>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
          
          {activeStoryIndex > 0 && (
            <button className="modal-nav-button prev" onClick={prevStory}>
              <ChevronLeft size={32} />
            </button>
          )}
          
          {activeStoryIndex < stories.length - 1 && (
            <button className="modal-nav-button next" onClick={nextStory}>
              <ChevronRight size={32} />
            </button>
          )}

          <div className="progress-bar">
            {stories.map((_, idx) => (
              <div 
                key={idx}
                className={`progress-segment ${idx === activeStoryIndex ? 'active' : ''}`}
              />
            ))}
          </div>

          <video
            ref={modalVideoRef}
            className="modal-video"
            controls
            autoPlay
            src={story.video}
          />
          
          <div className="modal-info">
            <div>
              <h3 className="product-title">{story.title}</h3>
              <p className="product-price">{story.price}</p>
            </div>
            <button className="modal-add-to-cart">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="stories-container">
      <button className="scroll-button left" onClick={scrollLeft}>
        <ChevronLeft size={24} />
      </button>
      
      <div id="stories-scroll" className="stories-scroll">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="story-card"
            onMouseEnter={() => handleMouseEnter(story.id)}
            onMouseLeave={() => handleMouseLeave(story.id)}
            onClick={() => {
              setSelectedVideo(story);
              setActiveStoryIndex(index);
            }}
          >
            <div className="story-media-container">
              <img
                src={story.thumbnail}
                alt={story.title}
                className="story-image"
              />
              <video
                ref={el => videoRefs.current[story.id] = el}
                className="story-video"
                src={story.video}
                muted
                loop
                playsInline
              />
              <div className="story-overlay">
                <h3 className="product-title">{story.title}</h3>
                <p className="product-price">{story.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="scroll-button right" onClick={scrollRight}>
        <ChevronRight size={24} />
      </button>

      {selectedVideo && (
        <VideoModal
          story={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default ProductStories;