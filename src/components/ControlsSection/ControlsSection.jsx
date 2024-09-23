import styled from 'styled-components';
import { config } from '../../config/config';
import ControlsWrapper from './ControlsWrapper';

const ControlsSectionStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${config.controlSection.height}px;
  width: ${config.galleryViewer.width}px;
  background-color: lightgreen;
`;

function ControlsSection() {
  return (
    <ControlsSectionStyled>
      <ControlsWrapper />
    </ControlsSectionStyled>
  );
}

export default ControlsSection;
