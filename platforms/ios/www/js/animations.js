
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

// Animate the stats and graphs in
showGame1 = function() {
		var stats = document.getElementById("stats");
		stats.classList.add('animate');
		var graph = document.getElementById("graph");
		graph.classList.add('animate');
		startAccelWatch();
		var button = document.getElementById("textAnimButton");
		var character = document.getElementById("character");
		var shake = document.getElementById("shake");
		character.classList.add('rise');
		shake.classList.remove('shake');
		button.classList.remove('buttonDisplay');
		button.classList.add('textAnim');
		showBubble("Reach a target of 50 points in a minute. Use my belly meter to learn. Go!");
		var myTimer = new gameTimer(60);
        myTimer.attachCallback(function(count) {
                countdown = count;
                originalCount = this.originalCount;
                //console.log(count+" "+originalCount);
        });
        myTimer.start();

}

// Show & Hide the tip speech bubble
showBubble = function(text) {
		var speech = document.getElementById("speech");
		speech.classList.add('display');
		var tail = document.getElementById("tail");
		tail.innerHTML = text;
			speech.addEventListener('webkitAnimationEnd',function(event) {
				speech.classList.remove('display');
			}, false);
}