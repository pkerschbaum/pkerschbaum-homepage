import Link from 'next/link';
import type React from 'react';
import styled from 'styled-components';

export type AnchorProps = React.ComponentPropsWithoutRef<'a'> & {
  href: string;
};

export const Anchor = styled(({ children, ...delegated }: React.PropsWithChildren<AnchorProps>) => (
  <Link {...delegated}>{children}</Link>
))``;
