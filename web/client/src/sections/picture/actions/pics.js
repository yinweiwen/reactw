'use strict';

import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getPics(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_MEMBERS',
        url: `${ApiTable.getEnterprisesMembers.replace('{enterpriseId}', orgId)}`,
        msg: { error: '获取用户列表失败' },
        reducer: { name: 'members' }
    });
}

export function getPicList(query){
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_PIC_LIST',
        query: query,
        url: `${ApiTable.getPicList}`,
        msg: { error: '获取图库列表失败' },
        reducer: { name: 'picList' }
    })
}

export function delQiniuPic(data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        data: data,
        actionType: 'DEL_QINIU_PIC',
        url: `${ApiTable.delPic}`,
        msg: { option: '删除Qiniu图片' }
    })
}