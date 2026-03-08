import React from 'react';

interface EditableTextProps {
  id: string;
  defaultText: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const EditableText: React.FC<EditableTextProps> = ({ defaultText, className, tag: Tag = 'span' }) => {
  return <Tag className={className}>{defaultText}</Tag>;
};

export default EditableText;
