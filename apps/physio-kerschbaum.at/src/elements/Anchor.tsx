import type { Route } from 'next';
import Link from 'next/link';
import React from 'react';

export type AnchorRoute = Route;

export type AnchorProps = React.ComponentProps<typeof Link> & {
  href: AnchorRoute | URL;
  style?: React.CSSProperties;
};

export const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(function AnchorInner(
  { children, ...delegated },
  ref,
) {
  return (
    <Link ref={ref} {...delegated}>
      {children}
    </Link>
  );
});
