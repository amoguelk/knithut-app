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
 * Modal that displays a message and two buttons: one to delete and one to cancel.
 */
const DeleteModal = ({
  isVisible,
  setIsVisible,
  title,
  message = null,
  deleteAction = null,
  cancelAction = null,
  cancelText = null,
  deleteText = null,
  disabled = false,
  children = null,
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
      {children}
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
          hasRipple={false}
        />
        <Button
          label={deleteText ?? t('basic:delete')}
          onPress={deleteAction ?? (() => setIsVisible(false))}
          containerStyle={{ flex: 1 }}
          disabled={disabled}
          buttonColor={colors.error}
        />
      </View>
    </BasicModal>
  );
};

DeleteModal.propTypes = {
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
   * Called when the `Delete` button is pressed. If none is given, the default action is to close the modal.
   */
  deleteAction: PropTypes.func,
  /**
   * Called when the `Cancel` button is pressed. If none is given, the default action is to close the modal.
   */
  cancelAction: PropTypes.func,
  /**
   * Text displayed on the cancel button. Defaults to `Cancel` (translated if necessary).
   */
  cancelText: PropTypes.string,
  /**
   * Text displayed on the cancel button. Defaults to `Delete` (translated if necessary).
   */
  deleteText: PropTypes.string,
  /**
   * Whether the delete button is disabled. Defaults to `false`.
   */
  disabled: PropTypes.bool,
  /**
   * Additional contents of the modal.
   */
  children: PropTypes.node,
};

export default DeleteModal;
