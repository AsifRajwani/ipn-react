/**
 * Created by asif on 5/16/2016.
 */


import { connect } from 'react-redux'
import { getPostDetails } from '../reducer/Action'
import PostDetail from '../app/PostDetail'


const mapStateToProps = (state) => {
    return {
        postDetail: state.postDetail
    }
}


const PostDetailContinaer = connect(
    mapStateToProps,
    null
)(PostDetail)

export default PostDetailContinaer
