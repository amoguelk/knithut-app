import React from 'react';
// Components
import { View, Text, Pressable } from 'react-native';
// Documentation
import PropTypes from 'prop-types';
// Styling
import { useTheme } from 'contexts/ThemeContext';
import getDarkerColor from 'utils/colorFuncs';
import getStyles from './styles';

/**
 * A simple button component.
 */
const Button = ({
  label,
  onPress = () => {},
  containerStyle = {},
  disabled = false,
  buttonColor = null,
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors, buttonColor);
  const rippleColor = getDarkerColor(buttonColor ?? colors.primary);

  return (
    <View style={containerStyle}>
      <Pressable
        style={[styles.button, disabled ? styles.disabled : styles.enabled]}
        onPress={onPress}
        android_ripple={{
          color: rippleColor,
        }}
        disabled={disabled}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
};

Button.propTypes = {
  /**
   * The text on the button.
   */
  label: PropTypes.string.isRequired,
  /**
   * Called when a single tap is detected.
   */
  onPress: PropTypes.func,
  /**
   * Additional styles applied to the `View` that contains the button.
   */
  containerStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  /**
   * Whether the button is disabled or not. Defaults to `false`.
   */
  disabled: PropTypes.bool,
  /**
   * The color of the button. Defaults to the primary color of the theme.
   */
  buttonColor: PropTypes.string,
};

export default Button;
