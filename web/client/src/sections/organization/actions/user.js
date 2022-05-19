'use strict';

import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getDepMessage() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_DEPARTMENT_MESSAGE',
        url: ApiTable.getDepMessage,
        msg: { error: '获取部门信息失败' },
        reducer: { name: 'depMessage' }
    });
}

export function getDepUser(depId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_DEPARTMENT_USER',
        url: ApiTable.getDepUser.replace('{depId}', depId),
        msg: { error: '获取部门下用户信息失败' },
        reducer: { name: 'depUser' }
    });
}

export function createUser(data) {
    return dispatch => basicAction({
        type: 'post',
        data,
        dispatch: dispatch,
        actionType: 'CREATE_DEPARTMENT_USER',
        url: ApiTable.createUser,
        msg: { option: '新建用户' },
    });
}

export function updateUser(id, data) {
    return dispatch => basicAction({
        type: 'put',
        data,
        dispatch: dispatch,
        actionType: 'UPDATE_DEPARTMENT_USER',
        url: ApiTable.updateUser.replace('{id}', id),
        msg: { option: '修改用户' },
    });
}

export function delUser(ids) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DEL_DEPARTMENT_USER',
        url: ApiTable.delUser.replace('{ids}', ids),
        msg: { option: '删除用户' },
    });
}

export function resetPwd(id, data) {
    return dispatch => basicAction({
        type: 'put',
        data,
        dispatch: dispatch,
        actionType: 'CREATE_DEPARTMENT_USER',
        url: ApiTable.resetPwd.replace('{id}', id),
        msg: { option: '重置用户密码' },
    });
}

export default {
    getDepMessage,
    getDepUser,
    createUser,
    updateUser,
    delUser,
    resetPwd
}