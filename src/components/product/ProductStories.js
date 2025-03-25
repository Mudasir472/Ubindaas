import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/components/Others/product-stories.css';
import axios from 'axios';

const ProductStories = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [modalDimensions, setModalDimensions] = useState({ width: 0, height: 0 });
  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);
  const [allStories, setAllStories] = useState([]);
  // fetch all stories
  const fetchStories = async (req, res) => {
    const resp = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stories/`);
    setAllStories(resp?.data?.data);
  }
  useEffect(() => {
    fetchStories();
  }, [])
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
        console.log("Video source:", videoRefs.current[id].src);
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
      if (activeStoryIndex < allStories.length - 1) {
        setActiveStoryIndex(activeStoryIndex + 1);
        setSelectedVideo(allStories[activeStoryIndex + 1]);
      }
    };

    const prevStory = () => {
      if (activeStoryIndex > 0) {
        setActiveStoryIndex(activeStoryIndex - 1);
        setSelectedVideo(allStories[activeStoryIndex - 1]);
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

          {activeStoryIndex < allStories.length - 1 && (
            <button className="modal-nav-button next" onClick={nextStory}>
              <ChevronRight size={32} />
            </button>
          )}

          <div className="progress-bar">
            {allStories.map((_, idx) => (
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
            src={`${process.env.REACT_APP_API_BASE_URL}/uploads/videos/${story?.video}`}
          />

          <div className="modal-info">
            <div>
              <h3 className="productTitle">{story?.products?.name}</h3>
              <p className="product-price">{story?.products?.salePrice}</p>
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
        {Array.isArray(allStories) && allStories.map((story, index) => (
          <div
            key={story._id}
            className="story-card"
            onMouseEnter={() => handleMouseEnter(story._id)}
            onMouseLeave={() => handleMouseLeave(story._id)}
            onClick={() => {
              setSelectedVideo(story);
              setActiveStoryIndex(index);
            }}
          >
            <div className="story-media-container">
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}/uploads/products/${story.image}`}
                alt={story.status}
                className="story-image"
              />
              {story.video ? (
                <video
                  ref={el => videoRefs.current[story._id] = el}
                  className="story-video"
                  src={`${process.env.REACT_APP_API_BASE_URL}/uploads/videos/${story?.video}`}
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div className="video-fallback">
                  <p>No video available</p>
                </div>
              )}
              <div className="story-overlay">
                <h3 className="productTitle">{story?.products?.name}</h3>
                <p className="product-price">{story?.products?.salePrice}</p>
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