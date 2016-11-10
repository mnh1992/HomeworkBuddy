//Vijith
"use strict";
// Initialize Firebase

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
        ReactDOM.render(<RegisterPage  />, document.getElementById('regContent'));

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
        $("#regContent").hide();
    }
}, function(error) {
    console.log(error);
});

//Get all the information used in signup to store in firebase for each user

    //Compare the password entered and password given in the database
function comparePass(p1, p2)
{
    if(p1 !== p2)
    {
        alert("Passwords do not match");
        return false;
    }
    return true;
}

// Create the register page
var RegisterPage = React.createClass({
    render: function() {
        return (
            <div className="registerPage">
                <br/>
                <h3>Signup for WhiteBoard<br/>
                    Please  fill in the follwing information</h3>
                <br/>
                <div>
                    <label>First Name:</label>
                    <input type="text" id="fname" name="firstname" />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" id="lname" name="lastname" />
                </div>

                <div>
                    <label>Teacher or Student:</label>
                    <select id="role">
                    <option value = "Teacher">Teacher</option>
                    <option value = "Student">Student</option>
                    </select>
                    <div id="divRole"></div>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" id="email" name="email" />
                </div>

                <div id="btn1">
                    <button type="submit" onClick={this.register}>Submit</button>
                </div>
                <div id="status">
                    <label type="text" name="status">  </label>
                </div>
            </div>
        );
    },


    register: function() {

        var first = $('#fname').val();
        var last = $('#lname').val();
        var role = $('#role').val();
        var email = $('#email').val();

        firebase.auth().currentUser.getToken().then(function(idToken) {

            $.ajax({
                //url: "http://localhost:3000/register",
                url: "http://whitebd.herokuapp.com/register",
                type: 'PUT',
                data: { firstn: first, lastn: last, role: role, email: email,token: idToken},
                success: function (data) {
                    switch (data) {
                        case "0":
                            alert("Registration Successful");
                            document.getElementById("coursereg").innerHTML = "Click here for Course Registration";
                        case "1":
                            alert("User already registered");
                            break;
                    }
                },
                error: function () {
                    alert('Error');
                }
            });
        });
    }

});

ReactDOM.render(
    <RegisterPage  />,
    document.getElementById('regContent')
);

