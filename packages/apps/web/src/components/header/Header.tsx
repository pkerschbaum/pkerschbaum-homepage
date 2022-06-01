import * as React from 'react';
import styled from 'styled-components';

export const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HeaderContainer>{children}</HeaderContainer>;
};

export const HeaderContainer = styled.header`
  flex-shrink: 0;
  align-self: stretch;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  max-width: var(--app-max-width);
  margin: 0 auto;
  padding-block-start: var(--spacing-base);
  padding-inline: var(--app-padding-inline);
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
