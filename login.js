"use strict";

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
        $.ajax({url: "http://localhost:3000/login",
            type: 'PUT',
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
    }
});

ReactDOM.render(
    <Login/>,
    document.getElementById('content')
);