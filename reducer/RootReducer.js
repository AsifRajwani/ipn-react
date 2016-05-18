/**
 * Created by asif on 5/15/2016.
 */

import { combineReducers } from 'redux'
import PostList from './PostList'
import PostDetail from './PostDetail'

const RootReducer = combineReducers({
    postDetail:PostDetail,
    postList:PostList
})

export default RootReducer
