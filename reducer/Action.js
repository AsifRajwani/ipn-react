/*
All the actions used to update the store.
 */

import { dispatch } from 'redux'

export const boundedGetSpotlightPosts =  () =>  dispatch(getSpotlightPosts());
export const boundedGetGeneralPosts =  () =>  dispatch(getGeneralPosts());
export const boundedGetPostDetails = (postId) => dispatch(getPostDetails(postId));


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

export const getPostDetails = (postId) => {
    return {
        type: 'GET_POST_DETAIL',
        postId
    }
}


