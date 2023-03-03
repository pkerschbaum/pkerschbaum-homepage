import { styled } from 'styled-components';

import { Button, ButtonProps } from '#pkg/elements/Button.jsx';

export type IconButtonProps = ButtonProps;

export const IconButton = styled(Button)`
  padding-inline: 0;
`;
