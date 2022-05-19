'use strict';
import { RouteRequest } from '@peace/utils';
import { RouteTable } from '$utils'

export const INIT_LAYOUT = 'INIT_LAYOUT';
export function initLayout(title, copyright, sections, actions) {
    return {
        type: INIT_LAYOUT,
        payload: {
            title,
            copyright,
            sections,
            actions
        }
    };
}

export const RESIZE = 'RESIZE';
export function resize(clientHeight, clientWidth) {
    return {
        type: RESIZE,
        payload: {
            clientHeight,
            clientWidth
        }
    }
}

export const INIT_API_ROOT = 'INIT_API_ROOT';
export function initApiRoot() {
    return dispatch => {
        RouteRequest.get(RouteTable.apiRoot).then(res => {
            localStorage.setItem('tyApiRoot', res.root);
            dispatch({
                type: INIT_API_ROOT,
                payload: {
                    apiRoot: res.root
                }
            })
        });
    }
}