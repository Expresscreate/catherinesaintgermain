import React from 'react';

interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({ defaultSrc, alt, className }) => {
  return <img src={defaultSrc} alt={alt} className={className} />;
};

export default EditableImage;
