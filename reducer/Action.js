/*
All the actions used to update the store.
 */

import { dispatch } from 'redux'

const CONTENT_API_URL='https://ipndev2.southcentralus.cloudapp.azure.com/html/wp-json/wp/v2/';
const CONTENT_CATEGORY_SPOTLIGHT=4;
const CONTENT_CATEGORY_GENERAL=3;

/*
export const boundedGetSpotlightPosts =  () =>  dispatch(getSpotlightPosts());
export const boundedGetGeneralPosts =  () =>  dispatch(getGeneralPosts());
export const boundedGetPostDetails = (postId) => dispatch(getPostDetails(postId));
*/


export const getSpotlightPosts = () => {
    return {
        type: 'GET_SPOTLIGHT_POSTS'
    }
}

export const getGeneralPosts = () => {
    return {
        type: 'GET_GENERAL_POSTS'
    }
}

export const getPostDetail = (postId) => {
    let urlToFetch = CONTENT_API_URL+ "posts/" +postId;
    return dispatch => {
        dispatch(contentRequestStarted())
        return fetch(urlToFetch)
            .then(response => response.json())
            .then(json => dispatch(receivePostDetail(postId, json)))
    }
}


const receivePostDetail=(postId, postDetail)=> {
    return {
        type: 'RECEIVE_POST_DETAIL',
        post: postDetail
    }
}


/*Called when the request to get async content is started. */
const contentRequestStarted = () => {
    return {
        type: 'CONTENT_REQUEST_STARTED'
    }
}

const  fetchPostType=(postType) => {
    let urlToFetch = {CONTENT_API_URL}+ "posts?filter[cat]=" +{postType};
    return dispatch => {
        dispatch(contentRequestStarted())
        return fetch(urlToFetch)
            .then(response => response.json())
            .then(json => dispatch(receivePostType(postType, json)))
    }
}

function fetchPostDetail(postId) {

}



