import React, { useMemo, useEffect } from 'react';
import { storageKeys, useStorage } from 'hooks/useStorage';
import { getLocales } from 'react-native-localize';
import PropTypes from 'prop-types';
import i18next from 'i18next';

export const LanguageContext = React.createContext(null);
const LanguageContextProvider = ({ children }) => {
  const systemLanguage = getLocales()?.[0]?.languageCode ?? 'en';
  const [language, setLanguage] = useStorage(
    storageKeys.SETTINGS.LANGUAGE,
    ['en', 'es'].includes(systemLanguage) ? systemLanguage : 'en',
  );

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage],
  );

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageContextProvider.propTypes = {
  /**
   * The component tree within the context
   */
  children: PropTypes.node.isRequired,
};

export default LanguageContextProvider;
