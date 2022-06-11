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