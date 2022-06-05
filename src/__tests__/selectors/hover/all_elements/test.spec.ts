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
      browserslist: 'ie 6',
    },
  ],
  reject: [
    {
      code: stripIndent`
        div:hover {
        }
      `,
      line: 1,
      column: 4,
      endLine: 1,
      endColumn: 10,
      message: messages.rejected('":hover" pseudo-class with any tag', 'IE 6', ''),
    },
  ],
});
