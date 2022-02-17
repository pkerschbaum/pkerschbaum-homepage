// adapted based on https://github.com/reactjs/reactjs.org/blob/0209e1b5be86d47d0a915e58a9a7a47a409ab57d/beta/src/components/MDX/CodeBlock/CodeBlock.tsx

import {
  SandpackProvider,
  SandpackThemeProvider,
  SandpackCodeViewer,
} from '@codesandbox/sandpack-react';
import { check } from '@pkerschbaum/ts-utils';
import type React from 'react';
import styled from 'styled-components';

import { logger } from '~/logger';

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
        customSetup={{
          entry: filename,
          files: {
            [filename]: {
              code,
            },
          },
        }}
      >
        <SandpackThemeProvider theme="github-light">
          <SandpackCodeViewer key={code} showLineNumbers={false} />
        </SandpackThemeProvider>
      </SandpackProvider>
    </CodeBlockContainer>
  );
}

const CodeBlockContainer = styled.div`
  font-size: var(--font-size-sm);
  box-shadow: var(--shadow-elevation-medium);
  border-radius: 8px;
  overflow: hidden;

  & .cm-editor {
    padding: calc(3 * var(--spacing-base)) calc(2 * var(--spacing-base));
  }
`;
