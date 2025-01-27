import React from 'react';
import { Button } from 'components/buttons';
import { useTheme } from 'contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const toggleTheme = () => {
    if (theme.dark) setTheme('light');
    else setTheme('dark');
  };

  return (
    <Button
      onPress={toggleTheme}
      label={t('settings:current_theme', {
        theme: theme.dark ? t('settings:dark') : t('settings:light'),
      })}
    />
  );
};

export default ThemeButton;
