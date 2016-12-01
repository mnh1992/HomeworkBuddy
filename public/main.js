/**
 * Created by Maheshi.Hemachandra on 10/3/2016.
 */
"use strict";

var about = document.getElementById("about_us");
var aboutListContents = ["Motivation", "Vision", "Careers"];
var list1 = document.createElement("ol");


var product = document.getElementById("product");
var productListContents = ["Homework Management System", "Q & A Forum", "File System", "Alerts"];
var list2 = document.createElement("ul");


var MainPage = React.createClass({
    render: function() {
        return (
            <div className="mainContent">
                    <header>
                        <a href="landingpage.html"><img src="wblogo.png" alt="logo here" width="100px" height="75px" class="logo"/></a>
                        <ul>
                            <li><a href="" id="about_us"> About Us </a></li>
                            <li> <a href="" id ="product"> Product </a></li>
                            <li> <a href="" id="students_speak"> Students Speak </a></li>
                            <li> <a href="" id="support"> Support </a></li>
                        </ul>
                        <div id="sign_up">
                            <a href= "register.html"> Sign Up </a>
                        </div>
                        <div id="login">
                            <a href="login.html"> Login </a>
                        </div>
                    </header>


        <section class="main_content">
                <article>
                    <header>
                        <h2>Learning Actively</h2>
                        <h3>Your Homework Management System</h3>
                    </header>
                    <img src="wbimage.jpg" alt ="Some kind of image with go here" width= "250px" height="200px"/>
                    <div class="right_side_main">
                        <ul>
                            <li> Q&A form fosters interactive learning </li>
                            <li> Homework folder system helps keeps students organized </li>
                            <li> Alerts makes it possible to never miss a deadline</li>
                            <li> Share resources capability</li>
                            <li> Virtual whiteboard to work out problems</li>
                        </ul>
                    </div>
                </article>
            </section>

            <div class="getting_started">
                <h1> Getting Started </h1>
                <div id="start_students">
                    <a href="register.html"> I am a Student</a>
                </div>
                <div id="start_instructors">
                    <a href="register.html"> I am an Instructor</a>
                </div>
            </div>
                <footer class="page_footer">
                    <div class="About_column">
                        <ul>
                            <p> About </p>
                            <li> Who we are </li>
                            <li> Careers </li>
                        </ul>

                    </div>
                    <div class="Support_column">
                        <ul>
                            <p> Support </p>
                            <li> Help </li>
                            <li> Contact Us </li>
                        </ul>
                    </div>
                    <div id="copywrite">Copywrite 2016 WhiteBoard Educational</div>
                </footer>
            </div>
        );
    }
});

ReactDOM.render(
    <MainPage  />,
    document.getElementById('main')
);
