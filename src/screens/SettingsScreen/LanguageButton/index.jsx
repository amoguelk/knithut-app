import React, { useContext } from 'react';
import { Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from 'contexts/LanguageContext';

const LanguageButton = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    if (language === 'es') setLanguage('en');
    else setLanguage('es');
  };

  return (
    <Button onPress={toggleLanguage} title={t('settings:change_language')} />
  );
};

export default LanguageButton;
