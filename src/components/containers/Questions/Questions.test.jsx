import React from 'react';
import { shallow } from 'enzyme';

import { Questions } from './Questions';
const props = {
  getQuestions: jest.fn(),
};

const component = shallow(<Questions {...props} />);

describe('Questions', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });
});
