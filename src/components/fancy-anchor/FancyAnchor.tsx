import * as React from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import styled, { css } from 'styled-components';

import { Anchor, AnchorProps } from '~/elements';
import { schema_faviconDataUrlResponse } from '~/schema';
import { urlUtils } from '~/utils/url.utils';

export function FancyAnchor({ href, children, ...delegated }: AnchorProps): React.ReactElement {
  const { data: dataURL, status } = useQuery(['favicon', href], async () => {
    const response = await fetch(`/api/favicon-data-url?url=${href}`);
    const body = schema_faviconDataUrlResponse.parse(await response.json());
    return body.dataURL;
  });

  let textToDisplay = children;
  if (textToDisplay === 'AUTOGENERATE') {
    const url = new URL(href);
    textToDisplay = urlUtils.createReadableTextFromUrl(url);
  }

  return (
    <StyledAnchor styleProps={{ favicon: { status, dataURL } }} href={href} {...delegated}>
      {textToDisplay}
    </StyledAnchor>
  );
}

type StyledAnchorProps = {
  favicon: {
    status: UseQueryResult['status'];
    dataURL?: string;
  };
};

const StyledAnchor = styled(Anchor)<{ styleProps: StyledAnchorProps }>`
  word-break: break-all;

  &::before {
    content: '';
    vertical-align: sub;
    margin-right: calc(0.5 * var(--spacing-base));
    height: calc(1.2 * 1em);
    width: 1em;

    ${(props) =>
      props.styleProps.favicon.status !== 'error' &&
      css`
        display: inline-block;
      `};
    background: url(${(props) => props.styleProps.favicon.dataURL}) no-repeat center center;
    background-size: 1em 1em;
  }
`;
