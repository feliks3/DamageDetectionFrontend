// src/components/ImageCanvas.jsx

import React, { useState, useEffect, useRef } from 'react';

function ImageCanvas({ imageInfo, onImageClick }) {
  const canvasRef = useRef(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('./config.json');
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    const drawCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas || !config || !imageInfo) return;

      const { url, coordinates = {}, area = {} } = imageInfo;
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = url;
      image.onload = () => {
        const widthRatio = canvas.width / image.width;
        const heightRatio = canvas.height / image.height;
        const ratio = Math.min(widthRatio, heightRatio);
        const ratioWidth = image.width * ratio;
        const ratioHeight = image.height * ratio;
        const ratioCoordinatesX = (coordinates.x || 0) * ratio;
        const ratioCoordinatesY = (coordinates.y || 0) * ratio;
        const ratioAreaWidth = (area.width || 0) * ratio;
        const ratioAreaHeight = (area.height || 0) * ratio;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          image,
          (canvas.width - ratioWidth) / 2,
          (canvas.height - ratioHeight) / 2,
          ratioWidth,
          ratioHeight
        );

        ctx.strokeStyle = config.rectangle.color;
        ctx.lineWidth = config.rectangle.lineWidth;

        ctx.strokeRect(
          ratioCoordinatesX,
          ratioCoordinatesY,
          ratioAreaWidth,
          ratioAreaHeight
        );
      };
    };

    drawCanvas();
  }, [config, imageInfo]);

  return (
    <div className="image-wrapper">
      <canvas
        className="thumbnail-image"
        ref={canvasRef}
        width="200"
        height="200"
        onClick={() => onImageClick(imageInfo.url)}
      />
    </div>
  );
}

export default ImageCanvas;
