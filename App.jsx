import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainNavigator';
import ThemeContextProvider from './src/contexts/ThemeContext';
import './i18n';

function App() {
  return (
    <ThemeContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ThemeContextProvider>
  );
}

export default App;
