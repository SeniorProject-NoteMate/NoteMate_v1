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

const initialState = { isFetching: false, isFetchingSavedPost: false, 
                        posts: [], postDetails: null, isCreating: false, 
                        newPost: null, savedPosts: null, votedPosts: null, 
                        upVotedPosts: null, downVotedPosts: null};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return { ...state, isFetching: true, 
                    post: null, newPost: null };
        case FETCH_POSTS_SUCCESS:
            return { ...state, isFetching: false, posts: action.posts };
        case FETCH_POSTS_ERROR:
            return { ...state, isFetching: false };

        case FETCH_SAVED_POSTS_REQUEST:
            return { ...state, isFetchingSavedPost: true};
        case FETCH_SAVED_POSTS_SUCCESS:
            return { ...state, isFetchingSavedPost: false, savedPosts: action.posts, 
                        votedPosts: action.votedPosts , upVotedPosts: action.upVotedPosts, 
                        downVotedPosts: action.downVotedPosts };
        case FETCH_SAVED_POSTS_ERROR:
            return { ...state, isFetchingSavedPost: false };

        case UPDATE_SAVED_POSTS:
            return { ...state, savedPosts: action.posts };

        case UPDATE_UPVOTED_POSTS:
            return { ...state, upVotedPosts: action.posts };

        case UPDATE_DOWNVOTED_POSTS:
            return { ...state, downVotedPosts: action.posts };

        case FETCH_POST_REQUEST:
            return { ...state, isFetching: true, postDetails: null };
        case FETCH_POST_SUCCESS:
            return { ...state, isFetching: false, postDetails: action.post };
        case FETCH_POST_ERROR:
            return { ...state, isFetching: false };

        case CREATE_POST_REQUEST:
            return { ...state, isCreating: true, newPost: null };
        case CREATE_POST_SUCCESS:
            return { ...state, isCreating: false, newPost: action.post };
        case CREATE_POST_ERROR:
            return { ...state, isCreating: false };

        default:
            return { ...state };
    }
}