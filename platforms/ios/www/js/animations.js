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
	speech.classList.add('display');
	var tail = document.getElementById("tail");
	tail.innerHTML = text;
		speech.addEventListener('webkitAnimationEnd',function(event) {
			speech.classList.remove('display');
			outerShape.transition()
        	.duration(1000)
        	.call(arcTween, 0 * τ, outerArc);
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

bounceGraph = function() {
    var graph = document.getElementById("graph");
    var svgList = graph.getElementsByTagName('svg');
    var svgBox = svgList[0];
	svgBox.classList.add('bounce');
	svgBox.addEventListener('webkitAnimationEnd',function(event) {
		svgBox.classList.remove('bounce');
	}, false);
}