import React, { useState } from 'react';
import { Alert, Dimensions, Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { swipeableCardStyles } from '../../styles/swipeableCard';
import { MoodCard } from '../../types/mood';

const { width: screenWidth } = Dimensions.get('window');

interface SwipeableCardProps {
  card: MoodCard;
  isTop: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({ card, isTop, onSwipe }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(isTop ? 1 : 0.8);
  const scale = useSharedValue(isTop ? 1 : 0.95);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  //console.log('SwipeableCard card:', card);
  //console.log('SwipeableCard card.title:', card.title);

  const handleCardSwipe = (direction: 'left' | 'right') => {
    onSwipe(direction);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      // Start gesture - no changes needed
    },
    onActive: (event) => {
      if (!isTop) return; // Only allow active card to be dragged
      
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      
      // Calculate rotation based on horizontal movement with bounds
      const rotation = Math.max(-30, Math.min(30, (event.translationX / screenWidth) * 30));
      rotate.value = rotation;
      
      // Adjust opacity based on distance
      const distance = Math.sqrt(event.translationX ** 2 + event.translationY ** 2);
      const maxDistance = screenWidth * 0.5;
      opacity.value = Math.max(0.3, 1 - (distance / maxDistance) * 0.7);
    },
    onEnd: (event) => {
      if (!isTop) return;
      const { translationX, velocityX } = event;
      const swipeThreshold = screenWidth * 0.25;
      const velocityThreshold = 500;
      if (Math.abs(translationX) > swipeThreshold || Math.abs(velocityX) > velocityThreshold) {
        const direction = translationX > 0 ? 'right' : 'left';
        // Swipe off screen
        const finalX = translationX > 0 ? screenWidth * 1.5 : -screenWidth * 1.5;
        const finalY = translateY.value + Math.abs(translationX) * 0.2;
        
        translateX.value = withTiming(finalX, { duration: 300 });
        translateY.value = withTiming(finalY, { duration: 300 });
        rotate.value = withTiming(translationX > 0 ? 45 : -45, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
        
        // Use runOnJS to update state after animation
        runOnJS(handleCardSwipe)(direction);
      } else {
        // Snap back to center
        translateX.value = withSpring(0, { 
          damping: 15,
          stiffness: 150 
        });
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 150
        });
        rotate.value = withSpring(0, {
          damping: 15,
          stiffness: 150
        });
        opacity.value = withSpring(isTop ? 1 : 0.8, {
          damping: 15,
          stiffness: 150
        });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <PanGestureHandler 
      onGestureEvent={gestureHandler} 
      enabled={isTop}
      shouldCancelWhenOutside={false}
      activeOffsetX={[-10, 10]}
      activeOffsetY={[-10, 10]}
    >
      <Animated.View style={[swipeableCardStyles.card, animatedStyle, !isTop && swipeableCardStyles.cardBehind]}>
        <View style={swipeableCardStyles.cardGradient}>
          {/* Top half: Game image with lazy loading, caching, and placeholder */}
          <View style={swipeableCardStyles.cardImageContainer}>
            {!imageLoaded && !imageError && (
              <View style={swipeableCardStyles.cardImagePlaceholder}>
                <Text style={{ color: '#6366f1', fontSize: 18 }}>Loading...</Text>
              </View>
            )}
            {imageError && (
              <View style={swipeableCardStyles.cardImagePlaceholder}>
                <Text style={{ color: '#ef4444', fontSize: 18 }}>Image failed to load</Text>
              </View>
            )}
            {!imageError && card.image && (
              <Image
                source={{ uri: card.image }}
                style={swipeableCardStyles.cardImage}
                resizeMode="cover"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            )}
          </View>
          {/* Card title below image, inside cardGradient */}
          <View style={{ alignItems: 'center', marginTop: 200, marginBottom: 32 }}>
            <Text style={swipeableCardStyles.cardTitle}>{card.title}</Text>
          </View>
        </View>
          
        {/* Button at the bottom of the card with 20px gap */}
        <View style={{ alignItems: 'center', marginBottom: 20, position: 'absolute', bottom: 0, width: '100%' }}>
          
          <TouchableOpacity 
            style={[swipeableCardStyles.actionButton, { backgroundColor: '#6366f1' }]}
            onPress={() => {
              if (card.steamUrl) {
                Linking.openURL(card.steamUrl);
              } else {
                Alert.alert('Steam', 'No Steam URL available');
              }
            }}
          >
            <Text style={[swipeableCardStyles.actionButtonText, { color: '#fff' }]}>View on Steam</Text>
          </TouchableOpacity>
         
        </View>
        
      </Animated.View>
    </PanGestureHandler>
  );
};
