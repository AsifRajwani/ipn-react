/**
 * Created by asif on 5/15/2016.
 */

const PostList = (state = {}, action='') => {
    switch (action.type) {
        case 'GET_SPOTLIGHT_POSTS':
            return spotlightList;
        case 'GET_GENERAL_POSTS':
            return generalList;
        default:
            return state
    }
}

export default PostList


let spotlightList = [
    {
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
    },
    {
        "id": 24,
        "date": "2016-05-01T12:59:18",
        "date_gmt": "2016-05-01T12:59:18",
        "guid": {"rendered": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/?p=24"},
        "modified": "2016-05-01T12:59:18",
        "modified_gmt": "2016-05-01T12:59:18",
        "slug": "dr-zohray-talib",
        "type": "post",
        "link": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/dr-zohray-talib\/",
        "title": {"rendered": "Dr. Zohray Talib"},
        "content": {"rendered": "<p>IPN Spotlight: Dr. Zohray Talib (Associate Professor of Medicine &amp; Health Policy, George Washington University)<\/p>\n<p>Dr. Zohray Talib is Associate Professor of Medicine and of Health Policy at the George Washington University in Washington, D.C. She practices Internal Medicine and is a leader in global health with expertise in health workforce, community engagement and medical education. Dr. Talib is a Member of the National Academy of Science Global Forum of Health Professions Education and currently serves as the Honorary Secretary of the Aga Khan Health Board for the USA. She has worked with leadership of medical schools in Africa to improve the quality of their education programs. She currently leads a study across ten countries examining the value of bringing students and academic rigor to community health facilities. Dr. Talib has consulted for programs in Central Asia and Africa and has published on different aspects of building capacity within health system in low-resource settings. Dr. Talib received her B.Sc. in Physical Therapy from McGill University and her M.D. from the University of Alberta.<\/p>\n<p><strong>What skills have helped you in your career?<\/strong><br \/>\nBeing able to develop my career in multiple dimensions simultaneously &#8211; as a clinician, as an educator, as a program director, and as a global health researcher.<br \/>\nBalancing the urgent daily tasks, while also investing regularly in a longer-term goal and keeping my eye on the ball of what contribution I would like to make.<br \/>\nAs a mom of three kids, the balancing act can get complex so I have embraced creative ways of managing at home including scheduling meals in advance, shopping online for groceries and getting the kids involved in housework.<\/p>\n<p><strong>What do you wish you had known or done differently throughout your career?<\/strong><br \/>\nThere were times during residency training that I could not see the light at the end of the tunnel. The days seemed long and I was not able to nurture any other part of my career path. At those times, I needed reminders that it is important to embrace certain phases of learning and dive deep in skill-building. In hindsight it is much easier to appreciate the value of having immersed myself in clinical training for that time.<\/p>\n<p><strong>What is next for you in your career?<\/strong><br \/>\nI would like to continue to strengthen the academic health sector in low-resource settings. I feel strongly that strong academic institutions can underpin and sustain development. Strengthening academia will require diversifying partnerships (e.g. to include the private sector) and innovative thinking on how we teach and evaluate education programs. I would like to continue to build the evidence and advocate for decentralizing academia. Bringing academic rigor and resources to low-resource communities and under-served areas creates a vibrant environment where there is synergy and efficiency between teaching, learning, service and research.<\/p>\n<p><strong>What do you do for continuing education and improvement?<\/strong><br \/>\nI am constantly learning. I am an ad hoc reviewer for several medical journals which is a way to keep abreast of what is happening in my field of work. My research and teaching roles require me to read the literature regularly and I often read about the conditions my patients have. Like many others, I also watch TED talks and enjoy reading articles on social media.<\/p>\n<p><strong>What advice would you offer to others?<\/strong><br \/>\nAllow for creative paths to achieve your career goals &#8211; don&#8217;t assume just because you can&#8217;t see the path that there isn&#8217;t one. Career paths are rarely linear. New doors often open at unpredictable times, so allow for that while working diligently towards the goals you set. Work hard and smart but also seek mentors to guide you in different aspects of your career. It is very uncommon to find one mentor who can advise on everything and often it takes time, effort and patience to find the right mentor. Be bold and ask those you admire if they can guide you on your path.<\/p>\n<p><strong>Areas where you can help other Ismailis:<\/strong><br \/>\n\u2022Mentoring professionals interested in global public health<br \/>\n\u2022Finding opportunities to get involved in our community service<br \/>\n\u2022Monitoring and evaluation<\/p>\n<p><a href=\"http:\/\/bit.ly\/ZohrayTalib\" target=\"_blank\">Connect with Zohray<\/a><br \/>\n<a href=\"http:\/\/98.221.94.247\/wordpress\/ipn-spotlight-nomination\/\">Nominate someone for an IPN Spotlight<\/a><\/p>\n"},
        "excerpt": {"rendered": "<p>IPN Spotlight: Dr. Zohray Talib (Associate Professor of Medicine &amp; Health Policy, George Washington University) Dr. Zohray Talib is Associate Professor of Medicine and of Health Policy at the George Washington University in Washington, D.C. She practices Internal Medicine and is a leader in global<\/p>\n"},
        "author": 1,
        "featured_media": 11,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "format": "standard",
        "categories": [4],
        "tags": [],
        "author_name": "ipndev",
        "featured_image_src": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-content\/uploads\/2016\/05\/ZohrayTalib-150x150.jpg",
        "_links": {
            "self": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/24"}],
            "collection": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts"}],
            "about": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/types\/post"}],
            "author": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/users\/1"
            }],
            "replies": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/comments?post=24"
            }],
            "version-history": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/24\/revisions"}],
            "wp:featuredmedia": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media\/11"
            }],
            "wp:attachment": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media?parent=24"}],
            "wp:term": [{
                "taxonomy": "category",
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/categories?post=24"
            }, {
                "taxonomy": "post_tag",
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/tags?post=24"
            }],
            "curies": [{"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true}]
        }
    },
    {
        "id": 22,
        "date": "2016-05-01T12:53:47",
        "date_gmt": "2016-05-01T12:53:47",
        "guid": {"rendered": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/?p=22"},
        "modified": "2016-05-01T12:56:10",
        "modified_gmt": "2016-05-01T12:56:10",
        "slug": "tahira-dosani",
        "type": "post",
        "link": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/tahira-dosani\/",
        "title": {"rendered": "Tahira Dosani"},
        "content": {"rendered": "<p>IPN Spotlight: Tahira Dosani (Director of Portfolio Engagement, Accion Venture Lab)<\/p>\n<p>Tahira is the Director of Portfolio Engagement at Accion Venture Lab, working with the fund\u2019s investees to accelerate their growth. Venture Lab is a seed-stage impact investor that provides capital and support to early-stage startups that leverage technology to increase access to financial services for the under-served globally. She previously led strategic projects at LeapFrog Investments, an emerging market private equity fund. Prior to that, Tahira worked as Director of Strategy at the Aga Khan Fund for Economic Development. Based in Dubai, she drove strategic initiatives for the portfolio and led new investments in telecoms, technology and infrastructure in South\/Central Asia. She also worked at Roshan, Afghanistan\u2019s leading telecoms operator, where she was Head of Corporate Strategy. Tahira began her career as a management consultant with Bain &amp; Company in Boston. She holds an MBA from INSEAD and BAs in International Relations, Computer Science, and Education from Brown University.<\/p>\n<p><strong>What skills have helped you in your career?<\/strong><br \/>\nThere are various sets of soft and hard skills that have helped me in my career. Through my experience in management consulting, I built a strong toolkit of strategic and analytic skills. Those were further honed through my time in Afghanistan with Roshan. I also got the opportunity to build a series of management skills as I worked with a team of Afghan and expat staff. Problem solving, partnership building, and leadership skills have also been critical as I&#8217;ve navigated through my career.<\/p>\n<p><strong>What is next for you in your career?<\/strong><br \/>\nI currently work in the impact investing space where I look to make investments in companies that will generate strong financial returns and also have a significant social impact. The idea of eliminating trade-offs between financial and social returns is a big driver for me. If we can demonstrate that impact isn&#8217;t generated at the expense of financial returns, we can open the gates of the capital markets to social enterprises and other impact-focused businesses. I&#8217;m excited to continue driving forward this vision.<\/p>\n<p><strong>What advice would you offer to others?<\/strong><br \/>\nAllow yourself to be opportunistic and to take advantage of the things that come your way. It&#8217;s great to have a plan, but there&#8217;s also a lot of value in letting yourself deviate from that plan when unique opportunities come along. Make sure you put yourself in environments that challenge you and push you beyond your comfort zones. Seek out not only good roles but also good managers.<\/p>\n<p><strong>What do you do for continuing education and improvement?<\/strong><br \/>\nAs a lifelong lover of books, I&#8217;m always reading. Be it fiction or non-fiction, reading has always given me insights into the world in addition to exposure to new ideas and content. I also get to travel extensively for work, which ensures that I&#8217;m experiencing new places and learning from my changing environments. Finally, I try and surround myself with people that I can learn from.<\/p>\n<p><strong>Areas where you can help other Ismailis:<\/strong><br \/>\nGeneral mentoring<br \/>\nImpact investing industry guidance<br \/>\nMBA admission<\/p>\n<p><a href=\"http:\/\/bit.ly\/TahiraDosani\" target=\"_blank\">Connect with Tahira<\/a><br \/>\n<a href=\"http:\/\/98.221.94.247\/wordpress\/ipn-spotlight-nomination\/\">Nominate someone for an IPN Spotlight<\/a><\/p>\n"},
        "excerpt": {"rendered": "<p>IPN Spotlight: Tahira Dosani (Director of Portfolio Engagement, Accion Venture Lab) Tahira is the Director of Portfolio Engagement at Accion Venture Lab, working with the fund\u2019s investees to accelerate their growth. Venture Lab is a seed-stage impact investor that provides capital and support to early-stage<\/p>\n"},
        "author": 1,
        "featured_media": 9,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "format": "standard",
        "categories": [4],
        "tags": [],
        "author_name": "ipndev",
        "featured_image_src": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-content\/uploads\/2016\/05\/TahiraDosani-150x150.jpg",
        "_links": {
            "self": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/22"}],
            "collection": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts"}],
            "about": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/types\/post"}],
            "author": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/users\/1"
            }],
            "replies": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/comments?post=22"
            }],
            "version-history": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/22\/revisions"}],
            "wp:featuredmedia": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media\/9"
            }],
            "wp:attachment": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media?parent=22"}],
            "wp:term": [{
                "taxonomy": "category",
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/categories?post=22"
            }, {
                "taxonomy": "post_tag",
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/tags?post=22"
            }],
            "curies": [{"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true}]
        }
    }
];

let generalList = [
    {
        "id": 34,
        "date": "2016-05-01T13:13:03",
        "date_gmt": "2016-05-01T13:13:03",
        "guid": {"rendered": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/?p=34"},
        "modified": "2016-05-11T17:33:54",
        "modified_gmt": "2016-05-11T17:33:54",
        "slug": "tech-and-hiring-trends-for-2016-and-beyond",
        "type": "post",
        "link": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/tech-and-hiring-trends-for-2016-and-beyond\/",
        "title": {"rendered": "Tech and Hiring Trends for 2016 and Beyond"},
        "content": {"rendered": "<p>A panel of accomplished professionals and entrepreneurs will discuss the ever evolving technological landscape along with trends that have the opportunity to impact professional growth over the next few years. The speakers will discuss how this new knowledge will reshape the way work will be done, how businesses will grow over time, and how markets and industries will present new opportunities from which professionals can benefit.<\/p>\n<p><em>REGISTER NOW and you will receive a webinar link via email 24-48 hours prior to the webinar. Learn more about our speakers below!<\/em><\/p>\n<p><strong>SPEAKERS<\/strong><br \/>\n<span style=\"text-decoration: underline;\">Karim Bhalwani<\/span><br \/>\n<em>Senior Manager, Strategy &amp; Business Development, Yodlee Interactive<img class=\"size-full wp-image-7 alignleft\" src=\"https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-content\/uploads\/2016\/05\/KarimBhalwani.png\" alt=\"KarimBhalwani\" width=\"124\" height=\"155\" \/><br \/>\n<\/em>Karim heads API Strategy &amp; Sales at Yodlee Interactive (YI), the world\u2019s first financial cloud for money management. He consults companies ranging from startups to multinational corporations, assesses their business needs for FinTech APIs as part of their product portfolio and sells Yodlee Interactive\u2019s core APIs in financial data aggregation and money movement. Karim has sourced and closed partnerships with over 200 consumer internet companies including Google, PayPal and Amazon. He previously served in management consulting roles at Capgemini, Mercer, Warner Bros., and Disney. Karim graduated cum laude from UCLA with a B.A. in Business Economics &amp; Accounting and completed an Executive Program at UC Berkeley Haas School of Business.<\/p>\n<p><span style=\"text-decoration: underline;\">Ashraf Karim<\/span><br \/>\n<em>Senior Technology Manager, Google<img class=\"size-full wp-image-12 alignleft\" src=\"https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-content\/uploads\/2016\/05\/AshrafKarim.png\" alt=\"AshrafKarim\" width=\"143\" height=\"143\" \/><br \/>\n<\/em>Ashraf has over 13 years of experience in the technology sector comprising of numerous roles across several companies. Currently, she is a Senior Technology Manager on a global product and engineering team at Google that builds solutions for the enterprise sales organization and partners worldwide. Since joining Google in 2013, she has been focused on increasing sales velocity in the small and mid-sized business segments and educational institutions by building strategies &amp; solutions that leverage data analytics and new software technology trends. Ashraf graduated with a BS degree in Computer Science &amp; Engineering from the University of California at Davis and also holds a MS degree in Electrical Engineering.<\/p>\n<p><span style=\"text-decoration: underline;\">Javed Panjwan<\/span>i<br \/>\nSenior Director, Cognizant<img class=\"size-full wp-image-6 alignleft\" src=\"https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-content\/uploads\/2016\/05\/JavedPanjwani.png\" alt=\"JavedPanjwani\" width=\"124\" height=\"157\" \/><br \/>\nJaved is a Senior Director at Cognizant, a NASDAQ listed Fortune 500 global consulting company. At Cognizant Javed leads the Cloud-ERP practice, where he is responsible for overall strategy, growth and practice development in North America. He started his career at Andersen Consulting and Deloitte Consulting where he was a Senior Consultant with the ERP practice. Javed also brings tremendous entrepreneurial experience with co-founding Cognivia \u2013 a SaaS implementation company as well as being the VP of Product Management and Strategy at a startup Foodtrader.com, an online exchange focused on optimizing global Food and Agriculture trading. Javed holds an MBA from Kellogg School of Management and holds an undergraduate degree in MIS from The University of Texas at Austin.<\/p>\n"},
        "excerpt": {"rendered": "<p>A panel of accomplished professionals and entrepreneurs will discuss the ever evolving technological landscape along with trends that have the opportunity to impact professional growth over the next few years. The speakers will discuss how this new knowledge will reshape the way work will be<\/p>\n"},
        "author": 1,
        "featured_media": 16,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "format": "standard",
        "categories": [3],
        "tags": [],
        "author_name": "ipndev",
        "featured_image_src": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-content\/uploads\/2016\/05\/IPNLogo-150x150.png",
        "_links": {
            "self": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/34"}],
            "collection": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts"}],
            "about": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/types\/post"}],
            "author": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/users\/1"
            }],
            "replies": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/comments?post=34"
            }],
            "version-history": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/34\/revisions"}],
            "wp:featuredmedia": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media\/16"
            }],
            "wp:attachment": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media?parent=34"}],
            "wp:term": [{
                "taxonomy": "category",
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/categories?post=34"
            }, {
                "taxonomy": "post_tag",
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/tags?post=34"
            }],
            "curies": [{"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true}]
        }
    },
    {
        "id": 31,
        "date": "2016-05-01T13:10:48",
        "date_gmt": "2016-05-01T13:10:48",
        "guid": {"rendered": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/?p=31"},
        "modified": "2016-05-01T13:10:57",
        "modified_gmt": "2016-05-01T13:10:57",
        "slug": "technology-trends-past-present-and-future",
        "type": "post",
        "link": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/technology-trends-past-present-and-future\/",
        "title": {"rendered": "Technology Trends Past, Present and Future"},
        "content": {"rendered": "<p>IPN Northeast is organizing a panel on Technology Trends.<br \/>\nThe event will feature <strong>Zubair Talib<\/strong>, Co-Founder &amp; CEO of YaSabe.com.<\/p>\n<p>Panelists includes:<\/p>\n<ol>\n<li>Karim Jumma &#8211; Logistics\/Supply Chain<\/li>\n<li>Noorali Sonawala &#8211; HR\/Resource Needs<\/li>\n<li>Amin Rhemtulla &#8211; Financial Sector<\/li>\n<li>Faridah Merchant &#8211; Moderator<\/li>\n<\/ol>\n"},
        "excerpt": {"rendered": "<p>IPN Northeast is organizing a panel on Technology Trends. The event will feature Zubair Talib, Co-Founder &amp; CEO of YaSabe.com. Panelists includes: Karim Jumma &#8211; Logistics\/Supply Chain Noorali Sonawala &#8211; HR\/Resource Needs Amin Rhemtulla &#8211; Financial Sector Faridah Merchant &#8211; Moderator<\/p>\n"},
        "author": 1,
        "featured_media": 10,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "format": "standard",
        "categories": [3],
        "tags": [],
        "author_name": "ipndev",
        "featured_image_src": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-content\/uploads\/2016\/05\/TechTrends-150x150.png",
        "_links": {
            "self": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/31"}],
            "collection": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts"}],
            "about": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/types\/post"}],
            "author": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/users\/1"
            }],
            "replies": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/comments?post=31"
            }],
            "version-history": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/31\/revisions"}],
            "wp:featuredmedia": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media\/10"
            }],
            "wp:attachment": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media?parent=31"}],
            "wp:term": [{
                "taxonomy": "category",
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/categories?post=31"
            }, {
                "taxonomy": "post_tag",
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/tags?post=31"
            }],
            "curies": [{"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true}]
        }
    },
    {
        "id": 19,
        "date": "2016-05-01T12:49:56",
        "date_gmt": "2016-05-01T12:49:56",
        "guid": {"rendered": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/?p=19"},
        "modified": "2016-05-01T12:51:48",
        "modified_gmt": "2016-05-01T12:51:48",
        "slug": "womens-history-month",
        "type": "post",
        "link": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/womens-history-month\/",
        "title": {"rendered": "Women&#8217;s History Month"},
        "content": {"rendered": "<p>In honor of Women&#8217;s History Month, IPN will be spotlighting accomplished Ismaili women across various industries and sharing articles about women in the workplace. Please join the conversation and share related content this month and throughout the year!<\/p>\n"},
        "excerpt": {"rendered": "<p>In honor of Women&#8217;s History Month, IPN will be spotlighting accomplished Ismaili women across various industries and sharing articles about women in the workplace. Please join the conversation and share related content this month and throughout the year!<\/p>\n"},
        "author": 1,
        "featured_media": 13,
        "comment_status": "open",
        "ping_status": "open",
        "sticky": false,
        "format": "standard",
        "categories": [3],
        "tags": [],
        "author_name": "ipndev",
        "featured_image_src": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-content\/uploads\/2016\/05\/download-150x150.png",
        "_links": {
            "self": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/19"}],
            "collection": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts"}],
            "about": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/types\/post"}],
            "author": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/users\/1"
            }],
            "replies": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/comments?post=19"
            }],
            "version-history": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/posts\/19\/revisions"}],
            "wp:featuredmedia": [{
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media\/13"
            }],
            "wp:attachment": [{"href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/media?parent=19"}],
            "wp:term": [{
                "taxonomy": "category",
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/categories?post=19"
            }, {
                "taxonomy": "post_tag",
                "embeddable": true,
                "href": "https:\/\/ipndev2.southcentralus.cloudapp.azure.com\/html\/wp-json\/wp\/v2\/tags?post=19"
            }],
            "curies": [{"name": "wp", "href": "https:\/\/api.w.org\/{rel}", "templated": true}]
        }
    }
]
