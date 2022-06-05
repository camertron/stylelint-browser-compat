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
      allow: {
        features: ['properties.background.background-clip'],
      },
      browserslist: 'chrome 20',
    },
  ],
  reject: [
    {
      code: stripIndent`
        #id {
          background: border-box;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected('Values of background-origin specified as background', 'Chrome 20', ''),
    },
    {
      code: stripIndent`
        #id {
          background: border-box padding-box;
        }
      `,
      line: 2,
      column: 15,
      endLine: 2,
      endColumn: 25,
      message: messages.rejected('Values of background-origin specified as background', 'Chrome 20', ''),
    },
  ],
});
