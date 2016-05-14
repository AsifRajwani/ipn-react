/**
 * Created by asif on 5/13/2016.
 */


import React, { Component, PropTypes } from 'react';

class PostDetail extends Component {
    render() {
        var post = this.props.post;
        return (
            <div className = "container" id={this.props.post.id}>
                <h2 className="page-header">{this.props.post.title.rendered}</h2>
                <img className="singlepostimage img-rounded" src={post.featured_image_src}/>

                <div className="singleposttext">

                    <span className="postexcerpt" dangerouslySetInnerHTML={ {__html: post.content.rendered} }></span>
                    {post.date_gmt} <em>by</em> {post.author_name}

                    <br/><br/>
                </div>
            </div>
        )
    }
}

PostDetail.propTypes = {
    post: PropTypes.object.isRequired,
};


export default PostDetail;


/*
 <div>

 <div class="container">
 <div>
 <div class="postContainer ">
 {{error}}
 <!--<h2 class="singlepostheading" ng-bind-html="singlePost.title.rendered | unsafe"></h2>-->
 <h2 class="page-header" ng-bind-html="singlePost.title.rendered | unsafe"></h2>
 <img class="singlepostimage img-rounded"  ng-src="{{singlePost.featured_image_src}}">

 <div class="singleposttext">

 <span ng-bind-html="singlePost.content.rendered | unsafe"></span>

 {{singlePost.date_gmt | date:'mediumDate'}} <em>by</em> {{singlePost.author_name}}

 <br><br>
 </div>
 </div>
 </div>
 </div>
 </div>
 */