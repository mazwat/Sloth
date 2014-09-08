    // The watch id references the current `watchAcceleration`

    var watchIDAccel = null;
    
    //var stepSample =[];
    //var max;
    //var min;
    //var accelCombiSample =[];
    var accelCombi = 0;
    var isChange = 0;
    var mOldAccX = 0;
    var mOldAccY = 0;
    var mOldAccZ = 0;
    var NumberOfSteps = 0;
    //var TotalSteps = 0;
    var Points = 0;
    var pointsSample = [];
    var timer;
    var timerSet = 0;
    //var countdown;
    //var countdown_number;
    var accelCombiR;
    var timerSet2 = 0;
    var lazyDial = .1;
    var pointsDial = .1;
    var pointIncr;
    
    function startAccelWatch() {
        // Update acceleration every .2 seconds
        var options = { frequency: 200 };
        watchIDAccel = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        //var sendInt = setInterval(sampleSteps,1000);
    }
    
    //onSuccess: Get a snapshot of the current acceleration and process X,Y and Z values into steps
    function stepProcess(acceleration) {
        var xx = acceleration.x;
        var yy = acceleration.y;
        var zz = acceleration.z;
        //var time = acceleration.timestamp;
        var disc = document.getElementById("accelerometer");
        accelCombi = (mOldAccX * xx) + (mOldAccY * yy) + (mOldAccZ * zz);
        var a = Math.abs(Math.sqrt(mOldAccX * mOldAccX + mOldAccY * mOldAccY + mOldAccZ * mOldAccZ));
        
        var b = Math.abs(Math.sqrt(xx * xx + yy * yy + zz * zz));
        
        accelCombi /= (a * b);
        accelCombiR = accelCombi.toFixed(4); 
        
        //Get max and min values of accel with function
        
        if (accelCombi <= 0.994 && accelCombi > 0.90) { // bounce calibration
            clearTimeout(timer);
            timerSet=0;
            if (!isChange) {
                isChange = 1;   
                NumberOfSteps += 1;
                if (Points > 3) {
                    Points -= 3;
                    moveDials();
                } else {
                    Points = 0;
                    moveDials();
                }
            } else {
                isChange = 0;
            }
            
            
        //after 3 seconds of no movement set step value to 0
        //
        } else {
            if (!timerSet) {
                timerSet = 1;
                timer = setTimeout(function(){
                    NumberOfSteps=0;
                    timerSet=0;
                },3000);
                
            }
        }

        if (accelCombiR == 1) {
            timerSet2++;
            if (timerSet2 == 1) {
                //alert("first");
                testInactivity();
            }

        }
               
        mOldAccX = xx;
        mOldAccY = yy; 
        mOldAccZ = zz;
    }

    function testInactivity() {
// To test over .3 second intervals whether the player is cheating by leaving the phone on a level surface. Detects minor fluctuations on the acceleration value.
            var beat = setInterval(function(){
                if (pointsSample.length <= 8) {
                    pointsSample.push(Number(accelCombiR));
                } else {
                    clearInterval(beat);
                    var lazy = check_for_equal_array(pointsSample);

                    if (lazy) {
                        //alert("Don't cheat by putting it down!\n You lose 2 points");
                        if (Points > 2) {
                            Points -= 2;
                        } else {
                            Points = 0;
                            
                        }
                        
                    } else {
                        pointIncr = average_array(pointsSample);
                        Points += pointIncr;
                        
                    }
                    timerSet2 = 0; 
                    pointsSample = [];

                    moveDials();

                }
            }, 100);

    }

    function check_for_equal_array(my_array){
        // Used to work out if the all the values in the sample are the same. If the same then the user has put their phone down.
        if (my_array.length == 1 || my_array.length == 0) {
            return true;
        }
        for (i=0;i<my_array.length;i++){
            if (i > 0 && my_array[i] != my_array[i-1]) {
                return false;
            }
        }
        return true;
    }

    function average_array(my_array) {
        // to calculate the amount to increment the score by, based by how much movment is detected - less movement more points.
        var sum = my_array.reduce(add, 0);

        function add(a, b) {
            return a + b;
        }

        var average = sum/my_array.length;
        var avRound = average.toFixed(5);

        //score increment based on small fluctuations in movment

        if (avRound > 0.99998) {
            //alert("score +3");
            return 5;
            
        }

        if (avRound >= 0.99995 && avRound <= 0.99998) {
           //alert("score +2");
            return 4;
        }

        if (avRound >= 0.99993 && avRound < 0.99995) {
           //alert("score +2");
            return 3;          
        }

        if (avRound >= 0.99991 && avRound < 0.99993) {
           //alert("score +2");
            return 2;          
        }

        if (avRound < 0.99991) {
            //alert("score +1");
            return 1;
        }

    }

    function moveDials() {
        //Set the outer dial to reflect points bonus
        var l = ((pointIncr/5)*100)*.01;
        lazyDial = l.toFixed(2);
        console.log("lazyDial "+lazyDial);
        // Set inner dial to new points increment
        pointsDial = ((Points/50)*100)*.01;
        console.log("pointsDial "+pointsDial);

        if (Points > 52) {
        // If task complete - alert the player
            alert("A courageous level of lethargy\n Well done Human!");
        }

        var ln = isNaN(lazyDial);

       if (!ln) { 
            // Calling arcTween function of D3 (graph.js) code. to animate arcs
            outerShape.transition()
            .duration(1000)
            .call(arcTween, lazyDial * τ, outerArc);
            //}
            innerShape.transition()
            .duration(500)
            .call(arcTween, pointsDial * τ, innerArc); 
       }

        
    }
    
    //Once App is started start calculating steps
    function onSuccess(acceleration) {  
        // Start processing steps
        stepProcess(acceleration);
        //Show steps on screen
        document.getElementById('accelerometer').innerHTML = "Laziness Rating - " + pointIncr;
        // document.getElementById('feedback').innerHTML = "Accel - " + accelCombiR;
        //document.getElementById('feedback').innerHTML = "Max: " + max + "<br />Min: " + min;
        document.getElementById('points').innerHTML = "Target - " + Points;
        //createGraph();
    }

    
    // onError: Failed to get the acceleration
    function onError() {
        alert('Error Acceleration Cannot Be Measured');  
    } 