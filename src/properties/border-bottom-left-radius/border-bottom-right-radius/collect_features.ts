import { unit } from 'postcss-value-parser';

import type { Feature } from '~/types';

type Params = {
  nodes: import('postcss-value-parser').Node[];
  parent: import('postcss').Declaration;
};

export async function collectFeatures({ nodes, parent }: Params): Promise<Feature[]> {
  const prop = parent.prop.replace(/^-(webkit|moz|ms|o)-/, '');
  if (prop !== 'border-bottom-left-radius') {
    return [];
  }

  const features: Feature[] = [];
  const offset = parent.prop.length + (parent.raws.between?.length ?? 0);

  if (nodes.length >= 3) {
    const index = offset;
    const endIndex = offset + parent.value.length;

    features.push({
      endIndex,
      id: `properties.border-bottom-left-radius.elliptical_corners`,
      index,
      name: `Elliptical corner by border-bottom-left-radius`,
      node: parent,
    });
  }

  for (const node of nodes) {
    const index = offset + node.sourceIndex;
    const endIndex = offset + node.sourceEndIndex;

    if (node.type === 'word') {
      const result = unit(node.value);

      if (result !== false && result.unit === '%') {
        features.push({
          endIndex,
          id: `properties.border-bottom-left-radius.percentages`,
          index,
          name: `Percentage value specified as border-bottom-left-radius`,
          node: parent,
        });
      }
    }
  }

  return features;
}
