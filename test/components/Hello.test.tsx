import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';

const { Hello } = require('../../src/components/Hello');

it('Test Sandbox', () => {
  const hello = TestUtils.renderIntoDocument(
    <Hello
      compiler="test"
      framework="test"
    />
  );
  const helloNode = ReactDOM.findDOMNode(hello);
  expect(helloNode.textContent).toEqual('Hello from test and test!');
});
