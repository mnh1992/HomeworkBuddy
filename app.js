/**
 * Created by manol_000 on 10/27/2016.
 */
var express=require("express");
var app= express();
var path=require("path");
var formidable=require("formidable");
var fs= require("fs");
var gcloud= require('google-cloud');

app.use(express.static(path.join(__dirname,'public')));
app.get('/',function(req,res){
    res.sendFile(path.join__dirname, 'views/suggestionsInput.html')
});
app.post('/suggestionsInput.html',function(req,res){
    //incoming form object
    var form= new formidable.IncomingForm();
    //only allowed 1 file
    form.multiples=false;
    //store file in uploads directory
    form.uploadDir=path.join(__dirname, '/uploads');
    //log errors
    form.on('error',function(err){
        console.log('An error has occured: ' + err);

    });
})