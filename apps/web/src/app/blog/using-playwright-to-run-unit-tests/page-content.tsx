'use client';

import type React from 'react';
import invariant from 'tiny-invariant';

import styles from '#pkg/app/blog/using-playwright-to-run-unit-tests/styles.module.css';
import {
  PageContainerBlogPost,
  PageContainerBlogPostPropsBase,
} from '#pkg/components/page-container-blog-post/index.js';
import { ClassesAliases } from '#pkg/constants.js';

const faviconsClassName = styles[ClassesAliases.FAVICONS];
invariant(faviconsClassName);

export const BlogPostPageContent: React.FC<PageContainerBlogPostPropsBase> = (props) => {
  return <PageContainerBlogPost {...props} faviconsClassName={faviconsClassName} />;
};
