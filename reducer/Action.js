/*
 All the actions used to update the store.
 */

import { dispatch } from 'redux'

import {CONTENT_API_URL, CONTENT_CATEGORY_SPOTLIGHT, CONTENT_CATEGORY_GENERAL} from '../app/IPNConstants'


export const getSpotlightPosts = () => {
    return fetchPostType(CONTENT_CATEGORY_SPOTLIGHT);
}

export const getGeneralPosts = () => {
    return fetchPostType(CONTENT_CATEGORY_GENERAL);
}


const receivePostType = (postType, postList)=> {
    return {
        type: 'RECEIVE_POST_TYPE',
        list: postList
    }
}


const receivePostDetail = (postId, postDetail)=> {
    return {
        type: 'RECEIVE_POST_DETAIL',
        post: postDetail
    }
}


/*Called when the request to get async content is started. */
const PostListContentRequestStarted = () => {
    return {
        type: 'POST_LIST_CONTENT_REQUEST_STARTED'
    }
}

const detailContentRequestStarted = () => {
    return {
        type: 'DETAIL_CONTENT_REQUEST_STARTED'
    }
}

export const fetchPostType = (postType) => {
    let urlToFetch = CONTENT_API_URL + "posts?filter[cat]=" + postType;
    console.log("Dispatching: " + urlToFetch);
    return dispatch => {
        dispatch(PostListContentRequestStarted());
        return fetch(urlToFetch)
            .then(response => response.json())
            .then(json => dispatch(receivePostType(postType, json)))
            .catch(err=> console.log("error" + err))
    }
}

export const getPostDetail = (postId) => {
    let urlToFetch = CONTENT_API_URL + "posts/" + postId;
    return dispatch => {
        dispatch(detailContentRequestStarted())
        return fetch(urlToFetch)
            .then(response => response.json())
            .then(json => dispatch(receivePostDetail(postId, json)))
    }
}






