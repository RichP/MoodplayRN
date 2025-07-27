import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const moodSelectionScreenStyles = StyleSheet.create({
  bgWrapper: {
    flex: 1,
    backgroundColor: 'transparent', // Allow LinearGradient to show
  },
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 32,
    marginTop: 8,
  },
  brain: {
    fontSize: 72,
    marginBottom: 12,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6366f1', // Accent blue for heading
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Segoe UI' : 'Roboto',
    letterSpacing: 0.5,
  },
  moodGrid: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 32,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    gap: 16,
  },
  moodButton: {
  backgroundColor: '#e5e7eb', // Pastel gray
  borderColor: 'rgba(0,0,0,0.05)',
  borderWidth: 1,
  // Optional: For inner white overlay gradient, wrap button content in a LinearGradient in the component
    width: (width - 80) / 2.1,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  emoji: {
    fontSize: 44,
    marginBottom: 6,
  },
  moodLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151', // Dark text
    fontFamily: Platform.OS === 'ios' ? 'Segoe UI' : 'Roboto',
    textShadowColor: 'rgba(59,130,246,0.08)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#6366f1', // Muted text
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Segoe UI' : 'Roboto',
    letterSpacing: 0.2,
  },
});
