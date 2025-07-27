import { MoodData, MoodType } from '../types/mood';

export const moodData: Record<MoodType, MoodData> = {
  happy: {
    backgroundColor: '#f7f7fa',
    cards: [
      {
        id: 1,
        title: 'Dance It Out',
        description: 'Turn up your favorite playlist and dance like nobody is watching!',
        emoji: '💃',
        action: 'Play Music',
        gradientColors: ['#0ea5e9', '#f3e8ff', '#a7f3d0'],
      },
      {
        id: 2,
        title: 'Call a Friend',
        description: 'Share your joy with someone special',
        emoji: '📞',
        action: 'Make Call',
        gradientColors: ['#f3e8ff', '#0ea5e9', '#a7f3d0'],
      },
      {
        id: 3,
        title: 'Take a Photo',
        description: 'Capture this happy moment forever',
        emoji: '📸',
        action: 'Open Camera',
        gradientColors: ['#a7f3d0', '#0ea5e9', '#f3e8ff'],
      }
    ]
  },
  sad: {
    backgroundColor: '#f7f7fa',
    cards: [
      {
        id: 1,
        title: 'Watch Comfort Show',
        description: 'Put on your favorite feel-good series',
        emoji: '📺',
        action: 'Browse Shows',
        gradientColors: ['#f3e8ff', '#a7f3d0', '#0ea5e9'],
      },
      {
        id: 2,
        title: 'Take a Warm Bath',
        description: 'Relax and let the warmth soothe you',
        emoji: '🛁',
        action: 'Set Timer',
        gradientColors: ['#a7f3d0', '#f3e8ff', '#0ea5e9'],
      },
      {
        id: 3,
        title: 'Write in Journal',
        description: 'Express your feelings on paper',
        emoji: '📝',
        action: 'Start Writing',
        gradientColors: ['#0ea5e9', '#f3e8ff', '#a7f3d0'],
      }
    ]
  },
  excited: {
    backgroundColor: '#f7f7fa',
    cards: [
      {
        id: 1,
        title: 'Go for a Run',
        description: 'Channel that energy into movement!',
        emoji: '🏃‍♂️',
        action: 'Track Run',
        gradientColors: ['#0ea5e9', '#a7f3d0', '#f3e8ff'],
      },
      {
        id: 2,
        title: 'Start New Project',
        description: 'Perfect time to begin something amazing',
        emoji: '🚀',
        action: 'Plan Project',
        gradientColors: ['#f3e8ff', '#0ea5e9', '#a7f3d0'],
      },
      {
        id: 3,
        title: 'Call Adventure Buddy',
        description: 'Share the excitement and make plans',
        emoji: '🎉',
        action: 'Make Plans',
        gradientColors: ['#a7f3d0', '#f3e8ff', '#0ea5e9'],
      }
    ]
  },
  calm: {
    backgroundColor: '#f7f7fa',
    cards: [
      {
        id: 1,
        title: 'Meditate',
        description: 'Find your center with mindful breathing',
        emoji: '🧘‍♀️',
        action: 'Start Session',
        gradientColors: ['#a7f3d0', '#f3e8ff', '#0ea5e9'],
      },
      {
        id: 2,
        title: 'Read a Book',
        description: 'Get lost in a good story',
        emoji: '📖',
        action: 'Open Library',
        gradientColors: ['#f3e8ff', '#a7f3d0', '#0ea5e9'],
      },
      {
        id: 3,
        title: 'Make Tea',
        description: 'Brew your favorite calming blend',
        emoji: '🍵',
        action: 'Set Timer',
        gradientColors: ['#0ea5e9', '#f3e8ff', '#a7f3d0'],
      }
    ]
  }
};
