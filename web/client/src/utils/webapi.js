'use strict';
import request from 'superagent';

export const ApiTable = {
    login: 'login',
    logout: 'logout',

    getEnterprisesMembers: 'enterprises/{enterpriseId}/members',

    //组织管理-用户管理
    getDepMessage: 'organization/department',
    getDepUser: 'organization/department/{depId}/user',
    createUser: 'organization/department/user',
    updateUser: 'organization/department/user/{id}',
    delUser: 'organization/department/user/{ids}',
    resetPwd: '/organization/department/user/resetPwd/{id}',

    //用户权限
    getResource: 'resource',
    getUserResource: 'user/resource',
    postUserRes: 'user/resource',

    //报表配置
    allAreas: 'allAreas',
    addReportConfig: 'report/config',
    getReportConfig: 'report/config',
    editReportConfig: 'report/{reportId}/config',
    delReportConfig: 'report/{reportId}/config',

    // 报表编辑
    getReportRectify: 'report/rectify',
    getReportRectifyDetail: 'report/rectify/detail',
    compileReportRectifyDetail: 'report/rectify/detail',

    //报表下载
    getReportList: 'report/list',

    // tasks
    getTaskCatalogs: 'task/catalogs',
    getTaskTypes: 'task/types',
    getTasks: 'task/list',

    // pics
    getPicList: 'images/list',
    delPic: 'image/del',

    // gtps
    getGtps: 'gtp/list',
    addGtp: 'gtp',
    editGtp: 'gtp/{gtpid}',
    delGtp: 'gtp/{gtpid}',

    //Task配置
    addTaskConfig: 'task/config',
    getTaskConfig: 'task/config',
    editTaskConfig: 'task/{taskId}/config',
    delTaskConfig: 'task/{taskId}/config',

    addTaskCatalog: 'task/catalog',
    editTaskCatalog: 'task/{taskCatalogId}/catalog',
    delTaskCatalog: 'task/{taskCatalogId}/catalog',
};

export const RouteTable = {
    apiRoot: '/api/root',
    fileUpload: '/_upload/new',
    cleanUpUploadTrash: '/_upload/cleanup',
};