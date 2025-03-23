import React, { useState, useMemo } from 'react';
import uuid from 'react-native-uuid';
import TabNavigator from 'navigation/TabNavigator';
import { View } from 'react-native';
import { Button } from 'components/buttons';
import WipElement from 'screens/WipScreen/WipElement';
import CreateWipModal from 'screens/WipScreen/CreateWipModal';
import { useTheme } from 'contexts/ThemeContext';
import { useStorage, storageKeys } from 'hooks/useStorage';
import { useTranslation } from 'react-i18next';

const WipScreen = () => {
  const {
    theme: { colors },
  } = useTheme();
  const { t } = useTranslation();

  const [wips, setWips] = useStorage(storageKeys.APP.WIPS, {});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = (reason, name) => {
    setIsModalVisible(false);
    if (reason === 'add') {
      const id = uuid.v4();
      setWips({
        ...wips,
        [id]: {
          pattern: {
            name,
            section: '',
            row: 0,
            notes: '',
          },
          stopwatch: {
            isActive: false,
            offset: 0,
            start: null,
          },
        },
      });
    }
  };

  const tabs = useMemo(() => Object.keys(wips), [wips]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.border,
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
    >
      <TabNavigator
        tabs={tabs}
        screenComponent={WipElement}
        emptyMessage={t('wips:empty_wip_nav')}
      />
      <Button
        label={t('wips:add_wip')}
        onPress={() => setIsModalVisible(true)}
      />
      <CreateWipModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onClose={handleModalClose}
      />
    </View>
  );
};

export default WipScreen;
