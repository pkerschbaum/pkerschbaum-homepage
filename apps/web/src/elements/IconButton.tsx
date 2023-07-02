import { styled } from '@linaria/react';

import { Button, ButtonProps } from '#pkg/elements/Button.jsx';

export type IconButtonProps = ButtonProps;

export const IconButton = styled(Button)`
  padding-inline: 0;
`;
