'use strict';
import Immutable from 'immutable';
import { INIT_LAYOUT, RESIZE  } from '../actions/global';

function global(state = {
    title: '',
    copyright: '',
    sections: [],
    actions: {},
    plugins: {},
    clientHeight: 768,
    clientWidth: 1024
}, action) {
    const payload = action.payload;
    switch (action.type) {
        case RESIZE:
            return Immutable.fromJS(state).merge({
                clientHeight: payload.clientHeight,
                clientWidth: payload.clientWidth
            }).toJS();
        case INIT_LAYOUT:
            return {
                title: payload.title,
                copyright: payload.copyright,
                sections: payload.sections,
                actions: payload.actions,
                plugins: payload.plugins,
                clientHeight: state.clientHeight,
                detailsComponent: null
            };
        // case INIT_RESOURCE_ROOT:
        //     return Immutable.fromJS(state).merge(payload).toJS();
        // case INIT_PAGE_HEADER_DETAILS:
        //     return Immutable.fromJS(state).merge({
        //         detailsComponent: payload.component
        //     }).toJS();
        default:
            return state;
    }
}

export default global;