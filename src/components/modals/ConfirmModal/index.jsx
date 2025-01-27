import React from 'react';
// Components
import BasicModal from 'components/modals/BasicModal';
import { View } from 'react-native';
import { Button } from 'components/buttons';
// Documentation
import PropTypes from 'prop-types';
// Translation
import { useTranslation } from 'react-i18next';
// Styling
import { useTheme } from 'contexts/ThemeContext';

/**
 * Modal that displays a message and two buttons: one to confirm (accept, add, change, delete, etc.) and one to cancel.
 */
const ConfirmModal = ({
  isVisible,
  setIsVisible,
  title,
  message = null,
  confirmAction = null,
  cancelAction = null,
  cancelText = null,
  confirmText = null,
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const { t } = useTranslation();

  return (
    <BasicModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      pressableBackdrop={false}
      title={title}
      message={message}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Button
          label={cancelText ?? t('basic:cancel')}
          onPress={cancelAction ?? (() => setIsVisible(false))}
          containerStyle={{ flex: 1 }}
          buttonColor={colors.error}
          hasRipple={false}
        />
        <Button
          label={confirmText ?? t('basic:confirm')}
          onPress={confirmAction ?? (() => setIsVisible(false))}
          containerStyle={{ flex: 1 }}
        />
      </View>
    </BasicModal>
  );
};

ConfirmModal.propTypes = {
  /**
   * Whether the modal is visible or not.
   */
  isVisible: PropTypes.bool.isRequired,
  /**
   * Controls the visible state of the modal.
   */
  setIsVisible: PropTypes.func.isRequired,
  /**
   * The main text of the modal.
   */
  title: PropTypes.string.isRequired,
  /**
   * Additional text of the modal.
   */
  message: PropTypes.string,
  /**
   * Called when the `Confirm` button is pressed. If none is given, the default action is to close the modal.
   */
  confirmAction: PropTypes.func,
  /**
   * Called when the `Cancel` button is pressed. If none is given, the default action is to close the modal.
   */
  cancelAction: PropTypes.func,
  /**
   * Text displayed on the cancel button. Defaults to `Cancel` (translated if necessary).
   */
  cancelText: PropTypes.string,
  /**
   * Text displayed on the cancel button. Defaults to `Confirm` (translated if necessary).
   */
  confirmText: PropTypes.string,
};

export default ConfirmModal;
