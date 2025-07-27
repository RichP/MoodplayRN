import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';
import AnimatedMoodButton from '../components/AnimatedMoodButton';
import { useToken } from '../context/TokenContext';
import { moodSelectionScreenStyles } from '../styles/moodSelectionScreen';
import type { Mood as ApiMood } from '../types/moodApi';
import { getMoods } from '../utils/api';

export default function MoodSelectionScreen() {
  // State to hold moods from backend (optional, for demo)
  const [moods, setMoods] = useState<ApiMood[]>([]);
  const [moodsError, setMoodsError] = useState<string | null>(null);
  const [tokenStatus, setTokenStatus] = useState<string>('');
  const [loadingMoods, setLoadingMoods] = useState<boolean>(false);
  const { token, loading: tokenLoading } = useToken();

  // Fetch moods from backend on mount (requires JWT token)
  useEffect(() => {
    if (tokenLoading) return; // Wait for token to be ready
    if (!token) {
      setMoodsError('No token available.');
      return;
    }
    const fetchMoods = async () => {
      setLoadingMoods(true);
      setMoodsError(null);
      setTokenStatus('Checking cache...');
      let moodsList: ApiMood[] = [];
      try {
        // Always check cache first
        const cached = await AsyncStorage.getItem('cachedMoods');
        let cachedMoods: ApiMood[] = [];
        if (cached) {
          const { moods, timestamp } = JSON.parse(cached);
          const now = Date.now();
          const threeDays = 3 * 24 * 60 * 60 * 1000;
          cachedMoods = moods;
          if (Array.isArray(cachedMoods) && cachedMoods.length > 0 && now - timestamp < threeDays) {
            setMoods(cachedMoods);
            setTokenStatus('Loaded moods from cache.');
            setLoadingMoods(false);
            return;
          }
        }
        setTokenStatus('JWT token found. Fetching moods...');
        const data = await getMoods(token);
        if (Array.isArray(data)) {
          moodsList = data as ApiMood[];
        } else if (data && Array.isArray(data.moods)) {
          moodsList = data.moods as ApiMood[];
        } else {
          moodsList = [data as ApiMood];
        }
        setMoods(moodsList);
        setTokenStatus('Moods fetched successfully.');
        await AsyncStorage.setItem('cachedMoods', JSON.stringify({ moods: moodsList, timestamp: Date.now() }));
        console.debug('Fetched moods:', moodsList);
      } catch (err: any) {
        setTokenStatus('Error fetching token or moods.');
        setMoodsError(err.message);
      } finally {
        setLoadingMoods(false);
      }
    };
    fetchMoods();
  }, [token, tokenLoading]);

  const handleMoodSelection = (mood: string) => {
    // Navigate to the main app with the selected mood
    router.replace({
      pathname: '/(tabs)/home',
      params: { mood: mood }
    });
  };


  // Helper to chunk moods into rows of 2
  const chunkArray = (arr: ApiMood[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const brainPulse = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(brainPulse, {
          toValue: 1.15,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(brainPulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [brainPulse]);

  // You can use moods, loadingMoods, moodsError in your UI as needed
  return (
    <View style={moodSelectionScreenStyles.bgWrapper}>
      <LinearGradient
        colors={['#f8faff', '#ffffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
      />
      <SafeAreaView style={moodSelectionScreenStyles.safeArea}>
        <StatusBar style="light" />
        <View style={moodSelectionScreenStyles.content}>
          <View style={moodSelectionScreenStyles.header}>
            <Animated.Text style={[moodSelectionScreenStyles.brain, { transform: [{ scale: brainPulse }] }]}>🧠</Animated.Text>
            <Text style={moodSelectionScreenStyles.title}>How are you feeling today?</Text>
          </View>
          {/* --- Status and error messages removed for clean UI --- */}
          <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }}>
            <View style={moodSelectionScreenStyles.moodGrid}>
              {/* Dynamically render mood buttons from fetched moods, 2 per row */}
              {chunkArray(moods, 2).map((row, rowIdx) => (
                <View style={moodSelectionScreenStyles.moodRow} key={rowIdx}>
                  {row.map((moodObj, idx) => {
                    const mood = moodObj.mood || '';
                    return (
                      <AnimatedMoodButton
                        key={moodObj.id ?? `${rowIdx}-${idx}`}
                        mood={mood}
                        onSelect={handleMoodSelection}
                      />
                    );
                  })}
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={{ width: '100%', alignItems: 'center', paddingBottom: 16 }}>
            <Text style={moodSelectionScreenStyles.subtitle}>
              Select your mood to personalize your experience
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
