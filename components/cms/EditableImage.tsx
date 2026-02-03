import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Edit } from 'lucide-react';

interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({ id, defaultSrc, alt, className }) => {
  const { isAdmin, content, updateContent } = useAdmin();
  const [src, setSrc] = useState(defaultSrc);

  useEffect(() => {
    if (content[id]) {
      setSrc(content[id]);
    }
  }, [content, id]);

  const handleClick = () => {
    if (!isAdmin) return;
    const newUrl = prompt("Entrez la nouvelle URL de l'image :", src);
    if (newUrl && newUrl !== src) {
        updateContent(id, newUrl);
        setSrc(newUrl);
    }
  };

  return (
    <div className={`relative group ${isAdmin ? 'cursor-pointer' : ''}`} onClick={handleClick}>
      <img src={src} alt={alt} className={className} />
      
      {isAdmin && (
        <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center border-2 border-brand border-dashed">
            <div className="bg-bg-900 text-brand p-2 rounded-full shadow-lg">
                <Edit size={24} />
            </div>
        </div>
      )}
    </div>
  );
};

export default EditableImage;