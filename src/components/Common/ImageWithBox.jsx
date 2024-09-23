import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { config } from '../../config/config';

const OuterDiv = styled.div`
  position: relative;
  overflow: hidden;
  width: ${(props) => props.size.width}px;
  height: ${(props) => props.size.height}px;
  border: black 1px solid;
`;
const DisplayedImageStyled = styled.img`
  background-color: lightgreen;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transform-origin: top left;
  transform: translate(
      ${(props) => -props.$translateX}px,
      ${(props) => -props.$translateY}px
    )
    scale(${(props) => props.scale});
`;

const DamagedAreaStyled = styled.div`
  position: absolute;
  top: ${(props) => props.$scaledDamagedArea.top}px;
  left: ${(props) => props.$scaledDamagedArea.left}px;
  width: ${(props) => props.$scaledDamagedArea.width}px;
  height: ${(props) => props.$scaledDamagedArea.height}px;
  pointer-events: none;
  border: 1px solid yellow;
  transform: translate(
    ${(props) => -props.$translateX}px,
    ${(props) => -props.$translateY}px
  );
`;

function ImageWithBox({ activeItem, outerDiv, scalable, imgClickCallback }) {
  const imageRef = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(false);
  const [translateY, setTranslateY] = useState(false);
  const [scaledDamagedArea, setScaledDamagedArea] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (imageLoaded && imageRef.current) {
      if (imageLoaded && imageRef.current && activeItem) {
        const firstScale =
          imageRef.current.width / imageRef.current.naturalWidth;

        const firstScaledWidth = activeItem.area.width * firstScale;
        const firstScaledHeight =
          (firstScaledWidth * imageRef.current.height) / imageRef.current.width;
        const firstScaledCoordinateX = activeItem.coordinates.x * firstScale;
        const firstScaledCoordinateY = activeItem.coordinates.y * firstScale;
        // console.log('translate');
        // console.log(
        //   imageRef.current.naturalWidth,
        //   imageRef.current.naturalHeight
        // );
        // console.log(imageRef.current.width, imageRef.current.naturalWidth);
        // console.log(firstScale);
        // console.log(
        //   firstScaledWidth,
        //   firstScaledCoordinateX,
        //   firstScaledCoordinateY
        // );
        const secondScale = imageRef.current.width / firstScaledWidth;

        const secondScaledWidth = firstScaledWidth * secondScale;
        const secondScaledHeight =
          (secondScaledWidth * imageRef.current.height) /
          imageRef.current.width;
        const secondScaledCoordinateX = firstScaledCoordinateX * secondScale;
        const secondScaledCoordinateY = firstScaledCoordinateY * secondScale;
        // console.log(
        //   secondScale,
        //   secondScaledWidth,
        //   secondScaledHeight,
        //   secondScaledCoordinateX,
        //   secondScaledCoordinateY
        // );
        setScale(secondScale);
        // console.log(firstScale, secondScale);
        // console.log(imageRef.current.width, firstScaledWidth);
        setTranslateX(secondScaledCoordinateX - secondScaledWidth / 2);
        setTranslateY(secondScaledCoordinateY - secondScaledHeight / 2);

        // console.log(secondScaledCoordinateX - secondScaledWidth / 2);
        // console.log(secondScaledCoordinateY - secondScaledHeight / 2);

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
        // setScaledDamagedArea({
        //   top: 0,
        //   left: 0,
        //   width: secondScaledWidth,
        //   height: secondScaledHeight,
        // });
        // console.log(
        //   'setScaledDamagedArea',
        //   secondScaledCoordinateY - secondScaledHeight / 2,
        //   secondScaledCoordinateX - secondScaledWidth / 2,
        //   secondScaledWidth,
        //   secondScaledHeight
        // );
      }
    }
  }, [imageLoaded, activeItem, scale, scalable]);
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

  let outerDivSize = { width: 0, height: 0 };

  if (imageLoaded && imageRef.current && outerDiv) {
    outerDivSize = calculateContainSize(
      imageRef.current.naturalWidth,
      imageRef.current.naturalHeight,
      outerDiv.width,
      outerDiv.height
    );
    // console.log('outerDivSize', outerDivSize);
    // console.log(outerDivSize, imageRef, scale, translateX, translateY);
  }
  return (
    <OuterDiv size={outerDivSize}>
      {activeItem && (
        <DisplayedImageStyled
          src={activeItem.url}
          ref={imageRef}
          scale={scale}
          $translateX={translateX}
          $translateY={translateY}
          onLoad={() => setImageLoaded(true)}
          onClick={imgClickCallback}
        />
      )}
      {activeItem && (
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
