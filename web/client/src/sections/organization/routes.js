'use strict';
import { UserManage, Authority } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/organization',
        key: 'organization',
        breadcrumb: '组织管理',
        menuSelectKeys: ['userManage'],
        menuOpenKeys: ['organization'],
        childRoutes: [{
            path: '/user',
            key: 'userManage',
            menuSelectKeys: ['userManage'],
            component: UserManage,
            breadcrumb: '用户管理',
        }, {
            path: '/authority',
            key: 'authority',
            component: Authority,
            menuSelectKeys: ['authority'],
            breadcrumb: '权限配置',
        }]
    }
}];