/**
 * Created by Maheshi.Hemachandra on 10/1/2016.
 */

"use strict";
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
                <p id="username"> User:  {user} </p>
                <h1>Course Signup Page</h1>
                <h2>Select your school and enter the course code</h2>
                <div id="controls">
                    <label>School: </label>
                    <select id="school">
                        {this.state.options}
                    </select>
                </div>
                <div>
                    <label>Course:</label>
                    <input type="text" id="course" placeholder="Enter your course"/>
                </div>
                <div>
                    <br/>
                    <button id="csignup" onClick={this.course_signup}> Signup</button>
                </div>
            </div>
        );
    },

    //This function returns an acronym for longer school names
    getShortName: function(str) {
        var matches = str.match(/\b(\w)/g);
        var acronym = matches.join('');
        return acronym
    },

    //Add a new school if user has not already signed up for that course.
    course_signup: function () {

        var school = $('#school').val();
        var course = $('#course').val();
        //Reference the course table in firebase
        $.ajax({url: "http://whitebd.herokuapp.com/coursesignup",
                type: 'PUT',
                data: { school: school, course: course},
                success: function(data) {
                    switch (data) {
                        case "0":
                            alert("Course signup successful");
                            break;
                        case "1":
                            alert("You have already signup for this course");
                            break;
                    }
                },
                error: function() {
                    alert('Error');
                }
            });
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
                    var sch_acrnm = this.getShortName(sch_name);
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
