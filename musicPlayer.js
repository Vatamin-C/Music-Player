const songsContainerTag = document.getElementsByClassName("songsContainer")[0];
const audioTag = document.getElementsByTagName("audio")[0];
const durationTextTag = document.getElementsByClassName("duration")[0];
const progressBarTag = document.getElementsByClassName("progress-bar")[0];
const playBtn = document.getElementById("playerBtnPlay");
const pausebtn = document.getElementById("playerBtnPause");
const backwardBtn = document.getElementById("playerBtnBackward");
const forwardBtn = document.getElementById("playerBtnForward");

const songs = [
    {songsName: "If I Let You GO", songsLocation: "music/iilyg.mp3"}, 
    {songsName: "Nothing's Gonna Change My Love For You", songsLocation: "music/ncmlfy.mp3"},
    {songsName: "Someone You Loved", songsLocation: "music/syl.mp3"}, 
    {songsName: "Somewhere in My Broken Heart", songsLocation: "music/simbh.mp3"},
    {songsName: "Wating For Love", songsLocation: "music/wfl.mp3"}, 
    {songsName: "Yesterday Once More", songsLocation: "music/yom.mp3"}
];

for (let i = 0; i < songs.length; i ++) {
    const songsList = document.createElement("div");
    songsContainerTag.append(songsList);
    songsList.classList.add("songsList");
    songsList.addEventListener("click",
    () => {const songsLocation = songs[i].songsLocation; 
        audioTag.src =songsLocation;
        audioTag.play();
        isPlay = true;
        playAndPauseFunction(); });
    const title = (i + 1).toString() + ". " + songs[i].songsName;
    songsList.textContent = title;
    
}

let duration;
let sonngsDuration ;
audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration);
   sonngsDuration = Times(duration);
}); 

audioTag.addEventListener("timeupdate", () => {
    const currentTimes = Math.floor(audioTag.currentTime);
    const currentTimeText = Times(currentTimes);
    durationTextTag.textContent = currentTimeText + " / " + sonngsDuration;
    changeProgressBar(currentTimes);
});

const changeProgressBar = (currentTimes) => {
    const currentWidth = (250/duration) * currentTimes;
    progressBarTag.style.width = currentWidth.toString() + "px";

}

const Times = (totalTimes) => {
    const minutes = Math.floor(totalTimes/60);
    const seconds = totalTimes%60;
    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minutesText + ":" + secondsText;
}

let index = 0;
let isPlay = true;
playBtn.addEventListener("click", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    if (currentTime === 0) {
        const playSong = songs[index].songsLocation;
        audioTag.src =playSong;
        audioTag.play();
        isPlay = true;
        playAndPauseFunction();

    } else {
        audioTag.play();
        isPlay = true;
        playAndPauseFunction();
    }
});

pausebtn.addEventListener("click", () => {
    isPlay = false;
    audioTag.pause();
    playAndPauseFunction();
})

const playAndPauseFunction = () => {
    if (isPlay) {playBtn.style.display = "none";
pausebtn.style.display = "inline";} 
    else {pausebtn.style.display = "none";
playBtn.style.display ="inline";}
}

backwardBtn.addEventListener("click", () => {
    if (index === 0) { 
        return; }  
        index -= 1;
        const backwardSong = songs[index].songsLocation;
        audioTag.src =backwardSong;
        audioTag.play(); 
})

forwardBtn.addEventListener("click", () => {
    if (index === songs.length-1) {return; }
    index += 1; 
    const forwardSong = songs[index].songsLocation;
    audioTag.src = forwardSong;
    audioTag.play();
}) 

