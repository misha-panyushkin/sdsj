import React from 'react'
import { render } from 'react-dom'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { Route, Router, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'

import * as Reducers from './Reducers'

import App from 'UI/App/App.react'
import VisualisationIndex from 'UI/Visualisation/Index.react'

// Middleware
import thunk from 'redux-thunk'
import API from 'Middleware/API'

import 'moment-duration-format'

import _b from 'bem-cn'
import es6Promise from 'es6-promise'

_b.setup({
    el: '__',
    mod: '--'
});

es6Promise.polyfill();


const middleware = [ thunk, API ];

const store = createStore(
    combineReducers({
        ...Reducers,
        routing: routerReducer
    }),
    applyMiddleware(...middleware)
);

const history = syncHistoryWithStore(browserHistory, store);

render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="visualisation" component={VisualisationIndex}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('Stage'))