import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es } from './assets/translations';

const resources = {
  en,
  es,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false, // in case you have any suspense related errors
    },
  });

export default i18n;
