import React, { useState } from 'react';
import { View } from 'react-native';
import List from 'components/List';
import { Button } from 'components/buttons';
import CreateEditItemModal from 'screens/ListScreen/CreateEditItemModal';
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
  // Item add or edit
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  /**
   * Called when an item is selected for editing
   * @param {number} index The index of the item
   */
  const handleItemEdit = (index) => {
    setEditIndex(index);
    setTitle(items[index].text);
    setDetails(items[index].details ?? '');
    setIsModalVisible(true);
  };

  /**
   * Called when the `CreateItem` modal is closed, checking whether
   * the item has to be added or not.
   * @param {'cancel' |'add' | 'edit'} reason The reason why the modal was closed. Can be `'cancel'`, `'add'` or `'edit'`.
   */
  const handleModalClose = (reason) => {
    setIsModalVisible(false);
    setEditIndex(-1);
    if (reason === 'add') {
      setItems([
        ...items,
        {
          checked: false,
          text: title,
          details: details === '' ? null : details,
        },
      ]);
    } else if (reason === 'edit') {
      const itemsCopy = [...items];
      itemsCopy[editIndex].text = title;
      itemsCopy[editIndex].details = details;
      setItems(itemsCopy);
    }
  };

  /**
   * Called when an item is checked or unchecked
   * @param {number} index The index of the item
   */
  const handleItemCheck = (index) => {
    const itemsCopy = [...items];
    itemsCopy[index].checked = !itemsCopy[index].checked;
    setItems(itemsCopy);
  };

  /**
   * Called when an item is deleted
   * @param {number} index The index of the item
   */
  const handleItemDelete = (index) => {
    const itemsCopy = [...items];
    itemsCopy.splice(index, 1);
    setItems(itemsCopy);
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
        editable
        items={items}
        emptyText={t('shopping_list:empty_shopping_list')}
        handleItemDelete={handleItemDelete}
        handleItemCheck={handleItemCheck}
        handleItemEdit={handleItemEdit}
      />
      <Button
        label={t('shopping_list:add_item')}
        onPress={() => setIsModalVisible(true)}
      />
      <CreateEditItemModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onClose={handleModalClose}
        title={title}
        setTitle={setTitle}
        details={details}
        setDetails={setDetails}
        isEdit={editIndex > -1}
      />
    </View>
  );
};

export default ListScreen;
