import styled from 'styled-components';
import ControlsImage from './ControlsImage';
import { config } from '../../config/config';

const ControlsWrapperStyled = styled.div`
  height: ${config.controlWrapper.height}px;
  width: ${config.galleryViewerContainer.width}px;
  background-color: lightblue;
`;
function ControlsWrapper() {
  return (
    <ControlsWrapperStyled>
      <ControlsImage />
    </ControlsWrapperStyled>
  );
}

export default ControlsWrapper;
