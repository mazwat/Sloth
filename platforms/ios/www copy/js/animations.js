
//To hide text animation divs once they have played through
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
		// show the "Start Training" button if we are at the end of the text cycle
 		var button = document.getElementById("textAnimButton");
		button.classList.add('buttonDisplay');
		return
	}
	animBoxList[i].classList.add('display');
	i++;		

}
displayAnim();



// Show & Hide the tip speech bubble
showBubble = function(text) {
		// var stats = document.getElementById("stats");
		// stats.classList.add('blurIn');
		triggerClassEvent('stats','blurIn','add');
		triggerClassEvent('graph','blurIn','add');
		triggerClassEvent('character','blurIn','add');
		//bounceGraph();
		// var graph = document.getElementById("graph");
		// graph.classList.add('blurIn');
        var character = document.getElementById("character");
		character.classList.add('blurIn');
		speech.classList.add('display');
		var tail = document.getElementById("tail");
		tail.innerHTML = text;
			speech.addEventListener('webkitAnimationEnd',function(event) {
				speech.classList.remove('display');
				stats.classList.remove('blurIn');
				graph.classList.remove('blurIn');
				character.classList.remove('blurIn');
				stats.classList.add('blurOut');
				graph.classList.add('blurOut');
				character.classList.add('blurOut');
			}, false);
}

triggerClassEvent = function(divtarget,cssclass,type) {
	var divtarget = document.getElementById(divtarget);
	if (type =='add') {
		divtarget.classList.add(cssclass);
	}
	if (type =='remove') {
		divtarget.classList.remove(cssclass);
	}
	
}


// bounceGraph = function() {
//     triggerClassEvent('graph svg','bounce','add');
// }