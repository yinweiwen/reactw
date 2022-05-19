'use strict';

import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function allAreas (orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_ALL_AREAS',
        url: `${ApiTable.allAreas}`,
        msg: {},
        reducer: { name: 'allAreas' }
    });
}

export function addReportConfig (data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        data: data,
        actionType: 'POST_REPORT_CONFIGS',
        url: `${ApiTable.addReportConfig}`,
        msg: { option: '添加报表配置' },
    });
}

export function getReportConfig () {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_REPORT_CONFIGS',
        url: `${ApiTable.getReportConfig}`,
        msg: { error: '获取报表配置失败' },
        reducer: { name: 'reportConfig' }
    });
}

export function editReportConfig (data, configId) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        data: data,
        actionType: 'EDIT_REPORT_CONFIGS',
        url: `${ApiTable.editReportConfig.replace('{reportId}', configId)}`,
        msg: { option: '编辑报表配置' },
    });
}

export function delReportConfig (configId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DEL_REPORT_CONFIGS',
        url: `${ApiTable.delReportConfig.replace('{reportId}', configId)}`,
        msg: { option: '删除报表配置' },
    });
}

