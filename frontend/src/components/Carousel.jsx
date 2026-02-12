import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Carousel.css';

const Carousel = ({ images, height = '400px' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  // Helper to get image URL
  const getImageUrl = (img) => `http://localhost:5000/images/${img}`;

  if (!images || images.length === 0) return null;

  return (
    <div className="carousel" style={{ height }}>
      <div 
        className="carousel-inner" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div className="carousel-item" key={index}>
            <img src={getImageUrl(img)} alt={`Slide ${index + 1}`} onError={(e) => {e.target.src = 'https://via.placeholder.com/800x400?text=Slide+' + (index+1)}} />
          </div>
        ))}
      </div>

      <button className="carousel-control prev" onClick={prevSlide}>
        <FiChevronLeft size={24} />
      </button>
      <button className="carousel-control next" onClick={nextSlide}>
        <FiChevronRight size={24} />
      </button>

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
