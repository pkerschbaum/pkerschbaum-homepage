import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import { Introduction } from '~/components/introduction';
import { AccentureLogo } from '~/img/accentureLogo';
import { MfmLogo } from '~/img/mfmLogo';
import { OebbLogo } from '~/img/oebbLogo';
import { UnimedLogo } from '~/img/unimedLogo';

const cvData = {
  education: [
    {
      timespan: { from: '01/2020', to: '05/2020' },
      text: 'University of Illinois at Urbana-Champaign, USA (short-term studies)',
    },
    {
      timespan: { from: '     2016', to: '01/2020' },
      text: 'Technical University of Vienna, Software and Information Engineering (Bachelor’s Degree)',
    },
    {
      timespan: { from: '2007', to: '2012' },
      text: 'School for higher technical education Krems, department Information Technology',
    },
  ],
  expertise: [
    'Agile Application Development',
    'NodeJS',
    'TypeScript',
    'REST',
    'React',
    'Android',
    'Java',
    'Clang',
    'GIT',
    'Redis',
    'NoSQL',
    'SQL',
    'Jenkins',
    'Docker',
    'ELK Stack (Elastic)',
    'Continuous Integration and Delivery',
    'Service-oriented Architecture',
    'Microservices',
    'JIRA',
    'Confluence',
  ],
  certificates: [
    {
      text: 'TOEFL iBT (Pt. 102/120)',
    },
    {
      text: 'ISTQB Foundation Level',
    },
    {
      text: 'European Business Competence Licence, Level A',
    },
  ],
  courses: [
    {
      timestamp: 'Sep 2018',
      text: 'Docker Fundamentals – Docker Training',
    },
    {
      timestamp: 'Oct 2013',
      text: 'Accenture Java Jump Start Programme',
    },
  ],
  experience: [
    {
      logo: UnimedLogo,
      title: 'Software Developer (Freelancer, React & NodeJS)',
      subTitle: '',
      bulletPoints: [],
      timespan: { from: 'Nov 2020', to: 'Jul 2021' },
    },
    {
      logo: MfmLogo,
      title: 'Software Developer (Freelancer, React & NodeJS)',
      subTitle: 'Development of “My First Million Online"',
      bulletPoints: [
        'The project aim was to develop an online version of the board game My First Million.',
        'I was the only developer of the project and therefore responsible for the design and development of the entire tech stack.',
        {
          text: 'Used technologies:',
          subBulletPoints: [
            'React, Material-UI and Redux on the frontend',
            'NodeJS (NestJS), Prisma, PostgreSQL and Redis on the backend',
          ],
        },
      ],
      timespan: { from: 'May 2020', to: 'Oct 2020' },
      footer: (
        <>
          <span>Homepage of the app: </span>
          <a href="https://www.myfirstmilliongame.com/">https://www.myfirstmilliongame.com/</a>
        </>
      ),
    },
    {
      logo: OebbLogo,
      title: 'Software Developer (NodeJS) and Testautomation Engineer',
      subTitle: 'Ticketing-App ÖBB (Austrian Federal Railways)',
      bulletPoints: [
        'The project aim was to design and implement the new ticketing apps for the Austrian public transportation.',
        'The project leveraged an agile process model, testing and shipping to production was done via Continuous Integration and Delivery strategies.',
        'I was part of the team responsible for the development of the backend component which provided the single point of entry for client systems. The component provided functionalities by orchestrating multiple microservices.',
        'The component exposed those functionalities by a REST-style manner, and was implemented using NodeJS (TypeScript, ExpressJS).',
        'In my role as a developer, I was responsible for implementing functionalities, automating the deployment process (check of test coverage, automatic semantic versioning, ...) and analyzing/fixing defects both in test and production environments.',
        'In my role as a tester and testautomation engineer, I was responsible for writing integration tests, automating tests for fast feedback, making sure the test coverage was met and providing status of the quality of our component. The automated tests were written in Java.',
        'Since the begin of my study in 2016, I worked at this project each summer, therefore I gained in sum about three years of experience at this project.',
      ],
      timespan: { from: 'Oct 2014', to: 'Sep 2019' },
      contact: 'Christian Lipp, +43 699 1312 5568',
      footer: (
        <div>
          App: <a href="http://tickets.oebb.at/en/ticket">http://tickets.oebb.at/en/ticket</a>
        </div>
      ),
    },
    {
      logo: AccentureLogo,
      title: 'Business Analyst',
      subTitle: 'Data Migration for Austrian Government Application',
      bulletPoints: [
        'The project aim was to migrate the data of a legacy application which got replaced by a new developed application (DB2  PostgreSQL).',
        'In my role as an analyst, I formulated functional migration rules by organizing so-called “migration workshop” including multiple stakeholders. Then, I translated these rules to technical design sheets, which got implemented afterwards. I formulated extensive SQL queries which served as the basis for verification of the correctness and completeness of the data migration.',
      ],
      timespan: { from: 'Nov 2013', to: 'Oct 2014' },
      contact: 'Christian Winkelhofer, +43 676 8720 33871',
    },
  ],
} as const;

const ResumePage: React.FC = () => {
  const title = 'Resume | Patrick Kerschbaum';
  const description = 'Resume of Patrick Kerschbaum';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <Introduction />

      <PersonDescription>
        Experienced Application Developer from Vienna, Austria. History of working in the field of
        national-scaled web and mobile application engineering. Highly interested in web application
        technologies, both client-side and server-side.
        <br />
        Gained strong CS fundamentals by completing the Bachelor{"'"}s Degree for Software and
        Information Engineering at the Technical University of Vienna.
      </PersonDescription>

      <SectionTitle>Education</SectionTitle>
      <SectionGrid>
        {cvData.education.map((entry, idx) => (
          <React.Fragment key={idx}>
            <SectionGridFirstColumn>{entry.timespan.from}</SectionGridFirstColumn>
            <div>-</div>
            <div>{entry.timespan.to}</div>
            <div>{entry.text}</div>
          </React.Fragment>
        ))}
      </SectionGrid>

      <SectionTitle>Expertise</SectionTitle>
      <SectionExpertise>
        {cvData.expertise.map((entry, idx) => (
          <ExpertiseSpan key={idx}>{entry}</ExpertiseSpan>
        ))}
      </SectionExpertise>

      <SectionTitle>Certificates</SectionTitle>
      <SectionGrid>
        {cvData.certificates.map((entry, idx) => (
          <React.Fragment key={idx}>
            <SectionGridFirstColumn />
            <div />
            <div />
            <div>{entry.text}</div>
          </React.Fragment>
        ))}
      </SectionGrid>

      <SectionTitle>Certificates</SectionTitle>
      <SectionGrid>
        {cvData.certificates.map((entry, idx) => (
          <React.Fragment key={idx}>
            <SectionGridFirstColumn />
            <div />
            <div />
            <div>{entry.text}</div>
          </React.Fragment>
        ))}
      </SectionGrid>

      <SectionTitle>Experience</SectionTitle>
      {cvData.experience.map((entry, idx) => (
        <React.Fragment key={idx}>
          <LogoContainer>
            <entry.logo />
          </LogoContainer>
        </React.Fragment>
      ))}
    </>
  );
};

const PersonDescription = styled.div``;

const SectionTitle = styled.h2``;

const SectionGrid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: max-content max-content max-content 1fr;
  grid-column-gap: calc(1 * var(--spacing-base));
  grid-row-gap: calc(1 * var(--spacing-base));
`;

const SectionGridFirstColumn = styled.div`
  justify-self: end;
`;

const SectionExpertise = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: calc(1 * var(--spacing-base));
`;

const ExpertiseSpan = styled.span`
  border: 1px solid var(--color-fg);
  border-radius: 4px;
  padding: 0 4px;
`;

const LogoContainer = styled.div`
  height: 72px;
  position: relative;
`;

export default ResumePage;
