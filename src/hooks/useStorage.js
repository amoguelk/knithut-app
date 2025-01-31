import { MMKVLoader, create } from 'react-native-mmkv-storage';

const MMKV = new MMKVLoader().initialize();

export const useStorage = create(MMKV);

export const storageKeys = {
  SETTINGS: {
    THEME: 'settings.theme',
    LANGUAGE: 'settings.language',
  },
  APP: {
    SHOPPING: 'app.shopping',
    WIPS: 'app.wips',
    PATTERNS: 'app.patterns',
  },
};
