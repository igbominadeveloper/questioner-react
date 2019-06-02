import React from 'react';
import { shallow } from 'enzyme';

import AdminWrapper from './AdminWrapper';

const component = shallow(<AdminWrapper />);

describe('AdminWrapper', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });
});
