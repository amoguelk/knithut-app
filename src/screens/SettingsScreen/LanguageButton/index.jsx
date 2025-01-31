import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from 'contexts/LanguageContext';
import { Button } from 'components/buttons';
import { BasicModal } from 'components/modals';

const LanguageButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (lanCode) => {
    setLanguage(lanCode);
    setIsModalVisible(false);
  };

  const languages = [
    { name: 'en', label: 'English' },
    { name: 'es', label: 'Español' },
  ];

  return (
    <>
      <Button
        onPress={() => setIsModalVisible(true)}
        label={t('settings:change_language')}
      />
      <BasicModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        title={t('settings:change_language')}
      >
        {languages.map(({ name, label }) => (
          <Button
            key={name}
            disabled={language === name}
            label={label}
            onPress={() => handleLanguageChange(name)}
          />
        ))}
      </BasicModal>
    </>
  );
};

export default LanguageButton;
