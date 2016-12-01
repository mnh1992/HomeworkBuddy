"use strict";

firebase.initializeApp({
    serviceAccount: "private_key.json",
    databaseURL: "https://whiteboard-10ec5.firebaseio.com"
});

var Login = React.createClass({
    render: function() {
        return (
            <div className="login">
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
                <br/>
                <div id="btn2">
                    <button type="submit" onClick={this.login} >Submit</button>
                </div>
                <div id="reg">
                        <a id="coursereg" href="course_signup.html"></a>
                </div>

            </div>
        );
    },
    login: function() {
        var user = $('#userid').val();
        var pass = $('#password').val();
        var idToken = req.body.token;
        //Authenticate with firebase and get the uid from it
        firebase.auth().verifyToken(idToken).then(function(decodedToken){
            var uid = decodedToken.uid;
            //Then start the ajax call that interacts with heroku
            $.ajax({url: "http://whitebd.herokuapp.com/login",
                type: 'PUT',
                uid: 'herokubackend',
                data: { userid: user, password: pass},
                success: function(data) {
                    switch (data) {
                    case "0":
                        alert("Loing Successful");
                        document.getElementById("coursereg").innerHTML = "Click here for Course Registration";
                    case "1":
                        alert("Invalid User, Please signup");
                        break;
                    case "2":
                        alert("Invalid Password. Please retry.");
                        break;
                    }
                },
                error: function() {
                    alert('Error');
                }
            });
        }).catch(function(error){
            res.status(403);
            res.send();
        });


    }
});

ReactDOM.render(
    <Login/>,
    document.getElementById('content')
);
