/* eslint-disable react/no-array-index-key */
import React from 'react';
// Components
import { FlatList, Text, View } from 'react-native';
import ListItem from 'components/List/ListItem';
// Documentation
import PropTypes from 'prop-types';
// Translation
import { useTranslation } from 'react-i18next';
// Styling
import { useTheme } from 'contexts/ThemeContext';
import getStyles from './styles';

/**
 * Component that displays a list of items that can be deleted.
 * If `checkable` is `true`, then each item will have a checkbox.
 */
const List = ({
  items,
  handleItemDelete,
  checkable = false,
  handleItemCheck = () => {},
  emptyText = null,
  editable = false,
  handleItemEdit = () => {},
  handleItemPress = null,
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);
  const { t } = useTranslation();

  /**
   * Called by `FlatList` to render each item
   * @param {object} data
   * @param {object} data.item The item to render
   * @param {string} data.title
   * @param {string} [data.details='']
   * @param {boolean} [data.checked=false]
   * @param {boolean} [data.disabled=false]
   * @param {number} data.index The index of the item
   * @returns
   */
  const renderItem = ({ item, index }) => (
    <ListItem
      text={item?.text}
      details={item?.details}
      checkable={checkable}
      checked={checkable && item?.checked}
      setChecked={checkable ? () => handleItemCheck(index) : () => {}}
      onDelete={() => handleItemDelete(index)}
      editable={editable}
      onEdit={editable ? () => handleItemEdit(index) : () => {}}
      onPress={handleItemPress ? () => handleItemPress?.(index) : null}
      disabled={item?.disabled}
    />
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      style={styles.list}
      data={items}
      renderItem={renderItem}
      keyExtractor={(_, index) => `list_item_${index}`}
      ItemSeparatorComponent={<View style={styles.divider} />}
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          {emptyText ?? t('basic:empty_list')}
        </Text>
      }
    />
  );
};

List.propTypes = {
  /**
   * The items that go in the list, in the form of an array of objects.
   * @param {string} text Main text of the item
   * @param {string} [details=''] Supplemetary text
   * @param {boolean} [checked=false] If the item is checked
   * @param {boolean} [disabled=false] If the item is disabled
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      details: PropTypes.string,
      checked: PropTypes.bool,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  /**
   * Called when an item is deleted.
   * @param {number} index The index of the deleted item
   */
  handleItemDelete: PropTypes.func.isRequired,
  /**
   * Whether the list supports checking items. Defaults to `false`.
   */
  checkable: PropTypes.bool,
  /**
   * Called when an item is checked, if the list supports it.
   * @param {number} index The index of the checked item
   */
  handleItemCheck: PropTypes.func,
  /**
   * Text displayed when the list is empty. Defaults to `"This list is empty"` (translated if necessary).
   */
  emptyText: PropTypes.string,
  /**
   * Whether the list supports editing items. Defaults to `false`.
   */
  editable: PropTypes.bool,
  /**
   * Called when an item is edited, if the list supports it.
   * @param {number} index The index of the item to be edited
   */
  handleItemEdit: PropTypes.func,
  /**
   * Called when an item is pressed
   * @param {number} index The index of the item pressed
   */
  handleItemPress: PropTypes.func,
};

export default List;
