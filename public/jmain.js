"use strict"

var schools = $.ajax("https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,id&_per_page=100&school.main_campus=1&school.state=va&school.degrees_awarded.predominant=3&api_key=6b4Zkq4AjASjtG3cJXo4r6GcikAgDikbTrnWKnlM")
    .done(function() {
        var data = schools.responseJSON.results;
        var html = '';
        var len = data.length;
        for (var i = 0; i< len; i++) {
            html += '<option value="' + data[i]['id'] + '">' + data[i]['school.name'] + '</option>';
        }
        $('#schoolSelector').append(html);
    })
//Greet the user for creating an account at WhiteBoard
$(document).ready(function(){
    $('#btn2').click(function(){
        window.alert("Successfully entered your account");
    });
});
