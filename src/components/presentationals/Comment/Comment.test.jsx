import React from 'react';
import { shallow } from 'enzyme';

import Comment from './Comment';
const props = {
  comment: {
    comment: '',
    user: {
      firstname: '',
      lastname: '',
    },
    created_at: Date.now(),
  },
};

const component = shallow(<Comment {...props} />);

describe('Comment', () => {
  it('renders without errors', () => {
    expect(component).toMatchSnapshot();
  });
});
