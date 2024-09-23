import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const OuterDiv = styled.div`
  position: relative;
  overflow: hidden;
  width: ${(props) => props.size.width}px;
  height: ${(props) => props.size.height}px;
  border: black 1px solid;
  cursor: ${(props) => (props.$isDragging ? 'grabbing' : 'grab')};
`;

const DisplayedImageStyled = styled.img.attrs((props) => ({
  style: {
    transform: `translate(${-props.$translateX}px, ${-props.$translateY}px) scale(${
      props.scale
    })`,
  },
}))`
  background-color: lightgreen;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transform-origin: top left;
`;

const DamagedAreaStyled = styled.div.attrs((props) => ({
  style: {
    top: `${props.$scaledDamagedArea.top}px`,
    left: `${props.$scaledDamagedArea.left}px`,
    width: `${props.$scaledDamagedArea.width}px`,
    height: `${props.$scaledDamagedArea.height}px`,
    transform: `translate(${-props.$translateX}px, ${-props.$translateY}px)`,
  },
}))`
  position: absolute;
  pointer-events: none;
  border: 1px solid yellow;
`;

function ImageWithBox({
  activeItem,
  outerDiv,
  scalable,
  imgClickCallback,
  draggable,
  showDamagedArea,
}) {
  const imageRef = useRef();
  const outerDivRef = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [scaledDamagedArea, setScaledDamagedArea] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [outerDivSize, setOuterDivSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (imageLoaded && imageRef.current && activeItem) {
      const firstScale = imageRef.current.width / imageRef.current.naturalWidth;

      const firstScaledWidth = activeItem.area.width * firstScale;
      const firstScaledHeight =
        (firstScaledWidth * imageRef.current.height) / imageRef.current.width;
      const firstScaledCoordinateX = activeItem.coordinates.x * firstScale;
      const firstScaledCoordinateY = activeItem.coordinates.y * firstScale;

      const secondScale = imageRef.current.width / firstScaledWidth;

      const secondScaledWidth = firstScaledWidth * secondScale;
      const secondScaledHeight =
        (secondScaledWidth * imageRef.current.height) / imageRef.current.width;
      const secondScaledCoordinateX = firstScaledCoordinateX * secondScale;
      const secondScaledCoordinateY = firstScaledCoordinateY * secondScale;

      setScale(secondScale);

      setTranslateX(secondScaledCoordinateX - secondScaledWidth / 2);
      setTranslateY(secondScaledCoordinateY - secondScaledHeight / 2);

      setScaledDamagedArea({
        top: secondScaledCoordinateY - secondScaledHeight / 2,
        left: secondScaledCoordinateX - secondScaledWidth / 2,
        width: secondScaledWidth,
        height: secondScaledHeight,
      });
      if (!scalable) {
        setScale(1);
        setTranslateX(0);
        setTranslateY(0);
        setScaledDamagedArea({
          top: firstScaledCoordinateY - firstScaledHeight / 2,
          left: firstScaledCoordinateX - firstScaledWidth / 2,
          width: firstScaledWidth,
          height: firstScaledHeight,
        });
      }
    }
  }, [imageLoaded, activeItem, scalable, outerDiv]);

  const handleMouseDown = (event) => {
    if (!draggable) return;
    setIsDragging(true);
    setInitialPosition({
      x: event.clientX + translateX,
      y: event.clientY + translateY,
    });
  };

  const handleWheel = (event) => {
    if (!scalable) return;
    // event.preventDefault();
    const scaleAmount = event.deltaY < 0 ? 0.1 : -0.1; // 缩放因子
    const newScale = Math.min(Math.max(scale + scaleAmount, 1), 3); // 设置缩放范围（例如 0.5 到 3 倍）

    // 计算缩放后的平移值以保持缩放中心
    const imgRect = imageRef.current.getBoundingClientRect();

    const outerDivRect = outerDivRef.current.getBoundingClientRect();

    let newTranslateX =
      translateX -
      (outerDivRect.left - imgRect.left) * ((scale - newScale) / (scale - 1));
    let newTranslateY =
      translateY -
      (outerDivRect.top - imgRect.top) * ((scale - newScale) / (scale - 1));

    if (newScale === 1) {
      newTranslateX = 0;
      newTranslateY = 0;
    }
    if (scale === 1 && newScale > 1) {
      newTranslateX = ((newScale - scale) * outerDivRect.width) / 2;
      newTranslateY = ((newScale - scale) * outerDivRect.height) / 2;
    }

    setTranslateX(newTranslateX);
    setTranslateY(newTranslateY);
    setScale(newScale);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      let newTranslateX = event.clientX - initialPosition.x;
      let newTranslateY = event.clientY - initialPosition.y;

      newTranslateX = Math.min(0, newTranslateX);
      newTranslateY = Math.min(0, newTranslateY);
      newTranslateX = Math.max(
        outerDivSize.width - imageRef.current.width * scale,
        newTranslateX
      );
      newTranslateY = Math.max(
        outerDivSize.height - imageRef.current.height * scale,
        newTranslateY
      );

      setTranslateX(-newTranslateX);
      setTranslateY(-newTranslateY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  function calculateContainSize(
    imageWidth,
    imageHeight,
    containerWidth,
    containerHeight
  ) {
    const imageRatio = imageWidth / imageHeight;
    const containerRatio = containerWidth / containerHeight;

    let width, height;

    if (containerRatio > imageRatio) {
      height = containerHeight;
      width = containerHeight * imageRatio;
    } else {
      width = containerWidth;
      height = containerWidth / imageRatio;
    }

    return { width, height };
  }

  if (imageLoaded && imageRef.current && outerDiv) {
    if (!outerDivSize.width) {
      setOuterDivSize(
        calculateContainSize(
          imageRef.current.naturalWidth,
          imageRef.current.naturalHeight,
          outerDiv.width,
          outerDiv.height
        )
      );
    }
  }

  return (
    <OuterDiv
      size={outerDivSize}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      $isDragging={isDragging}
      ref={outerDivRef}
    >
      {activeItem && (
        <DisplayedImageStyled
          src={activeItem.url}
          ref={imageRef}
          scale={scale}
          $translateX={translateX}
          $translateY={translateY}
          onLoad={() => setImageLoaded(true)}
          onClick={imgClickCallback}
          draggable="false" // 禁用图片的默认拖拽行为
          onDragStart={(e) => e.preventDefault()} // 阻止默认拖拽事件
        />
      )}
      {activeItem && showDamagedArea && (
        <DamagedAreaStyled
          $scaledDamagedArea={scaledDamagedArea}
          $translateX={translateX}
          $translateY={translateY}
        />
      )}
    </OuterDiv>
  );
}

export default ImageWithBox;
