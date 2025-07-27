import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwipeableCard } from '../../components/cards';
import { homeScreenStyles } from '../../styles/homeScreen';
import { getGames } from '../../utils/api';

export default function HomeScreen() {
	const navigation = useNavigation();
	const { mood } = useLocalSearchParams<{ mood: string }>();
	const router = useRouter();
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [cardKey, setCardKey] = useState(0); // Add key to force re-render
	const [games, setGames] = useState<any[]>([]); // Store games from API
	const [discardedGames, setDiscardedGames] = useState<any[]>([]); // Store discarded games
	const [mixtape, setMixtape] = useState<any[]>([]);

	// Set header title dynamically based on mood
			React.useEffect(() => {
				navigation.setOptions({
					headerTitle: `${mood ? mood.charAt(0).toUpperCase() + mood.slice(1) : 'Happy'} Activities`,
					headerTitleStyle: { color: '#6366f1', fontWeight: 'bold', fontSize: 28 },
							headerLeft: () => (
								<TouchableOpacity
									onPress={handleChangeMood}
									style={{ marginLeft: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 24, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center' }}
									activeOpacity={0.7}
									accessibilityLabel="Back"
								>
									{/* Use a left arrow Unicode or icon for back button look */}
									<Text style={{ color: '#6366f1', fontSize: 24, marginRight: 2 }}>←</Text>
								</TouchableOpacity>
							),
				});
			}, [navigation, mood]);

	// Load mixtape from AsyncStorage on mount
	useEffect(() => {
		const loadMixtape = async () => {
			const stored = await AsyncStorage.getItem('mixtape');
			if (stored) {
				setMixtape(JSON.parse(stored));
			}
		};
		loadMixtape();
	}, []);

	// Persist mixtape to AsyncStorage whenever it changes
	useEffect(() => {
		AsyncStorage.setItem('mixtape', JSON.stringify(mixtape));
	}, [mixtape]);

	// Debug logging
	console.debug('HomeScreen mood parameter:', mood);

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const token = await SecureStore.getItemAsync('jwtToken');
				if (!token) {
					console.warn('No JWT token found');
					return;
				}
				const gamesJson = await getGames(token, mood ?? '');
				// Map games to card objects with only title, image, steamUrl
				const mappedGames = (Array.isArray(gamesJson) ? gamesJson : gamesJson.games || []).map((game: any, idx: number) => ({
					id: game.id || idx,
					title: game.name,
					image: game.image,
					steamUrl: game.steamUrl,
					mood,
				}));
				setGames(mappedGames);
				setCurrentCardIndex(0);
				setCardKey(prev => prev + 1);
			} catch (err) {
				console.error('Error fetching games:', err);
				setGames([]);
			}
		};
		if (mood) {
			fetchGames();
		}
	}, [mood]);

	// Filter out discarded and mixtape games from available games
	const availableGames = games.filter(
		(game) =>
			!discardedGames.some((g) => g.id === game.id) &&
			!mixtape.some((g) => g.id === game.id)
	);

	const handleChangeMood = () => {
		console.log('Change mood button pressed');
		setCurrentCardIndex(0);
		setCardKey(prev => prev + 1);
		// Use absolute path to root stack mood selection
		router.replace('/');
	};

	const resetCards = () => {
		setCurrentCardIndex(0);
		setCardKey(prev => prev + 1);
	};

	const handleCardSwipe = (direction: 'left' | 'right') => {
		const currentGame = availableGames[currentCardIndex];
		if (!currentGame) return;
		if (direction === 'left') {
			setDiscardedGames((prev) => [...prev, currentGame]);
		} else if (direction === 'right') {
			const mixtapeItem = { ...currentGame, mood };
			setMixtape((prev) => {
				// Only add if not already present
				const exists = prev.some((g) => g.id === mixtapeItem.id);
				return exists ? prev : [...prev, mixtapeItem];
			});
		}
		setCurrentCardIndex(0); // Reset to first card after swipe
		setCardKey((prev) => prev + 1);
	};

	// Use availableGames for card rendering
	const currentCard = availableGames[currentCardIndex];
	const nextCard = availableGames[(currentCardIndex + 1) % availableGames.length];

	return (
		<SafeAreaView style={[homeScreenStyles.container, { backgroundColor: '#f7f7fa' }]}> 
			{/* Full screen linear gradient with indigo-50 and slate-200 */}
			<LinearGradient
				colors={["#eef2ff", "#e2e8f0"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={StyleSheet.absoluteFillObject}
			/>
			<View style={homeScreenStyles.cardContainer}>
				{/* Next card (behind) */}
				{nextCard && (
					<SwipeableCard
						key={`${nextCard.id}-next-${cardKey}`}
						card={nextCard}
						isTop={false}
						onSwipe={() => handleCardSwipe('left')}
					/>
				)}
				{/* Current card (on top) */}
				{currentCard && (
					<SwipeableCard
						key={`${currentCard.id}-current-${cardKey}`}
						card={currentCard}
						isTop={true}
						onSwipe={(direction) => handleCardSwipe(direction)}
					/>
				)}
			</View>
			<View style={homeScreenStyles.footer}>
				<Text style={homeScreenStyles.instructionText}>
					👈 Skip     Add to Mixtape 👉
				</Text>
				<View style={homeScreenStyles.cardCounter}>
					<Text style={homeScreenStyles.counterText}>
						{games.length ? currentCardIndex + 1 : 0} of {games.length}
					</Text>
				</View>
				{/* Reset button for testing */}
				<TouchableOpacity onPress={resetCards} style={homeScreenStyles.resetButton}>
					<Text style={homeScreenStyles.resetButtonText}>Reset Cards</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
