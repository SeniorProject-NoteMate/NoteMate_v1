import{
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_ERROR,
    FETCH_COMMENTS_BY_USERID_REQUEST,
    FETCH_COMMENTS_BY_USERID_SUCCESS,
    FETCH_COMMENTS_BY_USERID_ERROR,
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_ERROR
} from '../constants/ActionTypes';

import {
    getCommentsby,
    getCommentsByUserId,
    createAComment
} from '../utils/api';

const fetchCommentsRequest = { type: FETCH_COMMENTS_REQUEST };
const fetchCommentsSuccess = comments => ({ type: FETCH_COMMENTS_SUCCESS, comments });
const fetchCommentsError = error => ({ type: FETCH_COMMENTS_ERROR, error });

const fetchCommentsByUserIdRequest = { type: FETCH_COMMENTS_BY_USERID_REQUEST };
const fetchCommentsByUserIdSuccess = comments => ({ type: FETCH_COMMENTS_BY_USERID_SUCCESS, comments });
const fetchCommentsByUserIdError = error => ({ type: FETCH_COMMENTS_BY_USERID_ERROR, error });

const createCommentRequest = { type: CREATE_COMMENT_REQUEST };
const createCommentSuccess = comment => ({ type: CREATE_COMMENT_SUCCESS, comment });
const createCommentError = error => ({ type: CREATE_COMMENT_ERROR, error });

export const requestComments = (postId) => async dispatch => {
    dispatch(fetchCommentsRequest);
    try{
        const comments = await getCommentsby(postId);
        dispatch(fetchCommentsSuccess(comments));
    }catch(err){
        dispatch(fetchCommentsByUserIdError(err));
    }
}

export const requestCommentsByUserId = (userId) => async dispatch => {
    dispatch(fetchCommentsByUserIdRequest);
    try{
        const comments = await getCommentsByUserId(userId);
        dispatch(fetchCommentsByUserIdSuccess(comments));
    }catch(err){
        dispatch(fetchCommentsError(err));
    }
}

export const postAComment = (body) => async dispatch => {
    dispatch(createCommentRequest);
    try{
        const comment = await createAComment(body);
        dispatch(createCommentSuccess(comment));
    }catch(err){
        dispatch(createCommentError(err));
    }
}