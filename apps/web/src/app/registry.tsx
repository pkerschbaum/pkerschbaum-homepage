// based on https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components
'use client';

import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

type StyledComponentsRegistryProps = {
  children: React.ReactNode;
};

export const StyledComponentsRegistry: React.FC<StyledComponentsRegistryProps> = ({ children }) => {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = React.useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
  );
};
