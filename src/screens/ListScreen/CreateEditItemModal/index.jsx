import React from 'react';
// Components
import { TextInput, View } from 'react-native';
import { ConfirmModal } from 'components/modals';
// Documentation
import PropTypes from 'prop-types';
// Translation
import { useTranslation } from 'react-i18next';
// Styling
import { useTheme } from 'contexts/ThemeContext';
import getStyles from './styles';

/**
 * Modal to create an item and add it to the shopping list
 */
const CreateEditItemModal = ({
  isVisible,
  setIsVisible,
  onClose,
  isEdit = false,
  title = '',
  setTitle,
  details = '',
  setDetails,
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);
  const { t } = useTranslation();

  const handleClose = (reason) => {
    onClose(reason);
    setTitle('');
    setDetails('');
  };

  const purposeStr = isEdit ? 'edit' : 'add';
  return (
    <ConfirmModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title={t(`shopping_list:${purposeStr}_item`)}
      confirmText={t(`basic:${purposeStr}`)}
      confirmAction={() => handleClose(purposeStr)}
      cancelAction={() => handleClose('cancel')}
      disabled={title === ''}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={t('shopping_list:item_title_hint')}
          onChangeText={(text) => setTitle(text)}
          defaultValue={title}
          maxLength={50}
          placeholderTextColor={colors.cardMidContrast}
        />
        <TextInput
          style={styles.textInput}
          placeholder={t('shopping_list:item_details_hint')}
          onChangeText={(text) => setDetails(text)}
          defaultValue={details}
          multiline
          maxLength={150}
          placeholderTextColor={colors.cardMidContrast}
        />
      </View>
    </ConfirmModal>
  );
};

CreateEditItemModal.propTypes = {
  /**
   * Whether the modal is visible or not.
   */
  isVisible: PropTypes.bool.isRequired,
  /**
   * Controls the visible state of the modal.
   */
  setIsVisible: PropTypes.func.isRequired,
  /**
   * Called when the modal is closed.
   * @param {'cancel' | 'add' | 'edit'} reason The reason why the modal was closed. Can be `'cancel'`, `'add'` or `'edit'`.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Whether an item is being edited, not created. Defaults to `false`.
   */
  isEdit: PropTypes.bool,
  /**
   * The title of the item being created or edited.
   */
  title: PropTypes.string,
  /**
   * The details of the item being created or edited.
   */
  details: PropTypes.string,
  /**
   * Sets the title of the item
   */
  setTitle: PropTypes.func.isRequired,
  /**
   * Sets the details of the item
   */
  setDetails: PropTypes.func.isRequired,
};

export default CreateEditItemModal;
