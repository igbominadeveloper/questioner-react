import React from 'react';
import { shallow } from 'enzyme';

import Question from './Question';

const props = {
  question: {
    user: {
      firstname: '',
      lastname: '',
    },
  },
};

describe('Question', () => {
  describe('Render', () => {
    it('renders without error', () => {
      const component = shallow(<Question {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});
