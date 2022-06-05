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
        features: ['at-rules.font-face'],
      },
      browserslist: 'chrome 86',
    },
  ],
  reject: [
    {
      code: stripIndent`
        @font-face {
          ascent-override: normal;
        }
      `,
      line: 2,
      column: 3,
      endLine: 2,
      endColumn: 18,
      message: messages.rejected(
        '"ascent-override" descriptor of the @font-face',
        'Chrome 86',
        'https://developer.mozilla.org/docs/Web/CSS/@font-face/ascent-override',
      ),
    },
  ],
});
