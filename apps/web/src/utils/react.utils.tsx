import { numbers } from '@pkerschbaum/ts-utils';
import React from 'react';
import * as ReactIs from 'react-is';

export const reactUtils = { createContext, getNodeText };

const SYMBOL_CONTEXT_NOT_FOUND = Symbol('ContextNotFound');
type SYMBOL_CONTEXT_NOT_FOUND = typeof SYMBOL_CONTEXT_NOT_FOUND;

function createContext<ContextValue>(name: string) {
  const Context = React.createContext<ContextValue | SYMBOL_CONTEXT_NOT_FOUND>(
    SYMBOL_CONTEXT_NOT_FOUND,
  );

  function useContextValue() {
    const valueOfContext = React.useContext(Context);
    if (valueOfContext === SYMBOL_CONTEXT_NOT_FOUND) {
      throw new Error(`${name} context is not available`);
    }
    return valueOfContext;
  }

  const Provider: React.FC<{
    children: React.ReactNode;
    value: ContextValue;
  }> = ({ children, value }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  return { useContextValue, Provider };
}

export function useIsMounted() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

/**
 * based on https://stackoverflow.com/a/60564620/1700319
 */
function getNodeText(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }
  if (typeof node === 'number') {
    return numbers.toString(node);
  }
  if (Array.isArray(node)) {
    return node.map((node) => getNodeText(node as React.ReactNode)).join('');
  }
  if (ReactIs.isElement(node)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return getNodeText(node.props.children);
  }
  throw new Error(`should not get here`);
}
