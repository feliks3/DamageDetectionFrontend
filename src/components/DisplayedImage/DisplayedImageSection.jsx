import styled from 'styled-components';
import { config } from '../../config/config';
import DisplayedImageWrapper from './DisplayedImageWrapper';

const DisplayedImageSectionStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${config.displaydImageSection.height}px;
  width: ${config.galleryViewer.width}px;
  background-color: lightcyan;
`;

function DisplayedImageSection() {
  return (
    <DisplayedImageSectionStyled>
      <DisplayedImageWrapper />
    </DisplayedImageSectionStyled>
  );
}

export default DisplayedImageSection;
