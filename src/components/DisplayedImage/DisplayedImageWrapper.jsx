import React from 'react';
import styled from 'styled-components';
import { config } from '../../config/config';
import { useSelector } from 'react-redux';
import ImageWithBox from '../Common/ImageWithBox';

const DisplayedImageWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: lightgreen;
  width: ${config.galleryViewerContainer.width}px;
  height: ${config.displaydImageWrapper.height}px;
  overflow: hidden;
`;

function DisplayedImageWrapper() {
  const activeItemIndex = useSelector((state) => state.data.activeItemIndex);
  const items = useSelector((state) => state.data.items);
  const activeItem = items[activeItemIndex];
  const outerDiv = {
    width: config.galleryViewerContainer.width,
    height: config.displaydImageWrapper.height,
  };

  return (
    <DisplayedImageWrapperStyled>
      <ImageWithBox
        activeItem={activeItem}
        outerDiv={outerDiv}
        scalable={true}
        draggable={true}
        showDamagedArea={false}
      />
    </DisplayedImageWrapperStyled>
  );
}

export default DisplayedImageWrapper;
