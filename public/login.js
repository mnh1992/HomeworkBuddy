"use strict";
// Initialize Firebase with private key
firebase.initializeApp({
    serviceAccount: "private_key.json",
    databaseURL: "https://whiteboard-10ec5.firebaseio.com"
});


//User login function to let an authorized user login with username and password
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
                document.getElementById("fileupload").innerHTML="Click here for uploading documents";
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

//Creating the html login page
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
                <div>
                    <a id="fileupload" href="publish_hw.html"></a>
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