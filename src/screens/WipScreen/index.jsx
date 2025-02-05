import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import TabNavigator from 'navigation/TabNavigator';
import { View, Text } from 'react-native';
import { Button } from 'components/buttons';
import CreateWipModal from 'screens/ListScreen/CreateEditItemModal';
import { useTheme } from 'contexts/ThemeContext';
import { useStorage, storageKeys } from 'hooks/useStorage';
import { useTranslation } from 'react-i18next';

const WipElement = ({
  route: {
    params: { name, key },
  },
}) => {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text>
        {name} ({key})
      </Text>
    </View>
  );
};

const WipScreen = () => {
  const {
    theme: { colors },
  } = useTheme();
  const { t } = useTranslation();

  const [wipList, setWipList] = useStorage(storageKeys.APP.WIPS, []);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = (reason, name) => {
    setIsModalVisible(false);
    if (reason === 'add') {
      setWipList([...wipList, { name, key: uuid.v4() }]);
    }
  };

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
        tabs={wipList}
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
