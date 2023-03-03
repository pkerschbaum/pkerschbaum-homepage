import _Image from 'next/image.js';
import type React from 'react';
import { MapPin } from 'react-feather';
import { styled } from 'styled-components';

import { commonStyles } from '#pkg/styles/common.styles.js';
import profilePic from '../../../public/profile-picture.jpg';

const Image = _Image as unknown as typeof _Image.default;

export const Introduction: React.FC = () => {
  return (
    <IntroductionContainer>
      <VisuallyHiddenHeadline>Patrick Kerschbaum homepage</VisuallyHiddenHeadline>
      <Greeting>👋 Hi, I&apos;m Patrick</Greeting>
      <Message>
        I&apos;m a software developer with a great passion for <strong>web technologies</strong> and{' '}
        <strong>the JavaScript ecosystem</strong>.
      </Message>
      <Location>
        <MapPin size="1.25em" />
        Vienna, Austria
      </Location>
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

const VisuallyHiddenHeadline = styled.h1`
  /* stylelint-disable */
  ${commonStyles.visuallyHidden}/* stylelint-enable */
`;

const IntroductionContainer = styled.section`
  display: grid;
  grid-template-areas:
    'profile-picture greeting'
    'profile-picture message'
    'profile-picture message-details';
  grid-template-columns: max-content 1fr;
  grid-row-gap: calc(0.5 * var(--spacing-base));
  grid-column-gap: calc(3 * var(--spacing-base));
  align-items: center;

  align-self: center;
  max-width: var(--box-width-sm);
  margin-block-start: calc(8 * var(--spacing-base));
  margin-block-end: calc(4 * var(--spacing-base));
`;

const Greeting = styled.h2`
  grid-area: greeting;
  align-self: end;
  margin-block: 0;
`;

const Message = styled.p`
  grid-area: message;
  align-self: end;
  margin-block-end: calc(0.5 * var(--spacing-base));
`;

const Location = styled.p`
  display: flex;
  grid-area: message-details;
  gap: calc(0.75 * var(--spacing-base));
  align-items: center;
  align-self: start;
`;

const ProfilePictureWrapper = styled.span`
  grid-area: profile-picture;
  margin-block-start: 8px;
`;

const ProfilePicture = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;
