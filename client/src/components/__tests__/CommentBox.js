import React from 'react';
import { shallow } from 'enzyme';
import CommentBox from '../CommentBox';

it("renders without crashing", () => {
    shallow(<CommentBox/>);
});