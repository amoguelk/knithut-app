import React from 'react';
// Components
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EmptyTabsPlaceholder from 'navigation/TabNavigator/EmptyTabsPlaceholder';
// Documentation
import PropTypes from 'prop-types';
// Styling
import { useTheme } from 'contexts/ThemeContext';
// Translation
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator();
const TabNavigator = ({ tabs = [], screenComponent, emptyMessage = null }) => {
  const {
    theme: { colors },
  } = useTheme();
  const { t } = useTranslation();

  if (tabs.length === 0) {
    return <EmptyTabsPlaceholder emptyMessage={emptyMessage} />;
  }

  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.border,
          height: 50,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.disabled,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: colors.primary, height: 5 },
        sceneStyle: {
          backgroundColor: null,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab}
          name={`tab_${tab}`}
          initialParams={{ id: tab }}
          options={{ title: t('basic:loading') }}
          component={screenComponent}
        />
      ))}
    </Tab.Navigator>
  );
};

TabNavigator.propTypes = {
  /**
   * The list of tabs to display
   */
  tabs: PropTypes.arrayOf(PropTypes.string),
  /**
   * The component to display for each tab screen.
   */
  screenComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  /**
   * The text to display to indicate to the user that there are no tabs to display. If none is given, defaults to `There are no tabs to display` (translated if necessary).
   */
  emptyMessage: PropTypes.string,
};

export default TabNavigator;
