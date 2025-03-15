import Link from 'next/link';
import React from 'react';

export type AnchorProps = React.ComponentProps<typeof Link> & {
  href: string;
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
