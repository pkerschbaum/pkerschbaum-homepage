import type { Root } from 'mdast';
import { z } from 'zod';
import { visit } from 'unist-util-visit';

type CreateCollectHrefsFromJsxElementsPluginArgs = {
  hrefs: string[];
};

const schema_jsxHrefAttribute = z.object({
  type: z.literal('mdxJsxAttribute'),
  name: z.literal('href'),
  value: z.string().nonempty(),
});

export function createCollectHrefsFromJsxElementsPlugin({
  hrefs,
}: CreateCollectHrefsFromJsxElementsPluginArgs) {
  return function collectHrefsFromJsxElementsPlugin() {
    return (tree: Root) => {
      visit(tree, 'mdxJsxTextElement', (node: any) => {
        let hrefAttribute;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        for (const attribute of node.attributes) {
          const parseResult = schema_jsxHrefAttribute.safeParse(attribute);
          if (parseResult.success) {
            hrefAttribute = parseResult.data;
          }
        }

        if (!hrefAttribute) {
          return;
        }

        hrefs.push(hrefAttribute.value);
      });
    };
  };
}
