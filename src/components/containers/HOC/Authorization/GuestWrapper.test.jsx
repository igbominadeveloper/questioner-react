import React from 'react';
import { shallow } from 'enzyme';

import { GuestWrapper } from './GuestWrapper';

const component = shallow(<GuestWrapper />);

describe('GuestWrapper', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });
});
