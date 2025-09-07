import React from 'react';

const OptimizedImage = ({ src, alt, className, width, height, loading = "lazy" }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      width={width}
      height={height}
      style={{ aspectRatio: `${width}/${height}` }}
    />
  );
};

export default OptimizedImage;