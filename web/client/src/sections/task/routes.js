'use strict';
import { TaskList,TaskCatalog } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/task',
        key: 'task',
        breadcrumb: '栗子',
        // 不设置 component 则面包屑禁止跳转
        childRoutes: [{
            path: '/list',
            key: 'list',
            component: TaskList,
            breadcrumb: '棒子',
        },{
            path: '/catalogs',
            key: 'catalogs',
            component: TaskCatalog,
            breadcrumb: '分组',
        }]
    }
}];