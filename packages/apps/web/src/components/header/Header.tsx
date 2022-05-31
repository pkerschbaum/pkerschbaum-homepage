import * as React from 'react';
import styled from 'styled-components';

export const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HeaderContainer>{children}</HeaderContainer>;
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
