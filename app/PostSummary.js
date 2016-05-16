/**
 * Created by asif on 5/13/2016.
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

class PostSummary extends Component {

    render() {
        return (
            <div className="container" id={this.props.id}>
                <h2 className="postheading">{this.props.title}</h2>
                <img className="postimage img-rounded" src={this.props.image}/>

                <div className="posttext">

                    <span className="postexcerpt" dangerouslySetInnerHTML={ {__html: this.props.excerpt} }></span>
                    <span className="label label-default">{this.props.publishDate}
                        {"   "}
                        <em>by</em> {this.props.authorName}</span>
                    { " " } <Link className="btn btn-info btn-xs" role="button"  to={"/post/"+this.props.id} onClick={this.props.onShowDetail(this.props.id)}>More....</Link>



                    <br/><br/>
                </div>
            </div>
        )
    }

/*<a href="#" className="btn btn-info btn-xs" role="button"  onClick={this.props.onShowDetail.bind(null, this.props.id)}>More....</a>*/

}

PostSummary.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    onShowDetail: PropTypes.func.isRequired
};


export default PostSummary;


/*
 <div class="post" data-ng-repeat="post in posts">
 <h2 class="postheading" ng-bind-html="post.title.rendered | unsafe"></h2>
 <img class="postimage img-rounded" ng-src="{{post.featured_image_src}}">

 <div class="posttext">

 <span class="postexcerpt" ng-bind-html="post.excerpt.rendered | unsafe"></span>


 <span class="label label-default">{{post.date_gmt | date:'mediumDate'}} <em>by</em> {{post.author_name}}</span>
 <a ui-sref="singlepost({postId: post.id})" class="btn btn-info btn-xs" role="button">More....</a>


 <br><br>
 </div>
 </div>
 */
