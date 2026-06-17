import { useState, useCallback, useEffect } from 'react';
import { loadContent, saveContent, defaultContent } from '../data/index';
import type { SiteContent } from '../data/types';

const STORAGE_KEY = 'catherine-admin-content';

export function useContent() {
  const [content, setContent] = useState<SiteContent>(() => loadContent());
  const [hasOverrides, setHasOverrides] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) !== null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then((remote: SiteContent) => {
        if (remote && Object.keys(remote).length > 0) {
          setContent(remote);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setHasOverrides(saved !== null);
  }, [content]);

  const updateContent = useCallback((path: (string | number)[], value: unknown) => {
    setContent(prev => {
      const updated = structuredClone(prev) as Record<string, unknown>;
      let obj: Record<string, unknown> = updated;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (typeof key === 'number') {
          obj = (obj as unknown as unknown[])[key] as Record<string, unknown>;
        } else {
          obj = obj[key] as Record<string, unknown>;
        }
      }
      const lastKey = path[path.length - 1];
      if (typeof lastKey === 'number') {
        (obj as unknown as unknown[])[lastKey] = value;
      } else {
        obj[lastKey] = value;
      }
      return updated as unknown as SiteContent;
    });
  }, []);

  const savePreview = useCallback(() => {
    setContent(prev => {
      saveContent(prev);
      return prev;
    });
    setHasOverrides(true);
  }, []);

  const resetToDefault = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(structuredClone(defaultContent as SiteContent));
    setHasOverrides(false);
  }, []);

  const getContent = useCallback(() => {
    return content;
  }, [content]);

  return {
    content,
    hasOverrides,
    loading,
    updateContent,
    savePreview,
    resetToDefault,
    getContent,
  };
}
