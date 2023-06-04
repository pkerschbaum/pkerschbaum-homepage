import React from 'react';
import { styled } from 'styled-components';

import { Classes } from '#pkg/constants.js';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

export const Button = styled(
  React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(function ButtonWithRef(
    { children, className, onClick, ...delegated },
    ref,
  ) {
    const isJSRequired = !!onClick;

    return (
      <button
        ref={ref}
        {...delegated}
        onClick={onClick}
        className={`${className ?? ''} ${isJSRequired && Classes.JS_REQUIRED}`}
      >
        {children}
      </button>
    );
  }),
)``;
