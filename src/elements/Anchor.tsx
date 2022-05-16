import Link from 'next/link';
import type React from 'react';
import styled from 'styled-components';

type AnchorProps = React.ComponentPropsWithoutRef<'a'> & {
  href: string;
};

export const Anchor = styled(
  ({ href, children, ...delegated }: React.PropsWithChildren<AnchorProps>) => (
    <Link href={href} passHref>
      <a {...delegated}>{children}</a>
    </Link>
  ),
)``;
