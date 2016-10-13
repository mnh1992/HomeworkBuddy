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

//Get all the information used in signup to store in firebase for each user
function register(){
    var user= $('#userid').val();
    var first = $('#fname').val();
    var last = $('#lname').val();
    var role = $('#role').val();
    var email = $('#email').val();
    var pass = $('#password').val();
    var conf = $('#confirmPassword').val();

    if(!comparePass(pass, conf)){
        return;
    }
    var dbRef = firebase.database().ref("users/" + user);

    dbRef.once("value").then(function(snapshot) {
        if (snapshot.exists()) {
            alert("User already exists");
            return;
        }
        else
        {
            dbRef.set({
                    First : first,
                    Last: last,
                    Role : role,
                    Email : email,
                    Passwd: pass
                });
            alert("User created");
        }
    });

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
}

// Create the register page
var RegisterPage = React.createClass({
    render: function() {
        return (
            <div className="registerPage">
                <h1>Signup for WhiteBoard</h1>
                <h3>Please  fill in the follwing information</h3>
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
                <div>
                    <label>Login ID:</label>
                    <input type="text" id="userid" name="userid" placeholder="Login ID"/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" id="password" name="email" placeholder="enter password"/>
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="email" placeholder="confirm password"/>
                </div>
                <div id="btn1">
                    <button type="submit" onClick={register}>Submit</button>
                </div>
                <div id="status">
                    <label type="text" name="status">  </label>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <RegisterPage  />,
    document.getElementById('regContent')
);

