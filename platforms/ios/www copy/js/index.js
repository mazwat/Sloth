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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('deviceready', processDB, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
// Functions to occur on load of the app
window.addEventListener('load', function() {
    // Stop user from trying to scroll the screen
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);
    // Activate listener for main game start/try again button
    document.getElementById("textAnimButton").addEventListener('click', showGame);

    document.addEventListener("resume", onResume, false);
        function onResume() {
            setTimeout(function() {
              showBubble("Did I say you could close the app!");
        }, 0);
    }
    // To stop player pressing screen when playing.
    document.body.addEventListener('touchstart', function(e){
        if (gameStart) {
           showBubble("Stop pressing and play!"); 
        }
        //alert(e.changedTouches[0].pageX +" "+ e.changedTouches[0].pageY ) // alert pageX coordinate of touch point
    }, false)

    

}, false);


