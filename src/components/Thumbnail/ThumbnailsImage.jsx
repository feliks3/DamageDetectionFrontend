import React, { useRef } from 'react';
import styled from 'styled-components';
import { config } from '../../config/config';
import { setActiveItemIndex } from '../../features/dataSlice';
import { useDispatch } from 'react-redux';
import ImageWithBox from '../Common/ImageWithBox';

const ThumbnailWrapperStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${config.thumbnailsImage.width}px;
  height: ${config.thumbnailsContainer.height}px;
  flex-shrink: 0;
  background-color: ${(props) => props.color || 'lightgreen'};
`;

function ThumbnailsImage({ image, index }) {
  const dispatch = useDispatch();
  const outerDiv = {
    width: config.thumbnailsImage.width,
    height: config.thumbnailsContainer.height,
  };

  const changeActiveImage = () => {
    dispatch(setActiveItemIndex(index));
  };

  return (
    <ThumbnailWrapperStyled>
      <ImageWithBox
        activeItem={image}
        outerDiv={outerDiv}
        scalable={false}
        imgClickCallback={changeActiveImage}
        showDamagedArea={true}
      />
    </ThumbnailWrapperStyled>
  );
}

export default ThumbnailsImage;
