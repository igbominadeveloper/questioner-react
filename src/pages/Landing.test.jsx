import React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from './Landing';
import { findByTestAttribute } from '../utils/testHelpers';
const props = {
  upcomingMeetups: {},
  getUpcomingMeetups: jest.fn(),
};
const component = shallow(<HomePage {...props} />);

describe('Custom Search', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders the header section', () => {
    const wrapper = findByTestAttribute(component, 'header');
    expect(wrapper.length).toBe(1);
  });

  it('renders the banner', () => {
    const wrapper = findByTestAttribute(component, 'banner-title');
    expect(wrapper.length).toBe(1);
  });

  it('renders the signup link on the banner', () => {
    const wrapper = findByTestAttribute(component, 'signup');
    expect(wrapper.length).toBe(1);
  });
});
