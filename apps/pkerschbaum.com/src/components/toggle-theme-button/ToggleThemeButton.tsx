'use client';
import { styled } from '@pigment-css/react';
import type React from 'react';
import { Moon, Sun } from 'react-feather';

import { Classes, ColorTheme, DataAttribute, LocalStorageKey } from '#pkg/constants-browser.js';
import { IconButton } from '#pkg/elements/index.js';

export const ToggleThemeButton: React.FC = () => {
  return (
    <ToggleThemeIconButton onClick={toggleColorTheme} className={Classes.JS_REQUIRED}>
      <AnimatedMoon aria-label="Switch to dark mode" />
      <AnimatedSun aria-label="Switch to light mode" />
    </ToggleThemeIconButton>
  );
};

function toggleColorTheme() {
  const activeColorTheme =
    document.documentElement.getAttribute(DataAttribute.THEME) === ColorTheme.DARK
      ? ColorTheme.DARK
      : ColorTheme.LIGHT;
  const newTheme = activeColorTheme === ColorTheme.LIGHT ? ColorTheme.DARK : ColorTheme.LIGHT;

  // Set theme as data-attribute to apply new CSS Variables
  if (newTheme === ColorTheme.DARK) {
    document.documentElement.setAttribute(DataAttribute.THEME, ColorTheme.DARK);
  } else {
    document.documentElement.removeAttribute(DataAttribute.THEME);
  }

  // Persist theme
  localStorage.setItem(LocalStorageKey.THEME, newTheme);
}

const ToggleThemeIconButton = styled(IconButton)`
  --transition-duration: 500ms;
  --transition-translatey-distance: 250%;

  display: grid;
  flex-shrink: 0;
  place-items: center;

  overflow: hidden;

  & > * {
    grid-row: 1 / -1;
    grid-column: 1 / -1;
  }
`;

const AnimatedMoon = styled(Moon)`
  transition: transform var(--transition-duration);

  *:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] && {
    /* hide */
    transform: translateY(var(--transition-translatey-distance));

    animation-name: var(--animation-hide);
    animation-duration: 0ms;
    animation-delay: var(--transition-duration);
    animation-fill-mode: forwards;
  }
`;

const AnimatedSun = styled(Sun)`
  transition: transform var(--transition-duration);

  *:root:not([${DataAttribute.THEME}='${ColorTheme.DARK}']) && {
    /* hide */
    transform: translateY(calc(-1 * var(--transition-translatey-distance)));

    animation-name: var(--animation-hide);
    animation-duration: 0ms;
    animation-delay: var(--transition-duration);
    animation-fill-mode: forwards;
  }
`;
