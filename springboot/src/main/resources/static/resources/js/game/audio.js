let musicPath = {
    bg: '../resources/media/bg.mp3',
    button: '../resources/media/button.wav',
    right: '../resources/media/right.wav',
    wrong: '../resources/media/wrong.mp3',
    modal: '../resources/media/modal.wav',
    countDown: '../resources/media/count-down.mp3',
    countDownEnd: '../resources/media/count-down-end.mp3'
}

    var backgroundMusic = document.createElement('AUDIO');
    backgroundMusic.setAttribute('autoplay',true);
    //backgroundMusic.setAttribute('loop',true);
    //backgroundMusic.setAttribute('src','../media/bg-music.mp3');
    document.body.appendChild(backgroundMusic);





//播放音乐
function audioPlay(){
    backgroundMusic.play();
}
//从头开始
function goToFirst(){
    backgroundMusic.currentTime=0;
    backgroundMusic.play();
}

//暂停
function audioPause(){
    backgroundMusic.pause();
}

