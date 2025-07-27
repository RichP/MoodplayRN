export interface MoodCard {
  id: number;
  title: string;
  description: string;
  emoji: string;
  action: string;
  gradientColors: [string, string];
  image?: string; // Add image property for game image URLs
  steamUrl?: string; // Add steamUrl property
}

export interface MoodData {
  backgroundColor: string;
  cards: MoodCard[];
}

export type MoodType = 'happy' | 'sad' | 'excited' | 'calm';
