import React from 'react';
import Details from './Details';
import renderer from 'react-test-renderer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Context from '../../../store/store';

import { BrowserRouter } from 'react-router-dom';
describe('Component "Details"', () => {
  let tree;
  let useContextSpy;
  let theme;
  let instance;
  beforeEach(() => {
    useContextSpy = jest
      .spyOn(React, 'useContext')
      .mockReturnValueOnce({ state: { products: [{},{}] } });
    theme = createMuiTheme({
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
            <Details />
          </BrowserRouter>
        </Context>
      </ThemeProvider>
    );
    let tree = component.toJSON();
    let instance = component.root;
  });

  it('component "Details" is mount', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should called useContext', () => {
    expect(useContextSpy).toHaveBeenCalledTimes(16);
  });

//   it('Should called AddToCard after click', (done) => {
//       const component = renderer.create(

//               <Details />

//       );
//       let tree = component.toJSON();
//       let instance = component.root;
//       console.log(component.root.props);

//   });
});
