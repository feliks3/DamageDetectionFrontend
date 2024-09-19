// src/components/GalleryViewer.jsx

import React, { useState, useEffect } from 'react';
import ImageGallery from '../components/ImageGallery';
import axios from 'axios';

function GalleryViewer() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/get-image-url').then((data, err) => {
      if (err) {
        console.log(err);
      }
      setImages(data.data);
      // console.log(data.data);
    });
  }, []);
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  return (
    <div className="gallery-container">
      <ImageGallery images={images} onImageClick={handleImageClick} />
      <div className="largeImage-section">
        <div className="largeImage-container">
          {selectedImage ? (
            <img src={selectedImage} alt="large" className="largeImage" />
          ) : (
            <p>click the small image</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GalleryViewer;
