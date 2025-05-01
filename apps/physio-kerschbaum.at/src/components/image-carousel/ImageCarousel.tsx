import { css, keyframes } from '@pigment-css/react';
import React from 'react';

type ImageCarouselProps = {
  children: React.ReactNode;
};

const move6Slides = keyframes`
  /* Slide 1 */
  0% {
    transform: translateX(0%);
  }
  13% {
    transform: translateX(0%); /* Hold Slide 1 */
  }
  /* Transition to Slide 2 */
  16.67% {
    transform: translateX(-16.67%); /* End transition at 1/6 */
  }
  /* Slide 2 */
  29.67% {
    transform: translateX(-16.67%); /* Hold Slide 2 (13% duration) */
  }
  /* Transition to Slide 3 */
  33.33% {
    transform: translateX(-33.33%); /* End transition at 2/6 */
  }
  /* Slide 3 */
  46.33% {
    transform: translateX(-33.33%); /* Hold Slide 3 (13% duration) */ 
  }
  /* Transition to Slide 4 */
  50.00% {
    transform: translateX(-50%); /* End transition at 3/6 */
  }
  /* Slide 4 */
  63.00% {
    transform: translateX(-50%); /* Hold Slide 4 (13% duration) */
  }
  /* Transition to Slide 5 */
  66.67% {
    transform: translateX(-66.67%); /* End transition at 4/6 */
  }
  /* Slide 5 */
  79.67% {
    transform: translateX(-66.67%); /* Hold Slide 5 (13% duration) */
  }
  /* Transition to Slide 6 */
  83.33% {
    transform: translateX(-83.33%); /* End transition at 5/6 */
  }
  /* Slide 6 */
  96.33% {
    transform: translateX(-83.33%); /* Hold Slide 6 (13% duration) */
  }
  /* Ensure it stays until the end for smooth loop */
  100% {
    transform: translateX(-83.33%);
  }
`;

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ children }) => {
  return (
    <div
      className={css`
        display: grid;
        height: 100%;
        container-type: inline-size;

        /* hide the slides outside of the "sliding window" of the carousel */
        overflow: hidden;
      `}
    >
      <div
        className={css`
          display: flex;
          animation: ${move6Slides} 25000ms;
          animation-timing-function: ease;
          animation-iteration-count: infinite;
        `}
      >
        {children}
      </div>
    </div>
  );
};

type SlideProps = {
  children: React.ReactNode;
};

export const Slide: React.FC<SlideProps> = ({ children }) => {
  return (
    <div
      className={css`
        position: relative;
        width: 100cqi;
        object-fit: cover;
      `}
    >
      {children}
    </div>
  );
};
