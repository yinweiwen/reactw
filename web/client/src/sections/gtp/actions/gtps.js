'use strict';

import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getGtps() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_GTPS',
        url: `${ApiTable.getGtps}`,
        msg: { error: '获取列表失败' },
        reducer: { name: 'gtps' }
    });
}

export function getQiniuToken() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_QINIU',
        url: `${ApiTable.qiniuToken}`,
        msg: { error: '获取七牛token失败' },
        reducer: { name: 'qiniu_token' }
    })
}

export function addGtp(data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        data: data,
        actionType: 'POST_GTP',
        url: `${ApiTable.addGtp}`,
        msg: { option: '添加Guita' }
    })
}

export function editGtp(data, gtpid) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        data: data,
        actionType: 'EDIT_GTP',
        url: `${ApiTable.editGtp.replace('{gtpid}', gtpid)}`,
        msg: { option: '编辑Guita' }
    })
}