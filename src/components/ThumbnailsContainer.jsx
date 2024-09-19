// src/components/ThumbnailsContainer.jsx

import React, { useState, useRef } from 'react';
import ImageCanvas from './ImageCanvas';

function ThumbnailsContainer({ images, onImageClick }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const thumbnailsContainer = useRef();

  function handleMouseDown(e) {
    setIsDragging(true);
    thumbnailsContainer.current.style.cursor = 'grabbing';
    setStartX(e.pageX - thumbnailsContainer.current.offsetLeft);
    setScrollLeft(thumbnailsContainer.current.scrollLeft);
    console.log('down', e.pageX, e.pageY);
  }
  function handleMouseMove(e) {
    if (!isDragging) return;
    const x = e.pageX - thumbnailsContainer.current.offsetLeft;
    const walk = (x - startX) * 2;
    thumbnailsContainer.current.scrollLeft = scrollLeft - walk;
  }
  function handleMouseUp(e) {
    thumbnailsContainer.current.style.cursor = 'grab';
    setIsDragging(false);
    console.log('up', e.pageX, e.pageY);
  }

  return (
    <div
      className="thumbnails-container"
      ref={thumbnailsContainer}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="image-row">
        {images.map((image) => {
          return (
            <ImageCanvas
              key={image.url}
              imageInfo={image}
              onImageClick={onImageClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ThumbnailsContainer;
