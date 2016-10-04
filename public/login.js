
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

function login(){

    var user= $('#userid').val();
    var pass = $('#password').val();
    var dbRef = firebase.database().ref("users/" + user);

    dbRef.once("value").then(function(snapshot) {
        if (snapshot.exists()) {
            if(pass !== snapshot.child("Passwd").val()){
                alert("Invalid password. Retry!");
                return;
            }
            else{
                var datetime = Date();
                alert("Login Successful!");
                window.localStorage.setItem('username',user);
                document.getElementById("coursereg").innerHTML="Click here for Course Registration";
                dbRef.push({logintime : datetime});
                return;
            }
        }
        else
        {
            alert("Invalid user id. Please signup.");
        }
    });
}


var Login = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1> Login Page </h1>
                <h3> Please enter your Username and Password </h3>
                <div>
                    <label>Username: </label>
                    <input type="text" id="userid" name="uname"/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" id="password" name="pword"/>
                </div>
                <div id="btn2">
                    <button type="submit" onClick={login} >Submit</button>
                </div>
                <div id="reg">
                        <a id="coursereg" href="course_signup.html"></a>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <Login  />,
    document.getElementById('content')
);


//<a id="creg" href="course_signup.html"></a>
//<footer>Copyright @ WhiteBoard.com</footer>