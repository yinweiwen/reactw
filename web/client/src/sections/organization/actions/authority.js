'use strict';

import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getAuthority(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_MEMBERS',
        url: `${ApiTable.getEnterprisesMembers.replace('{enterpriseId}', orgId)}`,
        msg: { error: '获取用户列表失败' },
        reducer: { name: 'members' }
    });
}
export function getResource(userId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_RESOURCE',
        url: `${ApiTable.getResource}`,
        msg: { error: '获取权限失败' },
        reducer: { name: 'resource' }
    });
}
export function getUserResource(userId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_USER_RESOURCE',
        url: `${ApiTable.getUserResource}?userId=${userId}`,
        msg: { error: '获取用户权限失败' },
        reducer: { name: 'userResource' }
    });
}
export function postUserRes(body) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        actionType: 'UPDATE_USER_RESOURCE',
        url: `${ApiTable.postUserRes}`,
        data: body,
        msg: { success: '更新用户权限' }
    });
}
export default {
    getAuthority,
    getResource,
    getUserResource,
    postUserRes
}