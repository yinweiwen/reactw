'use strict';
import { Config, Download, Compile } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/report',
        key: 'report',
        breadcrumb: '报表管理',
        menuSelectKeys: ['config'],
        menuOpenKeys: ['report'],
        // 不设置 component 则面包屑禁止跳转
        childRoutes: [{
            path: '/config',
            key: 'reportConfig',
            component: Config,
            menuSelectKeys:['reportConfig'],
            breadcrumb: '报表配置',
        }, {
            path: '/download',
            key: 'reportDownload',
            menuSelectKeys:['reportDownload'],
            component: Download,
            breadcrumb: '报表下载',
        }, {
            path: '/compile',
            key: 'reportCompile',
            menuSelectKeys:['reportCompile'],
            component: Compile,
            breadcrumb: '整治汇总表',
        }]
    }
}];