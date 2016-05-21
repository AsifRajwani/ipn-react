/**
 * Created by asif on 5/13/2016.
 */

import React, { Component, PropTypes } from 'react';
import PostList from './PostList';
import PostDetail from './PostDetail';
import {CONTENT_CATEGORY_SPOTLIGHT, CONTENT_CATEGORY_GENERAL} from './IPNConstants'
import { Link } from 'react-router'

class CmsComponent extends Component {
    constructor() {
        super(...arguments);
    }

    //First time when component is hit without menu item click.
    componentDidMount(){
        if (this.props.route.postType == "general") {
            this.props.fetchPostType(CONTENT_CATEGORY_GENERAL);
        } else {
            this.props.fetchPostType(CONTENT_CATEGORY_SPOTLIGHT);
        }
    }



    render() {
        return (

           <div>
               <nav className="navbar navbar-default navbar-fixed-top">
                   <div className="container">
                       <div className="navbar-header">
                           <a className="brand" style={{marginRight: 20}} href="#/" onClick={() => this.props.fetchPostType(CONTENT_CATEGORY_SPOTLIGHT)}><img src="images/people.png" alt="logo"/></a>
                       </div>
                       <ul className="nav nav-pills" >
                           <li><Link to="/spotlight" onClick={() => this.props.fetchPostType(CONTENT_CATEGORY_SPOTLIGHT)}>Spotlight</Link></li>
                           <li><Link  to="/general" onClick={()=>this.props.fetchPostType(CONTENT_CATEGORY_GENERAL)}>General</Link></li>

                           {/*
                            <li><Link to="/spotlight" onClick={() => this.props.onShowSpotlightList()}>Spotlight</Link></li>
                            <li><Link  to="/general" onClick={()=>this.props.onShowGeneralList()}>General</Link></li>
                           <li><Link to="/spotlight" >Spotlight</Link></li>
                           <li><Link  to="/general" >General</Link></li>
                           */}

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


}

CmsComponent.propTypes = {
    onShowDetail: PropTypes.func.isRequired,
    fetchPostType: PropTypes.func.isRequired
};
export default CmsComponent;
