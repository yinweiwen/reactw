/**
 * Created by liu.xinyi
 * on 2016/4/8.
 */
'use strict';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import innerReducers from '../reducers';

function configStore(reducers, history) {
    const reducer = Object.assign({}, innerReducers, reducers, {
        router: connectRouter(history)
    });

    const composeEnhancers =
        typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const enhancers = composeEnhancers(
        applyMiddleware(routerMiddleware(history), reduxThunk)
    );

    return createStore(combineReducers(reducer), {}, enhancers);
}

export default configStore;