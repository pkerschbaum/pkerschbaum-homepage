'use client';

import React from 'react';

import { DataAttribute, IsAnimationEnabled } from '#pkg/constants.js';
import { useIsMounted } from '#pkg/utils/react.utils.jsx';

export const EnableAnimationsAfterHydration: React.FC = () => {
  const isMounted = useIsMounted();

  React.useEffect(
    /**
     * For whatever reason, in Firefox, some elements using keyframe animations flicker on page load.
     * Specifically, the "home link" on the navigation bar. There are animations in place to replace
     * the home link "Patrick Kerschbaum" by the logo "PK", but that should only happen on scroll.
     * Firefox animates them on load. Very fast, but still this flickering is noticable.
     *
     * That's why we enable animations only after client-side hydration and some small timeout.
     * We do so by setting a specific data attribute on the root element (<html> element).
     * That attribute will enable animations for the whole website.
     *
     * This means that animations will not be active if the website is rendered without javascript.
     * This is absolutely OK since animations are just a "progressive enhancement".
     *
     * We do not care if this effect runs multiple times because the operation in question - setting
     * a data attribute to a fixed value - is idempotent.
     */
    function enableAnimationsAfterHydration() {
      if (isMounted) {
        setTimeout(() => {
          document.documentElement.setAttribute(
            DataAttribute.IS_ANIMATION_ENABLED,
            IsAnimationEnabled.YES,
          );
        }, 500);
      }
    },
    [isMounted],
  );

  return null;
};
