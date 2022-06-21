import * as React from 'react';
import { Moon, Sun } from 'react-feather';
import styled, { keyframes } from 'styled-components';

import { Classes, ColorTheme, DataAttribute } from '~/constants';
import { useColorTheme } from '~/context/color-theme';
import { IconButton } from '~/elements/IconButton';

export const ToggleThemeButton: React.FC = () => {
  const { toggleColorTheme } = useColorTheme();

  return (
    <ToggleThemeIconButton onClick={toggleColorTheme} className={Classes.JS_REQUIRED}>
      <AnimatedMoon aria-label="Switch to dark mode" />
      <AnimatedSun aria-label="Switch to light mode" />
    </ToggleThemeIconButton>
  );
};

const ToggleThemeIconButton = styled(IconButton)`
  flex-shrink: 0;

  display: grid;
  place-items: center;

  --transition-duration: 500ms;
  --transition-translatey-distance: 250%;
  overflow: hidden;

  & > * {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
`;

const hideAnimation = keyframes`
  to {
    display: none;
  }
`;

const AnimatedMoon = styled(Moon)`
  transition: transform var(--transition-duration);

  *:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] && {
    /* hide */
    transform: translateY(var(--transition-translatey-distance));

    animation-name: ${hideAnimation};
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

    animation-name: ${hideAnimation};
    animation-duration: 0ms;
    animation-delay: var(--transition-duration);
    animation-fill-mode: forwards;
  }
`;
