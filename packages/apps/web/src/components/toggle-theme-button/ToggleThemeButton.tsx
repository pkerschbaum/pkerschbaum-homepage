import * as React from 'react';
import { Moon, Sun } from 'react-feather';
import styled from 'styled-components';

import { Animations, Classes, ColorTheme, DataAttribute } from '#/constants';
import { useColorTheme } from '#/context/color-theme';
import { IconButton } from '#/elements/IconButton';

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

    animation-name: ${Animations.HIDE};
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

    animation-name: ${Animations.HIDE};
    animation-duration: 0ms;
    animation-delay: var(--transition-duration);
    animation-fill-mode: forwards;
  }
`;
