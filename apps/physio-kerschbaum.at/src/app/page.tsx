import { css } from '@pigment-css/react';
import type { Metadata } from 'next';
import type React from 'react';

import { merriweather } from '#pkg/app/fonts.jsx';
import { headingIds } from '#pkg/app/page-constants.js';
import photoshooting_11DSC0068 from '#pkg/assets/11-DSC_0068.jpg';
import photoshooting_15DSC0081 from '#pkg/assets/15-DSC_0081.jpg';
import photoshooting_20DSC0108 from '#pkg/assets/20-DSC_0108.jpg';
import photoshooting_24DSC01312 from '#pkg/assets/24-DSC_0131-2.jpg';
import photoshooting_3DSC0018 from '#pkg/assets/3-DSC_0018.jpg';
import photoshooting_7DSC0039 from '#pkg/assets/7-DSC_0039.jpg';
import photoshooting_8DSC0042 from '#pkg/assets/8-DSC_0042.jpg';
import { ImageCarousel, Slide } from '#pkg/components/image-carousel/index.js';
import { Image } from '#pkg/elements/Image.jsx';

function HomePage() {
  return (
    <>
      <Section
        disablePadding
        slots={{
          div: {
            cssClassName: css`
              height: 280px;

              @container section (min-width: 570px) {
                & {
                  height: 400px;
                }
              }
            `,
          },
        }}
      >
        <ImageCarousel>
          <Slide>
            <Image
              alt=""
              src={photoshooting_8DSC0042}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </Slide>

          <Slide>
            <Image
              alt=""
              src={photoshooting_11DSC0068}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </Slide>

          <Slide>
            <Image
              alt=""
              src={photoshooting_20DSC0108}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </Slide>

          <Slide>
            <Image
              alt=""
              src={photoshooting_7DSC0039}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </Slide>

          <Slide>
            <Image
              alt=""
              src={photoshooting_3DSC0018}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </Slide>

          <Slide>
            <Image
              alt=""
              src={photoshooting_15DSC0081}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </Slide>
        </ImageCarousel>
      </Section>
      <Section>
        <Heading as="h1" id={headingIds.welcome}>
          Herzlich Willkommen!
        </Heading>
        <p>
          Gemeinsam an alltäglichen Problemen arbeiten, mit Herz und Spaß bei der Sache - dafür
          stehe ich in der Physiotherapie!
        </p>
        <p>
          Mein Name ist Jasmin Kerschbaum. Ich bin als freiberufliche Physiotherapeutin in der{' '}
          <strong>Gemeinschaftspraxis &quot;Körperfunk&quot;</strong> in 1030 Wien tätig.
          Hausbesuche sind auf Anfrage (per Mail oder Telefon) ebenso möglich.
        </p>
        <span>Meine 3 Schwerpunkte:</span>
        <ul>
          <li>
            <strong>neurologische Erkrankungen</strong> wie Schlaganfall, Multiple Sklerose, Morbus
            Parkinson, ALS, etc.
          </li>
          <li>
            Erkrankungen/Verletzungen der <strong>Wirbelsäule</strong> (Bandscheibenvorfall,
            Operationen, Instabilitäten, etc.)
          </li>
          <li>
            <strong>Schwindel, Tinnitus, Kopfschmerzen, Migräne</strong>
          </li>
        </ul>
      </Section>

      <Section>
        <Heading as="h2" id={headingIds.ueberMich}>
          Über mich
        </Heading>
        <div
          className={css`
            position: relative;
            height: 400px;
            margin-inline: calc(-1 * var(--padding-inline));
            /* Define the container */
            container-type: size;
            container-name: image-container;
          `}
        >
          <Image
            src={photoshooting_24DSC01312}
            alt=""
            fill
            className={css`
              object-fit: cover;
              object-position: 50% 50%;

              @container image-container (aspect-ratio > 1.10) {
                object-position: 50% 40%;
              }

              @container image-container (aspect-ratio > 1.25) {
                object-position: 50% 25%;
              }
            `}
          />
        </div>
        <p>
          Mein Name ist Jasmin Kerschbaum. Ich komme ursprünglich aus dem Waldviertel und wohne seit
          einigen Jahren in Wien. Im Jahr 2022 habe ich das Bachelor-Studium Physiotherapie an der
          FH St. Pölten abgeschlossen.
        </p>
        <p>
          Bereits vor meinem Studium war ich von der Idee begeistert, mit Menschen zu arbeiten und
          ihnen dabei zu helfen, das Beste aus ihrem Alltag herauszuholen. Während des Studiums
          stellte sich schnell heraus, dass ich als Physiotherapeutin in der Neurologie tätig werden
          möchte. Besonders der komplexe Hintergrund neurologischer Erkrankungen und die
          Individualität der Symptomatik empfinde ich als äußerst interessant. Ebenso arbeite ich
          gerne mit Patient*innen mit Rückenbeschwerden, um Schmerzen zu lindern, die Beweglichkeit
          zu verbessern und somit die Lebensqualität zu steigern.
        </p>
        <p>
          Die Stärken und Ressourcen der Patient*innen herauszufiltern und gemeinsam an den Zielen
          zu arbeiten, stellt für mich die oberste Priorität in der Physiotherapie dar.
          <br />
          Der Hauptfokus in meinen Therapieeinheiten liegt auf aktiven funktionellen Übungen,
          zusätzlich werden relevante passive Maßnahmen gesetzt. Außerdem werden bei Bedarf Themen
          wie Hilfsmittelversorgung, Möglichkeiten zur weiteren Betreuung, etc. miteinbezogen.
        </p>
        <span>
          <strong>Berufserfahrung:</strong>
        </span>
        <ul>
          <li>
            seit 06/2025 freiberufliche Physiotherapeutin in der Gemeinschaftspraxis
            &quot;Körperfunk&quot;, Wien
          </li>
          <li>
            seit 12/2023 Intensivstation für Innere Medizin und Schwerbrandverletzte im AKH Wien
          </li>
          <li>07/2023-01/2024 Wirbelsäulengymnastik bei Willl-Gesund, Zwettl-NÖ</li>
          <li>07/2022-11/2023 NRZ Rosenhügel, Wien</li>
        </ul>
        <span>
          <strong>Fortbildungen:</strong>
        </span>
        <ul>
          <li>ESP Wirbelsäulenrehabilitation</li>
          <li>Spiegeltherapie</li>
          <li>Evidenzbasierte Ganganalyse & Gangtherapie in der Neurologie und Geriatrie</li>
          <li>Bandscheibenproblematik</li>
          <li>Atempacing bei geringer Belastungstoleranz</li>
          <li>Schwindel-, Tinnitus-, Kopfschmerz-, & Migränetherapie</li>
        </ul>
        <p>
          <strong>Achtung:</strong> Da ich eine <strong>Wahltherapeutin</strong> bin, wird nach
          Ansuchen nur ein Teil der Kosten von der Krankenkassa übernommen! Mehr Infos erhalten Sie
          beim Gespräch - persönlich oder telefonisch!
        </p>
      </Section>

      <Section>
        <Heading as="h2" id={headingIds.derWegZurPhysiotherapie}>
          Der Weg zur Physiotherapie
        </Heading>
        <ol>
          <li>
            <strong>Verordnung vom Arzt:</strong> 10x Neurophysiotherapie/Physiotherapie à 45 Min
            (oder 60 Min) - bei Hausbesuchen muss der Hausbesuch verordnet sein!
          </li>
          <li>
            <span>
              <strong>Bewilligung durch Krankenkassa:</strong>
            </span>
            <ol>
              <li>ÖGK und BVA: bis auf Weiteres keine Bewilligung notwendig</li>
              <li>KFA: Bewilligung vor der 1. Therapieeinheit notwendig!</li>
            </ol>
          </li>
          <li>
            <strong>Termin buchen:</strong> siehe unter &quot;Standort & Kontakt&quot;
          </li>
          <li>
            <strong>Ersttermin:</strong> gründliche Befundung des aktuellen Zustandes, gemeinsame
            Zielvereinbarung, erste Behandlungsmaßnahmen → (bewilligte) Verordnung und ärztliche
            Befunde falls vorhanden mitnehmen
          </li>
          <li>
            <strong>Folgetermine:</strong> bequeme Kleidung, Handtuch, Trinkflasche mitbringen
          </li>
        </ol>
        <p>
          <strong>Terminabsagen</strong> müssen bis 24h vor dem vereinbarten Termin erfolgen
          (telefonisch oder per E-Mail). Bei kurzfristigen Absagen wird ein Entfallshonorar
          verrechnet!
        </p>
        <p>
          <strong>Achtung:</strong> Da ich eine <strong>Wahltherapeutin</strong> bin, wird nach
          Ansuchen nur ein Teil der Kosten von der Krankenkassa übernommen! Mehr Infos erhalten Sie
          beim Gespräch - persönlich oder telefonisch!
        </p>
      </Section>

      <Section>
        <Heading as="h2" id={headingIds.kooperierendeAerztInnen}>
          Kooperierende Ärzt*innen:
        </Heading>
        <p>
          Priv.-Doz. Mag. Dr. Georg Dirnberger - Facharzt für Neurologie & Psychologe
          Dominikanerbastei 3, 1010 Wien
          <br />
          <a href="https://neurologe-dirnberger.at">https://neurologe-dirnberger.at</a>
        </p>
      </Section>

      <Section>
        <Heading as="h2" id={headingIds.leistungen}>
          Leistungen
        </Heading>
        <table>
          <tbody>
            <tr>
              <td>Physiotherapie 60 Min</td>
              <td>115€</td>
            </tr>
            <tr>
              <td>Physiotherapie 45 Min</td>
              <td>95€</td>
            </tr>
            <tr>
              <td>Physiotherapie 30 Min</td>
              <td>65€</td>
            </tr>
          </tbody>
        </table>
        <p>
          → bei <strong>Hausbesuchen</strong> wird pro Einheit eine zusätzliche Pauschale von 35€
          verrechnet!
        </p>
      </Section>

      <Section>
        <Heading as="h2" id={headingIds.standortKontakt}>
          Standort & Kontakt
        </Heading>
        <p>
          <strong>Gemeinschaftspraxis &quot;Körperfunk&quot;</strong>
          <br />
          Physiotherapeutin Jasmin Kerschbaum, BSc.
          <br />
          Traungasse 1, Stiege 4, Tür 14
          <br />
          1030 Wien
          <br />
          <br />
          <strong>Termine:</strong> Montags ab 13:30 Uhr
          <br />
          <strong>Terminbuchung unter:</strong>
          <br />
          online: Link zur Gemeinschaftspraxis
          <br />
          E-Mail: <a href="mailto:physio.kerschbaum@gmx.at">physio.kerschbaum@gmx.at</a>
          <br />
          Telefon: <a href="tel:+436801104304">+43 680 1104304</a>
        </p>
      </Section>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Physiotherapie Jasmin Kerschbaum',
  openGraph: {
    title: 'Physiotherapie Jasmin Kerschbaum',
  },
};

export default HomePage;

type SectionProps = {
  children: React.ReactNode;
  disablePadding?: boolean;
  slots?: {
    div?: {
      cssClassName?: string;
    };
  };
};

const Section: React.FC<SectionProps> = ({ children, disablePadding, slots }) => {
  return (
    <section
      className={css`
        container-name: section;
        container-type: inline-size;

        &:nth-last-of-type(even) {
          background-color: var(--color-tertiary);
        }
        &:nth-last-of-type(odd) {
          background-color: var(--color-quaternary);
        }
      `}
    >
      <div
        className={
          // eslint-disable-next-line prefer-template
          css`
            max-width: var(--app-box-width);
            padding-inline: var(--padding-inline);
            margin-inline: auto;

            & > *:where(ol, ul) {
              margin-block-start: 0.25em;
            }

            & > *:where(h1, h2, h3, h4, h5, h6) {
              padding-block-start: 32px;
            }
            & > *:first-child {
              margin-block-start: 0;
            }
            & > *:last-child {
              padding-block-end: var(--padding-block);
              margin-block-end: 0;
            }
          ` +
          ' ' +
          slots?.div?.cssClassName
        }
        style={{
          '--padding-inline': disablePadding ? '0' : 'var(--app-padding-inline)',
          '--padding-block': disablePadding ? '0' : '32px',
        }}
      >
        {children}
      </div>
    </section>
  );
};

const Heading: React.FC<
  React.ComponentProps<'h1'> & {
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  }
> = ({ as, children, className, ...delegated }) => {
  const HeadingComponent = as;
  return (
    <HeadingComponent
      {...delegated}
      className={`${className} ${merriweather.className} ${css`
        scroll-margin-block-start: 64px;
      `}`}
    >
      {children}
    </HeadingComponent>
  );
};
