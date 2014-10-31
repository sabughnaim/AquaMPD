<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ZZZ-Naps made Easy</title>
    <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <script src="./Scripts/jquery-1.9.1.min.js"></script>
    <script src="./Scripts/bootstrap.min.js"></script>
    <script src="./Scripts/jquery.jplayer.min.js"></script>    
    <script type="text/javascript" src="./Scripts/jplayer.playlist.min.js"></script>
    <script src="./Scripts/functions.js"></script>    
    <link href="./Content/bootstrap.min.css" rel="stylesheet">
    <link href="./home.css" rel="stylesheet">
    <link href="./Content/skin/blue.monday/jplayer.blue.monday.css" rel="stylesheet" type="text/css" />
</head > 
<body class="colorChange">
    <div class="container-fluid">
        <h1 id="name">ZZZ</h1>
        <div id="home">
            <img class="img_main" onclick="$('.img_main').addClass('move-left'); var t=setTimeout(function() {$('.img_main').removeClass('move-left');},2000);" src="./pics/sheep.png"/>
        
            </br>
       	    <!--<div id="nap_time" onclick="showTimer()" class="btn   btn-sample">Nap Time</div>-->
        </div>
        <div id="timer" style="display:none; margin:0px 0px 00px 0px">
            <div class="input-group" style="margin-top:-30px; display:none">
                <input id="hours" type="text" class="form-control" value="0"><span class="input-group-addon">hour</span>
                <input id="mins" type="text" class="form-control" value="15"><span class="input-group-addon">min</span>
            </div>

            <button style="display:none" type="button" id="startButton" data-loading-text="Loading..." class="btn   btn-sample" autocomplete="off" onclick="playAudio('./Content/ts_music.mp3',($('#hours').val()*60+$('#mins').val()*1)*60*1000); timerStart()">Start</button>
        </div>
        <div id="op-group">
                <button type="button" id="op0" class="btn btn-sample" onclick="countdownStart(1)">1 mins</button>
                <button type="button" id="op1" class="btn btn-sample" onclick="countdownStart(10)">10 mins</button>
                <button type="button" id="op2" class="btn   btn-sample" onclick="countdownStart(20)">20 mins</button>
                <button type="button" id="op3" class="btn   btn-sample" onclick="countdownStart(30)">30 mins</button>
                <button type="button" id="op4" class="btn   btn-sample" onclick="countdownStart(40)">40 mins</button>
                <button type="button" id="op5" class="btn   btn-sample" onclick="countdownStart(60)">60 mins</button>
                <button type="button" id="op6" class="btn   btn-sample" onclick="countdownStart(90)">90 mins</button>
                <button type="button" id="op7" class="btn   btn-sample" onclick="countdownStart(120)">120 mins</button>
            </div>
        <div id="restTime" style="display:none">
            <div class="countdown">
                <span id="restHours"></span>
                <span id="secondColon0"> : </span>
                <span id="restMins"></span>
                <span id="secondColon1"> : </span>
                <span id="restSecs"></span>
            </div>
            <button type="button" id="endButton" data-loading-text="Loading..." class="btn btn-lg btn-sample" style="margin-top:-40px; width: 80%"autocomplete="off" onclick="location.reload();">End</button>
            <!--<button type="button" id="backButton" data-loading-text="Loading..." class="btn   btn-sample" autocomplete="off" onclick=".reload();">Back</button>-->
            
        </div>
        <div id="settings" class="settings">
            <a href="#" onClick="revealSettings()"><img src="./pics/gear.png" width="40px" height="40px" /></a>
        </div>
        <div id="set" style="display:none;margin-top:20px">
            <h4>Timer Settings</h4>
            <div id="set-group" data-toggle="buttons" style="margin-top:10px;">
                <label id="op0" class="btn   btn-sample">
                    <input type="checkbox" checked>1 mins
                </label>
                <label id="op1" class="btn   btn-sample">
                    <input type="checkbox" checked>10 mins
                </label>
                <label id="op2" class="btn   btn-sample">
                    <input type="checkbox" checked>20 mins
                </label>
                <label id="op3" class="btn   btn-sample">
                    <input type="checkbox" checked>30 mins
                </label>
                <label id="op4" class="btn   btn-sample">
                    <input type="checkbox" checked>40 mins
                </label>
                <label id="op5" class="btn   btn-sample">
                    <input type="checkbox" checked>60 mins
                </label>
                <label id="op6" class="btn   btn-sample">
                    <input type="checkbox" checked>90 mins
                </label>
                <label id="op7" class="btn   btn-sample">
                    <input type="checkbox" checked>120 mins
                </label>
            </div>
            <h4>Song Settings</h4>
            <div id="song-group" class="btn-group" data-toggle="buttons" style="margin-top:10px">
                <label id="Fierce" class="btn btn-sample">
                  <input type="radio" name="options">Fierce
                </label>
                <label id="Happy" class="btn btn-sample">
                  <input type="radio" name="options">Happy
                </label>
                <label id="Calm" class="btn btn-sample">
                  <input type="radio" name="options">Calm
                </label>
                <label id="Angry" class="btn btn-sample">
                  <input type="radio" name="options">Angry
                </label>
            </div>
            </br>
            <button onClick="hidesettings()" class="btn   btn-sample">Save</button>
        </div>
    </div>
	<div id="jp_container_N" style="height:0px;">
            <div class="jp-type-playlist" style="height:0px;">
                <div id="jquery_jplayer_N" class="jp-jplayer"></div>                
                <div class="jp-playlist" style="display:none">
                    <ul>
                        <!-- The method Playlist.displayPlaylist() uses this unordered list -->
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
</body>
</html>

