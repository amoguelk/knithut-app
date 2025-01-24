import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MenuScreen,
  PatternsScreen,
  WipScreen,
  ListScreen,
  SettingsScreen,
} from 'screens';
import { useTheme } from 'contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen
        name="menu"
        component={MenuScreen}
        options={{
          title: 'Knit Hut',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 30 },
        }}
      />
      <Stack.Screen
        name="patterns"
        component={PatternsScreen}
        options={{ title: t('patterns:patterns_long') }}
      />
      <Stack.Screen
        name="wips"
        component={WipScreen}
        options={{ title: t('wips:wips_long') }}
      />
      <Stack.Screen
        name="list"
        component={ListScreen}
        options={{ title: t('menu:shopping_list') }}
      />
      <Stack.Screen
        name="settings"
        component={SettingsScreen}
        options={{ title: t('menu:settings') }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
