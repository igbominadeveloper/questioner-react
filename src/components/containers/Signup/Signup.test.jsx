import React from 'react';
import { shallow } from 'enzyme';

import { Signup } from './Signup';

import { findByTestAttribute } from '../../../utils/testHelpers';

const component = shallow(<Signup />);

describe('Custom Search', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders the form section', () => {
    expect(findByTestAttribute(component, 'reg-form').length).toBe(1);
  });
});
