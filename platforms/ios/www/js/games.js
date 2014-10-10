
// Timer for use is games.
played = 1;
game = 0;
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
        game = 1;
        console.log("game: "+game+" attempt: "+played);
        
        moveDials(innerShape, 0, innerArc);
        moveDials(midShape, 0, midArc);
        moveDials(outerShape, 0, outerArc);  
        console.log("pressed");
        gameStart = true;
        var character = document.getElementById("character");
        //alert(game1Played);
        // To check whether the game has been played before	
		if (played == 1) {
            console.log("first");
			triggerClassEvent('shake','shake','remove');
            textAnimButton.classList.remove('buttonDisplay');
            character.classList.add('rise');
            character.addEventListener('webkitAnimationEnd',function(event) {
                triggerClassEvent('stats','animate','add');
                triggerClassEvent('graph','animate','add');
                triggerClassEvent('textAnimButton','textAnim','add'); 
                //alert ("first" + game1Played);
                showBubble("Reach a target of 50 points in a minute. Use my belly meter to learn. Go!");
            }, false);
		} else {
            
            textAnimButton.classList.remove('buttonDisplayLower');
            character.classList.remove('fallSlightly');
            character.classList.add('riseSlightly');
            character.addEventListener('webkitAnimationEnd',function(event) {
                //triggerClassEvent('stats','animate','add');
                //triggerClassEvent('graph','animate','add');
                graph.classList.add('animate');
                stats.classList.add('animate');
                triggerClassEvent('textAnimButton','textAnim','add');
                //alert ("more than one" + game1Played);
                showBubble("Ok, concentrate this time, you can do it!");
            }, false); 
            console.log("another attempt"); 
		}

        startAccelWatch();

		var myTimer = new gameTimer(60);
        myTimer.attachCallback(function(count) {
                countdown = count;
                originalCount = this.originalCount;
                // Set time to fraction of 1
                timefraction = ((countdown/originalCount)*100)*.01;
                timefractionR = timefraction.toFixed(2);
                // aninmate graph to reflect countdown value
                moveDials(innerShape, timefractionR, innerArc);
        });
        myTimer.start();
        played++; 




}

setDials = function() {
    //Set the outer dial to reflect points bonus
    var l = ((pointIncr/5)*100)*.01;
    lazyDial = l.toFixed(2);
    // Set inner dial to new points increment
    pointsDial = ((Points/50)*100)*.01;

    if (countdown == 0 || Points >= 50) {
    // If task complete - alert the player
		showBubble("A courageous level of lethargy Well done Human! <br><span class='bonus'>Completed with "+countdown+" seconds to spare</span>");
		endGameOne();
    }
    if (countdown == 0 && Points != 50) {
        // If timer finished but player does not have enough points - alert the player
        showBubble("You need to be faster at doing nothing! Try again!");
        endGameOne();   
    }
    // Check if value is not NaN before moving the dials
    var ln = isNaN(lazyDial);

   if (!ln) { 
        // Calling arcTween function of D3 (graph.js) code. to animate arcs
        moveDials(outerShape, lazyDial, outerArc);
        moveDials(midShape, pointsDial, midArc);
 
 
   }        
}

moveDials = function(shape, pos, arc) {
        shape.transition()
        .duration(1000)
        .call(arcTween, pos * τ, arc);
}

endGameOne = function() {
	//hide graphs
	graph.classList.remove('animate');
	//hide bottom text
	stats.classList.remove('animate');
	// main character slides down slightly
    if (played>=2) {
        character.classList.remove('riseSlightly');
    } else {
        character.classList.remove('rise');
    }
	
	character.classList.add('fallSlightly');
	// stop watching the accelerometer
	stopAccelWatch();
	// show restart button
	textAnimButton.classList.add('buttonDisplayLower');
    if (Points >= 50) {
        textAnimButton.innerHTML = "Next";
    } else {
        textAnimButton.innerHTML = "Try Again";    
    }
    Points = 0;
    gameStart = false;
}


