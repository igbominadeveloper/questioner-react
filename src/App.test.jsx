import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
  describe('Render', () => {
    it('renders without error', () => {
      const component = shallow(<App />);
      expect(component).toMatchSnapshot();
    });
  });
});
