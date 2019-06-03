import React from 'react';
import { shallow } from 'enzyme';

import { Comments } from './Comments';
const props = {
  comment: [],
};

const component = shallow(<Comments {...props} />);

describe('Comments', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });
});
