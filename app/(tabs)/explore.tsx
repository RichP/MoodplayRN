import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import MixtapeCard from '../../components/MixtapeCard';
import MoodDropdown from '../../components/MoodDropdown';
import ShareButton from '../../components/ShareButton';
import FilterButton from '../../components/FilterButton';
import styles from '../../styles/MixtapeScreen.styles';

const { width: screenWidth } = Dimensions.get('window');

export default function MixtapeScreen() {
  const [mixtape, setMixtape] = useState<any[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [availableMoods, setAvailableMoods] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigation = useNavigation();

  // Set headerRight to filter button (must be after state declarations)
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <ShareButton ids={mixtape.map((item) => String(item.id))} />
          <FilterButton onPress={() => setDropdownOpen((open) => !open)} />
        </View>
      ),
    });
  }, [navigation, dropdownOpen, mixtape]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchMixtape = async () => {
        const stored = await AsyncStorage.getItem('mixtape');
        if (stored) {
          const parsed = JSON.parse(stored);
          setMixtape(parsed);
          // Extract unique moods from mixtape
          const moods = Array.from(new Set(parsed.map((item: any) => item.mood))) as string[];
          setAvailableMoods(moods);
        } else {
          setMixtape([]);
          setAvailableMoods([]);
        }
      };
      fetchMixtape();
    }, [])
  );

  const filteredMixtape = selectedMood
    ? mixtape.filter((item) => item.mood === selectedMood)
    : mixtape;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#eef2ff', '#e2e8f0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={require('react-native').StyleSheet.absoluteFillObject}
      />
      {/* MoodDropdown is rendered at the top, just under the header bar */}
      {availableMoods.length > 0 && (
        <View style={{ position: 'absolute', top: -35, right: 0, zIndex: 100, alignItems: 'flex-end', width: '100%' }}>
          <MoodDropdown
            moods={availableMoods}
            selectedMood={selectedMood}
            onSelect={setSelectedMood}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        </View>
      )}
      {/* Main content below dropdown */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {filteredMixtape.length > 0 ? (
          <Carousel
            width={screenWidth * 0.9}
            height={500}
            data={filteredMixtape}
            renderItem={({ item }) => <MixtapeCard item={item} />}
            style={{ marginTop: 16 }}
            loop
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.8, // scale of inactive cards
              parallaxScrollingOffset: 150, // gap between cards
            }}
          />
        ) : (
          <Text style={styles.empty}>No games in your mixtape{selectedMood ? ` for mood "${selectedMood}"` : ''} yet.</Text>
        )}
      </View>
    </View>
  );
}




