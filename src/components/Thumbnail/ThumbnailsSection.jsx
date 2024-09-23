import styled from 'styled-components';
import { config } from '../../config/config';
import ThumbnailsContainer from './ThumbnailsContainer';

const ThumbnailsSectionStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${config.galleryViewer.width}px;
  height: ${config.thumbnailsSection.height}px;
  background-color: lightcoral;
`;

function ThumbnailsSection() {
  return (
    <ThumbnailsSectionStyled>
      <ThumbnailsContainer />
    </ThumbnailsSectionStyled>
  );
}

export default ThumbnailsSection;
