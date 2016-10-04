/**
 * Created by Maheshi.Hemachandra on 10/1/2016.
 */
"use strict";

// Populate select element with Virginia universities

function add_school() {
    var va_schools = $.ajax("https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,id&_per_page=100&school.main_campus=1&school.state=va&school.degrees_awarded.predominant=3&api_key=FNMmHrRzLriPD033jmlA96AOgjmUmKXiRUviDLnU")
        .done(function() {
            var data = va_schools.responseJSON.results;
            var html = '';
            var len = data.length;
            for (var i = 0; i< len; i++) {
                html += '<option value="' + data[i]['id'] + '">' + data[i]['id'] + " - " + data[i]['school.name'] + '</option>';
            }
            $('#school').append(html);
        });
}
var user ;
window.onload = function() {

    user = localStorage.getItem('username');
    if (user != "undefined" || user != "null") {
        document.getElementById("username").innerHTML="Welcome " + user +"!";
        add_school();
    } else
        alert("You are not logged in. Please login at the login page.");
    //document.getElementById('welcomeMessage').innerHTML = "Hello!";
}

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDLUpdtV-WPzKo3_4E2EnzcLMy_Cved_DU",
    authDomain: "whiteboard-10ec5.firebaseapp.com",
    databaseURL: "https://whiteboard-10ec5.firebaseio.com",
    storageBucket: "whiteboard-10ec5.appspot.com",
    messagingSenderId: "867522105303"
};

firebase.initializeApp(config);

function course_signup() {
    var school = $('#school').val();
    var course = $('#course').val();

    var dbRef = firebase.database().ref("course/" + user);
    dbRef.once("value").then(function (snapshot) {
        if (snapshot.exists()) {
            alert("Duplicate Course");
            return;
        }
        else {
            dbRef.set({
                School: school,
                Course: course
            });
            alert("Course Added");
        }
    });
}