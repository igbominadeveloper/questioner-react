import React from 'react';
import { shallow } from 'enzyme';

import Layout from './Layout';

import { findByTestAttribute } from '../../utils/testHelpers';

const component = shallow(<Layout />);

describe('Custom Search', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders a nav html element', () => {
    const wrapper = findByTestAttribute(component, 'container-fluid');
    expect(wrapper.length).toBe(1);
  });

  it('renders the navbar', () => {
    const wrapper = findByTestAttribute(component, 'navbar');
    expect(wrapper.length).toBe(1);
  });
});
