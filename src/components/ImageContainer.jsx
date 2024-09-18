import React from 'react';
import ImageCanvas from './ImageCanvas';

function ImageContainer(props) {
  const { images } = props;

  return (
    <div className="imageContainer">
      <div className="imageRow">
        {images.map((image) => {
          return <ImageCanvas key={image.url} imageInfo={image} />;
        })}
      </div>
    </div>
  );
}

export default ImageContainer;
