import * as React from 'react';
import styled from 'styled-components';

export const CLASSNAME_SCROLLED = 'scrolled' as const;
export const CLASSNAME_NOT_SCROLLED = 'not-scrolled' as const;

export const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [headerElem, setHeaderElem] = React.useState<HTMLElement | null>(null);
  const [documentIsScrolled, setDocumentIsScrolled] = React.useState(
    typeof window !== 'undefined' && window.scrollY > 0,
  );

  React.useEffect(
    function watchForDocumentIsScrolled() {
      if (!headerElem) {
        return;
      }

      function onScroll() {
        setDocumentIsScrolled(window.scrollY > 0);
      }
      document.addEventListener('scroll', onScroll, { passive: true });

      return function cleanup() {
        document.removeEventListener('scroll', onScroll);
      };
    },
    [headerElem],
  );

  return (
    <HeaderContainer
      ref={setHeaderElem}
      className={documentIsScrolled ? CLASSNAME_SCROLLED : CLASSNAME_NOT_SCROLLED}
    >
      {children}
    </HeaderContainer>
  );
};

export const HeaderContainer = styled.header`
  flex-shrink: 0;
  align-self: stretch;
  position: sticky;
  top: -1px; /* allows to detect if sticky element is "pinned", see http://localhost:3000/blog/collect-code-coverage-of-api-tests-using-playwright */
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(4 * var(--spacing-base));

  background-color: var(--color-bg);
  overflow: hidden;

  & > * {
    padding-block-start: calc(1 * var(--spacing-base));
    padding-block-end: calc(2 * var(--spacing-base));
  }
`;
