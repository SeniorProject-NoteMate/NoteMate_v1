import React from 'react';
import { shallow } from 'enzyme';
import PostContainer from '../PostContainer';

it('renders without crashing', () => {
    shallow(<PostContainer/>);
});
