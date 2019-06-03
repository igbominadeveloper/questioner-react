import React from 'react';
import { shallow } from 'enzyme';

import Footer from './Footer';

describe('Footer', () => {
  describe('Render', () => {
    it('renders without error', () => {
      const component = shallow(<Footer />);
      expect(component).toMatchSnapshot();
    });
  });
});
