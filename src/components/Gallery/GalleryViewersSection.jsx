import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GalleryViewer from './GalleryViewer';
import { config } from '../../config/config';
import { fetchData } from '../../features/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

const GalleryViewersSectionStyled = styled.section`
  display: flex;
`;

function GalleryViewersSection() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <GalleryViewersSectionStyled>
      <GalleryViewer />
      <GalleryViewer />
    </GalleryViewersSectionStyled>
  );
}

export default GalleryViewersSection;
