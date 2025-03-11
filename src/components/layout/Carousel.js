import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../../styles/components/carousel.css';
import config from "../../config"
import axios from 'axios';


const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageErrors, setImageErrors] = useState({});
    
    // Define the base URL for your API and static assets
    const API_BASE_URL = config.API_BASE_URL;
    const getBanners = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/banners`);
            const bannersData = response?.data?.data || [];
            setBanners(bannersData);
            
            // Test image loading
            if (bannersData.length > 0) {
                console.log("Banner data received:", bannersData);
                bannersData.forEach(banner => {
                    if (banner.image) {
                        const testImage = new Image();
                        const imageUrl = `${API_BASE_URL}/uploads/banners/${banner.image}`;
                        console.log(`Testing image loading for: ${imageUrl}`);
                        testImage.src = imageUrl;
                    }
                });
            }
            
            setLoading(false);
        } catch (error) {
            console.error("Error fetching banners:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getBanners();
    }, []);

    const allBanners = Array.isArray(banners)
        ? banners.filter((ele) => ele?.bannerFor === 'carousal' && ele.status === 'active')
        : [];

    // Debug info about filtered banners
    useEffect(() => {
        console.log("All banners:", banners);
        console.log("Filtered carousel banners:", allBanners);
    }, [banners, allBanners]);

    const nextSlide = () => {
        if (!isAnimating && allBanners.length > 0) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev + 1) % allBanners.length);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const prevSlide = () => {
        if (!isAnimating && allBanners.length > 0) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev - 1 + allBanners.length) % allBanners.length);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    useEffect(() => {
        if (allBanners.length > 0) {
            const timer = setInterval(nextSlide, 5000);
            return () => clearInterval(timer);
        }
    }, [allBanners]);

    const handleImageError = (slideId, imageUrl) => {
        console.error(`Failed to load image: ${imageUrl}`);
        setImageErrors(prev => ({
            ...prev,
            [slideId]: true
        }));
    };

    if (loading) return <div>Loading...</div>;

    if (allBanners.length === 0) return <div>No banners available</div>;

    return (
        <div className="carousel-container">
            <div className="carousel">
                <div className="carousel-progress">
                    {allBanners.map((_, index) => (
                        <div
                            key={index}
                            className={`progress-bar ${currentSlide === index ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <button className="carousel-nav prev" onClick={prevSlide} aria-label="Previous slide">
                    <FiChevronLeft />
                </button>
                <button className="carousel-nav next" onClick={nextSlide} aria-label="Next slide">
                    <FiChevronRight />
                </button>

                <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {allBanners.map((slide, index) => {
                        const imageUrl = `${API_BASE_URL}/uploads/banners/${slide.image}`;
                        
                        return (
                            <div key={index} className="carousel-slide">
                                {/* Use the full URL path for images */}
                                <img 
                                    src={imageUrl} 
                                    alt={slide.title || "Slide"} 
                                    className="carousel-image"
                                    crossOrigin="anonymous"
                                    onError={() => handleImageError(slide._id, imageUrl)}
                                    style={{ 
                                        display: imageErrors[slide._id] ? 'none' : 'block',
                                        backgroundColor: '#f0f0f0'
                                    }}
                                />
                                {imageErrors[slide._id] && (
                                    <div className="carousel-fallback" 
                                         style={{ 
                                             height: '100%', 
                                             width: '100%', 
                                             backgroundColor: '#f0f0f0',
                                             display: 'flex',
                                             alignItems: 'center',
                                             justifyContent: 'center'
                                         }}>
                                        <p>Image not available</p>
                                    </div>
                                )}
                                <div className="slide-content">
                                    {slide.title && <h2 className="slide-title">{slide.title}</h2>}
                                    {slide.description && <p className="slide-description">{slide.description}</p>}
                                    {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
                                    {slide.buttonText && <a href={slide.link || '#'} className="slide-button">{slide.buttonText}</a>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="carousel-indicators">
                    {allBanners.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;