
// Timer for use is games.
game1Played = 0;

gameTimer = function(count) {
        var self = this;

        self.cb = null;
        self.originalCount = count;

        self.attachCallback = function(cb) {
            self.cb = cb;
        }

        self.start = function() {
            self.tick();
        }

        self.tick = function() {
            if(self.cb) {
                self.cb.call(self, count);
            }
            if(count > 0) {
                count--;
                setTimeout(self.tick, 1000);
            }
        }
};

// Functions for game 1
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
		alert(game1Played);	
		if (game1Played > 0) {
			button.classList.remove('buttonDisplayLong');
		} else {
			button.classList.remove('buttonDisplay');
		}
		button.classList.add('textAnim');
		showBubble("Reach a target of 50 points in a minute. Use my belly meter to learn. Go!");
		var myTimer = new gameTimer(60);
        myTimer.attachCallback(function(count) {
                countdown = count;
                originalCount = this.originalCount;
                //console.log(count+" "+originalCount);
        });
        myTimer.start();
        game1Played = 0;

}

moveDials = function() {
    //Set the outer dial to reflect points bonus
    var l = ((pointIncr/5)*100)*.01;
    lazyDial = l.toFixed(2);
    // Set inner dial to new points increment
    pointsDial = ((Points/50)*100)*.01;
    // Set time to fraction of 1
    timefraction = ((countdown/originalCount)*100)*.01;
    timefractionR = timefraction.toFixed(2);


    if (countdown == 0 || Points >= 50) {
    // If task complete - alert the player
		showBubble("A courageous level of lethargy Well done Human! Completed with "+countdown+" seconds to spare");
		endGame1();
    } else if (countdown == 0 && Points != 50) {
        showBubble("You need to be faster at doing nothing! Try again!");   
    }
    // Check if value is not NaN before moving the dials
    var ln = isNaN(lazyDial);

   if (!ln) { 
        // Calling arcTween function of D3 (graph.js) code. to animate arcs
        outerShape.transition()
        .duration(1000)
        .call(arcTween, lazyDial * τ, outerArc);
        //}
        midShape.transition()
        .duration(500)
        .call(arcTween, pointsDial * τ, midArc);

        innerShape.transition()
        .duration(500)
        .call(arcTween, timefractionR * τ, innerArc);  
   }

        
}


endGame1 = function() {
	//hide graphs
	var graph = document.getElementById("graph");
	graph.classList.remove('animate');
	//hide bottom text
	var stats = document.getElementById("stats");
	stats.classList.remove('animate');
	// main character slides down
	var character = document.getElementById("character");
	character.classList.remove('rise');
	character.classList.add('fall');
	// stop watching the accelerometer
	stopAccelWatch();
	// show restart button
	var button = document.getElementById("textAnimButton");
	button.classList.add('buttonDisplayLong');
	button.innerHTML = "Try Again";


}