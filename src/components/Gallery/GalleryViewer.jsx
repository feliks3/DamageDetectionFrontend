import styled from 'styled-components';
import { config } from '../../config/config';
import ThumbnailsSection from '../Thumbnail/ThumbnailsSection';
import DisplayedImageSection from '../DisplayedImage/DisplayedImageSection';
import ControlsSection from '../ControlsSection/ControlsSection';

const GalleryViewerStyled = styled.section`
  margin: 20px auto;
  border: 1px solid black;
  width: ${config.galleryViewer.width}px;
  height: ${config.galleryViewer.height}px;
  background-color: lightblue;
  flex-shrink: 0;
`;

function GalleryViewer() {
  return (
    <GalleryViewerStyled>
      <ThumbnailsSection />
      <DisplayedImageSection />
      <ControlsSection />
    </GalleryViewerStyled>
  );
}

export default GalleryViewer;
