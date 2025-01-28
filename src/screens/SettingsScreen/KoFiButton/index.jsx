import React, { useState } from 'react';
import { Linking } from 'react-native';
import { Button } from 'components/buttons';
import { ConfirmModal, InfoModal } from 'components/modals';
import { useTranslation } from 'react-i18next';

const KoFiButton = () => {
  const [isDonateModalVisible, setIsDonateModalVisible] = useState(false);
  const [isThanksModalVisible, setIsThanksModalVisible] = useState(false);
  const { t } = useTranslation();

  const handleDonate = () => {
    setIsThanksModalVisible(true);
    setIsDonateModalVisible(false);
    Linking.openURL('https://ko-fi.com/amog98');
  };

  return (
    <>
      <Button
        label={t('settings:kofi.title')}
        onPress={() => setIsDonateModalVisible(true)}
      />
      <ConfirmModal
        isVisible={isDonateModalVisible}
        setIsVisible={setIsDonateModalVisible}
        confirmText={t('settings:kofi.donate')}
        cancelText={t('settings:kofi.not_now')}
        title={t('settings:kofi.title')}
        message={t('settings:kofi.message')}
        confirmAction={handleDonate}
      />
      <InfoModal
        isVisible={isThanksModalVisible}
        setIsVisible={setIsThanksModalVisible}
        confirmText={t('basic:close')}
        title={t('settings:kofi.thank_you')}
      />
    </>
  );
};

export default KoFiButton;
