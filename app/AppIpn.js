import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import RootReducer from "../reducer/RootReducer.js"
import CmsComponentContainer from '../containers/CmsComponentContainer';
import PostListContainer from '../containers/PostListContainer';
import PostDetailContainer from '../containers/PostDetailContainer';


const loggerMiddleware = createLogger();
const app = document.getElementById('root');
let store = createStore(RootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);


render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={CmsComponentContainer}>
                <IndexRoute component={PostListContainer} title="Spotlight"></IndexRoute>
                <Route path="spotlight" component={PostListContainer} title="Spotlight"></Route>
                <Route path="general" component={PostListContainer} title="General"></Route>
                <Route path="post(/:postid)" component={PostDetailContainer}></Route>
            </Route>
        </Router>
    </Provider>,
    app
)
