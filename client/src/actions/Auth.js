import{
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR
} from '../constants/ActionTypes';

import {
    login
} from '../utils/api';

import { ACCESS_TOKEN} from '../constants';

const fetchLoginRequest = { type: FETCH_LOGIN_REQUEST };
const fetchLoginSuccess = token => ({ type: FETCH_LOGIN_SUCCESS, token });
const fetchLoginError = error => ({ type: FETCH_LOGIN_ERROR, error });

export const requestLogin = (loginRequest) => async dispatch => {
    dispatch(fetchLoginRequest);
    try {
        const token = await login(loginRequest);
        localStorage.setItem(ACCESS_TOKEN, token);
        dispatch(fetchLoginSuccess(token));
    } catch (error) {
        dispatch(fetchLoginError(error));
    }
};