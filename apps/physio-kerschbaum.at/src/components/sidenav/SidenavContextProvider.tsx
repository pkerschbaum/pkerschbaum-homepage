'use client';

import React from 'react';

import { reactUtils } from '@pkerschbaum-homepage/react-utils/react.utils.jsx';

type SidenavContextValue = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  openSidenavButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const sidenavContext = reactUtils.createContext<SidenavContextValue>('SidenavContext');
export const useSidenavContext = sidenavContext.useContextValue;

type SidenavContextProviderProps = {
  children: React.ReactNode;
};

export const SidenavContextProvider: React.FC<SidenavContextProviderProps> = ({ children }) => {
  const openSidenavButtonRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <sidenavContext.Provider value={{ isOpen, setIsOpen, openSidenavButtonRef }}>
      {children}
    </sidenavContext.Provider>
  );
};
