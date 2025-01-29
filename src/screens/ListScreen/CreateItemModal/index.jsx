import React, { useState } from 'react';
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
const CreateItemModal = ({ isVisible, setIsVisible, onClose }) => {
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleClose = (reason) => {
    onClose(reason, title, details);
    setTitle('');
    setDetails('');
  };

  return (
    <ConfirmModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      pressableBackdrop={false}
      title={t('shopping_list:add_item')}
      confirmText={t('basic:add')}
      confirmAction={() => handleClose('add')}
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

CreateItemModal.propTypes = {
  /**
   * Whether the modal is visible or not. Required.
   */
  isVisible: PropTypes.bool.isRequired,
  /**
   * Controls the visible state of the modal.
   */
  setIsVisible: PropTypes.func.isRequired,
  /**
   * Called when the modal is closed.
   * @param {string} reason The reason why the modal was closed. Can be `cancel` or `add`
   * @param {string} title The title or main text of the item created
   * @param {string} details The details or supplementary text of the item created
   */
  onClose: PropTypes.func.isRequired,
};

export default CreateItemModal;
