import { styled } from '@pigment-css/react';

import { Button, type ButtonProps } from '#pkg/elements/Button.jsx';

export type IconButtonProps = ButtonProps;

export const IconButton = styled(Button)`
  padding-inline: 0;
`;
