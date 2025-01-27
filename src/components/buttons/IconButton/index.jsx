import React from 'react';
// Components
import { Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// Documentation
import PropTypes from 'prop-types';
import { useTheme } from 'contexts/ThemeContext';
import getDarkerColor from 'utils/colorFuncs';

/**
 * A Font Awesome icon wrapped in a `Pressable` component
 */
const IconButton = ({
  icon,
  size = 'md',
  color = null,
  customStyle = {},
  hasRipple = false,
  onPress = () => {},
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const rippleColor = hasRipple
    ? getDarkerColor(color ?? colors.primary)
    : null;

  const parseSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'lg':
        return 64;
      default:
        return 32;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        margin: 10,
        alignSelf: 'flex-start',
        ...customStyle,
      }}
      android_ripple={{
        ...(rippleColor && { color: rippleColor }),
        borderless: true,
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        size={parseSize()}
        color={color ?? colors.primary}
      />
    </Pressable>
  );
};

IconButton.propTypes = {
  /**
   * The Font Awesome icon that will be used in the button.
   */
  icon: PropTypes.object.isRequired,
  /**
   * The size of the button. One of ``'sm'`, `'md'` or `'lg'`. Defaults to `'md'`.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The color of the button. Defaults to the theme's primary color.
   */
  color: PropTypes.string,
  /**
   * Additional styles applied to the button.
   */
  customStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  /**
   * Whether the Android ripple effect is enabled. Defaults to `false`.
   */
  hasRipple: PropTypes.bool,
  /**
   * Called when a single tap is detected.
   */
  onPress: PropTypes.func,
};

export default IconButton;
