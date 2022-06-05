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
      browserslist: 'chrome 100',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -ms-scrollbar-highlight-color: blue;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 32,
      message: messages.rejected(
        '"scrollbar-highlight-color" property',
        'Chrome 100',
        'https://developer.mozilla.org/docs/Web/CSS/scrollbar-highlight-color',
      ),
    },
  ],
});
