import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from 'contexts/LanguageContext';
import { Button } from 'components/buttons';

const LanguageButton = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    if (language === 'es') setLanguage('en');
    else setLanguage('es');
  };

  return (
    <Button onPress={toggleLanguage} label={t('settings:change_language')} />
  );
};

export default LanguageButton;
