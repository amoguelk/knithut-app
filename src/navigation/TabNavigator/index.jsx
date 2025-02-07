import React from 'react';
// Components
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EmptyTabsPlaceholder from 'navigation/TabNavigator/EmptyTabsPlaceholder';
// Documentation
import PropTypes from 'prop-types';
// Styling
import { useTheme } from 'contexts/ThemeContext';

const Tab = createMaterialTopTabNavigator();
const TabNavigator = ({ tabs = [], screenComponent, emptyMessage = null }) => {
  const {
    theme: { colors },
  } = useTheme();

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
          key={`tab_${tab.key}`}
          name={`tab_${tab.key}`}
          initialParams={tab}
          options={{
            title:
              tab.name.length <= 15 ? tab.name : `${tab.name.slice(0, 15)}...`,
          }}
          component={screenComponent}
        />
      ))}
    </Tab.Navigator>
  );
};

TabNavigator.propTypes = {
  /**
   * The list of tabs to display.
   * @param {string} name The name of the tab
   * @param {string} key A unique key that identifies the tab
   */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ),
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
