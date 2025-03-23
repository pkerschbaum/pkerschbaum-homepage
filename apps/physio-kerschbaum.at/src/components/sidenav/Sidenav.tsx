'use client';

import { styled } from '@pigment-css/react';
import React from 'react';
import { XCircle } from 'react-feather';
import invariant from 'tiny-invariant';

import { Nav } from '#pkg/components/nav/index.js';
import { useSidenavContext } from '#pkg/components/sidenav/SidenavContextProvider.jsx';
import { Button } from '#pkg/elements/Button.jsx';

export const Sidenav: React.FC = () => {
  const closeSidenavButtonRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, setIsOpen, openSidenavButtonRef } = useSidenavContext();

  function closeSidenav() {
    setIsOpen(false);
  }

  return (
    <CloseBackdropAndNavigationContainer
      data-is-open={isOpen}
      onKeyUp={(e) => {
        if (e.code === 'Escape') {
          closeSidenav();
        }
      }}
      onTransitionEnd={() => {
        invariant(openSidenavButtonRef.current);
        invariant(closeSidenavButtonRef.current);

        if (isOpen) {
          closeSidenavButtonRef.current.focus();
        } else {
          openSidenavButtonRef.current.focus();
        }
      }}
    >
      <CloseBackdrop title="Close Menu" aria-label="Close Menu" onClick={() => setIsOpen(false)} />
      <NavContainer>
        <Nav />

        <Button ref={closeSidenavButtonRef} onClick={closeSidenav}>
          <XCircle size={32} />
        </Button>
      </NavContainer>
    </CloseBackdropAndNavigationContainer>
  );
};

const CloseBackdropAndNavigationContainer = styled.aside`
  --duration-opacity: 0.3s;
  --duration-slide-out: 0.3s;
  --duration-slide-in: 0.6s;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

  @media (prefers-reduced-motion: reduce) {
    --duration-opacity: 1ms;
    --duration-slide-out: 1ms;
    --duration-slide-in: 1ms;
  }

  position: fixed;
  z-index: 1;

  display: grid;

  visibility: hidden;
  grid-template-areas: 'escape nav';
  grid-template-columns: 1fr max-content;
  width: 100%;
  height: 100%;
  /* create stacking context to put navigation div on top of the button (which spans the entire grid) */
  isolation: isolate;
  transition: visibility 0s linear var(--duration-opacity);
  will-change: transform;

  &[data-is-open='true'] {
    visibility: visible;
    transition: visibility 0s linear 0s;
  }

  & .nav-container {
    z-index: 1;

    display: grid;
    grid-area: nav;
    grid-template-columns: max-content max-content;
    column-gap: calc(1 * var(--spacing-base));
    align-items: start;
    padding-block: var(--app-padding-block);
    padding-inline-start: var(--app-padding-inline);
    padding-inline-end: calc(
      var(--app-padding-inline) + max(0px, calc((100vw - var(--app-max-width)) / 2))
    );

    overflow-y: scroll;
    overscroll-behavior-y: contain;
    background-color: var(--color-bg);
    transform: translateX(100%);
    transition: transform var(--duration-slide-out) var(--ease-out-expo);
  }

  &[data-is-open='true'] .nav-container {
    transform: translateX(0);
    transition: transform var(--duration-slide-in) var(--ease-out-expo);
  }
`;

const CloseBackdrop = styled(Button)`
  ${
    // @ts-expect-error -- typings are incorrect
    CloseBackdropAndNavigationContainer
  } & {
    z-index: 0;

    grid-row-start: escape;
    grid-row-end: nav;
    grid-column-start: escape;
    grid-column-end: nav;

    background-color: var(--color-black);
    opacity: 0;
    transition: opacity var(--duration-opacity) linear;
  }

  ${CloseBackdropAndNavigationContainer}[data-is-open='true'] & {
    opacity: 0.5;
  }
`;

const NavContainer = styled.div`
  ${
    // @ts-expect-error -- typings are incorrect
    CloseBackdropAndNavigationContainer
  } & {
    z-index: 1;

    display: grid;
    grid-area: nav;
    grid-template-columns: max-content max-content;
    column-gap: calc(1 * var(--spacing-base));
    align-items: start;
    padding-block: var(--app-padding-block);
    padding-inline-start: var(--app-padding-inline);
    padding-inline-end: calc(
      var(--app-padding-inline) + max(0px, calc((100vw - var(--app-max-width)) / 2))
    );

    overflow-y: scroll;
    overscroll-behavior-y: contain;
    background-color: var(--color-bg);
    transform: translateX(100%);
    transition: transform var(--duration-slide-out) var(--ease-out-expo);
  }

  ${CloseBackdropAndNavigationContainer}[data-is-open='true'] & {
    transform: translateX(0);
    transition: transform var(--duration-slide-in) var(--ease-out-expo);
  }
`;
