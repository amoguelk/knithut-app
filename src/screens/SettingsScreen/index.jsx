import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import ThemeButton from './ThemeButton';
import LanguageButton from './LanguageButton';
import getStyles from './styles';
import KoFiButton from './KoFiButton';

const SettingsScreen = () => {
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <ThemeButton />
      <LanguageButton />
      <KoFiButton />
    </View>
  );
};

export default SettingsScreen;
