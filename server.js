/**
 * Created by Maheshi.Hemachandra on 10/25/2016.
 */
var gcloud = require('google-cloud');
var firebase = require('firebase');
var multer = require("multer");
var firebase = require("firebase");
var express = require('express');
var app = express();
var uploader = multer({ storage: multer.memoryStorage({}) });
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

firebase.initializeApp({
    serviceAccount: "privkey.json",
    databaseURL: "https://whiteboard-10ec5.firebaseio.com"
});

var port = process.env.PORT || 3000;

/**
 * Google cloud storage part
 */
var CLOUD_BUCKET="whiteboard-10ec5.appspot.com"; //From storage console, list of buckets
var gcs = gcloud.storage({
    projectId: 'whiteboard-10ec5', //from storage console, then click settings, then "x-goog-project-id"
    keyFilename: 'privkey.json' //the key we already set up
});

function getPublicUrl (filename) {
    return 'https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + filename;
}

var bucket = gcs.bucket(CLOUD_BUCKET);
//From https://cloud.google.com/nodejs/getting-started/using-cloud-storage
function sendUploadToGCS (req, res, next) {
    if (!req.file) {
        return next();
    }

    var gcsname = Date.now() + req.file.originalname;
    var file = bucket.file(gcsname);

    var stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', function (err) {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', function () {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        var options = {
            entity: 'allUsers',
            role: gcs.acl.READER_ROLE
        };
        file.acl.add(options, function(a,e){next();});//Make file world-readable; this is async so need to wait to return OK until its done
    });

    stream.end(req.file.buffer);
}

var fireRef = firebase.database().ref('homework');
//Make a new one
app.post('/upload', uploader.single("img"), sendUploadToGCS, function (req, res, next) {
    var data = {"text" : req.body.todoText};
    if(req.file)
        data.img = getPublicUrl(req.file.cloudStorageObject);
    console.log(data.img + " "+ data.text);
    fireRef.push(data, function () {
        res.send("OK!");
    }).catch(function(){
        res.status(403);
        res.send();
    });
});

app.put('/coursesignup', function (req, res) {
    var dbRef = firebase.database().ref('course');
    var school = req.body.school;
    var course = req.body.course;
    var user = req.body.user;
    //Reference the course table in firebase
    var idToken = req.body.token;
    console.log("Token: " + req.body.token);
    firebase.auth().verifyIdToken(idToken).then(function (decodedToken) {
      // console.log("sdfdfdsf");
        var uid = decodedToken.uid;
       // console.log("UID"+uid);
        user=decodedToken.uid;
        console.log("sdfdfdsf"+user);
        dbRef.child(user).child(school)
            .orderByChild("course")
            .equalTo(course)
            .once("value", function (snapshot) {
                if (!snapshot.exists()) {
                    dbRef.child(user).child(school).push({
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
});


app.put('/register', function (req, res) {
    var dbRef = firebase.database().ref('users');
    var dbRef1 = firebase.database().ref('users');

    var first = req.body.firstn;
    var last = req.body.lastn;
    var role = req.body.role;
    var email = req.body.email;

    var logint =" ";
    console.log("user" + last);
    var idToken = req.body.token;
    console.log("Token: " + req.body.token);
        firebase.auth().verifyIdToken(idToken).then(function (decodedToken) {
            var uid = decodedToken.uid;
            var user = decodedToken.uid;

            dbRef.child(user).once("value").then(function (snapshot) {
                if (snapshot.exists()) {
                    console.log("User already exists");
                    res.send("1");
                    return;
                }
                else {
                    console.log("User created");
                    dbRef1.child(user).set({
                        First: first,
                        Last: last,
                        Role: role,
                        Email: email,
                        LoginTime: logint
                    });
                    res.send("0");
                }
            });
        });
});

app.put('/login', function (req, res) {
    var dbRef = firebase.database().ref('users');
    var dbRef1 = firebase.database().ref('users');
    var user=req.body.userid;
    var pass=req.body.password;
    var idToken = req.body.token;
    //console.log("Token: " + req.body.token);
    firebase.auth().verifyIdToken(idToken).then(function (decodedToken) {
        var uid = decodedToken.uid;
        console.log("UID"+uid);
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
                    dbRef1.child(user).update({LoginTime: datetime});
                    res.send("0");
                    return;
                }
            } else {
                console.log("Invalid user id. Please signup.");
                res.send("1");
            }
        });
    });

});

app.get('/emptyHtml.html', function (req, res) {
    console.log("Requested empty html");
    res.send("OK!");
});

app.use(express.static('public'));

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
