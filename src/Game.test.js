import React from 'react';
import {shallow} from 'enzyme';
import Game from './Game';
import Board from './Board';

it('renders without crashing', () => {
  shallow(<Game />);
});

it('contains a board', () => {
  let wrapper = shallow(<Game />);
  expect(wrapper.find('Board').length).toBe(1);
});
