import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';

interface EditableTextProps {
  id: string;
  defaultText: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const EditableText: React.FC<EditableTextProps> = ({ id, defaultText, className, tag: Tag = 'span' }) => {
  const { isAdmin, content, updateContent } = useAdmin();
  const [text, setText] = useState(defaultText);

  // Sync with global content
  useEffect(() => {
    if (content[id]) {
      setText(content[id]);
    }
  }, [content, id]);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newText = e.currentTarget.innerText;
    if (newText !== text) {
      updateContent(id, newText);
      setText(newText);
    }
  };

  if (isAdmin) {
    return (
      <Tag
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        className={`${className} outline-none border-b border-dashed border-brand/50 hover:bg-brand/10 transition-colors cursor-text min-w-[20px]`}
      >
        {text}
      </Tag>
    );
  }

  return <Tag className={className}>{text}</Tag>;
};

export default EditableText;