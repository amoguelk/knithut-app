import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainNavigator';
import ThemeContextProvider from './src/contexts/ThemeContext';
import LanguageContextProvider from './src/contexts/LanguageContext';
import './i18n';

function App() {
  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </LanguageContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
