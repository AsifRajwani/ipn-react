/**
 * Created by asif on 5/13/2016.
 */


import React, { Component, PropTypes } from 'react';

class PostDetail extends Component {
    render() {
        let postDetail = this.props.postDetail;
        if (postDetail.isFetching) {
            return (
                <h2 className="page-header">Loading...</h2>
            );
        }
        else {
            let post = postDetail.post;
            return (
                <div className="container" id={post.id}>
                    <h2 className="page-header"   dangerouslySetInnerHTML={ {__html:post.title.rendered}}></h2>
                    <img className="singlepostimage img-rounded" src={post.featured_image_src}/>

                    <div className="singleposttext">

                        <span className="postexcerpt"
                              dangerouslySetInnerHTML={ {__html: post.content.rendered} }></span>
                        {post.date_gmt} <em>by</em> {post.author_name}

                        <br/><br/>
                    </div>
                </div>
            )
        }
    }
}

PostDetail.propTypes = {
    postDetail: PropTypes.object.isRequired,
};


export default PostDetail;