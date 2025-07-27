import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { Animated, Platform, Share, TouchableOpacity } from 'react-native';
// ...existing imports...

interface ShareButtonProps {
  ids: string[];
}

export default function ShareButton({ ids }: ShareButtonProps) {
  // Duplicate code removed. Only one ShareButton component is exported above.

  const iconScale = React.useRef(new Animated.Value(1)).current;

  const handleSuccessAnimation = () => {
    Animated.sequence([
      Animated.spring(iconScale, {
        toValue: 1.3,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(iconScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      })
    ]).start();
  };



  const handleShare = async () => {
    const url = `https://moodplay.co.uk/mixtape?ids=${encodeURIComponent(ids.join(','))}`;
    try {
      if (Platform.OS === 'ios' && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(url);
        handleSuccessAnimation();
      } else {
        await Share.share({ message: url });
        handleSuccessAnimation();
      }
    } catch (e) {
      alert('Unable to share.');
    }
  };
  return (
    <TouchableOpacity
      onPress={handleShare}
      style={{ marginRight: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 24, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}
      accessibilityLabel="Share mixtape"
      accessibilityRole="button"
      accessibilityHint="Shares your mixtape link so you can send it to friends."
      activeOpacity={0.7}
    >
      <Animated.View style={{ transform: [{ scale: iconScale }] }}>
        <Ionicons name="share-outline" size={24} color="#6366f1" />
      </Animated.View>
    </TouchableOpacity>
  );
}
