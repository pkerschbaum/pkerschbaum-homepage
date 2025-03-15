import { styled } from '@pigment-css/react';
import type React from 'react';
import type { IconProps as ReactFeatherIconProps } from 'react-feather';

type IconProps = {
  /**
   * Default size is 24px (similar to library `react-feather`).
   */
  size?: ReactFeatherIconProps['size'];
};

/**
 * Taken and adapted from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:cookie:FILL@0;wght@400;GRAD@0;opsz@24
 * Changes:
 * - Added "viewBox" so that the icon fills its SVG bounding client rect completely without whitespace,
 *   and to make the icon resizable.
 * - Set "fill" to "currentColor" so that the icon adapts to the font-size of its surrounding context.
 * - Takes a property "size" which will set "height" and "width".
 */
const MDCookie: React.FC<IconProps> = ({ size = 24 }) => {
  return (
    <>
      <SvgWrapper viewBox="2 2 20 20" height={size} width={size}>
        <path d="M10.5 10q.625 0 1.062-.438Q12 9.125 12 8.5t-.438-1.062Q11.125 7 10.5 7t-1.062.438Q9 7.875 9 8.5t.438 1.062Q9.875 10 10.5 10Zm-2 5q.625 0 1.062-.438Q10 14.125 10 13.5t-.438-1.062Q9.125 12 8.5 12t-1.062.438Q7 12.875 7 13.5t.438 1.062Q7.875 15 8.5 15Zm6.5 1q.425 0 .713-.288Q16 15.425 16 15t-.287-.713Q15.425 14 15 14t-.712.287Q14 14.575 14 15t.288.712Q14.575 16 15 16Zm-3 6q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12q0-2.1.9-4.1.9-2 2.513-3.45Q7.025 3 9.238 2.325q2.212-.675 4.837-.125-.225 1.125.15 2.112.375.988 1.125 1.663t1.775.925q1.025.25 2.15-.125-.775 1.725.275 2.95T21.95 11q.225 2.225-.475 4.225-.7 2-2.062 3.5-1.363 1.5-3.275 2.388Q14.225 22 12 22Zm0-2q3.05 0 5.413-2.1 2.362-2.1 2.587-5.35-1.25-.55-1.962-1.5-.713-.95-.963-2.125-1.925-.275-3.3-1.65-1.375-1.375-1.7-3.3-2-.05-3.513.725-1.512.775-2.524 1.987Q5.025 7.9 4.513 9.325 4 10.75 4 12q0 3.325 2.338 5.663Q8.675 20 12 20Zm0-8.1Z" />
      </SvgWrapper>
    </>
  );
};

/**
 * Taken and adapted from https://fonts.google.com/icons?selected=Material+Symbols+Outlined:cookie:FILL@0;wght@400;GRAD@0;opsz@24
 * Changes:
 * - Added "viewBox" so that the icon fills its SVG bounding client rect completely without whitespace,
 *   and to make the icon resizable.
 * - Set "fill" to "currentColor" so that the icon adapts to the font-size of its surrounding context.
 * - Takes a property "size" which will set "height" and "width".
 */
const MDTopic: React.FC<IconProps> = ({ size = 24 }) => {
  return (
    <SvgWrapper viewBox="2 2 20 20" height={size} width={size}>
      <path d="M6 12h12v-2H6Zm0 4h8v-2H6Zm-2 4q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h6l2 2h8q.825 0 1.413.588Q22 7.175 22 8v10q0 .825-.587 1.413Q20.825 20 20 20ZM4 6v12h16V8h-8.825l-2-2H4Zm0 0v12Z" />
    </SvgWrapper>
  );
};

export const Bsky: React.FC<IconProps> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 568 501"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.866 -1.61183 568 -28.9064 568 57.9464C568 75.2916 558.055 203.659 552.222 224.501C531.947 296.954 458.067 315.434 392.347 304.249C507.222 323.8 536.444 388.56 473.333 453.32C353.473 576.312 301.061 422.461 287.631 383.039C285.169 375.812 284.017 372.431 284 375.306C283.983 372.431 282.831 375.812 280.369 383.039C266.939 422.461 214.527 576.312 94.6667 453.32C31.5556 388.56 60.7778 323.8 175.653 304.249C109.933 315.434 36.0535 296.954 15.7778 224.501C9.94525 203.659 0 75.2916 0 57.9464C0 -28.9064 76.1345 -1.61183 123.121 33.6637Z"
      fill="currentColor"
    />
  </svg>
);

const SvgWrapper = styled.svg`
  fill: currentcolor;
`;

export const Cookie = MDCookie;
export const Topic = MDTopic;
