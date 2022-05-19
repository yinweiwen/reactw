'use strict';

import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function reportRectify (timeRange) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_REPORT_RECTIFY',
        url: `${ApiTable.getReportRectify}?startTime=${timeRange ? timeRange[0] : ''}&endTime=${timeRange ? timeRange[1] : ''}`,
        msg: {},
        reducer: { name: 'reportRectify' }
    });
}

export function reportRectifyDetail (day, depId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_REPORT_RECTIFY_DETAIL',
        url: `${ApiTable.getReportRectifyDetail}?day=${day}&depId=${depId}`,
        msg: {},
        reducer: { name: 'reportRectifyDetail' }
    });
}

export function compileReportRectifyDetail (data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        data,
        actionType: 'COMPILE_REPORT_RECTIFY_DETAIL',
        url: `${ApiTable.compileReportRectifyDetail}`,
        msg: { option: '保存信息' },
    });
}