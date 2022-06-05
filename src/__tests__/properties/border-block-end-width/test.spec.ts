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
      browserslist: 'chrome 68',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-block-end-width: medium;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected(
        '"border-block-end-width" property',
        'Chrome 68',
        'https://developer.mozilla.org/docs/Web/CSS/border-block-end-width',
      ),
    },
  ],
});
