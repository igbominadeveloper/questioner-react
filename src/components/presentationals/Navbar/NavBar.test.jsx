import React from 'react';
import { shallow } from 'enzyme';

import NavBar from './Navbar';

import { findByTestAttribute } from '../../../utils/testHelpers';

const component = shallow(<NavBar />);

describe('Custom Search', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders a nav html element', () => {
    const wrapper = findByTestAttribute(component, 'navbar');
    expect(wrapper.length).toBe(1);
  });

  it('renders the navlinks', () => {
    const wrapper = findByTestAttribute(component, 'nav-links');
    expect(wrapper.length).toBe(1);
  });
});
