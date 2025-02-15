import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../../styles/components/carousel.css';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const slides = [
        {
            image: 'https://ubindass.in/cdn/shop/files/UBINDASS_0002_1.png?v=1728298040&width=2136',
            title: '',
            description: '',
            buttonText: '',
            link: ''
        },
        {
            image: 'https://mimosaclothingindia.com/cdn/shop/files/1920x750.jpg?v=1734353857&width=2000',
            title: '',
            description: '',
            buttonText: '',
            link: ''
        },
    ];

    const nextSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const prevSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="carousel-container">
            <div className="carousel">
                {/* Progress Bar */}
                <div className="carousel-progress">
                    {slides.map((_, index) => (
                        <div 
                            key={index} 
                            className={`progress-bar ${currentSlide === index ? 'active' : ''}`}
                        />
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button 
                    className="carousel-nav prev"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                >
                    <FiChevronLeft />
                </button>
                <button 
                    className="carousel-nav next"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    <FiChevronRight />
                </button>

                {/* Slides */}
                <div 
                    className="carousel-track"
                    style={{ 
                        transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="carousel-slide">
                            <img 
                                src={slide.image} 
                                alt={slide.title}
                                className="carousel-image"
                            />
                            <div className="slide-content">
                                {slide.title && (
                                    <h2 className="slide-title">{slide.title}</h2>
                                )}
                                {slide.description && (
                                    <p className="slide-description">{slide.description}</p>
                                )}
                                {slide.buttonText && (
                                    <a href={slide.link} className="slide-button">
                                        {slide.buttonText}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slide Indicators */}
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
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