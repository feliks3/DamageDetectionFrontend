import React from 'react';
import styled from 'styled-components';
import { config } from '../../config/config';
import { useSelector } from 'react-redux';
import ImageWithBox from '../Common/ImageWithBox';

const ControlsImageWrapperStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${config.controlWrapper.height}px;
  width: ${config.controlImageWrapper.width}px;
  background-color: lightgrey;
`;

function ControlsImage() {
  const activeItemIndex = useSelector((state) => state.data.activeItemIndex);
  const items = useSelector((state) => state.data.items);
  const activeItem = items[activeItemIndex];
  const outerDiv = {
    width: config.controlImageWrapper.width,
    height: config.controlWrapper.height,
  };

  return (
    <ControlsImageWrapperStyled>
      <ImageWithBox
        activeItem={activeItem}
        outerDiv={outerDiv}
        scalable={false}
      />
    </ControlsImageWrapperStyled>
  );
}

export default ControlsImage;
