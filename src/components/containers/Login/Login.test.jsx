import React from 'react';
import { shallow } from 'enzyme';

import { Login } from './Login';

import { findByTestAttribute } from '../../../utils/testHelpers';

const component = shallow(<Login />);

describe('Custom Search', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders the form section', () => {
    expect(findByTestAttribute(component, 'login-form').length).toBe(1);
  });

  it('renders a submit button', () => {
    expect(findByTestAttribute(component, 'submit-button').length).toBe(1);
  });
});
