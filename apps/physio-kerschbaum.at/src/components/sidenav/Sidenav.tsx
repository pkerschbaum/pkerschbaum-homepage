'use client';

import { css } from '@pigment-css/react';
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
    <aside
      data-is-open={isOpen}
      className={sidenav}
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
      <Button
        className="close-backdrop"
        title="Close Menu"
        aria-label="Close Menu"
        onClick={() => setIsOpen(false)}
      />
      <div className="nav-container">
        <Nav />

        <Button ref={closeSidenavButtonRef} onClick={closeSidenav}>
          <XCircle size={32} />
        </Button>
      </div>
    </aside>
  );
};

const sidenav = css`
  @media (prefers-reduced-motion: reduce) {
    --duration-opacity: 1ms;
    --duration-slide-out: 1ms;
    --duration-slide-in: 1ms;
  }

  --duration-opacity: 0.3s;
  --duration-slide-out: 0.3s;
  --duration-slide-in: 0.6s;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

  position: fixed;
  z-index: 1;

  display: grid;

  visibility: hidden;
  grid-template-areas: 'nav escape';
  grid-template-columns: max-content 1fr;
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

  & .close-backdrop {
    z-index: 0;

    grid-row-start: nav;
    grid-row-end: escape;
    grid-column-start: nav;
    grid-column-end: escape;

    background-color: var(--color-black);
    opacity: 0;
    transition: opacity var(--duration-opacity) linear;
  }

  &[data-is-open='true'] .close-backdrop {
    opacity: 0.5;
  }

  & .nav-container {
    z-index: 1;

    display: grid;
    grid-area: nav;
    grid-template-columns: max-content max-content;
    column-gap: calc(1 * var(--spacing-base));
    align-items: start;
    padding-block: var(--app-padding-block);
    padding-inline-start: calc(
      var(--app-padding-inline) + max(0px, calc((100vw - var(--app-max-width)) / 2))
    );
    padding-inline-end: var(--app-padding-inline);

    overflow-y: scroll;
    overscroll-behavior-y: contain;
    background-color: var(--color-bg);
    transform: translateX(-100%);
    transition: transform var(--duration-slide-out) var(--ease-out-expo);
  }

  &[data-is-open='true'] .nav-container {
    transform: translateX(0);
    transition: transform var(--duration-slide-in) var(--ease-out-expo);
  }
`;
