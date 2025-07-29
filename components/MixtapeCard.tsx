import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import styles from '../styles/MixtapeScreen.styles';

const { width: screenWidth } = require('react-native').Dimensions.get('window');

interface MixtapeCardProps {
  item: any;
}

const MixtapeCard: React.FC<MixtapeCardProps> = ({ item }) => {
  const flip = useSharedValue(0);
  useEffect(() => {
    flip.value = withTiming(360, { duration: 600 });
  }, []);
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(flip.value, [0, 360], [0, 360])}deg`,
        },
        { scale: 1.05 },
      ],
       shadowColor: '#6366f1',
      // shadowOffset: { width: 0, height: 12 },
       shadowOpacity: 0.25,
       shadowRadius: 32,
      borderWidth: 1,
      borderColor: '#a5b4fc',
      elevation: 24,
    };
  });
  // Shimmer animation for reflection
  const shimmer = useSharedValue(0);
  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1800 }), -1, true);
  }, []);
  const shimmerStyle = useAnimatedStyle(() => {
    return {
      left: interpolate(shimmer.value, [0, 1], [-screenWidth * 0.8, screenWidth * 0.8]),
    };
  });
  return (
    <View style={{ alignItems: 'center' }}>
      <Animated.View style={[styles.card, animatedCardStyle]}>
        {item.image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
          </View>
        )}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.mood}>Mood: {item.mood}</Text>
      </Animated.View>
      {/* Reflection with blur and shimmer */}
      <View style={styles.reflectionWrapper}>
        <BlurView intensity={30} style={styles.reflectionContent}>
          {item.image && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            </View>
          )}
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.mood}>{item.mood}</Text>
          <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
            <LinearGradient
              colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientOverlay}
            />
          </Animated.View>
        </BlurView>
      </View>
    </View>
  );
};

export default MixtapeCard;
