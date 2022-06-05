/* eslint-disable sort/object-properties */
import { stripIndent } from 'common-tags';
import { getTestRule } from 'jest-preset-stylelint';

import { messages, ruleName } from '~/rule';

const testRule = getTestRule({
  plugins: [require.resolve('~/index')],
});

testRule({
  ruleName,
  config: [
    true,
    {
      browserslist: 'chrome 5',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -webkit-line-clamp: 3;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 21,
      message: messages.rejected(
        '"-webkit-line-clamp" property',
        'Chrome 5',
        'https://developer.mozilla.org/docs/Web/CSS/-webkit-line-clamp',
      ),
    },
  ],
});
