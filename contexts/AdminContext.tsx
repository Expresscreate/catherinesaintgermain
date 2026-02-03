import React, { createContext, useContext, useState, useEffect } from 'react';

interface ContentMap {
  [key: string]: string;
}

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  content: ContentMap;
  updateContent: (id: string, value: string) => void;
  saveChanges: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<ContentMap>({});

  // Load saved content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('site_content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const login = (password: string) => {
    // Simple demo password
    if (password === 'admin') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  const updateContent = (id: string, value: string) => {
    setContent(prev => ({ ...prev, [id]: value }));
  };

  const saveChanges = () => {
    localStorage.setItem('site_content', JSON.stringify(content));
    alert("Modifications sauvegardées localement !");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, content, updateContent, saveChanges }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};