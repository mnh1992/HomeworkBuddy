var ref = new Firebase("https://whiteboard-10ec5.firebaseio.com/");
var usersRef = ref.child("users");

//Greet the user when filled out the login page info and hit enter button
$(document).ready(function(){
    $('#btn1').click(function(){
	window.alert("Hello");
	//usersRef.push(
	//{ 
	//	first: "Hello", 
	//	last: "World"
	//});    
    });
});



//Greet the user for creating an account at WhiteBoard
$(document).ready(function(){
    $('#btn2').click(function(){
	window.alert("Successfully entered your account");
	});
});

//function writeUserData(userId, name, email, imageUrl) {
//firebase.database().ref('users/' + userId).set({
//username: name,
//email: email,
//profile_picture : imageUrl
//});
//}

//$(document).ready(function(){
//    $('#btn1').click(function(fname, lname){
	//window.alert("univ" + search_univ.value + "class" + search_class.value + "Name" + fname.value+ " " + lname.value);
//	firebase.database().ref('users/' + fname).set({
//	lname: lname
//	});    
//    });
//});

