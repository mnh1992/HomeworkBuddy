/**
 * Created by Maheshi.Hemachandra on 10/12/2016.
 */
/**
 * Created by Maheshi.Hemachandra on 10/10/2016.
 */
 /*
window.onload(myFunction());

//Generate a file upload method to post homework
function myFunction(){
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead.
        }
    }
    document.getElementById("demo").innerHTML = txt;
}*/

var request = require('request');
var file = require('fs');

//Not sure how to bring the credentials and api key into this
firebase.initializeApp({
    serviceAccount: "private_key.json",
    databaseURL: "https://whiteboard-10ec5.firebaseio.com"
});
//Trying to push files to Google Cloud here
request({
    method: 'POST',
    preambleCRLF: true,
    postambleCRLF: true,
    key = 'AIzaSyCY8yPTCFfu0vwTx7jMcC8rvt_o5FC_K3E',
    uri: 'upload/blob/myBucket/',
    multipart: [
        {'content-type': 'application/pdf'
        body: file.createReadStream()}
    ]},

    function(error, res, body){
        if(error){
            return console.error('upload failed: ', error);
        }
        console.log('Upload successful! Server responded with: ', body);
    }
});


