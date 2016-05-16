/**
 * Created by asif on 5/16/2016.
 */

/*Connects ProdList Component to Redux Store.
 Can manipulate data from store while setting up the properties.
 */


import { connect } from 'react-redux'
import { getPostDetails } from '../reducer/Action'
import PostList from '../app/PostList'


const mapStateToProps = (state) => {
    return {
        postList: state.postList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onShowDetail: (id) => {
            dispatch(getPostDetails(id))
        }
    }
}

const PostListContinaer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList)

export default PostListContinaer

