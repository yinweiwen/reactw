'use strict';

import { Login } from './containers';

export default [{
    type: 'outer',
    route: {
        key:'signin',
        path: "/signin",
        component: Login
    }
}];