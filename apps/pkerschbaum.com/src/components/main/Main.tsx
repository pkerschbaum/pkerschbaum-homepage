import { styled } from '@pigment-css/react';
import type React from 'react';

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
