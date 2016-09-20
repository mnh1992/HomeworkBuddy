var about = document.getElementById("about_us");
var aboutListContents = ["Motivation", "Vision", "Careers"];
var list = document.createElement("ul");

about.onmousedown = function (){
	
	for(var i in aboutListContents){
		var item = document.createElement("a");
		item.href = "#"; //add links later
		item.id = aboutListContents[i];
		item.innerText = aboutListContents[i];

		var element = document.createElement("li");
		element.appendChild(item);
		list.appendChild(element);

	}
document.getElementById("about_us").appendChild(list);
	}


var product = document.getElementById("product");
var productListContents = ["Homework Management System", "Q & A Forum", "File System", "Alerts"];
var list = document.createElement("ul");

product.onmousedown = function (){
	
	for(var i in productListContents){
		var item = document.createElement("a");
		item.href = "#"; //add links later
		item.id = productListContents[i];
		item.innerText = productListContents[i];

		var element = document.createElement("li");
		element.appendChild(item);
		list.appendChild(element);

	}
document.getElementById("product").appendChild(list);
	}











