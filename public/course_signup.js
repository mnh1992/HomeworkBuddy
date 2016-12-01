/**
 * Created by Maheshi.Hemachandra on 10/1/2016.
 */

"use strict";
var user;

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
        ReactDOM.render(<CourseSign />, document.getElementById('coursesignup'));

        var providerData = user.providerData;
        user.getToken().then(function(accessToken) {
            document.getElementById('sign-in-status').textContent = "Welcome, " + displayName;
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
            //'signInSuccessUrl': 'http://localhost:3000/landingpage.html', //URL that we get sent BACK to after logging in
            'signInSuccessUrl': 'http://whitebd.herokuapp.com/landingpage.html',
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
        $("#coursesignup").hide();
    }
}, function(error) {
    console.log(error);
});


//Get data from API for school selections
var URL= "https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,id&_per_page=100&school.main_campus=1&school.state=va&school.degrees_awarded.predominant=3&api_key=FNMmHrRzLriPD033jmlA96AOgjmUmKXiRUviDLnU";
var CourseSign = React.createClass({
getInitialState: function () {
        return {
            options: []
        }
    },

    //Include the html file in js
    render: function () {
        return (
            <div className="mainHeader">
                <br/>
                <h3>Course Signup Page <br/>
                    Select your school and enter the course code</h3>
                <br/>
                <div id="controls">
                    <label>School: </label>
                    <select id="school">
                        {this.state.options}
                    </select>
                </div>
                <div>
                    <label>Course:</label>
                    <input type="text" id="course" placeholder="Enter your course"/>
                </div>
                <div>
                    <br/>
                    <button id="csignup" onClick={this.course_signup}> Signup</button>
                </div>
                <br/>

            </div>
        );
    },

    //This function returns an acronym for longer school names
    getShortName: function(str) {
        var matches = str.match(/\b(\w)/g);
        var acronym = matches.join('');
        return acronym
    },

    //Add a new school if user has not already signed up for that course.
    course_signup: function () {

        var school = $('#school').val();
        var course = $('#course').val();
        //Reference the course table in firebase


        firebase.auth().currentUser.getToken().then(function(idToken) {
            $.ajax({
                //url: "http://localhost:3000/coursesignup",
                url: "http://whitebd.herokuapp.com/coursesignup",
                type: 'PUT',
                data: {user: user, school: school, course: course,token: idToken},
                success: function (data) {
                    switch (data) {
                        case "0":
                            alert("Course signup successful");
                            break;
                        case "1":
                            alert("You have already signup for this course");
                            break;
                    }
                },
                error: function () {
                    alert('Error');
                }
            });
        });
    },
    componentWillMount: function () {
        user = localStorage.getItem('username');
        $.ajax({
            url: URL,
            type: 'GET',
            dataType: 'json',
            cache: true,
            success: function(data) {
                for (var i = 0; i < data.results.length; i++) {
                    var sch_id = data.results[i]['id'];
                    var sch_name = data.results[i]['school.name'];
                    var sch_acrnm = this.getShortName(sch_name);
                    this.state.options.push(
                        <option key={i} value={sch_acrnm}> {sch_acrnm} - {sch_name} </option>
                    );
                }
                this.forceUpdate();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(URL, status, err.toString());
                alert("Error retrieving data");
            }.bind(this)
        });
    }
});

ReactDOM.render(
<CourseSign />,
document.getElementById('coursesignup')
);
