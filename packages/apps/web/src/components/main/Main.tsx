import * as React from 'react';
import styled from 'styled-components';

type MainProps = {
  children: React.ReactNode;
  className?: string;
};

export const Main: React.FC<MainProps> = ({ children, ...delegated }) => {
  return <MainContainer {...delegated}>{children}</MainContainer>;
};

export const MainContainer = styled.main`
  flex: 1;
  padding-block-start: 84px;
`;
