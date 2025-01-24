import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MenuScreen,
  PatternsScreen,
  WipScreen,
  ListScreen,
  SettingsScreen,
} from 'screens';

const Stack = createNativeStackNavigator();
const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1e1e1e',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerShadowVisible: false,
      animation: 'slide_from_bottom',
    }}
  >
    <Stack.Screen
      name="menu"
      component={MenuScreen}
      options={{ title: 'Menu' }}
    />
    <Stack.Screen
      name="patterns"
      component={PatternsScreen}
      options={{ title: 'Patterns' }}
    />
    <Stack.Screen
      name="wips"
      component={WipScreen}
      options={{ title: 'WIPs' }}
    />
    <Stack.Screen
      name="list"
      component={ListScreen}
      options={{ title: 'List' }}
    />
    <Stack.Screen
      name="settings"
      component={SettingsScreen}
      options={{ title: 'Settings' }}
    />
  </Stack.Navigator>
);

export default MainStack;
