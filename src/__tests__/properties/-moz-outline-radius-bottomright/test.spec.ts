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
      browserslist: 'firefox 88',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          -moz-outline-radius-bottomright: 14px;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 34,
      message: messages.rejected(
        '"-moz-outline-radius-bottomright" property',
        'Firefox 88',
        'https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomright',
      ),
    },
  ],
});
