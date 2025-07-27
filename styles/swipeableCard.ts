import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const swipeableCardStyles = StyleSheet.create({
  card: {
    width: screenWidth - 48,
    height: screenHeight * 0.48,
    borderRadius: 28,
    position: 'absolute',
    backgroundColor: '#fff',
    shadowColor: '#cbcfd6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
    overflow: 'hidden', // Ensure card crops content
  },
  cardBehind: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 28,
    padding: 0, // Remove extra padding
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardEmoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(59,130,246,0.08)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  cardDescription: {
    fontSize: 17,
    color: '#6366f1',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    paddingHorizontal: 8,
    fontStyle: 'italic',
  },
  actionButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#cbcfd6',
    marginTop: 8,
    marginBottom: 20, // Add gap below button
    shadowColor: '#374151',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  actionButtonText: {
    color: '#3b82f6',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  cardImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#eef2ff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: -40, // Adjusted to move image up
    // Removed marginTop
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    resizeMode: 'cover',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
  },
});
