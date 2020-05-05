import {
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

const intialState = { isCreating: false, normalizedComments: null, comments: null, newComment: null };

export default (state = intialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS_REQUEST:
            return { ...state, isFetching: true };
        case FETCH_COMMENTS_SUCCESS:
            return { ...state, isFetching: false, normalizedComments: action.comments };
        case FETCH_COMMENTS_ERROR:
            return { ...state, isFetching: false };

        case FETCH_COMMENTS_BY_USERID_REQUEST:
            return { ...state, isFetching: true };
        case FETCH_COMMENTS_BY_USERID_SUCCESS:
            return { ...state, isFetching: false, comments: action.comments };
        case FETCH_COMMENTS_BY_USERID_ERROR:
            return { ...state, isFetching: false };

        case CREATE_COMMENT_REQUEST:
            return { ...state, isCreating: true, newComment: null };
        case CREATE_COMMENT_SUCCESS:
            return { ...state, isCreating: false, newComment: action.comment };
        case CREATE_COMMENT_ERROR:
            return { ...state, isCreating: false };
        default:
            return { ...state };
    }
}