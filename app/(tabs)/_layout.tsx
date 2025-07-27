import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
  tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].cardBg,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: Colors[colorScheme ?? 'light'].tint,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 8,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: Platform.OS === 'ios' ? 'Segoe UI' : 'Roboto',
          fontSize: 14,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'MoodPlay',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />, 
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          headerTitle: 'Your Mixtape',
          headerTitleStyle: { color: '#6366f1', fontWeight: 'bold', fontSize: 28 },
        }}
      />
    </Tabs>
  );
}
