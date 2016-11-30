/**
 * Created by Maheshi.Hemachandra on 10/12/2016.
 */
/**
 * Created by Maheshi.Hemachandra on 10/3/2016.
 */
"use strict";

// Main page has all the basic information about every other page.

var config = {
    apiKey: "AIzaSyDLUpdtV-WPzKo3_4E2EnzcLMy_Cved_DU",
    authDomain: "whiteboard-10ec5.firebaseapp.com",
    databaseURL: "https://whiteboard-10ec5.firebaseio.com",
    storageBucket: "whiteboard-10ec5.appspot.com",
    messagingSenderId: "867522105303"
};
firebase.initializeApp(config);

var userName;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $("#firebaseui-auth-container").hide();
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        userName = user.uid;
        ReactDOM.render(<MainPage />, document.getElementById('landingpage'));

        var providerData = user.providerData;
        user.getToken().then(function(accessToken) {
            document.getElementById('sign-in-status').textContent = "Welcome: " + displayName;
            document.getElementById('account-details').textContent = JSON.stringify({
                displayName: displayName,
                email: email,
                emailVerified: emailVerified,
                photoURL: photoURL,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData
            }, null, '  ');
        });
    } else {
        console.log("Signed out");
        // User is signed out.
        $("#header").hide();
        // FirebaseUI config.
        var uiConfig = {
            'signInSuccessUrl': 'http://localhost:3000/landingpage.html', //URL that we get sent BACK to after logging in
            //'signInSuccessUrl': 'http://whitebd.herokuapp.com/landingpage.html',
            'signInOptions': [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//            firebase.auth.GithubAuthProvider.PROVIDER_ID,
//                    firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            'tosUrl': '<your-tos-url>',
        };

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
        $("#landingpage").hide();
    }
}, function(error) {
    console.log(error);
});


var about = document.getElementById("about_us");
var aboutListContents = ["Motivation", "Vision", "Careers"];
var list1 = document.createElement("ol");


var product = document.getElementById("product");
var productListContents = ["Homework Management System", "Q & A Forum", "File System", "Alerts"];
var list2 = document.createElement("ul");


var MainPage = React.createClass({
    render: function() {
        return (
            <div className="mainContent">
                <header>
                    <ul>
                        <li> <a href="register.html" id="sign_up"> Register </a></li>
                        <li> <a href="course_signup.html" id="coursesignup"> Course Signup </a></li>
                        <li> <a href="signup_stat.html" id="statistics"> Statistics </a></li>
                        <li> <a href="publish_hw.html" id="homework"> Upload Homework </a></li>
                        <li> <a href="retrieve_hw.html" id="retrievehw"> Retrieve Homework </a></li>


                    </ul>
                </header>


                <section className="main_content">
                    <article><br/><br/>
                        <header>
                            <h2>Learning Actively</h2>
                            <h3>Your Homework Management System</h3>
                        </header>
                        <img src="wbimage.jpg" alt ="Some kind of image with go here" width= "200px" height="150px"/>
                        <div class="right_side_main">
                            <ul>
                                <li> Q&A form fosters interactive learning </li>
                                <li> Homework folder system helps keeps students organized </li>
                                <li> Alerts makes it possible to never miss a deadline</li>
                                <li> Share resources capability</li>
                                <li> Virtual whiteboard to work out problems</li>
                            </ul>
                        </div>
                    </article>
                </section>


                <footer class="footer">
                    <br/> <br/> <br/> <br/> <br/>
                        <ul>
                            <li><div id="copyright">(C) Copyright 2016 WhiteBoard Educational</div></li>
                            <li><a href="About.html" id="about">  About us </a></li>
                            <li><a href="Support.html" id="support">  Support </a></li>
                            <li><a href="ContactUs.html" id="contactus">  Contact Us </a></li>
                        </ul>
                </footer>
            </div>
        );
    }
});

ReactDOM.render(
    <MainPage  />,
    document.getElementById('landingpage')
);
