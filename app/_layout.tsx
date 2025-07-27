import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { getMobileJwtToken } from '../utils/auth';

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Authenticate and get JWT on app launch
  useEffect(() => {
    // Get the appKey from Expo config (extra)
    const appKey = Constants.expoConfig?.extra?.MOBILE_APP_SECRET || Constants.manifest?.extra?.MOBILE_APP_SECRET;
    if (!appKey) {
      console.error('MOBILE_APP_SECRET is not defined in Expo config.');
      return;
    }
    getMobileJwtToken(appKey)
      .then(async (data) => {
        console.debug('JWT/auth response:', data);
        if (data.token) {
          await SecureStore.setItemAsync('jwtToken', data.token);
          console.debug('JWT token saved to SecureStore');
        }
      })
      .catch((err) => {
        console.error('Token Auth error:', err);
      });
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false, animation: 'slide_from_left' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
