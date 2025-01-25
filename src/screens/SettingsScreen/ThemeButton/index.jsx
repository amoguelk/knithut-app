import React from 'react';
import { Button } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { darkTheme, lightTheme } from 'constants/theme/theme';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const toggleTheme = () => {
    if (theme.dark) setTheme(lightTheme);
    else setTheme(darkTheme);
  };

  return (
    <Button
      onPress={toggleTheme}
      title={t('settings:current_theme', {
        theme: theme.dark ? t('settings:dark') : t('settings:light'),
      })}
    />
  );
};

export default ThemeButton;
