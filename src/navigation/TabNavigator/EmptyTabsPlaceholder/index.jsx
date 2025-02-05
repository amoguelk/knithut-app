import React from 'react';
import { View, Text } from 'react-native';
// Documentation
import PropTypes from 'prop-types';
// Translation
import { useTranslation } from 'react-i18next';
// Styling
import { useTheme } from 'contexts/ThemeContext';
import getStyles from './styles';

/**
 * Component used in place of a `TabNavigator` when there are no tabs to display.
 */
const EmptyTabsPlaceholder = ({ emptyMessage = null }) => {
  const {
    theme: { colors },
  } = useTheme();
  const styles = getStyles(colors);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.text}>
          {emptyMessage || t('basic:empty_tab_nav')}
        </Text>
      </View>
    </View>
  );
};

EmptyTabsPlaceholder.propTypes = {
  /**
   * The text to display to indicate to the user that there are no tabs to display. If none is given, defaults to `There are no tabs to display` (translated if necessary).
   */
  emptyMessage: PropTypes.string,
};

export default EmptyTabsPlaceholder;
