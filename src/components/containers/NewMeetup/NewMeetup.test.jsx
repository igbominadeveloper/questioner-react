import React from 'react';
import { shallow } from 'enzyme';

import { NewMeetup } from './NewMeetup';

const component = shallow(<NewMeetup />);

describe('New Meetup', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });
});
