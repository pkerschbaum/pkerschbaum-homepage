'use client';

import type React from 'react';
import invariant from 'tiny-invariant';

import styles from '#pkg/app/tidbits/sensible-tsconfig-defaults/styles.module.css';
import {
  PageContainerTidbit,
  PageContainerTidbitPropsBase,
} from '#pkg/components/page-container-tidbit/index.js';
import { ClassesAliases } from '#pkg/constants.js';

const faviconsClassName = styles[ClassesAliases.FAVICONS];
invariant(faviconsClassName);

export const TidbitPageContent: React.FC<PageContainerTidbitPropsBase> = (props) => {
  return <PageContainerTidbit {...props} faviconsClassName={faviconsClassName} />;
};
