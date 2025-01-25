import React from 'react';
import { View } from 'react-native';
import ThemeButton from './ThemeButton';
import LanguageButton from './LanguageButton';

const SettingsScreen = () => (
  <View>
    <ThemeButton />
    <LanguageButton />
  </View>
);

export default SettingsScreen;
