import Image from 'next/image';
import type React from 'react';
import { MapPin } from 'react-feather';
import styled, { css } from 'styled-components';

import profilePic from '../../../public/profile-picture.jpg';

export const nameHeadingStyles = css`
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
`;

export const Introduction: React.FC = () => {
  return (
    <IntroductionContainer>
      <IntroductionHeading>Patrick Kerschbaum</IntroductionHeading>
      <IntroductionMessage>
        I&apos;m Patrick, a software developer with a great passion for web technologies and the
        JavaScript ecosystem.
      </IntroductionMessage>
      <IntroductionMessageDetails>
        <MapPin size="1.25em" />
        Vienna, Austria
      </IntroductionMessageDetails>
      <ProfilePictureWrapper>
        <ProfilePicture
          src={profilePic}
          alt="Picture of Patrick Kerschbaum"
          width={120}
          height={120}
          objectFit="cover"
        />
      </ProfilePictureWrapper>
    </IntroductionContainer>
  );
};

const IntroductionContainer = styled.section`
  max-width: var(--box-width-md);
  margin-block-start: calc(8 * var(--spacing-base));
  margin-block-end: calc(4 * var(--spacing-base));
  align-self: center;

  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-areas:
    'profile-picture heading'
    'profile-picture message'
    'profile-picture message-details';
  grid-column-gap: calc(3 * var(--spacing-base));
  grid-row-gap: calc(0.5 * var(--spacing-base));
`;

const IntroductionHeading = styled.h1`
  grid-area: heading;
  margin-block: 0;

  ${nameHeadingStyles}
`;

const IntroductionMessage = styled.p`
  grid-area: message;
  margin-block-end: calc(0.5 * var(--spacing-base));
`;

const IntroductionMessageDetails = styled.p`
  grid-area: message-details;
  margin-block-end: calc(0.5 * var(--spacing-base));

  display: flex;
  align-items: center;
  gap: calc(0.75 * var(--spacing-base));
`;

const ProfilePictureWrapper = styled.span`
  grid-area: profile-picture;
  margin-block-start: 8px;
`;

const ProfilePicture = styled(Image)`
  border-radius: 50%;
`;
