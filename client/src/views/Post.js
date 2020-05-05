import React, { useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import { requestAPost } from '../actions/Post';
import { requestComments } from '../actions/Comment';

import ChannelContainers from '../components/ChannelContainers';
import PostContainer from '../components/PostContainer';
import CommentBox from '../components/CommentBox';
import CommentList from '../components/CommentList';

const Post = ({ match, requestAPost, requestComments }) => {
    const { params: { postId } } = match;
    const post = useSelector(state => state.post);
    const channel = useSelector(state => state.channel);
    const newComment = useSelector(state => state.comment.newComment);
    const normalizedComments = useSelector(state => state.comment.normalizedComments)

    useEffect(() => {
        requestAPost(postId);
        requestComments(postId);
    }, [requestAPost, requestComments, postId, newComment]);

    let renderComment = commentId => {
        return (
            <CommentList id={commentId} key={commentId}/>
        )
      }
    

    return (
        <FirstContainer>
            <SecondContainer>
                <Grid container direction="row" justify="center">
                    <CenterContainer>
                        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3} style={{ marginBottom: 0 }}>
                            <Grid item xs={9}>
                                <PostCommentContainer>
                                    {post.postDetails != null && <PostContainer postDetails={post.postDetails} />}
                                    <CommentBox postDetails={post.postDetails}/>
                                    <CommnentListContainer>
                                        {
                                            normalizedComments != null && (typeof normalizedComments.posts[postId])  !== 'undefined' && normalizedComments.posts[postId].comments.map(
                                                value => renderComment(value)
                                            ) 
                                        } 
                                    </CommnentListContainer>
                                </PostCommentContainer>
                            </Grid>
                            <Grid item xs={3}>
                                {channel.channelDetails != null && <ChannelContainers />}
                            </Grid>
                        </Grid>
                    </CenterContainer>
                </Grid>
            </SecondContainer>
        </FirstContainer>
    );
};

const CommnentListContainer = styled.div`
    margin-top: 5%;
`;

const CenterContainer = styled.div`
    margin: 0 5%;
    width: 100%;
`;

const PostCommentContainer = styled.div`
    background-color: ${props => props.theme.foreground};
    padding-bottom: 2%;
`;

const FirstContainer = styled.div`
    background-color: ${props => props.theme.background};
`;

const SecondContainer = styled.div`
    background-color: ${props => props.theme.darkerBackground};
    margin: 0px 5%; 
`;
const mapDispatchToProps = { requestAPost, requestComments };

export default connect(null,mapDispatchToProps)(Post);
