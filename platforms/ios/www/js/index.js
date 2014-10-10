/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 function onLoad() {
        document.addEventListener('deviceready', processDB, false);
        document.addEventListener("resume", onResume, false);
        document.getElementById("textAnimButton").addEventListener('click', showGame);
        document.body.addEventListener('touchstart', stopPressing, false);
        document.ontouchmove = function(e){
            e.preventDefault();
        }
        // setTimeout(function() {
        //     navigator.splashscreen.hide();
        //     displayAnim();
        // }, 1500);

}
// Functions to occur on load of the app
  
function onResume() {
    // Give feedback to the player when they open the app after putting it in the background.
    setTimeout(function() {
      showBubble("Did I say you could close the app!");
    }, 0);
}

function stopPressing() {
    // To stop player pressing screen when playing.
    if (gameStart) {
       showBubble("Stop pressing and play!"); 
    }
}
