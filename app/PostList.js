/**
 * Created by asif on 5/14/2016.
 */
import React, { Component, PropTypes } from 'react';
import PostSummary from './PostSummary';
import PostDetailContainer from '../containers/PostDetailContainer';
import { getSpotlightPosts, getGeneralPosts, fetchPostType } from '../reducer/Action'

class PostList extends Component {
    constructor() {
        super(...arguments);
    }


    render() {
        let heading = this.props.route.title;
        let currentPostList = this.props.postList.list;
        if (!currentPostList)
            return;
        var posts = currentPostList.map((post) => {
            return <PostSummary key={post.id}
                             id={post.id}
                             title={post.title.rendered}
                             image={post.featured_image_src}
                             excerpt={post.excerpt.rendered}
                             publishDate={post.date_gmt}
                             authorName={post.author_name}
                                onShowDetail = {this.props.onShowDetail}

                />
        });
        if (this.props.postList.isFetching) {
            return (
                <h2 className="page-header">Loading...</h2>
            );
        } else {
            return (
                <div className="postContainer container">
                    <h1 className="page-header collectionheading">{heading}</h1>
                    {posts}
                    {/*<a href="#" className="btn btn-info btn-xs" role="button" onClick={this.toggleDetails.bind(this)}>Toogle State....</a>*/}
                </div>

            );
        }
    }
}

PostList.propTypes = {
    postList: PropTypes.object.isRequired,
    onShowDetail: PropTypes.func.isRequired
};

export default PostList;