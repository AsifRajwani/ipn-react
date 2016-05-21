/**
 * Created by asif on 5/16/2016.
 */


/*Connects CmsComponent to Redux Store.
 Can manipulate data from store while setting up the properties.
 */


import { connect } from 'react-redux'
import { getSpotlightPosts, getGeneralPosts, getPostDetail, fetchPostType } from '../reducer/Action'
import CmsComponent from '../app/CmsComponent'


const mapDispatchToProps = (dispatch) => {
    return {
        onShowDetail: (id) => {
            dispatch(getPostDetail(id))
        },
        fetchPostType: (id) => {
            dispatch(fetchPostType(id))
        }
    }
}

const CmsComponentContainer = connect(
    null,
    mapDispatchToProps
)(CmsComponent)

export default CmsComponentContainer

