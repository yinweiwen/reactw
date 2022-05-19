import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getReportList(query) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        query: query,
        actionType: 'GET_REPORT_LIST',
        url: ApiTable.getReportList,
        msg: { error: '获取报表数据失败' },
        reducer: { name: 'reportList' }
    });
}

export function getRegionList(query) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        query: query,
        actionType: 'GET_REGION_LIST',
        url: ApiTable.allAreas,
        msg: { error: '获取区域数据失败' },
        reducer: { name: 'regionList' }
    });
}