import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (!searchText.trim()) return;
    onSearch(searchText.trim());
    setSearchText('');
    Keyboard.dismiss();
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify().damping(10)}
      style={styles.container}
    >
      <TextInput
        placeholder="Search city..."
        placeholderTextColor="#ccc"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        style={styles.input}
        returnKeyType="search"
      />
      <TouchableOpacity onPress={handleSearch} style={styles.iconContainer}>
        <Ionicons name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  input: {
    flex: 1,
    height: 48,
    color: '#fff',
    fontSize: 16,
    paddingRight: 10,
  },
  iconContainer: {
    backgroundColor: '#1c1c3c',
    padding: 8,
    borderRadius: 20,
  },
});
