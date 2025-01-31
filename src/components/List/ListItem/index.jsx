import React, { useState } from 'react';
// Components
import { Text, View } from 'react-native';
import { IconButton } from 'components/buttons';
import { ConfirmModal } from 'components/modals';
import {
  faPencil,
  faSquare,
  faSquareCheck,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
// Documentation
import PropTypes from 'prop-types';
// Translation
import { useTranslation } from 'react-i18next';
// Styling
import { useTheme } from 'contexts/ThemeContext';
import getStyles from './styles';

/**
 * A single item to be used within a `List` component
 */
const ListItem = ({
  text,
  details = null,
  checkable = false,
  checked = false,
  setChecked = () => {},
  onDelete,
  editable = false,
  onEdit = () => {},
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);
  const { t } = useTranslation();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleDelete = () => {
    setIsDeleteModalVisible(false);
    onDelete();
  };

  return (
    <View style={styles.item}>
      {checkable && (
        <IconButton
          icon={checked ? faSquareCheck : faSquare}
          onPress={setChecked}
          color={colors.border}
        />
      )}
      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.text}>
          {text}
        </Text>
        {details && <Text style={styles.details}>{details}</Text>}
      </View>
      {editable && (
        <IconButton
          icon={faPencil}
          color={colors.cardContrast}
          hasRipple
          onPress={onEdit}
        />
      )}
      <IconButton
        icon={faTrashCan}
        color={colors.cardContrast}
        hasRipple
        onPress={() => setIsDeleteModalVisible(true)}
      />
      <ConfirmModal
        isVisible={isDeleteModalVisible}
        setIsVisible={setIsDeleteModalVisible}
        title={t('shopping_list:delete_item')}
        message={t('shopping_list:delete_item_detail', { item: text })}
        confirmText={t('basic:delete')}
        confirmAction={handleDelete}
      />
    </View>
  );
};

ListItem.propTypes = {
  /**
   * The main text of the item.
   */
  text: PropTypes.string.isRequired,
  /**
   * The secondary text of the item.
   */
  details: PropTypes.string,
  /**
   * Whether the item can or cannot be checked. Defaults to `false`.
   */
  checkable: PropTypes.bool,
  /**
   * Whether the item is or isn't checked. Defaults to `false`.
   */
  checked: PropTypes.bool,
  /**
   * Changes the `checked` state of the item.
   */
  setChecked: PropTypes.func,
  /**
   * Called when the item is deleted.
   */
  onDelete: PropTypes.func.isRequired,
  /**
   * Whether the item can or cannot be edited. Defaults to `false`.
   */
  editable: PropTypes.bool,
  /**
   * Called when an item is edited, if the list supports it.
   */
  onEdit: PropTypes.func,
};

export default ListItem;
