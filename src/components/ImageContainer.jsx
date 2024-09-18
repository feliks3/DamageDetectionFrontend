import React, { useState, useRef } from 'react';
import ImageCanvas from './ImageCanvas';

function ImageContainer({ images }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const imageContainer = useRef();

  function handleMouseDown(e) {
    setIsDragging(true);
    imageContainer.current.style.cursor = 'grabbing';
    setStartX(e.pageX - imageContainer.current.offsetLeft);
    setScrollLeft(imageContainer.current.scrollLeft);
    console.log('down', e.pageX, e.pageY);
  }
  function handleMouseMove(e) {
    if (!isDragging) return;
    const x = e.pageX - imageContainer.current.offsetLeft;
    const walk = (x - startX) * 2;
    imageContainer.current.scrollLeft = scrollLeft - walk;
  }
  function handleMouseUp(e) {
    imageContainer.current.style.cursor = 'grab';
    setIsDragging(false);
    console.log('up', e.pageX, e.pageY);
  }

  return (
    <div
      className="imageContainer"
      ref={imageContainer}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="imageRow">
        {images.map((image) => {
          return <ImageCanvas key={image.url} imageInfo={image} />;
        })}
      </div>
    </div>
  );
}

export default ImageContainer;
