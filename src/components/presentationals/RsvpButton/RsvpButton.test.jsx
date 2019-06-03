import React from 'react';
import { shallow } from 'enzyme';

import RsvpButton from './RsvpButton';

const props = {
  onClick: jest.fn(),
  className: '',
  text: '',
};

describe('RsvpButton', () => {
  describe('Render', () => {
    it('renders without error', () => {
      const component = shallow(<RsvpButton {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});
