import type React from 'react';
import type { IconProps as ReactFeatherIconProps } from 'react-feather';
import { styled } from 'styled-components';

type IconProps = {
  /**
   * Default size is 24px (similar to library `react-feather`).
   */
  size?: ReactFeatherIconProps['size'];
};

/**
 * Taken and adapted from https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acookie%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4024.
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
 * Taken and adapted from  * Taken and adapted from https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Acookie%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4024.
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

const SvgWrapper = styled.svg`
  fill: currentcolor;
`;

export const Cookie = MDCookie;
export const Topic = MDTopic;
