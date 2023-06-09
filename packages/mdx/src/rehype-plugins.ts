import type { ElementContent, Root } from 'hast';
import { visit } from 'unist-util-visit';

import { urlUtils } from '@pkerschbaum-homepage/commons/util/url.util';

import type { Heading, HeadingLevel } from '#pkg/schema.js';

export function createCollectAndAugmentHeadingsPlugin({ headings }: { headings: Heading[] }) {
  return function myRehypePluginToIncreaseHeadings() {
    return (tree: Root) => {
      visit(tree, 'element', (node) => {
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
          const text = gatherText(node.children, '');
          const id = urlUtils.generateUrlFragmentFromText(text);
          node.properties = { ...node.properties, id };
          headings.push({
            text,
            id,
            level: Number(node.tagName.charAt(1)) as HeadingLevel,
          });
        }
      });
    };
  };
}

function gatherText(nodes: ElementContent[], curText: string): string {
  let result = curText;

  for (const node of nodes) {
    if (node.type === 'text') {
      result += node.value;
    } else if (node.type === 'element') {
      result = gatherText(node.children, result);
    }
  }

  return result;
}
