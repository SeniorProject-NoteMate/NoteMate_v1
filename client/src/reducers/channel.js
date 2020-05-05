import {
    FETCH_CHANNELS_REQUEST,
    FETCH_CHANNELS_SUCCESS,
    FETCH_CHANNELS_ERROR,
    FETCH_CHANNEL_DETAILS_SUCCESS,
    FETCH_CHANNELS_FOR_USER_SUCCESS
} from '../constants/ActionTypes';

const initialState = { isFetching: false, topChannel: {}, channelDetails: null, channels: null };

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHANNELS_REQUEST:
            return { ...state, isFetching: true };
        case FETCH_CHANNELS_SUCCESS:
            return { ...state, isFetching: false, topChannel: action.channel };
        case FETCH_CHANNEL_DETAILS_SUCCESS:
            return { ...state, isFetching: false, channelDetails: action.channelDetails };
        case FETCH_CHANNELS_FOR_USER_SUCCESS:
            return { ...state, isFetching: false, channels: action.channels };
        case FETCH_CHANNELS_ERROR:
            return { ...state, isFetching: false };
        default:
            return { ...state };
    }
}
