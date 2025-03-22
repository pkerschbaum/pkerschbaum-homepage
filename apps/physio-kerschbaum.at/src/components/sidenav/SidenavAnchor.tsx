'use client';

import type React from 'react';

import { useSidenavContext } from '#pkg/components/sidenav/SidenavContextProvider.jsx';
import { Anchor, type AnchorProps } from '#pkg/elements/Anchor.jsx';

type SidenavAnchorProps = AnchorProps;

export const SidenavAnchor: React.FC<SidenavAnchorProps> = ({
  children,
  onClick,
  ...delegated
}) => {
  const { setIsOpen } = useSidenavContext();
  return (
    <Anchor
      {...delegated}
      onClick={(e) => {
        onClick?.(e);
        setIsOpen(false);
      }}
    >
      {children}
    </Anchor>
  );
};
