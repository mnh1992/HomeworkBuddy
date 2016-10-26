/**
 * Created by Maheshi.Hemachandra on 10/1/2016.
 */
"use strict";

// Initialize Firebase
firebase.initializeApp({
    serviceAccount: "private_key.json",
    databaseURL: "https://whiteboard-10ec5.firebaseio.com"
});

//This function returns an acronym for longer school names
function getShortName(str) {
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join('');
    return acronym
}

//Add a new school if user has not already signed up for that course.
function course_signup() {
    var school = $('#school').val();
    var course = $('#course').val();
    //Reference the course tabe in firebase
    var dbRef = firebase.database().ref("course/" + user);
    dbRef.child(school)
        .orderByChild("course")
        .equalTo(course)
        .once("value", function(snapshot) {
            if (! snapshot.exists()) {
                dbRef.child(school).push({
                    course: course
                });
                alert("New course added!");
                return;
            } else  {
                alert("You have already signed up for this course!");
            }
        });
}
var user;

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
                <h1> WhiteBoard</h1>
                <p id="username">Welcome! {user} </p>
                <h2>Course Signup Page</h2>
                <h2>First you need to add your school</h2>
                <div id="controls">
                    <select id="school">
                        {this.state.options}
                    </select>
                </div>
                <div>
                    <input type="text" id="course" placeholder="Enter your course"/>
                </div>
                <div>
                    <button id="csignup" onClick={course_signup}> Signup</button>
                    <button id="stat" onClick={genSignupStat}> Stat</button>
                </div>
            </div>
        );
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
                    var sch_acrnm = getShortName(sch_name);
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

//
function genSignupStat(){
    var dbRef = firebase.database().ref("SignupStat/");
    var txtFile = "signupstat.tsv";
    var statArray =[""];

    var txtFile = new Blob(output,filepath);

    dbRef.on("child_added", function(snapshot)
    {
        var str=snapshot.key + "   " + snapshot.val();
        statArray.push(str);
        writeTextFile(txtFile, statArray);
    })
};

function writeTextFile(filepath, output) {
    var txtFile = new File(output,filepath);
}
