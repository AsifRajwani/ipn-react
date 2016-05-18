/**
 * Created by asif on 5/16/2016.
 */


/*Connects CmsComponent to Redux Store.
 Can manipulate data from store while setting up the properties.
 */


import { connect } from 'react-redux'
import { getSpotlightPosts, getGeneralPosts } from '../reducer/Action'
import CmsComponent from '../app/CmsComponent'


const mapDispatchToProps = (dispatch) => {
    return {
        onShowSpotlightList: () => {
            dispatch(getSpotlightPosts)
        },
        onShowGeneralList: () => {
            dispatch(getGeneralPosts)
        }
    }
}

const CmsComponentContainer = connect(
    null,
    mapDispatchToProps
)(CmsComponent)

export default CmsComponentContainer

