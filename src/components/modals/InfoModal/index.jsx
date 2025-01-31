import React from 'react';
// Components
import BasicModal from 'components/modals/BasicModal';
import { Button } from 'components/buttons';
// Documentation
import PropTypes from 'prop-types';
// Translation
import { useTranslation } from 'react-i18next';

/**
 * Modal that displays a message and a single button to dismiss it.
 */
const InfoModal = ({
  isVisible,
  setIsVisible,
  title,
  message = null,
  confirmAction = null,
  confirmText = null,
}) => {
  const { t } = useTranslation();

  return (
    <BasicModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title={title}
      message={message}
    >
      <Button
        label={confirmText || t('basic:ok')}
        onPress={confirmAction ?? (() => setIsVisible(false))}
        containerStyle={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      />
    </BasicModal>
  );
};

InfoModal.propTypes = {
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
   * Called when the `OK` button is pressed. If none is given, the default action is to close the modal.
   */
  confirmAction: PropTypes.func,
  /**
   * Text displayed on the cancel button. Defaults to `OK` (translated if necessary).
   */
  confirmText: PropTypes.string,
};

export default InfoModal;
