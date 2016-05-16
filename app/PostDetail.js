/**
 * Created by asif on 5/13/2016.
 */


import React, { Component, PropTypes } from 'react';

class PostDetail extends Component {
    render() {
        var post = this.props.postDetail;
        return (
            <div className = "container" id={post.id}>
                <h2 className="page-header">{post.title.rendered}</h2>
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

let samplePost =     {
    "id": 27,
    "date": "2016-05-01T13:05:05",
    "date_gmt": "2016-05-01T13:05:05",
    "guid": {"rendered": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/?p=27"},
    "modified": "2016-05-01T13:11:52",
    "modified_gmt": "2016-05-01T13:11:52",
    "slug": "dr-nirmeen-rajani",
    "type": "post",
    "link": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/dr-nirmeen-rajani\/",
    "title": {"rendered": "Dr. Nirmeen Rajani"},
    "content": {"rendered": "<p>IPN Spotlight: Dr. Nirmeen Rajani (Post-Doctoral Fellow, Heartland Alliance Marjorie Kovler Center)<\/p>\n<p>Nirmeen has a MA in Clinical Counseling and a Doctorate in Clinical Psychology. She graduated with her Psy.D degree in 2015 and currently works as a Post-Doctoral Fellow at Heartland Alliance &#8211; Marjorie Kovler Center. Her current work involves providing therapy to asylum seekers who are survivors of political torture. Furthermore, she has worked with various community organizations and boards, as well as various Jamati institutions for the past 12 years. She is currently a National Member for the Aga Khan Social Welfare Board and oversees the Mental Health Portfolio on a national level.<\/p>\n<p>Nirmeen is passionate about promoting mental wellness, reducing the stigma related to mental illness, and promoting social justice &amp; social equity in various undeserved communities, and especially within the Jamat.<\/p>\n<p><strong>What skills have helped you in your career?<\/strong><br \/>\nI have learned how to be an effective communicator, an active listener, and a strong leader. It has helped me to continuously challenge myself and continue to be open to various forms of knowledge. The ability to build connections with various individuals, both within my profession and outside of it, has been instrumental in my growth as an individual and professional.<\/p>\n<p><strong>What do you wish you had known or done differently throughout your career?<\/strong><br \/>\nI have had very strong personal and professional mentors who have guided me through my educational and professional career. Looking back, I find a deep sense of fulfillment in knowing that I have followed all of my passions. Given the strong support I have had, and the fact that I fulfilled many of my professional goals, I feel satisfied in my career path thus far.<\/p>\n<p><strong>What is next for you in your career?<\/strong><br \/>\nI hope to continue to work in various international and social justice related settings, particularly in the realm of International Psychology, while still being connected my professional life in the U.S.<\/p>\n<p><strong>What do you do for continuing education and improvement?<\/strong><br \/>\nI keep in close contact with my colleges who always share new knowledge with me. I also make it a point to read something new every day. Further, I invest my time and money in attending professional conferences, webinars, and lectures.<\/p>\n<p><strong>What advice would you offer to others?<\/strong><br \/>\nInvest in relationships, personal and professional, and find mentors who will guide you through your educational and professional goals.<br \/>\nLearn as much as you can and from whoever is willing to teach you &#8211; remember that learning should be a lifelong endeavor.<br \/>\nNurture your mind, body, and soul &#8211; always invest time and energy in self-care.<br \/>\nFocus on being culturally sensitive and open your eyes to new ways of evaluating all the knowledge and information that comes your way.<br \/>\nAdvocate for human rights and social justice &#8211; professionals from all fields must strive to make the world a better place for the next generation.<\/p>\n<p><strong>Areas where you can help other Ismailis:<\/strong><br \/>\nAdmissions to various psychology related graduate programs<\/p>\n<p><a href=\"http:\/\/bit.ly\/NirmeenRajani\" target=\"_blank\">Connect with Nirmeen<\/a><br \/>\n<a href=\"http:\/\/98.221.94.247\/wordpress\/ipn-spotlight-nomination\/\">Nominate someone for an IPN Spotlight.<\/a><\/p>\n"},
    "excerpt": {"rendered": "<p>IPN Spotlight: Dr. Nirmeen Rajani (Post-Doctoral Fellow, Heartland Alliance Marjorie Kovler Center) Nirmeen has a MA in Clinical Counseling and a Doctorate in Clinical Psychology. She graduated with her Psy.D degree in 2015 and currently works as a Post-Doctoral Fellow at Heartland Alliance &#8211; Marjorie<\/p>\n"},
    "author": 1,
    "featured_media": 8,
    "comment_status": "open",
    "ping_status": "open",
    "sticky": false,
    "format": "standard",
    "categories": [4],
    "tags": [],
    "author_name": "ipndev",
    "featured_image_src": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-content\/uploads\/2016\/05\/NirmeenRajani-150x150.jpg",
    "_links": {
        "self": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/27"}],
        "collection": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts"}],
        "about": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/types\/post"}],
        "author": [{
            "embeddable": true,
            "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/users\/1"
        }],
        "replies": [{
            "embeddable": true,
            "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/comments?post=27"
        }],
        "version-history": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/27\/revisions"}],
        "wp:featuredmedia": [{
            "embeddable": true,
            "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media\/8"
        }],
        "wp:attachment": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media?parent=27"}],
        "wp:term": [{
            "taxonomy": "category",
            "embeddable": true,
            "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/categories?post=27"
        }, {
            "taxonomy": "post_tag",
            "embeddable": true,
            "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/tags?post=27"
        }],
        "curies": [{"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true}]
    }
}


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