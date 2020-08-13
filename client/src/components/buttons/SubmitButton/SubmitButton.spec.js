import React from 'react';
import SubmitButton from './SubmitButton';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
test('Component "SubmitButton" is mount', () => {
  const component = renderer.create(
    <BrowserRouter>
      <SubmitButton  title={'Send'} disabled={false} onClick={()=>{}} />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
