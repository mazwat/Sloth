
// Timer for use is games.
game1Played = 0;
gameStart = false;

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



//document.getElementById("textAnimButton").addEventListener("click", showGame1);

// Functions for game 1
showGame = function() {  
        //alert("pressed");
        gameStart = true;
        triggerClassEvent('shake','shake','remove');
        var character = document.getElementById("character");
        
        
        
		//alert(game1Played);	
		if (game1Played > 0) {
			textAnimButton.classList.remove('buttonDisplayLower');
            character.classList.remove('fallSlightly');
            character.classList.add('riseSlightly');
            character.addEventListener('webkitAnimationEnd',function(event) {
                triggerClassEvent('stats','animate','add');
                triggerClassEvent('graph','animate','add');
                triggerClassEvent('textAnimButton','textAnim','add');
            }, false);
            Points = 0;
		} else {
			textAnimButton.classList.remove('buttonDisplay');
            character.classList.add('rise');
            character.addEventListener('webkitAnimationEnd',function(event) {
                triggerClassEvent('stats','animate','add');
                triggerClassEvent('graph','animate','add');
                triggerClassEvent('textAnimButton','textAnim','add');
            }, false);
            
		}
        
		startAccelWatch();

		showBubble("Reach a target of 50 points in a minute. Use my belly meter to learn. Go!");

		var myTimer = new gameTimer(60);
        myTimer.attachCallback(function(count) {
                countdown = count;
                originalCount = this.originalCount;
                //console.log(count+" "+originalCount);
        });

        myTimer.start();
        game1Played++; 
        bounceGraph();       



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
		showBubble("A courageous level of lethargy Well done Human! <br><span class='bonus'>Completed with "+countdown+" seconds to spare</span>");
		endGame1();
    }
    if (countdown == 0 && Points != 50) {
        // If timer finished but player does not have enough points - alert the player
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
	graph.classList.remove('animate');
	//hide bottom text
	stats.classList.remove('animate');
	// main character slides down slightly
	character.classList.remove('rise');
	character.classList.add('fallSlightly');
	// stop watching the accelerometer
	stopAccelWatch();
	// show restart button
	textAnimButton.classList.add('buttonDisplayLower');

	textAnimButton.innerHTML = "Try Again";


}