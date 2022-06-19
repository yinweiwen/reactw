'use strict';

import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getGtps(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_GTPS',
        url: `${ApiTable.getGtps}`,
        msg: { error: '获取列表失败' },
        reducer: { name: 'gtps' }
    });
}