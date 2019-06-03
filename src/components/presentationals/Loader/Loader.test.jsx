import React from 'react';
import { shallow } from 'enzyme';

import Loader from './Loader';

describe('Loader', () => {
  describe('Render', () => {
    it('renders without error', () => {
      const component = shallow(<Loader />);
      expect(component).toMatchSnapshot();
    });
  });
});
