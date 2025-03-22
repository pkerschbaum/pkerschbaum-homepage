'use client';

import { styled } from '@pigment-css/react';
import type React from 'react';
import { Menu } from 'react-feather';

import { useSidenavContext } from '#pkg/components/sidenav/SidenavContextProvider.jsx';
import { Button } from '#pkg/elements/Button.jsx';

export const OpenSidenavButton: React.FC = () => {
  const { setIsOpen, openSidenavButtonRef } = useSidenavContext();
  return (
    <StyledButton
      ref={openSidenavButtonRef}
      title="Open Menu"
      aria-label="Open Menu"
      onClick={() => setIsOpen(true)}
    >
      <Menu size="0.75em" />
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  padding: calc(0.75 * var(--spacing-base));

  background-color: var(--color-bg);
  border-radius: 9999px;
  box-shadow: var(--shadow-elevation-medium);
`;
