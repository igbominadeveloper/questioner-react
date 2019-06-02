import React from 'react';
import { shallow } from 'enzyme';

import { SingleMeetup } from './SingleMeetup';
const props = {
  meetup: {},
  match: {
    params: {},
  },
  getSingleMeetup: jest.fn(),
};
const component = shallow(<SingleMeetup {...props} />);

describe('Single Meetup', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });
});
