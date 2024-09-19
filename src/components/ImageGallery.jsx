// src/components/ImageGallery.jsx

import ThumbnailsContainer from './ThumbnailsContainer';

function ImageGallery({ images, onImageClick }) {
  return (
    <div className="thumbnails-section">
      <ThumbnailsContainer images={images} onImageClick={onImageClick} />
    </div>
  );
}

export default ImageGallery;
