/**
 * Created by asif on 5/13/2016.
 */

import React, { Component } from 'react';
import PostList from './PostList';
import PostDetail from './PostDetail';

class IPNContainerComponent extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false,
            DetailId:-1
        };
    }

    showDetails(postId) {
        this.setState({detailId: postId, showDetails: true});
    }
    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }

    render() {
        debugger;
        var posts = this.props.postList.map((post) => {
            return <PostList          key = {post.id}
                                      id={post.id}
                                      title={post.title.rendered}
                                      image={post.featured_image_src}
                                      excerpt={post.excerpt.rendered}
                                      publishDate={post.date_gmt}
                                      authorName={post.author_name}

                />
        });

        if (this.state.showDetails == false) {
            return (
                <div className="postContainer container">
                    <h1 className="page-header collectionheading">{this.props.title}</h1>
                    {posts}
                    <a href="#" className="btn btn-info btn-xs" role="button" onClick={this.toggleDetails.bind(this)}>Toogle State....</a>
                </div>

            );
        } else {

            return (
                <div className="postContainer container">
                    <PostDetail post={this.props.postList[0]} key={this.props.postList[0].id}/>
                    <a href="#" className="btn btn-info btn-xs" role="button" onClick={this.toggleDetails.bind(this)}>Toogle State....</a>
                </div>
            );
        }

    }
}
export default IPNContainerComponent;
