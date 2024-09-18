import React, { useState, useEffect } from 'react';
import ImageContainer from '../components/ImageContainer';
import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/get-image-url').then((data, err) => {
      if (err) {
        console.log(err);
      }
      setImages(data.data);
      // console.log(data.data);
    });
  }, []);
  return <ImageContainer images={images} />;
  // return <CanvasWithMultipleImages />;
}

export default HomePage;
