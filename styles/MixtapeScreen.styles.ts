import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
    paddingBottom: 32,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#cbcfd6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
    width: '90%',
    height: 340,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 18,
  },
  reflectionCard: {
    marginTop: -10,
    opacity: 0.3,
    transform: [{ scaleY: -1 }],
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  mood: {
    fontSize: 16,
    color: '#6366f1',
  },
  empty: {
    fontSize: 18,
    color: '#888',
    marginTop: 32,
  },
  reflectionWrapper: {
    transform: [{ scaleY: -1 }],
    opacity: 0.5,
    height: 250, // Adjust based on desired reflection size
    overflow: 'hidden',
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  reflectionContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '80%', // Match width with card
    height: 340,
    transform: [{ scaleY: 1 }, { scale: 0.9 }],
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 80,
    opacity: 0.7,
    zIndex: 2,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    opacity: 0.5,
  },
});

export default styles;
