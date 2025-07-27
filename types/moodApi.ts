// TypeScript interfaces for backend Mood and Tag models

export interface Tag {
  id: number;
  value?: string | null;
  moodId?: number | null;
}

export interface Mood {
  id: number;
  mood?: string | null;
  tags: Tag[];
}
