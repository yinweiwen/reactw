'use strict';
import { GtpList, GtpView } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/gtp',
        key: 'gtp',
        breadcrumb: '吉他谱',
        component: GtpList,
        childRoutes: [{
            path: '/gtpls',
            key: 'gtpls',
            component: GtpList,
            breadcrumb: '列表'
        }, {
            path: '/view/:id',
            key: 'gtpview',
            component: GtpView,
            breadcrumb: '吉他谱查看',
        }]
    }
}];