import Image from 'next/image';
import type React from 'react';
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
        I&apos;m currently based in Vienna, Austria. I have a history of working in the field of
        national-scaled web and mobile application engineering.
      </IntroductionMessageDetails>
      <ProfilePictureWrapper>
        <ProfilePicture
          src={profilePic}
          alt="Picture of Patrick Kerschbaum"
          width={120}
          height={120}
        />
      </ProfilePictureWrapper>
    </IntroductionContainer>
  );
};

const IntroductionContainer = styled.section`
  max-width: var(--box-width-medium);
  margin-block: calc(8 * var(--spacing-base));
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

  ${nameHeadingStyles}
`;

const IntroductionMessage = styled.p`
  grid-area: message;
  margin-bottom: calc(0.5 * var(--spacing-base));
`;

const IntroductionMessageDetails = styled.p`
  grid-area: message-details;
  margin-bottom: calc(0.5 * var(--spacing-base));
`;

const ProfilePictureWrapper = styled.span`
  grid-area: profile-picture;
  margin-top: 8px;
`;

const ProfilePicture = styled(Image)`
  border-radius: 50%;
`;
