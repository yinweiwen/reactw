'use strict';

import { ApiTable } from '$utils'
import { Request } from '@peace/utils'

export const INIT_AUTH = 'INIT_AUTH';
export function initAuth() {
    const user = JSON.parse(sessionStorage.getItem('user')) || {};
    return {
        type: INIT_AUTH,
        payload: {
            user: user
        }
    };
}

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export function login(username, password) {
    return dispatch => {
        dispatch({ type: REQUEST_LOGIN });

        if (!username || !password) {
            dispatch({
                type: LOGIN_ERROR,
                payload: { error: '请输入账号名和密码' }
            });
            return Promise.resolve();
        }

        const url = ApiTable.login;
        return Request.post(url, { username, password, p: '456' })
            .then(user => {
                sessionStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { user: user },
                });
            }, error => {
                let { body } = error.response;
                dispatch({
                    type: LOGIN_ERROR,
                    payload: {
                        error: body && body.message ? body.message : '登录失败'
                    }
                })
            });
    }
}

export const LOGOUT = 'LOGOUT';
export function logout(user) {
    const token = user.token;
    const url = ApiTable.logout;
    sessionStorage.removeItem('user');
    Request.put(url, {
        token: token
    });
    return {
        type: LOGOUT
    };
}

export default {
    initAuth,
    login,
    logout
}