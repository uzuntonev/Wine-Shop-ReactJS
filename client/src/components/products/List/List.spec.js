import React from 'react';
import List from './List';
import renderer from 'react-test-renderer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Context from '../../../store/store';

import { BrowserRouter } from 'react-router-dom';
test('Component "List" is mount', () => {
  const useContextSpy = jest
    .spyOn(React, 'useContext')
    .mockReturnValueOnce({ state: { products: [{},{}], isAuth: false } });
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#121212',
        text: '#B0976D',
      },
    },
  });
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <Context>
        <BrowserRouter>
          <List />
        </BrowserRouter>
      </Context>
    </ThemeProvider>
  );
  let tree = component.toJSON();
  expect(useContextSpy).toHaveBeenCalledTimes(6);
  expect(tree).toMatchSnapshot();
});
