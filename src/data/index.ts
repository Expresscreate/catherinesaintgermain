import defaultContentRaw from './content.json';
import type { SiteContent } from './types';

export const defaultContent = defaultContentRaw as SiteContent;

const STORAGE_KEY = 'catherine-admin-content';

export function loadContent(): SiteContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as SiteContent;
    }
  } catch {}
  return structuredClone(defaultContent) as SiteContent;
}

export function saveContent(content: SiteContent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content, null, 2));
}
