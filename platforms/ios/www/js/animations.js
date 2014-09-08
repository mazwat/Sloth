
//To hide text animation divs once they have played through
//alert("animation script loaded");
var animBoxList = document.querySelectorAll('.textAnim');
var i = 0;
[].forEach.call(animBoxList, function(animBox) {
	animBox.addEventListener('webkitAnimationEnd',function(event) {
		document.querySelector(".textAnim.display").classList.remove("display");
		displayAnim();
		
	}, false);
});

displayAnim = function() {
	if (!animBoxList[i]) {
		var button = document.getElementById("textAnimButton");
		//console.log(button);
		//var button = document.getElementsByClassName("textAnimButton");
		button.classList.add('buttonDisplay');
		//button = button + " buttonDisplay";
		return
	}
	animBoxList[i].classList.add('display');
	i++;		

}
displayAnim();


showGame = function() {
		var stats = document.getElementById("stats");
		stats.classList.add('animate');
		var graph = document.getElementById("graph");
		graph.classList.add('animate');
		startAccelWatch();

}