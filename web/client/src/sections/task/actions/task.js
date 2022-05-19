'use strict';

import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getMembers(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_MEMBERS',
        url: `${ApiTable.getEnterprisesMembers.replace('{enterpriseId}', orgId)}`,
        msg: { error: '获取用户列表失败' },
        reducer: { name: 'members' }
    });
}

export function getTaskList(query) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        query: query,
        actionType: 'GET_TASK_LIST',
        url: ApiTable.getTasks,
        msg: { error: '获取任务列表失败' },
        reducer: { name: 'taskList' }
    })
}

export function getTaskCatalogs() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_TASK_CATALOGS',
        url: ApiTable.getTaskCatalogs,
        msg: { error: '获取任务分组失败' },
        reducer: { name: 'taskCatalogs' }
    })
}

export function addTaskCatalog(data){
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        data: data,
        actionType: 'POST_TASK_CATALOG',
        url: ApiTable.addTaskCatalog,
        msg: { option: '添加任务分类' }
    })
}

export function editTaskCatalog(data, taskCatalogId) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        data: data,
        actionType: 'EDIT_TASK_CATALOG',
        url: `${ApiTable.editTaskCatalog.replace('{taskCatalogId}', taskCatalogId)}`,
        msg: { option: '编辑任务分类' }
    })
}

export function delTaskCatalog(taskCatalogId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DEL_TASK_CATALOG',
        url: `${ApiTable.delTaskCatalog.replace('{taskCatalogId}', taskCatalogId)}`,
        msg: { option: '删除任务分组' }
    })
}

export function getTaskTypes() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_TASK_TYPES',
        url: ApiTable.getTaskTypes,
        msg: { error: '获取任务类型失败' },
        reducer: { name: 'taskTypes' }
    })
}

export function addTask(data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        data: data,
        actionType: 'POST_TASK_CONFIG',
        url: ApiTable.addTaskConfig,
        msg: { option: '添加任务' }
    })
}

export function editTask(data, taskId) {
    return dispatch => basicAction({
        type: 'put',
        dispatch: dispatch,
        data: data,
        actionType: 'EDIT_TASK_CONFIG',
        url: `${ApiTable.editTaskConfig.replace('{taskId}', taskId)}`,
        msg: { option: '编辑任务' }
    })
}

export function delTask(taskId) {
    return dispatch => basicAction({
        type: 'del',
        dispatch: dispatch,
        actionType: 'DEL_TASK_CONFIG',
        url: `${ApiTable.delTaskConfig.replace('{taskId}', taskId)}`,
        msg: { option: '删除任务' }
    })
}