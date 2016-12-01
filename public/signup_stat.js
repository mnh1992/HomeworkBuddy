/**
 * Created by Maheshi.Hemachandra on 10/12/2016.
 */
/**
 * Created by Maheshi.Hemachandra on 10/10/2016.
 */
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

window.onload = function() {
    genSignupStat();
}

var data = [];

//Generate signup information per college to an array
function genSignupStat(){
    var dbRef = firebase.database().ref("SignupStat/");

    var count=0;

    dbRef.on("child_added", function(snapshot)
    {
        var jsonData = {};
        count++;
        jsonData["school"] = snapshot.key;
        jsonData["signups"] = snapshot.val();
        data.push(jsonData);
    });

    dbRef.once("value", function(snap) {
        draw();
    });
};


//Draw the graph
function draw() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format("");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1, 1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) {
        return d.school;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.signups;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Enrollment");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.school);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return y(d.signups);
        })
        .attr("height", function (d) {
            return height - y(d.signups);
        });

    d3.select("input").on("change", change);

    var sortTimeout = setTimeout(function () {
        d3.select("input").property("checked", true).each(change);
    }, 2000);

    //Sorting the function
    function change() {
        clearTimeout(sortTimeout);

        // Copy-on-write since tweens are evaluated after a delay.
        var x0 = x.domain(data.sort(this.checked
            ? function (a, b) {
            return b.signups - a.signups;
        }
            : function (a, b) {
            return d3.ascending(a.school, b.school);
        })
            .map(function (d) {
                return d.school;
            }))
            .copy();

        svg.selectAll(".bar")
            .sort(function (a, b) {
                return x0(a.school) - x0(b.school);
            });

        var transition = svg.transition().duration(750),
            delay = function (d, i) {
                return i * 50;
            };

        transition.selectAll(".bar")
            .delay(delay)
            .attr("x", function (d) {
                return x0(d.school);
            });

        transition.select(".x.axis")
            .call(xAxis)
            .selectAll("g")
            .delay(delay);
    }
}
