import React, { useState } from 'react';
import { View } from 'react-native';
import List from 'components/List';
import { Button } from 'components/buttons';
import CreateItemModal from 'screens/ListScreen/CreateItemModal';
import { useTheme } from 'contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useStorage, storageKeys } from 'hooks/useStorage';

/**
 * Screen that displays a shopping list
 */
const ListScreen = () => {
  const {
    theme: { colors },
  } = useTheme();
  const { t } = useTranslation();
  const [items, setItems] = useStorage(storageKeys.APP.SHOPPING, []);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  /**
   * Called when the `CreateItem` modal is closed, checking whether
   * the item has to be added or not.
   * @param {string} reason The reason why the modal was closed. Can be `cancel` or `add`
   * @param {string} title The title or main text of the item created
   * @param {string} details The details or supplementary text of the item created
   */
  const handleModalClose = (reason, title, details) => {
    setIsAddModalVisible(false);
    if (reason === 'add') {
      setItems([
        ...items,
        {
          checked: false,
          text: title,
          details: details === '' ? null : details,
        },
      ]);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.border,
        padding: 20,
      }}
    >
      <List
        checkable
        items={items}
        emptyText={t('shopping_list:empty_shopping_list')}
        onItemDelete={() => {}}
      />
      <Button
        label={t('shopping_list:add_item')}
        onPress={() => setIsAddModalVisible(true)}
      />
      <CreateItemModal
        isVisible={isAddModalVisible}
        setIsVisible={setIsAddModalVisible}
        onClose={handleModalClose}
      />
    </View>
  );
};

export default ListScreen;
