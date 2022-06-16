// adapted based on https://github.com/reactjs/reactjs.org/blob/0209e1b5be86d47d0a915e58a9a7a47a409ab57d/beta/src/components/MDX/CodeBlock/CodeBlock.tsx

import { SandpackProvider, SandpackCodeViewer } from '@codesandbox/sandpack-react';
import { githubLight, monokaiPro } from '@codesandbox/sandpack-themes';
import { logger } from '@pkerschbaum-homepage/commons/observability/logger';
import { check } from '@pkerschbaum/ts-utils';
import type React from 'react';
import styled from 'styled-components';

import { ColorTheme, DataAttribute } from '~/constants';

const CODESANDBOX_LANGUAGE = {
  typescript: 'language-typescript',
} as const;
type CODESANDBOX_LANGUAGE = typeof CODESANDBOX_LANGUAGE[keyof typeof CODESANDBOX_LANGUAGE];

const CODESANDBOX_LANGUAGE_TO_FILE_EXTENSION_MAP = {
  'language-typescript': 'ts',
};

export type CodeBlockProps = {
  children?: React.ReactNode;
  className?: string;
};

export function CodeBlock({ children, className }: CodeBlockProps) {
  if (
    typeof children !== 'string' ||
    (typeof className === 'string' && !check.isValueInEnum(className, CODESANDBOX_LANGUAGE))
  ) {
    logger.error(`invalid props`, { children, className });
    throw new Error(`invalid props`);
  }

  if (className === undefined) {
    return <code>{children}</code>;
  }

  const fileExtension = CODESANDBOX_LANGUAGE_TO_FILE_EXTENSION_MAP[className];
  const filename = `/index.${fileExtension}`;
  const code = children.trimEnd();

  return (
    <CodeBlockContainer>
      <SandpackProvider
        files={{ [filename]: { code } }}
        customSetup={{ entry: filename }}
        theme={githubLight}
      >
        <SandpackCodeViewer key={code} wrapContent />
      </SandpackProvider>

      <SandpackProvider
        files={{ [filename]: { code } }}
        customSetup={{ entry: filename }}
        theme={monokaiPro}
      >
        <SandpackCodeViewer key={code} wrapContent />
      </SandpackProvider>
    </CodeBlockContainer>
  );
}

const CodeBlockContainer = styled.div`
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-elevation-low);
  border-radius: 8px;
  overflow: hidden;

  /* 
    Sandpack is rendered two times, once with light theme, once with dark theme.
    We set "display: none" for that Sandpack element which should not get displayed because of the active theme.
   */
  *:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] && > *:nth-of-type(1) {
    display: none;
  }
  *:root:not([${DataAttribute.THEME}='${ColorTheme.DARK}']) && > *:nth-of-type(2) {
    display: none;
  }

  /* adjust padding/margin of @codesandbox/sandpack-react to spacing values of application */
  /* "sp-pre-placeholder" is the class used by sandpack *before* hydration */
  && *.sp-pre-placeholder {
    padding-block: var(--app-padding-inline);
    padding-inline: var(--app-padding-inline);
    /* sandpack applies some margin-left via "style" tag. so we have to use !important to clear that margin */
    margin-left: 0 !important;
  }
  /* "cm-scroller" and "cm-content" are the classes used by sandpack *after* hydration */
  && *.cm-scroller {
    padding-block: var(--app-padding-inline);
  }
  && *.cm-content {
    padding-inline: var(--app-padding-inline);
  }
`;
