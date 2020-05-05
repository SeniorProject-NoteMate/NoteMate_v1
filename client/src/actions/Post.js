import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_ERROR,
    FETCH_POST_REQUEST,
    FETCH_POST_SUCCESS,
    FETCH_POST_ERROR,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_ERROR,
    FETCH_SAVED_POSTS_REQUEST,
    FETCH_SAVED_POSTS_SUCCESS,
    FETCH_SAVED_POSTS_ERROR,
    UPDATE_SAVED_POSTS,
    UPDATE_UPVOTED_POSTS,
    UPDATE_DOWNVOTED_POSTS
} from '../constants/ActionTypes';

import {
    getPosts,
    getSortedPosts,
    getAPost,
    createAPost,
    getSearchedPosts,
    getPostsByUserId,
    getSavedPostsByUserId,
    getUpVotedPostsByUserId,
    getDownVotedPostsByUserId,
    getVotedPostsByUserId
} from '../utils/api';

import {
    requestChannelDetails
} from './Channel';

const fetchPostsRequest = { type: FETCH_POSTS_REQUEST };
const fetchPostsSuccess = posts => ({ type: FETCH_POSTS_SUCCESS, posts });
const fetchPostsError = error => ({ type: FETCH_POSTS_ERROR, error });

const fetchSavedPostsRequest = { type: FETCH_SAVED_POSTS_REQUEST };
const fetchSavedPostsSuccess = (posts, votedPosts, upVotedPosts, downVotedPosts) => (
    { type: FETCH_SAVED_POSTS_SUCCESS, posts, votedPosts, upVotedPosts, downVotedPosts}
);
const fetchSavedPostsError = error => ({ type: FETCH_SAVED_POSTS_ERROR, error });

const fetchAPostRequest = { type: FETCH_POST_REQUEST };
const fetchAPostSuccess = post => ({ type: FETCH_POST_SUCCESS, post });
const fetchAPostError = error => ({ type: FETCH_POST_ERROR, error });

const createPostSuccess = post => ({ type: CREATE_POST_SUCCESS, post });
const createPostError = error => ({ type: CREATE_POST_ERROR, error });


export const requestPosts = (channel = '', sortby='', search='') => async dispatch => {
    dispatch(fetchPostsRequest);
    try {
        if(search === ""){
            const posts = await getPosts(channel,sortby);
            dispatch(fetchPostsSuccess(posts));
        }else{
            const posts = await getSearchedPosts(search);
            dispatch(fetchPostsSuccess(posts));
        }

    } catch (error) {
        dispatch(fetchPostsError(error));
    }
};

export const requestPostsByUserId = (userId) => async dispatch => {
    dispatch(fetchPostsRequest);
    try {
        const posts = await getPostsByUserId(userId);
        dispatch(fetchPostsSuccess(posts));
    } catch (error) {
        dispatch(fetchPostsError(error));
    }
};

export const requestSavedPostsByUserId = (userId) => async dispatch => {
    dispatch(fetchSavedPostsRequest);
    try {
        const posts = await getSavedPostsByUserId(userId);
        const votedPosts = await getVotedPostsByUserId(userId);
        const upVotedPosts = await getUpVotedPostsByUserId(userId);
        const downVotedPosts = await getDownVotedPostsByUserId(userId);
        dispatch(fetchSavedPostsSuccess(posts,votedPosts,upVotedPosts,downVotedPosts));
    } catch (error) {
        dispatch(fetchSavedPostsError(error));
    }
};

export const updateSavedPosts = (posts) => async dispatch => {
    dispatch({type: UPDATE_SAVED_POSTS, posts});
};

export const updateUpVotedPosts = (posts) => async dispatch => {
    dispatch({type: UPDATE_UPVOTED_POSTS, posts});
};

export const updateDownVotedPosts = (posts) => async dispatch => {
    dispatch({type: UPDATE_DOWNVOTED_POSTS, posts});
};

export const requestSearchedPosts = (queryTerm) => async dispatch => {
    dispatch(fetchPostsRequest);
    try {
        const posts = await getSearchedPosts(queryTerm);
        dispatch(fetchPostsSuccess(posts));
    } catch (error) {
        dispatch(fetchPostsError(error));
    }
};

export const requestSortedPosts = (sortby) => async dispatch => {
    dispatch(fetchPostsRequest);
    try {
        const posts = await getSortedPosts(sortby);
        dispatch(fetchPostsSuccess(posts));
    } catch (error) {
        dispatch(fetchPostsError(error));
    }
};

export const requestAPost = (postId) => async dispatch => {
    dispatch(fetchAPostRequest);
    try {
        const post = await getAPost(postId);
        dispatch(fetchAPostSuccess(post));
        dispatch(requestChannelDetails(post.channel.id));
    } catch (error) {
        dispatch(fetchAPostError(error));
    }
};

export const postAPost = (newPost) => async dispatch => {
    dispatch({type: CREATE_POST_REQUEST});
    try{
        const post = await createAPost(newPost);
        dispatch(createPostSuccess(post));
    }catch (error) {
        dispatch(createPostError(error));
    }
}
