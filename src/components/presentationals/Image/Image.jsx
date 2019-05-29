import React from 'react';

const Image = ({ url }) => {
  return (
    <img
      src={
        url ||
        'https://res.cloudinary.com/nedy123/image/upload/v1558987845/Authors%20Haven/authorshaven/writer3.jpg'
      }
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default Image;
