let timer;
let minutes;
let seconds;
let isWorking = true;

function startTimer() {
  if (!timer) {
    if (isWorking) {
      minutes = parseInt(document.getElementById("minutes").value, 10);
    } else {
      minutes = parseInt(document.getElementById("shortBreak").value, 10);
    }
    seconds = 0;
    timer = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    clearInterval(timer);
    alert(isWorking ? "Pomodoro tamamlandı!" : "Kısa mola tamamlandı!");
    playNotificationSound(isWorking);
    if (isWorking) {
      isWorking = false;
      minutes = parseInt(document.getElementById("shortBreak").value, 10);
    } else {
      isWorking = true;
      minutes = parseInt(document.getElementById("minutes").value, 10);
    }
    seconds = 0;
    document.getElementById("timer").innerHTML = `${
      minutes < 10 ? "0" : ""
    }${minutes}:00`;
    timer = null;
  } else {
    if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    document.getElementById("timer").innerHTML = `${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
}

function resetTimer() {
  clearInterval(timer);
  isWorking = true;
  minutes = parseInt(document.getElementById("minutes").value, 10);
  seconds = 0;
  document.getElementById("timer").innerHTML = `${
    minutes < 10 ? "0" : ""
  }${minutes}:00`;
  timer = null;
}

function startYouTube() {
  const videoId = document.getElementById("youtubeVideoId").value;
  embedYouTubeVideo(videoId);
}

function embedYouTubeVideo(videoId) {
  const container = document.getElementById("youtubeContainer");
  container.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
}

function playNotificationSound(isWorking) {
  const soundFile = isWorking
    ? "notification_work.mp3"
    : "notification_break.mp3";
  const audio = new Audio(soundFile);
  audio.play();
}
