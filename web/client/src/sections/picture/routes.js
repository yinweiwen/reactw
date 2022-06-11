'use strict';
import { PicList } from './containers';

export default [{
    type: 'inner',
    route: {
        path: '/pic',
        key: 'pic',
        breadcrumb: '图片库',
        childRoutes: [{
            path: '/listp',
            key: 'listp',
            component: PicList,
            breadcrumb: 'beauty',
        }]
    }
}];