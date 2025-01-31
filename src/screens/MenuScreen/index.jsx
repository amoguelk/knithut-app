import React from 'react';
// Components
import { Image, View } from 'react-native';
import NavIcon from 'screens/MenuScreen/NavIcon';
// Translation
import { useTranslation } from 'react-i18next';
// Navigation
import { useNavigation } from '@react-navigation/native';
// Styling
import { useTheme } from 'contexts/ThemeContext';
import getStyles from './styles';

const HutLogo = require('assets/img/hut.png');
const PatternsIcon = require('assets/img/patterns.png');
const WipIcon = require('assets/img/WIP.png');
const ShoppingIcon = require('assets/img/shopping.png');
const SettingsIcon = require('assets/img/settings.png');

const MenuScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = getStyles(theme.colors);
  const { t } = useTranslation();

  const options = [
    {
      id: 'pattern_icon',
      icon: PatternsIcon,
      label: t('menu:patterns'),
      nav_name: 'patterns',
    },
    {
      id: 'wip_icon',
      icon: WipIcon,
      label: t('menu:wips'),
      nav_name: 'wips',
    },
    {
      id: 'shopping_icon',
      icon: ShoppingIcon,
      label: t('menu:shopping_list'),
      nav_name: 'list',
    },
    {
      id: 'settings_icon',
      icon: SettingsIcon,
      label: t('menu:settings'),
      nav_name: 'settings',
    },
  ];

  return (
    <View style={styles.container}>
      <Image source={HutLogo} style={styles.logo} />
      <View style={styles.navContainer}>
        {options.map((option, index) => (
          <NavIcon
            key={option.id}
            icon={option.icon}
            label={option.label}
            onPress={() => navigation.navigate(option.nav_name)}
            style={styles.icon(index)}
          />
        ))}
      </View>
    </View>
  );
};

export default MenuScreen;
