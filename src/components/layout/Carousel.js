import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../../styles/components/carousel.css';
import axios from 'axios';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBanners = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/banners');
            setBanners(response?.data?.data || []);
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
                    {allBanners.map((slide, index) => (
                        <div key={index} className="carousel-slide">
                            {/* {console.log(`/uploads/banners/${ slide.image }`)} */}

                            <img src={`/uploads/banners/${slide.image}`} alt={slide.title || "Slide"} className="carousel-image" />
                            <div className="slide-content">
                                {slide.title && <h2 className="slide-title">{slide.title}</h2>}
                                {slide.description && <p className="slide-description">{slide.description}</p>}
                                {slide.buttonText && <a href={slide.link} className="slide-button">{slide.buttonText}</a>}
                            </div>
                        </div>
                    ))}
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
