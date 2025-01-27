import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import ThemeButton from './ThemeButton';
import LanguageButton from './LanguageButton';
import getStyles from './styles';

const SettingsScreen = () => {
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <ThemeButton />
      <LanguageButton />
    </View>
  );
};

export default SettingsScreen;
