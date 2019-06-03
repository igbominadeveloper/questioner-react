import React from 'react';
import { shallow } from 'enzyme';

import Image from './Image';

const props = {
  url: '',
};

describe('Image', () => {
  describe('Render', () => {
    it('renders without error', () => {
      const component = shallow(<Image {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});
