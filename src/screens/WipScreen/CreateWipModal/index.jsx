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

const CreateWipModal = ({ isVisible, setIsVisible, onClose }) => {
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);
  const { t } = useTranslation();
  const [name, setName] = useState('');

  const handleClose = (reason) => {
    onClose(reason, name);
    setName('');
  };

  return (
    <ConfirmModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title={t(`wips:add_wip`)}
      confirmText={t(`basic:add`)}
      confirmAction={() => handleClose('add')}
      cancelAction={() => handleClose('cancel')}
      disabled={name === ''}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={t('wips:wip_name_hint')}
          onChangeText={(text) => setName(text)}
          defaultValue={name}
          maxLength={40}
          placeholderTextColor={colors.cardMidContrast}
        />
      </View>
    </ConfirmModal>
  );
};

CreateWipModal.propTypes = {
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
   * @param {'cancel' | 'add' } reason The reason why the modal was closed. Can be `'cancel'` or `'add'`.
   */
  onClose: PropTypes.func.isRequired,
};

export default CreateWipModal;
