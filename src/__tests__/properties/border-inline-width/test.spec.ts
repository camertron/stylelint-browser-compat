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
      browserslist: 'chrome 86',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          border-inline-width: medium;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 22,
      message: messages.rejected(
        '"border-inline-width" property',
        'Chrome 86',
        'https://developer.mozilla.org/docs/Web/CSS/border-inline-width',
      ),
    },
  ],
});
