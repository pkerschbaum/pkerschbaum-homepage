import { styled } from '@linaria/react';
import dayjs from 'dayjs';
import Link from 'next/link.js';
import type React from 'react';

import { SocialMediaLinks } from '#pkg/components/footer/SocialMediaLinks.jsx';

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <SocialMediaLinks />

      <YearAndContact>
        <span>{dayjs().year()}</span>
        <span>-</span>
        <Link href="/">pkerschbaum</Link>
      </YearAndContact>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: calc(2 * var(--spacing-base));
  align-items: center;

  padding-block-start: calc(4 * var(--spacing-base));
`;

const YearAndContact = styled.div`
  display: flex;
  gap: calc(1 * var(--spacing-base));
  align-items: center;
  justify-content: center;
`;
