import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useTranslation } from 'react-i18next';

const MenuScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const options = [
    {
      id: 'pattern_icon',
      // icon: PatternsIcon,
      label: t('menu:patterns'),
      nav_name: 'patterns',
    },
    {
      id: 'wip_icon',
      // icon: WipIcon,
      label: t('menu:wips'),
      nav_name: 'wips',
    },
    {
      id: 'shopping_icon',
      // icon: ShoppingIcon,
      label: t('menu:shopping_list'),
      nav_name: 'list',
    },
    {
      id: 'settings_icon',
      // icon: SettingsIcon,
      label: t('menu:settings'),
      nav_name: 'settings',
    },
  ];

  return (
    <View>
      {options.map(option => (
        <Button
          key={option.nav_name}
          onPress={() => navigation.navigate(option.nav_name)}
        >
          {option.label}
        </Button>
      ))}
    </View>
  );
};

export default MenuScreen;
