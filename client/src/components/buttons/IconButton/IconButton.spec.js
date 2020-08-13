import React from 'react';
import IconButton from './IconButton';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
test('Component "IconButton" is mount', () => {
  const component = renderer.create(
    <BrowserRouter>
      <IconButton handler={() =>{}} icon={'add'} />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
