//Greet the user when filled out the login page info and hit enter button
$(document).ready(function(){
    $('#btn1').click(function(){
	window.alert("univ" + search_univ.value + "class" + search_class.value + "teacher/stu" + teach_learn.value);
	});
});

//Greet the user for creating an account at WhiteBoard
$(document).ready(function(){
    $('#btn2').click(function(){
	window.alert("Successfully entered your account");
	});
});

function writeUserData(userId, name, email, imageUrl) {
firebase.database().ref('users/' + userId).set({
username: name,
email: email,
profile_picture : imageUrl
});
}
