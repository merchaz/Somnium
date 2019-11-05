var mainDiv;
var sceneCtr;
var zoomCtr;
var bAudioBtnCreated;
var bOffBtnCreated;
var bHelmCreated;
var transitionCtr;
var bPlanet1visited;
var bPlanet2visited;
var bPlanet3visited;
var bPlanet4visited;

function loadPage(){
    // Init
    sceneCtr = 0;
    transitionCtr = 0;
    zoomCtr = 0;
    bAudioBtnCreated = false;
    bOffBtnCreated = false;
    bHelmCreated = false;
    bPlanet1visited = false;
    bPlanet2visited = false;
    bPlanet3visited = false;
    bPlanet4visited = false;

    $('html, body').scrollLeft(0);

    // Setup Start
    mainDiv = document.getElementById("mainDiv");
    document.body.style.backgroundColor = "black";
    const startButton = document.createElement("Button");
    startButton.innerText = "Start";
    startButton.className = "startBtn";
    startButton.id = "startButton";
	startButton.innerHTML = '<img src="img/startButton.gif" />'
    startButton.onclick = function(){startBtnClicked()};

    const titleImg = document.createElement("img");
    titleImg.id = "titleImg";
    titleImg.src = "img/titleStatic.png";

    window.mainDiv.appendChild(titleImg);
    window.mainDiv.appendChild(startButton);
}

window.addEventListener('wheel', function(event)
{
    // scroll up
    if (event.deltaY < 0)
    {
        // Zoom In
        if (sceneCtr == 1) {
            if (zoomCtr >= 10){
                $('#scrollDown').fadeOut(2000);
            }
            if (zoomCtr <= 50) {
                $('body').css("overflow-y", "hidden");
                var scene1img = document.getElementById("scene1BGimg");
                scene1img.height = (scene1img.height + 30);
                scene1img.width = (scene1img.width + 20);
                var scene1sitting = document.getElementById("scene1sitting");
                scene1sitting.width = scene1sitting.width + 20;

                var curOffset = $("#scene1sitting").offset();
                $("#scene1sitting").offset({ top: curOffset.top - 30, left: curOffset.left +2});
                var curOffset2 = $("#scene1BGimg").offset();
                $("#scene1BGimg").offset({ top: curOffset2.top - 15, left: curOffset2.left -10});
                zoomCtr++;
            }
            else {
                sceneCtr = 1.5;
                zoomCtr = 0;
                showAudioButton(true);
            }
        }
        if (sceneCtr == 2){
            setTransitionFrameScene();
        }
        if (sceneCtr == 4) {
            zoomCtr--;
            setMobileFrames();
        }
        if (sceneCtr == 5) {
            setTransitionFrameScene();
        }
        if (sceneCtr == 6){
            if (zoomCtr <= 100) {
                var nasaHelm = document.getElementById("nasaHelm");
                nasaHelm.width = (nasaHelm.width + 60);
                var nasaSuit = document.getElementById("nasaSuit");
                nasaSuit.width = nasaSuit.width + 60;

                var curOffset = $("#nasaHelm").offset();
                $("#nasaHelm").offset({ top: curOffset.top -7, left: curOffset.left - 30});
                var curOffset2 = $("#nasaSuit").offset();
                $("#nasaSuit").offset({ top: curOffset2.top - 7, left: curOffset2.left - 30});
                zoomCtr++;
            } else {
                sceneCtr++;
                fadeToPov();
            }
        }
    }
    // scroll down
    else if (event.deltaY > 0)
    {
        if (sceneCtr == 0) {
            var currentScrollTop = window.scrollY;
            if (currentScrollTop > 1000){
                $('#scrollDown').fadeOut(2000);
            }
            if (currentScrollTop > 4600){
                document.body.style.overflowY = "hidden";
                document.getElementById("scrollDown").src = "img/scrollUp.gif";
                $('#scrollDown').fadeIn(2000);

                sceneCtr++;
            }
        }
        // Zoom Out
        if (sceneCtr == 1) {
            if (zoomCtr > 0) {
                var scene1img = document.getElementById("scene1BGimg");
                scene1img.height = (scene1img.height - 30);
                scene1img.width = (scene1img.width - 20);
                var scene1sitting = document.getElementById("scene1sitting");
                scene1sitting.width = scene1sitting.width - 20;

                var curOffset = $("#scene1sitting").offset();
                $("#scene1sitting").offset({ top: curOffset.top + 20, left: curOffset.left -2});
                var curOffset2 = $("#scene1BGimg").offset();
                $("#scene1BGimg").offset({ top: curOffset2.top + 15, left: curOffset2.left +10});
                zoomCtr--;
            }
        }
        if (sceneCtr == 2){
            setTransitionFrameScene();
        }
        if (sceneCtr == 3){
            if (window.scrollY >= 5800){
                document.body.style.overflowY = "hidden";
                var scene1sitting = document.getElementById("scene1sitting");
                //scene1sitting.src = "img/scene2/sleeping.gif";
                zoomCtr = 0;
                sceneCtr = 4;
                $("#offButton").remove();
                $("#audioButton").remove();
                $("#audioTV").remove();

            }
        }
        if (sceneCtr == 4) {
            zoomCtr++;
            setMobileFrames();
        }
        if (sceneCtr == 5) {
            setTransitionFrameScene();
        }
        if (sceneCtr == 6){
            if (zoomCtr > 0) {
                var nasaHelm = document.getElementById("nasaHelm");
                nasaHelm.width = (nasaHelm.width - 60);
                var nasaSuit = document.getElementById("nasaSuit");
                nasaSuit.width = nasaSuit.width - 60;

                var curOffset = $("#nasaHelm").offset();
                $("#nasaHelm").offset({ top: curOffset.top +7, left: curOffset.left + 30});
                var curOffset2 = $("#nasaSuit").offset();
                $("#nasaSuit").offset({ top: curOffset2.top + 7, left: curOffset2.left + 30});
                zoomCtr--;
            }
        }
    }
});

function startBtnClicked(){
    $('#startButton').fadeOut(2000);
    setupScene1();
    const title = document.getElementById("titleImg");
    title.src = "img/title.gif";

    var scrollDown = document.createElement("img");
    scrollDown.id = "scrollDown";
    scrollDown.src = "img/scrollDown.gif"
    scrollDown.style.position = "fixed";
    scrollDown.style.top = "450px";
    scrollDown.style.left = "45%";
    document.body.appendChild(scrollDown);

    var audioFile = document.createElement("audio");
    audioFile.id = "audioMusic";
    audioFile.src = "audio/music.mp3";
    audioFile.loop = true;
    audioFile.volume = 0.5;
    audioFile.play();
}

function setupScene1(){
    const scene1Div = document.createElement("div");
    const scene1Sittingimg = document.createElement("img");
    const scene1BGimg = document.createElement("img");

    window.mainDiv.removeChild(document.getElementById("startButton"));

    scene1Sittingimg.id = "scene1sitting";
    scene1Sittingimg.className = "scene1imgs";
    scene1Sittingimg.src = "img/scene1/sitting.gif";
    scene1Sittingimg.width = 820;
    scene1Sittingimg.style.marginLeft = "40%";
    scene1Sittingimg.style.marginRight = "auto";
    scene1Sittingimg.style.display = "block";
    scene1Sittingimg.style.marginTop = "-20%";
    scene1Sittingimg.style.zIndex = "9";

    scene1BGimg.id = "scene1BGimg";
    scene1BGimg.className = "scene1imgs";
    scene1BGimg.src = "img/tvOn.gif";
    scene1BGimg.style.marginLeft = "21%";
    scene1BGimg.height = 600;
    scene1BGimg.style.marginRight = "auto";
    scene1BGimg.style.marginTop = "90%";
    scene1BGimg.style.zIndex = "5";

    scene1Div.appendChild(scene1BGimg);
    scene1Div.appendChild(scene1Sittingimg);
    window.mainDiv.appendChild(scene1Div);
}

function showAudioButton(bShow){
    if (bShow && bAudioBtnCreated == false){
        var audioBtn = document.createElement("button");
        var audioFile = document.createElement("audio");
        audioFile.id = "audioTV";
        audioFile.src = "audio/audioTV.mp3";
        audioBtn.id = "audioButton";
        audioBtn.innerHTML = '<img src="img/soundButton.gif" style="width: 60px"/>';

        audioBtn.onclick = function play(){
            var audio = document.getElementById("audioTV");
            audio.play();
            showOffButton();

        }
        window.mainDiv.appendChild(audioFile);
        window.mainDiv.appendChild(audioBtn);
        bAudioBtnCreated = true;
    }
}

function showOffButton(){
    if (bOffBtnCreated == false){
        var offBtn = document.createElement("button");
        offBtn.id = "offButton";
        offBtn.style.opacity = "1";
        offBtn.innerHTML = '<img src="img/offButton.gif" style="width: 60px"/>';
        offBtn.style.zIndex = "10";
        offBtn.onclick = setupSceneTransition1;
        window.mainDiv.appendChild(offBtn);
        bOffBtnCreated = true;
    }
}

function setupSceneTransition1(){
    sceneCtr = 2;
    var scene1img = document.getElementById("scene1BGimg");
    var offButton = document.getElementById("offButton");
    var audioButton = document.getElementById("audioButton");
    // sleep
    scene1img.src = "img/TVoff.png";
    scene1img.style.position = "relative";

    // fadeout tv and move girl back to center
    var fadeOut = function () {
        scene1img.style.opacity = scene1img.style.opacity - 0.01;
        offButton.style.opacity = scene1img.style.opacity - 0.01;
        audioButton.style.opacity = scene1img.style.opacity - 0.01;
        if (scene1img.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(fadeOut)) || setTimeout(fadeOut, 16)
        }
    };
    fadeOut();

    var ctr = 0;
    var moveGirl = function () {
        $("#scene1BGimg").height = $("#scene1BGimg").height - 20;
        $("#scene1BGimg").width = $("#scene1BGimg").width - 20;
        $("#scene1sitting").width = $("#scene1sitting").width - 20;
        var curOffset = $("#scene1sitting").offset();
        var curOffset2 = $("#scene1BGimg").offset();
        $("#scene1sitting").offset({ top: curOffset.top - 3, left: curOffset.left -6});
        $("#scene1BGimg").offset({ top: curOffset2.top - 12, left: curOffset2.left -10});
        $("#offButton").offset({ top: curOffset2.top - 12, left: curOffset2.left -10});
        $("#audioButton").offset({ top: curOffset2.top - 12, left: curOffset2.left -10});
        var scene1sitting = document.getElementById("scene1sitting");
        scene1sitting.width = scene1sitting.width - 10;
        if (ctr <= 60) {
            ctr++;
            (window.requestAnimationFrame && requestAnimationFrame(moveGirl)) || setTimeout(moveGirl, 16)
        }
        else {
            // falling scene starts
            $("#scene1sitting").css({'top':'550px', 'left':'-270px', 'position':'fixed'});
            $('body').css({'overflow-y':'scroll', 'height':'9000px'});
            setupScene2();
        }
    };
    moveGirl();
}

function setTransitionFrameScene(){
    var scene1sitting = document.getElementById("scene1sitting");
    var currentScrollTop = window.scrollY;

    // TV to bed
    if (currentScrollTop < 5000) {
        scene1sitting.src = "img/scene1/sittingTV2.png";
    }
    else if (currentScrollTop > 5000 && currentScrollTop < 5100) {
        scene1sitting.src = "img/scene1/sittingTV3.png";
    }
    else if (currentScrollTop > 5100 && currentScrollTop < 5200) {
        scene1sitting.src = "img/scene1/sittingTV4.png";
    }
    else if (currentScrollTop > 5200 && currentScrollTop < 5300) {
        scene1sitting.src = "img/scene1/sittingTV5.png";
    }
    else if (currentScrollTop > 5300 && currentScrollTop < 5400) {
        scene1sitting.src = "img/scene1/sittingTV6.png";
        sceneCtr++;
    }

    // bed to fall
    else if (currentScrollTop > 6000 && currentScrollTop < 6050) {
		scene1sitting.style.width = "1000px";
        scene1sitting.src = "img/scene1/sleeping2.png";
        scene1sitting.style.marginLeft = "20%";
        scene1sitting.style.marginTop = "-2%";       
    }
    else if (currentScrollTop > 6050 && currentScrollTop < 6100) {
        scene1sitting.src = "img/scene1/sleeping3.png";
        scene1sitting.style.marginTop = "-3%";
        scene1sitting.style.marginLeft = "21%";
    }
    else if (currentScrollTop > 6100 && currentScrollTop < 6150) {
        scene1sitting.src = "img/scene1/sleeping4.png";
        scene1sitting.style.marginTop = "-4%";
        scene1sitting.style.marginLeft = "22%";
    }
    else if (currentScrollTop > 6150 && currentScrollTop < 6200) {
        scene1sitting.src = "img/scene1/sleeping5.png";
        scene1sitting.style.marginTop = "-5%";
        scene1sitting.style.marginLeft = "23%";
    }
    else if (currentScrollTop > 6200 && currentScrollTop < 6250) {
        scene1sitting.src = "img/scene1/sleeping6.png";
        scene1sitting.style.marginTop = "-6%";
        scene1sitting.style.marginLeft = "24%";
    }
    else if (currentScrollTop > 6250 && currentScrollTop < 6300) {
        scene1sitting.src = "img/scene1/sleeping7.png";
        scene1sitting.style.marginTop = "-7%";
        scene1sitting.style.marginLeft = "25%";
    }
    else if (currentScrollTop > 6300 && currentScrollTop < 6350) {
        scene1sitting.src = "img/scene1/sleeping7.png";
        scene1sitting.style.marginTop = "-8%";
        scene1sitting.style.marginLeft = "26%";
    }

    else if (currentScrollTop > 6350 && currentScrollTop < 6400) {
        scene1sitting.src = "img/scene1/falling1.png";
        scene1sitting.style.marginTop = "-9%";
        scene1sitting.style.marginLeft = "27%";
    }
    else if (currentScrollTop > 6400 && currentScrollTop < 6450) {
        scene1sitting.src = "img/scene1/falling2.png";
        scene1sitting.style.marginTop = "-10%";
        scene1sitting.style.marginLeft = "28%";
    }
    else if (currentScrollTop > 6450 && currentScrollTop < 6500) {
        scene1sitting.src = "img/scene1/falling3.png";
        scene1sitting.style.marginTop = "-11%";
        scene1sitting.style.marginLeft = "29%";
    }
    else if (currentScrollTop > 6500 && currentScrollTop < 6550) {
        scene1sitting.src = "img/scene1/falling4.png";
        scene1sitting.style.marginTop = "-12%";
        scene1sitting.style.marginLeft = "30%";
    }
    else if (currentScrollTop > 6550 && currentScrollTop < 6600) {
        scene1sitting.src = "img/scene1/falling5.png";
        scene1sitting.style.marginTop = "-13%";
        scene1sitting.style.marginLeft = "31%";
    }
    else if (currentScrollTop > 6600 && currentScrollTop < 6650) {
        scene1sitting.src = "img/scene1/falling6.png";
        scene1sitting.style.marginTop = "-14%";
        scene1sitting.style.marginLeft = "32%";
    }
    else if (currentScrollTop > 6650 && currentScrollTop < 6700) {
        scene1sitting.src = "img/scene1/falling7.png";
        scene1sitting.style.marginTop = "-15%";
        scene1sitting.style.marginLeft = "33%";
    }
    else if (currentScrollTop > 6700 && currentScrollTop < 6750) {
        scene1sitting.src = "img/scene1/falling8.png";
        scene1sitting.style.marginTop = "-16%";
        scene1sitting.style.marginLeft = "34%";
    }
    else if (currentScrollTop > 6750 && currentScrollTop < 6800) {
        scene1sitting.src = "img/scene1/falling9.png";
        scene1sitting.style.marginTop = "-17%";
        scene1sitting.style.marginLeft = "35%";
    }
    else if (currentScrollTop > 6800 && currentScrollTop < 6850) {
        scene1sitting.src = "img/scene1/falling10.png";
        scene1sitting.style.marginTop = "-18%";
        scene1sitting.style.marginLeft = "34%";
    }
    else if (currentScrollTop > 6850 && currentScrollTop < 6900) {
        scene1sitting.src = "img/scene1/falling11.png";
        scene1sitting.style.marginTop = "-19%";
        scene1sitting.style.marginLeft = "35%";
    }
    else if (currentScrollTop > 6900 && currentScrollTop < 6950) {
        scene1sitting.src = "img/scene1/falling12.png";
        scene1sitting.style.marginTop = "-20%";
        scene1sitting.style.marginLeft = "36%";
    }
    else if (currentScrollTop > 6950 && currentScrollTop < 7000) {
        scene1sitting.src = "img/scene1/falling13.png";
        scene1sitting.style.marginLeft = "37%";
    }
    else if (currentScrollTop > 7000 && currentScrollTop < 7050) {
        scene1sitting.src = "img/scene1/falling14.png";
        scene1sitting.style.marginLeft = "38%";
    }
    else if (currentScrollTop > 7050 && currentScrollTop < 7100) {
        scene1sitting.src = "img/scene1/falling15.png";
        scene1sitting.style.marginLeft = "39%";
    }
    else if (currentScrollTop > 7100 && currentScrollTop < 7150) {
        scene1sitting.src = "img/scene1/falling16.png";
        scene1sitting.style.marginLeft = "40%";
    }
    else if (currentScrollTop > 7150 && currentScrollTop < 7200) {
        scene1sitting.src = "img/scene1/falling17.png";

    }
    else if (currentScrollTop > 7200 && currentScrollTop < 7250) {
        scene1sitting.src = "img/scene1/falling18.png";

    }
    else if (currentScrollTop > 7250 && currentScrollTop < 7300) {
        scene1sitting.src = "img/scene1/falling19.png";

    }
    else if (currentScrollTop > 7300 && currentScrollTop < 7350) {
        scene1sitting.src = "img/scene1/falling20.png";

    }
    else if (currentScrollTop > 7350 && currentScrollTop < 7400) {
        scene1sitting.src = "img/scene1/falling21.png";

    }
    else if (currentScrollTop > 7550 && currentScrollTop < 7700) {
        $('body').css("overflow", "hidden");
        if (bHelmCreated == false){
            setupHelmet();
            bHelmCreated = true;
        }
        document.getElementById("scrollDown").src = "img/scrollUp.gif";
        $('#scrollDown').style.left = "65%";
        $('#scrollDown').fadeIn(2000);
        sceneCtr = 5.5;
    }
}

function setupScene2(){
    var bedDiv = document.createElement("div");
    bedDiv.id = "bedDiv";

    var pillow = document.createElement("img");
    pillow.id = "pillowImg";
    pillow.src = "img/scene2/pillow.png";

    var sheet = document.createElement("img");
    sheet.id = "sheetImg";
    sheet.src = "img/scene2/sheet.png";
    sheet.style.zIndex = "10";
    sheet.style.position = "relative";

    var mobile = document.createElement("img");
    mobile.id = "mobileImg";
    mobile.src = "img/mobileFrames/mobile1.png";
    mobile.style.zIndex = "10";
    mobile.style.position = "absolute";

    var nasaSuit = document.createElement("img");
    nasaSuit.id = "nasaSuit";
    nasaSuit.src = "img/nasaSuit.png";
    nasaSuit.style.zIndex = "10";
    nasaSuit.width = 1000;
    nasaSuit.style.position = "absolute";

    bedDiv.appendChild(sheet);
    bedDiv.appendChild(pillow);
    document.getElementById("mainDiv").appendChild(bedDiv);
    document.getElementById("mainDiv").appendChild(mobile);
    document.getElementById("mainDiv").appendChild(nasaSuit);
}

function setMobileFrames(){
    var mobile = document.getElementById("mobileImg");

    if (zoomCtr >= 0 && zoomCtr <= 3) {
        mobile.src = "img/mobileFrames/mobile1.png";
    }
    else if (zoomCtr >= 3 && zoomCtr <= 6) {
        mobile.src = "img/mobileFrames/mobile2.png";
    }
    else if (zoomCtr >= 6 && zoomCtr <= 9) {
        mobile.src = "img/mobileFrames/mobile3.png";
    }
    else if (zoomCtr >= 9 && zoomCtr <= 12) {
        mobile.src = "img/mobileFrames/mobile4.png";
    }
    else if (zoomCtr >= 12 && zoomCtr <= 15) {
        mobile.src = "img/mobileFrames/mobile5.png";
    }
    else if (zoomCtr >= 15 && zoomCtr <= 18) {
        mobile.src = "img/mobileFrames/mobile6.png";
    }
    else if (zoomCtr >= 18 && zoomCtr <= 21) {
        mobile.src = "img/mobileFrames/mobile7.png";
    }
    else if (zoomCtr >= 21 && zoomCtr <= 24) {
        mobile.src = "img/mobileFrames/mobile8.png";
    }
    else if (zoomCtr >= 27 && zoomCtr <= 30) {
        mobile.src = "img/mobileFrames/mobile9.png";
    }
    else if (zoomCtr >= 30 && zoomCtr <= 33) {
        mobile.src = "img/mobileFrames/mobile10.png";
    }
    else if (zoomCtr >= 33 && zoomCtr <= 36) {
        mobile.src = "img/mobileFrames/mobile11.png";
    }
    else if (zoomCtr >= 40) {
        $('body').css("overflow-y", "scroll");
        sceneCtr = 5;
    }
}

function setupHelmet() {
    var nasaHelm = document.createElement("img");
    nasaHelm.id = "nasaHelm";
    nasaHelm.src = "img/nasaHelm1.png";
    nasaHelm.style.zIndex = "10";
    nasaHelm.width = 1000;
    nasaHelm.style.position = "absolute";
    document.getElementById("mainDiv").appendChild(nasaHelm);

    var pos = 0;
    var id = setInterval(frame, 10);

    function frame() {
        if (pos == 65) {
            clearInterval(id);
            zoomCtr = 0;
            sceneCtr = 6;
        } else {
            pos = pos + 0.5;
            nasaHelm.style.marginTop = pos + "%";
        }
    }
    $('#scene1sitting').fadeOut(3000);
}

function fadeToPov(){

    $("body").css("background","url('img/GameBackground.png')");
    $("body").css("background-size","contain");
    $("body").css("height","650px");
    $("body").height = 650;

    var cockPit = document.createElement("img");
    cockPit.id = "cockPit";
    cockPit.src = "img/cockPit.png";
    document.body.appendChild(cockPit);

    var cockPitBlink = document.createElement("img");
    cockPitBlink.id = "cockPitBlink";
    cockPitBlink.src = "img/cockPitBlink.gif";
    document.body.appendChild(cockPitBlink);

    var bgImg = document.createElement("img");
    bgImg.id = "bgImg";
    bgImg.src = "img/bgRocketUp.png";
    document.body.appendChild(bgImg);

    var startRocketBtn = document.createElement("img");
    startRocketBtn.id = "startRocketBtn";
    startRocketBtn.src = "img/startHebel.png";
    startRocketBtn.onclick = function(){
        $('#startRocketBtn').animate({marginTop: '-165%'},{easing: "swing", duration: 8000});
        $('#bgImg').animate({top: '0px'},{easing: "swing", duration: 10000});
        $('#bgImg').promise().done(function(){
            $('#bgImg').fadeOut(2000);
            $('#cockPit').fadeOut(2000);
            $('#startRocketBtn').fadeOut(2000, function (){
                setupMinigame();
            });
        });
    }
    document.body.appendChild(startRocketBtn);

    setupSoundButtons();

    $("#nasaHelm").remove();
    $("#nasaSuit").remove();
    $("#scene1BGimg").remove();

    $("#bedDiv").remove();
    $("#mobileImg").remove();
}

function setupSoundButtons(){
    var audio1 = document.createElement("audio");
    audio1.src = "audio/beep1.mp3";
    var audio2= document.createElement("audio");
    audio2.src = "audio/beep2.mp3";
    var audio3 = document.createElement("audio");
    audio3.src = "audio/beep3.mp3";
    var audio4 = document.createElement("audio");
    audio4.src = "audio/beep4.mp3";


    var soundArea1 = document.createElement('div');
    soundArea1.className = "beeps";
    soundArea1.style.left = "100px";
    soundArea1.style.top = "650px";
    soundArea1.onmouseover = function (){
        audio1.play();
    }

    var soundArea2 = document.createElement('div');
    soundArea2.className = "beeps";
    soundArea2.style.left = "500px";
    soundArea2.style.top = "650px";
    soundArea2.onmouseover = function (){
        audio2.play();
    }

    var soundArea3 = document.createElement('div');
    soundArea3.className = "beeps";
    soundArea3.style.left = "700px";
    soundArea3.style.top = "570px";
    soundArea3.onmouseover = function (){
        audio3.play();
    }

    var soundArea4 = document.createElement('div');
    soundArea4.className = "beeps";
    soundArea4.style.left = "1100px";
    soundArea4.style.top = "570px";
    soundArea4.onmouseover = function (){
        audio4.play();
    }

    document.body.appendChild(soundArea1);
    document.body.appendChild(soundArea2);
    document.body.appendChild(soundArea3);
    document.body.appendChild(soundArea4);

}

function setupMinigame(){
    $('#mainDiv').remove();
    $('#startRocketBtn').remove();
    $('#cockPit').remove();

    $('.beeps').remove();


    var planet1 = document.createElement("img");
    planet1.id = "planet1";
    planet1.src = "img/Planets/planet1.png";
    planet1.onmouseover = function (){ bPlanet1visited = true; planet1.src = "img/Planets/planet1light.png"; gameEnded(); };
    planet1.height = 200;
    planet1.style.position = "fixed";
    planet1.style.left = "164px";
    planet1.style.top = "20px";

    var planet2 = document.createElement("img");
    planet2.id = "planet2";
    planet2.src = "img/Planets/planet2.png";
    planet2.onmouseover = function (){ bPlanet2visited = true; planet2.src = "img/Planets/planet2light.png"; gameEnded(); };
    planet2.height = 300;
    planet2.style.position = "fixed";
    planet2.style.left = "1000px";
    planet2.style.top = "100px";

    var planet3 = document.createElement("img");
    planet3.id = "planet3";
    planet3.src = "img/Planets/planet3.png";
    planet3.onmouseover = function (){ bPlanet3visited = true; planet3.src = "img/Planets/planet3light.png"; gameEnded(); };
    planet3.height = 250;
    planet3.style.position = "fixed";
    planet3.style.left = "364px";
    planet3.style.top = "500px";

    var planet4 = document.createElement("img");
    planet4.id = "planet4";
    planet4.src = "img/Planets/planet4.png";
    planet4.onmouseover = function (){ bPlanet4visited = true; planet4.src = "img/Planets/planet4light.png"; gameEnded(); };
    planet4.height = 300;
    planet4.style.position = "fixed";
    planet4.style.left = "900px";
    planet4.style.top = "400px";

    document.body.appendChild(planet1);
    document.body.appendChild(planet2);
    document.body.appendChild(planet3);
    document.body.appendChild(planet4);
    init();
}

function gameEnded(){
    if (bPlanet1visited == true && bPlanet2visited == true && bPlanet3visited == true && bPlanet4visited == true){

    }
}

function init() {


    var rocket = document.createElement("img");
    rocket.id = "rocket";
    rocket.src = "img/Rocket.gif";

    document.addEventListener("mousemove", getMouse);

    // ------- follow mouse -------- //

    // console.log(rocket);

    rocket.style.position = "absolute";
    document.body.appendChild(rocket);
    var rocketpos = { x: 0, y: 0 };

    setInterval(followMouse, 20);

    var mouse = { x: 0, y: 0 };
    // ==mouse.x, mouse.y

    var dir = "right";
    function getMouse(e) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
        //Checking directional change
        if (mouse.x > rocketpos.x) {
            dir = "right";
        } else {
            dir = "left";
        }
    }

    function followMouse() {

        //find distance X , distance Y
        var distX = mouse.x - rocketpos.x;
        var distY = mouse.y - rocketpos.y;

        //Easing motion
        rocketpos.x = lerp(rocketpos.x, mouse.x, 0.05);
        rocketpos.y = lerp(rocketpos.y, mouse.y, 0.05);

        rocket.style.left = rocketpos.x - rocket.width/2  + "px";
        rocket.style.top = 1 + rocketpos.y - rocket.height/2 + "px";


        lookAt(rocket);
    }
    // ------- point towards mouse ------- //

    function lookAt(obj1){
        let obj2X = mouse.x
        let obj2Y = mouse.y
        let obj1X = obj1.offsetLeft + (obj1.width / 2);
        let obj1Y = obj1.offsetTop + (obj1.height / 2);

        let x = obj2X - obj1X;
        let y = obj2Y - obj1Y;

        let rot = Math.atan2(y, x)
        // console.log(obj1.width)
        let angle = (rot * 180/Math.PI) + 90
        //console.log(angle)
        obj1.style.transform = "rotate(" + angle + "deg)";
    }

    //for smooth delay follow
    function lerp(start, end, amt){
        return (1-amt)*start+amt*end
    }
}