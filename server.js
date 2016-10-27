/**
 * Created by Maheshi.Hemachandra on 10/25/2016.
 */
var firebase = require("firebase");
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

firebase.initializeApp({
    serviceAccount: "privkey.json",
    databaseURL: "https://whiteboard-10ec5.firebaseio.com"
});

var dbRef = firebase.database().ref('users');

var port = process.env.PORT || 3000;

app.put('/coursesignup', function (req, res) {
    var school = req.body.school;
    var course = req.body.course;
    //Reference the course table in firebase
    dbRef.child(school)
        .orderByChild("course")
        .equalTo(course)
        .once("value", function(snapshot) {
            if (!snapshot.exists()) {
                dbRef.child(school).push({
                    course: course
                });
                console.log("New course added!");
                res.send("0");
                return;
            } else {
                console.log("You have already signed up for this course!");
                res.send("1");
            }
        });
});

app.put('/register', function (req, res) {
    var user = req.body.userid;
    var first = req.body.firstn;
    var last = req.body.lasttn;
    var role = req.body.role;
    var email = req.body.email;
    var pass = req.body.pass;
    console.log("Here");
    dbRef.child(user).once("value").then(function (snapshot) {
        if (snapshot.exists()) {
            console.log("User already exists");
            res.send("1");
            return;
        }
        else {
            dbRef.set({
                First: first,
                Last: last,
                Role: role,
                Email: email,
                Passwd: pass
            });
            console.log("User created");
            res.send("0");
        }
    });
});

app.put('/login', function (req, res) {
    var user=req.body.userid;
    var pass=req.body.password;
    var dbRef1=dbRef;
    dbRef.child(user).once("value").then(function (snapshot) {
        if (snapshot.exists()) {
            if (pass !== snapshot.child("Passwd").val()) {
                console.log("Invalid password. Retry!");
                res.send("2");
                return;
            } else {
                var datetime = Date();
                console.log("Login Successful!");
                window.localStorage.setItem('username', user);
                dbRef1.child(user).push({logintime: datetime});
                res.send("0");   // Code never reaches here need to investigate
                return;
            }
        } else {
            console.log("Invalid user id. Please signup.");
            res.send("1");
        }
    });

});

app.use(express.static('public'));

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
