import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import PostContainer from './PostContainer';

//remove this later - just dummy data for testing
const posts = [
    {
        "post": {
          "id": "1",
          "title": "How to Write",
          "content": "To day we will take about...",
          "createdAt": "2019-10-11T08:20:00.000+0000",
          "updatedAt": "2019-11-10T09:25:00.000+0000"
        },
        "channel": {
          "id": "1",
          "name": "English101",
          "bannerUrl": "www.banner1.com"
        },
        "points": 11,
        "userId": "1",
        "userName": "blue01sky02"
    },
    {
        "post": {
          "id": "2",
          "title": "Object Oriented Programming ",
          "content": "Encapsulation",
          "createdAt": '2019-10-10T08:20:00.000+0000',
          "updatedAt": '2019-10-10T09:00:00.000+0000'
        },
        "channel": {
          "id": "2",
          "name": "CS156",
          "bannerUrl": "www.banner1.com"
        },
        "points": 11,
        "userId": "1",
        "userName": "hello02"
    },
    {
        "post": {
          "id": "3",
          "title": "Title of today lecture",
          "content": "Content of the lecture",
          "createdAt": "2019-10-11T08:20:00.000+0000",
          "updatedAt": "2019-11-10T09:25:00.000+0000"
        },
        "channel": {
          "id": "1",
          "name": "Course Name",
          "bannerUrl": "www.banner1.com"
        },
        "points": 11,
        "userId": "1",
        "userName": "bye01"
    },
    {
        "post": {
          "id": "4",
          "title": "on the way",
          "content": "It's raining, taking bus home",
          "createdAt": "2019-10-11T08:20:00.000+0000",
          "updatedAt": "2019-11-10T09:25:00.000+0000"
        },
        "channel": {
          "id": "1",
          "name": "programming",
          "bannerUrl": "www.banner1.com"
        },
        "points": 11,
        "userId": "1",
        "userName": "chan02"
    },
    {
        "post": {
          "id": "5",
          "title": "on the way",
          "content": "It's raining, taking bus home",
          "createdAt": "2019-10-11T08:20:00.000+0000",
          "updatedAt": "2019-11-10T09:25:00.000+0000"
        },
        "channel": {
          "id": "1",
          "name": "programming",
          "bannerUrl": "www.banner1.com"
        },
        "points": 11,
        "userId": "1",
        "userName": "blue01sky02"
    },
    {
        "post": {
          "id": "6",
          "title": "on the way",
          "content": "It's raining, taking bus home",
          "createdAt": "2019-10-11T08:20:00.000+0000",
          "updatedAt": "2019-11-10T09:25:00.000+0000"
        },
        "channel": {
          "id": "1",
          "name": "programming",
          "bannerUrl": "www.banner1.com"
        },
        "points": 11,
        "userId": "1",
        "userName": "blue01sky02"
    }
]

const PostList = ({ post }) => {
    // const state = useSelector(state => state.simpleReducer);
    let ps = null;
    if(typeof posts === 'undefined'){
        //ps = post.posts;
        ps = posts;
    }else ps = posts;

    return (
        <div>
            {
                post.isFetching &&
                <div style={{ marginTop: "3%" }}>
                    <CircularProgress />
                </div>
            }
            {
                !post.isFetching && ps && ps.length > 0 &&
                ps.map(content => (
                        <PostContainer key={content.post.id} postDetails={content} />
                ))
            }
        </div>
    )
}

const FooterDiv = styled.div`
    margin-top: 3%;
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: center;
    border: 1px solid ${props => props.theme.border};
    border-radius: 5px;
    background: ${props => props.theme.foreground};
    padding: 5px;
`;

const CustomButton = styled.div`
    background: ${props => props.theme.buttonColor};
    border-radius: 3px;
    border: 0px;
    width: 100%;
    height: 100%;
    padding: 0.5%;
    display: flex;
    align-items: center;
    :hover{
        background: ${props => props.theme.titleBoxBackgroud};
        cursor: pointer;
    };
`;

const ButtonText = styled.h1`
    color: ${props => props.theme.buttonText};
    margin: 0 auto;
`;

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps)(PostList);

// export default PostList;
