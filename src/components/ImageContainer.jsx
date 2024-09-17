import React, { useState, useEffect, useRef } from 'react';

function ImageContainer(props) {
  const { images } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const imageRowRef = useRef();
  const imageWidthRef = useRef(0);

  useEffect(() => {
    if (imageRowRef.current) {
      const firstImageWrapper =
        imageRowRef.current.querySelector('.image-wrapper');
      imageWidthRef.current = firstImageWrapper.clientWidth;
    }
  }, [images]);

  function handleMouseDown(e) {
    setIsDragging(true);
    setStartX(e.pageX - imageRowRef.current.offsetLeft);
    setScrollLeft(imageRowRef.current.scrollLeft);
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - imageRowRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    imageRowRef.current.scrollLeft = scrollLeft - walk;
  }

  function handleMouseUp() {
    setIsDragging(false);

    // 获取当前滚动位置
    const currentScrollLeft = imageRowRef.current.scrollLeft;
    // 使用动态获取的图片容器宽度来计算最近的图片位置
    const imageWidth = imageWidthRef.current;
    const imageIndex = Math.round(currentScrollLeft / imageWidth);
    const newScrollLeft = imageIndex * imageWidth;

    // 设置平滑滚动效果
    imageRowRef.current.style.scrollBehavior = 'smooth';
    imageRowRef.current.scrollLeft = newScrollLeft;

    // 在过渡后禁用平滑滚动效果，避免后续拖动有平滑效果
    setTimeout(() => {
      imageRowRef.current.style.scrollBehavior = 'auto';
    }, 300);
  }

  function handleDragStart(e) {
    e.preventDefault();
  }

  return (
    <div
      className="image-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      ref={imageRowRef}
    >
      <div className="image-row">
        {images.map((image) => {
          return (
            <div className="image-wrapper" key={image.url}>
              <img
                className="image-small"
                src={image.url}
                alt="car"
                onDragStart={handleDragStart}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageContainer;
