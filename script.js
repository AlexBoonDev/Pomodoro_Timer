// Timer
const timer = {
    seconds: 1500,
    secondsForWorking: 1500,
    stopIntervalId: 0,
    isStarted: false,
    isWorking: true, 
    secondsForBreak: 300,
};

function toTimeString(seconds) {
    const minutes = Math.floor(seconds/60);
    const secs = seconds%60;
    let secondsString = secs.toString()
    if (secondsString.length < 2){
        secondsString = "0" + secondsString;
    }
    return minutes + ":" + secondsString;
}

function updateTimer() {
    document.getElementById('timer').innerHTML = toTimeString(timer.seconds);
}

function updateBreak() {
    document.getElementById('break-display').innerHTML = toTimeString(timer.secondsForBreak);
}

function addMinuteForBreak() {
    timer.secondsForBreak += 60;
    if (timer.secondsForBreak > 3600){
        timer.secondsForBreak = 3600
    }
    updateBreak();
}

function removeMinuteForBreak() {
    timer.secondsForBreak -= 60;
    if (timer.secondsForBreak < 60) {
        timer.secondsForBreak = 60;
    }
    updateBreak();
}


function addMinuteForWork() {
    if (timer.secondsForWorking != timer.seconds){
        return;
    }
    
    timer.secondsForWorking += 60;

    if (timer.secondsForWorking > 3600) {
        timer.secondsForWorking = 3600;
    }

    timer.seconds = timer.secondsForWorking;

    updateTimer();
}

function removeMinuteForWork() {
    if (timer.secondsForWorking != timer.seconds){
        return;
    }

    timer.secondsForWorking -= 60;

    if (timer.secondsForWorking < 60) {
        timer.secondsForWorking = 60;
    }

    timer.seconds = timer.secondsForWorking;
    
    updateTimer();
}

function resetTimer() {
    timer.seconds = timer.secondsForWorking;
    stopTimer();
    updateTimer();
}


function tick() {
    timer.seconds -= 1;

    if (timer.seconds <= 0) {
        timer.seconds = 0;
        stopTimer();
        timer.isWorking = !timer.isWorking;
        if (!timer.isWorking) {
            timer.seconds = timer.secondsForBreak;
        } else {
            timer.seconds = timer.secondsForWorking;
        }
        startTimer();
    }

    updateTimer();
}

// function startBreak(){
//     setInterval(tick, 1000);
// }

function startTimer() {
    if (!timer.isStarted) {
        timer.stopIntervalId = setInterval(tick, 1000);
        timer.isStarted = true;
    }
}

function stopTimer(){
    timer.isStarted = false;

    if (timer.stopIntervalId != 0) {
        clearInterval(timer.stopIntervalId);
        timer.stopIntervalId = 0;
    }
}

updateTimer();
updateBreak();