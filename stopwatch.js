let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const timeDisplay = document.querySelector('.time-display');
const lapsContainer = document.querySelector('.laps');
const motivationDiv = document.querySelector('.motivation');

const motivationalMessages = [
    "Keep pushing! You're doing great! 💪",
    "Every second counts! 🎯",
    "Stay focused, stay strong! 🌟",
    "You've got this! 🔥",
    "Making every moment count! ⭐",
    "Time flies when you're awesome! 🚀",
    "Keep going, keep growing! 🌱"
];

function updateDisplay(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    timeDisplay.classList.add('pulse');
    setTimeout(() => timeDisplay.classList.remove('pulse'), 500);
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
            
            // Show random motivational message every 10 seconds
            if (Math.floor(elapsedTime / 500) % 10 === 0) {
                showMotivationalMessage();
            }
        }, 10);
        
        document.querySelector('.start').style.display = 'none';
        document.querySelector('.pause').style.display = 'inline-block';
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        document.querySelector('.start').style.display = 'inline-block';
        document.querySelector('.pause').style.display = 'none';
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    lapsContainer.innerHTML = '';
    lapCount = 0;
    motivationDiv.textContent = '';
    document.querySelector('.start').style.display = 'inline-block';
    document.querySelector('.pause').style.display = 'none';
}

function recordLap() {
    if (isRunning) {
        lapCount++;
        const lapTime = document.createElement('div');
        lapTime.classList.add('lap-time');
        lapTime.textContent = `Lap ${lapCount}: ${timeDisplay.textContent}`;
        lapsContainer.insertBefore(lapTime, lapsContainer.firstChild);
    }
}

function showMotivationalMessage() {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    motivationDiv.textContent = randomMessage;
    motivationDiv.style.animation = 'none';
    motivationDiv.offsetHeight; // Trigger reflow
    motivationDiv.style.animation = 'slideIn 0.5s ease-out';
}

// Initialize the pause button as hidden
document.querySelector('.pause').style.display = 'none';
