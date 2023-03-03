import _Link from 'next/link.js';
import type React from 'react';
import { styled } from 'styled-components';

const Link = _Link as unknown as typeof _Link.default;

export type AnchorProps = React.ComponentPropsWithoutRef<'a'> & {
  href: string;
};

export const Anchor = styled(({ children, ...delegated }: React.PropsWithChildren<AnchorProps>) => (
  <Link {...(delegated as React.ComponentPropsWithoutRef<typeof Link>)}>{children}</Link>
))``;
