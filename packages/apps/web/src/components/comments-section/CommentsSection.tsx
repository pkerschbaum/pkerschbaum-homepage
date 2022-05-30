// Comments implemented using Utteranc.es (https://utteranc.es/, https://github.com/utterance/utterances/issues/161#issuecomment-994072938)
import { assertIsUnreachable } from '@pkerschbaum/ts-utils';
import * as React from 'react';

import { ColorTheme } from '~/constants';
import { useColorTheme } from '~/context/color-theme';

export const CommentsSection: React.FC = () => {
  const [commentsContainerElem, setCommentsContainerElem] = React.useState<HTMLDivElement | null>(
    null,
  );

  const { activeColorTheme } = useColorTheme();

  React.useEffect(
    function addUtterancesScript() {
      if (!commentsContainerElem) {
        return;
      }

      let themeToUse;
      switch (activeColorTheme) {
        case ColorTheme.LIGHT: {
          themeToUse = 'github-light';
          break;
        }
        case ColorTheme.DARK: {
          themeToUse = 'github-dark';
          break;
        }
        default:
          assertIsUnreachable(activeColorTheme);
      }

      const scriptElem = document.createElement('script');
      scriptElem.src = 'https://utteranc.es/client.js';
      scriptElem.async = true;
      scriptElem.setAttribute('repo', 'pkerschbaum/blog-comments');
      scriptElem.setAttribute('issue-term', 'pathname');
      scriptElem.setAttribute('label', 'utterances');
      scriptElem.setAttribute('theme', themeToUse);
      scriptElem.setAttribute('crossorigin', 'anonymous');

      commentsContainerElem.replaceChildren(scriptElem);
    },
    [activeColorTheme, commentsContainerElem],
  );

  return <div ref={setCommentsContainerElem} />;
};
