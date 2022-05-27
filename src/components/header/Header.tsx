import * as React from 'react';
import styled from 'styled-components';

export const CLASSNAME_PINNED = 'pinned' as const;
export const CLASSNAME_NOT_PINNED = 'not-pinned' as const;

export const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [headerElem, setHeaderElem] = React.useState<HTMLElement | null>(null);
  const [headerIsPinned, setHeaderIsPinned] = React.useState(false);

  React.useEffect(
    function watchForHeaderGettingPinned() {
      if (!headerElem) {
        return;
      }

      const observer = new IntersectionObserver(
        ([element]) => setHeaderIsPinned(element.intersectionRatio < 1),
        { threshold: [1] },
      );
      observer.observe(headerElem);

      return function cleanup() {
        observer.disconnect();
      };
    },
    [headerElem],
  );

  return (
    <HeaderContainer
      ref={setHeaderElem}
      className={headerIsPinned ? CLASSNAME_PINNED : CLASSNAME_NOT_PINNED}
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
`;
