import React from 'react';
// Components
import { Modal, View, Pressable, Text } from 'react-native';
// Documentation
import PropTypes from 'prop-types';
// Styling
import { useTheme } from 'contexts/ThemeContext';
import getStyles from './styles';

/**
 * Basic structure of a modal
 */
const BasicModal = ({
  isVisible,
  setIsVisible,
  pressableBackdrop = true,
  title = null,
  message = null,
  children,
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);

  return (
    <Modal animationType="fade" visible={isVisible} transparent>
      <Pressable
        style={styles.backdrop}
        onPress={pressableBackdrop ? () => setIsVisible(false) : () => {}}
      />
      <View style={styles.modal}>
        <View style={styles.body}>
          {title && <Text style={[styles.text, styles.title]}>{title}</Text>}
          {message && <Text style={styles.text}>{message}</Text>}
          {children}
        </View>
      </View>
    </Modal>
  );
};

BasicModal.propTypes = {
  /**
   * Whether the modal is visible or not.
   */
  isVisible: PropTypes.bool.isRequired,
  /**
   * Controls the visible state of the modal.
   */
  setIsVisible: PropTypes.func.isRequired,
  /**
   * Whether the modal can be closed by pressing the backdrop. Defaults to `true`.
   */
  pressableBackdrop: PropTypes.bool,
  /**
   * The main text of the modal.
   */
  title: PropTypes.string,
  /**
   * Additional text of the modal.
   */
  message: PropTypes.string,
  /**
   * Additional contents of the modal.
   */
  children: PropTypes.node,
};

export default BasicModal;
