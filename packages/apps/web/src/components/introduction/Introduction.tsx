import Image from 'next/image';
import type React from 'react';
import { MapPin } from 'react-feather';
import styled from 'styled-components';

import profilePic from '../../../public/profile-picture.jpg';
import { commonStyles } from '~/styles/common.styles';

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
          objectFit="cover"
        />
      </ProfilePictureWrapper>
    </IntroductionContainer>
  );
};

const VisuallyHiddenHeadline = styled.h1`
  ${commonStyles.visuallyHidden}
`;

const IntroductionContainer = styled.section`
  max-width: var(--box-width-sm);
  margin-block-start: calc(8 * var(--spacing-base));
  margin-block-end: calc(4 * var(--spacing-base));
  align-self: center;

  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-areas:
    'profile-picture greeting'
    'profile-picture message'
    'profile-picture message-details';
  grid-column-gap: calc(3 * var(--spacing-base));
  grid-row-gap: calc(0.5 * var(--spacing-base));
  align-items: center;
`;

const Greeting = styled.h2`
  margin-block: 0;
  grid-area: greeting;
  align-self: end;
`;

const Message = styled.p`
  grid-area: message;
  align-self: end;
  margin-block-end: calc(0.5 * var(--spacing-base));
`;

const Location = styled.p`
  grid-area: message-details;
  align-self: start;

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
