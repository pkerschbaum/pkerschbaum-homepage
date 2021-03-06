// based on https://sreetamdas.com/blog/the-perfect-dark-mode, https://www.joshwcomeau.com/react/dark-mode
import * as React from 'react';

import { ColorTheme, DataAttribute, LocalStorageKey } from '#/constants';
import { reactUtils } from '#/utils/react.utils';

type ColorThemeContextValue = {
  activeColorTheme: ColorTheme;
  toggleColorTheme: () => void;
};
const colorThemeContext = reactUtils.createContext<ColorThemeContextValue>('ColorThemeContext');

type ColorThemeProviderProps = {
  children: React.ReactNode;
};

export const ColorThemeProvider: React.FC<ColorThemeProviderProps> = ({ children }) => {
  const [activeColorTheme, setActiveColorTheme] = React.useState<ColorTheme | null>(null);

  React.useEffect(function readAndSetInitialTheme() {
    const initialTheme =
      document.documentElement.getAttribute(DataAttribute.THEME) === ColorTheme.DARK
        ? ColorTheme.DARK
        : ColorTheme.LIGHT;
    setActiveColorTheme(initialTheme);
  }, []);

  const contextValue = React.useMemo<ColorThemeContextValue>(
    () => ({
      activeColorTheme: activeColorTheme ?? ColorTheme.LIGHT,
      toggleColorTheme() {
        const newTheme = activeColorTheme === ColorTheme.LIGHT ? ColorTheme.DARK : ColorTheme.LIGHT;

        // Set theme in React state
        setActiveColorTheme(newTheme);

        // Set theme as data-attribute to apply new CSS Variables
        if (newTheme === 'dark') {
          document.documentElement.setAttribute(DataAttribute.THEME, ColorTheme.DARK);
        } else {
          document.documentElement.removeAttribute(DataAttribute.THEME);
        }

        // Persist theme
        localStorage.setItem(LocalStorageKey.THEME, newTheme);
      },
    }),
    [activeColorTheme],
  );

  return <colorThemeContext.Provider value={contextValue}>{children}</colorThemeContext.Provider>;
};

export function useColorTheme() {
  return colorThemeContext.useContextValue();
}
