import React from 'react';
import { shallow } from 'enzyme';

import MeetupCard from './MeetupCard';

const props = {
  values: {
    images: [],
  },
};

describe('MeetupCard', () => {
  describe('Render', () => {
    it('renders without error', () => {
      const component = shallow(<MeetupCard {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});
