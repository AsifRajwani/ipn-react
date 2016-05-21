/**
 * Created by asif on 5/13/2016.
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

class PostSummary extends Component {

    render() {
        return (
            <div className="container" id={this.props.id}>
                <h2 className="postheading" dangerouslySetInnerHTML={ {__html: this.props.title}}></h2>
                <img className="postimage img-rounded" src={this.props.image}/>

                <div className="posttext">

                    <span className="postexcerpt" dangerouslySetInnerHTML={ {__html: this.props.excerpt} }></span>
                    <span className="label label-default">{this.props.publishDate}
                        {"   "}
                        <em>by</em> {this.props.authorName}</span>
                    { " " } <Link className="btn btn-info btn-xs" role="button"  to={"/post/"+this.props.id} onClick={()=>this.props.onShowDetail(this.props.id)}>More....</Link>



                    <br/><br/>
                </div>
            </div>
        )
    }

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

