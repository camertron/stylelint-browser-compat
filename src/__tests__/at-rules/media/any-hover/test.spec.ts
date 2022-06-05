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
      browserslist: 'chrome 40',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @media (any-hover: hover) {
        }
      `,
      line: 1,
      column: 9,
      endLine: 1,
      endColumn: 18,
      message: messages.rejected(
        '"any-hover" media feature',
        'Chrome 40',
        'https://developer.mozilla.org/docs/Web/CSS/@media/any-hover',
      ),
    },
  ],
});
