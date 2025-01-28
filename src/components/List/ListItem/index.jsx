import React, { useState } from 'react';
// Components
import { Text, View } from 'react-native';
import { IconButton } from 'components/buttons';
import { ConfirmModal } from 'components/modals';
import {
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
        <Text style={styles.text}>{text}</Text>
        {details && <Text style={styles.details}>{details}</Text>}
      </View>
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
};

export default ListItem;
