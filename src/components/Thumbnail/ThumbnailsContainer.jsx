import styled from 'styled-components';
import { config } from '../../config/config';
import ThumbnailsImage from './ThumbnailsImage';
import { useSelector } from 'react-redux';

const ThumbnailsContainerStyled = styled.div`
  background-color: lightgrey;
  width: ${config.galleryViewerContainer.width}px;
  height: ${config.thumbnailsContainer.height}px;
  overflow: hidden;
`;
const ThumbnailsRowStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: lightgrey;
`;

function ThumbnailsContainer() {
  const items = useSelector((state) => state.data.items);
  return (
    <ThumbnailsContainerStyled>
      <ThumbnailsRowStyled>
        {items &&
          items.map((image, index) => {
            return (
              <ThumbnailsImage index={index} image={image} key={image.url} />
            );
          })}
      </ThumbnailsRowStyled>
    </ThumbnailsContainerStyled>
  );
}

export default ThumbnailsContainer;
