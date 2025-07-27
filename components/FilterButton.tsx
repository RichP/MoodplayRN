import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterButtonProps {
  onPress: () => void;
}

export default function FilterButton({ onPress }: FilterButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginRight: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 24, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}
      accessibilityLabel="Filter by mood"
      activeOpacity={0.7}
    >
      <Ionicons name="filter" size={24} color="#6366f1" />
    </TouchableOpacity>
  );
}
