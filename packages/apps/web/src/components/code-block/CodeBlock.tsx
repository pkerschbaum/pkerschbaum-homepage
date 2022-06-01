// adapted based on https://github.com/reactjs/reactjs.org/blob/0209e1b5be86d47d0a915e58a9a7a47a409ab57d/beta/src/components/MDX/CodeBlock/CodeBlock.tsx

import {
  SandpackProvider,
  SandpackCodeViewer,
  SandpackThemeProp,
} from '@codesandbox/sandpack-react';
import { githubLight, sandpackDark } from '@codesandbox/sandpack-themes';
import { logger } from '@pkerschbaum-homepage/commons/observability/logger';
import { assertIsUnreachable, check } from '@pkerschbaum/ts-utils';
import type React from 'react';
import styled from 'styled-components';

import { ColorTheme } from '~/constants';
import { useColorTheme } from '~/context/color-theme';

const CODESANDBOX_LANGUAGE = {
  typescript: 'language-typescript',
} as const;
type CODESANDBOX_LANGUAGE = typeof CODESANDBOX_LANGUAGE[keyof typeof CODESANDBOX_LANGUAGE];

const CODESANDBOX_LANGUAGE_TO_FILE_EXTENSION_MAP = {
  'language-typescript': 'ts',
};

type CodeBlockProps = {
  children?: React.ReactNode;
  className?: string;
};

export function CodeBlock({ children, className }: CodeBlockProps) {
  const { activeColorTheme } = useColorTheme();

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

  let sandpackThemeToUse: SandpackThemeProp;
  switch (activeColorTheme) {
    case ColorTheme.LIGHT: {
      sandpackThemeToUse = githubLight;
      break;
    }
    case ColorTheme.DARK: {
      sandpackThemeToUse = sandpackDark;
      break;
    }
    default:
      assertIsUnreachable(activeColorTheme);
  }

  return (
    <CodeBlockContainer>
      <SandpackProvider
        files={{
          [filename]: {
            code,
          },
        }}
        customSetup={{
          entry: filename,
        }}
        theme={sandpackThemeToUse}
      >
        <SandpackCodeViewer key={code} wrapContent />
      </SandpackProvider>
    </CodeBlockContainer>
  );
}

const CodeBlockContainer = styled.div`
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-elevation-medium);
  border-radius: 8px;
  overflow: hidden;

  & .cm-content {
    padding-inline: calc(2.5 * var(--spacing-base));
  }
`;
