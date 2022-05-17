import * as React from 'react';

export const reactUtils = { createContext };

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
