import React from 'react';
import { Text, View } from 'react-native';

interface MoodDropdownProps {
  moods: string[];
  selectedMood: string | null;
  onSelect: (mood: string | null) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}

export default function MoodDropdown({ moods, selectedMood, onSelect, dropdownOpen, setDropdownOpen }: MoodDropdownProps) {
  return (
    <View style={{ width: '80%', marginBottom: 12, marginTop: -8, alignItems: 'flex-start', zIndex: 10 }}>
      {/* <Text style={{ fontSize: 16, color: '#6366f1', fontWeight: 'bold', marginBottom: 4 }}>Filter by mood:</Text> */}
      <View style={{ position: 'relative', width: '100%' }}>
        {/* <Text
          style={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 16,
            backgroundColor: '#e0e7ff',
            color: '#6366f1',
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 2,
            shadowColor: '#6366f1',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 6,
          }}
          onPress={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedMood ? selectedMood : 'All moods'} ▼
        </Text> */}
        {dropdownOpen && (
          <View style={{
            position: 'absolute',
            top: 44,
            left: 0,
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 16,
            shadowColor: '#6366f1',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.18,
            shadowRadius: 12,
            elevation: 8,
            zIndex: 20,
            paddingVertical: 4,
          }}>
            <Text
              style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                fontSize: 16,
                color: !selectedMood ? '#fff' : '#6366f1',
                backgroundColor: !selectedMood ? '#6366f1' : '#e0e7ff',
                borderRadius: 12,
                marginVertical: 2,
                fontWeight: 'bold',
              }}
              onPress={() => {
                onSelect(null);
                setDropdownOpen(false);
              }}
            >
              All moods
            </Text>
            {moods.map((mood) => (
              <Text
                key={mood}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  fontSize: 16,
                  color: selectedMood === mood ? '#fff' : '#6366f1',
                  backgroundColor: selectedMood === mood ? '#6366f1' : '#e0e7ff',
                  borderRadius: 12,
                  marginVertical: 2,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  onSelect(mood);
                  setDropdownOpen(false);
                }}
              >
                {mood}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
