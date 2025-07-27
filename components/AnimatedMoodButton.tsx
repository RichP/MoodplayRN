import React from 'react';
import { Animated, TouchableOpacity, Text } from 'react-native';
import { moodSelectionScreenStyles } from '../styles/moodSelectionScreen';

interface AnimatedMoodButtonProps {
  mood: string;
  onSelect: (mood: string) => void;
}

export default function AnimatedMoodButton({ mood, onSelect }: AnimatedMoodButtonProps) {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const emojiScale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleBounce = () => {
    Animated.sequence([
      Animated.spring(emojiScale, {
        toValue: 1.2,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(emojiScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      })
    ]).start();
  };

  // Emoji mapping for moods
  const moodEmojiMap: Record<string, string> = {
    happy: '😄',
    sad: '😢',
    angry: '😡',
    excited: '🤩',
    calm: '😌',
    anxious: '😰',
    tired: '😴',
    bored: '🥱',
    surprised: '😲',
    // Add more as needed
  };
  const emoji = moodEmojiMap[mood.toLowerCase()] || '🙂';

  function getMoodColor(label: string): string {
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
      hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 85%)`;
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[moodSelectionScreenStyles.moodButton, { backgroundColor: getMoodColor(mood) }]}
        onPress={() => {
          onSelect(mood);
          handleBounce();
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Animated.Text style={[moodSelectionScreenStyles.emoji, { transform: [{ scale: emojiScale }] }]}>{emoji}</Animated.Text>
        <Text style={moodSelectionScreenStyles.moodLabel}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
