import { Dimensions, StyleSheet } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7fa', // Soft gray/off-white
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: screenHeight * 0.3,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: 'center',
    zIndex: 2,
  },
  changeMoodButton: {
    alignSelf: 'flex-start',
    padding: 14,
    backgroundColor: '#e5e7eb', // Button background
    borderRadius: 24,
    marginBottom: 18,
    minWidth: 120,
    borderWidth: 2,
  borderColor: '#cbcfd6',
    shadowColor: '#374151',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  changeMoodText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  moodTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 48,
    marginBottom: 48,
    zIndex: 1,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    zIndex: 2,
  },
  instructionText: {
    fontSize: 16,
    color: '#6366f1',
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
  cardCounter: {
    backgroundColor: '#f3e8ff', // Pastel purple
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#a7f3d0', // Pastel green shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  counterText: {
    fontSize: 15,
    color: '#6366f1',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  resetButton: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 12,
    borderWidth: 2,
  borderColor: '#cbcfd6',
    shadowColor: '#374151',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  resetButtonText: {
    fontSize: 15,
    color: '#6366f1',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
