import React from 'react';
import { darkTheme, lightTheme } from 'constants/theme/theme';
import { useTheme } from 'contexts/ThemeContext';
import { Button } from 'react-native';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme.dark) setTheme(lightTheme);
    else setTheme(darkTheme);
  };

  return <Button onPress={toggleTheme} title="Toggle theme" />;
};

export default ThemeButton;
