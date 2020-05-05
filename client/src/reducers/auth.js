import jwtDecode from 'jwt-decode';

import{
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR
} from '../constants/ActionTypes';

import { ACCESS_TOKEN } from '../constants/';

const token = localStorage.getItem(ACCESS_TOKEN);
let user = {
    id:"",
    name:""
};
// if(token !== null){
//     const jwtd = jwtDecode(token);
//     user.id = jwtd.jti;
//     user.name = jwtd.sub; 
// } 

const initialState = { isFetching: false, user: user, accessToken: token };

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOGIN_REQUEST:
            return { ...state, isFetching: true};
        case FETCH_LOGIN_SUCCESS:
            const jwtd = jwtDecode(action.token);
            user.id = jwtd.jti;
            user.name = jwtd.sub; 
            return { ...state, isFetching: false, accessToken: action.token, 
                                user: user };
        case FETCH_LOGIN_ERROR:
            return { ...state, isFetching: false };

        default:
            return { ...state };
    }
}