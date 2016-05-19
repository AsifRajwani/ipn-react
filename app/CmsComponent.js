/**
 * Created by asif on 5/13/2016.
 */

import React, { Component } from 'react';
import PostList from './PostList';
import PostDetail from './PostDetail';
import { Link } from 'react-router'

class CmsComponent extends Component {
    constructor() {
        super(...arguments);
        debugger;
        {this.props.children}
        this.state = {
            showDetails: false,
            currentPost: {}
        };
    }

    showDetails(postId) {
        let post = this.props.spotlightList[0];
        let filteredPostIndex = this.props.spotlightList.findIndex((post)=>post.id == postId);

        if (filteredPostIndex  > -1)
            post = this.props.spotlightList[filteredPostIndex];


        this.setState({showDetails: true, currentPost: post});
    }


    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }


    render() {
        return (

           <div>
               <nav className="navbar navbar-default navbar-fixed-top">
                   <div className="container">
                       <div className="navbar-header">
                           <a className="brand" style={{marginRight: 20}} href="#/"><img src="images/people.png" alt="logo"/></a>
                       </div>
                       <ul className="nav nav-pills" >
                           <li><Link to="/spotlight" onClick={() => this.props.onShowSpotlightList()}>Spotlight</Link></li>
                           <li><Link  to="/general" onClick={()=>this.props.onShowGeneralList()}>General</Link></li>

                        </ul>
                   </div>
               </nav>
               {this.props.children}
               <div id="footer">
                   <div className="navbar navbar-default navbar-fixed-bottom">
                       <div className="container">
                           <footer>
                               <div className="row">
                                   <div className="col-sm-4">
                                       Created by IPN Developer
                                   </div>
                                   <div className="col-sm-4">
                                       Twitter: <a href="http://twitter.com/ipnonline">@ipnonline</a>
                                   </div>
                                   <div className="col-sm-4">
                                       Facebook: <a href="https://www.facebook.com/groups/109359619096103/">Ismaili Professional Network</a>
                                   </div>
                               </div>
                           </footer>
                       </div>
                   </div>
               </div>
           </div>);
    }

/*
<div>
<h1> header </h1>
<PostList key="prodList"   type="spotlight" ></PostList>
<h1> footer </h1>
</div>
*/

}
export default CmsComponent;
