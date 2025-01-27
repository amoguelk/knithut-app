import React, { useMemo, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { storageKeys, useStorage } from 'hooks/useStorage';
import { darkTheme, lightTheme } from 'constants/theme/theme';
import PropTypes from 'prop-types';

export const ThemeContext = React.createContext(null);
const ThemeContextProvider = ({ children }) => {
  const scheme = useColorScheme();
  const [theme, setTheme] = useStorage(
    storageKeys.SETTINGS.THEME,
    scheme === 'dark' ? darkTheme : lightTheme,
  );

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * @typedef {object} ThemeContextObject
 * @property {object} theme
 * @property {object} theme.colors
 * @property {boolean} theme.dark
 * @property {function(): void} setTheme
 */

/**
 * @returns {ThemeContextObject}
 */
export const useTheme = () => useContext(ThemeContext);

ThemeContextProvider.propTypes = {
  /**
   * The component tree within the context
   */
  children: PropTypes.node.isRequired,
};

export default ThemeContextProvider;
