let activeTimers = [];
document.getElementById("no-timers-message").style.display = activeTimers.length === 0 ? "block" : "none";


function startNewTimer() {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds <= 0) {
        alert("Please enter a valid time.");
        return;
    }

    const timerElement = document.createElement("div");
    timerElement.className = "timer";
    
    const timerDisplay = document.createElement("div");
    timerDisplay.className = "timer-display";
    timerElement.appendChild(timerDisplay);

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => stopTimer(timerElement);
    timerElement.appendChild(deleteButton);

    document.getElementById("active-timers").appendChild(timerElement);

    let intervalId = setInterval(() => {
        totalSeconds--;

        if (totalSeconds <= 0) {
            clearInterval(intervalId);
            timerElement.classList.add("timer-ended");
            playAlertSound();
            stopTimer(timerElement);
        }

        updateTimerDisplay(timerDisplay, totalSeconds);
    }, 1000);

    activeTimers.push({ element: timerElement, intervalId });
    
}
function playAlertSound() {
    const audio = new Audio('timer.mp3');
    audio.play();
}
function updateTimerDisplay(timerDisplay, totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.innerHTML = `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
}

function stopTimer(timerElement) {
    const index = activeTimers.findIndex(timer => timer.element === timerElement);
      console.log("timerElement",timerElement)
    if (index !== -1) {
        const timer = activeTimers[index];
        clearInterval(timer.intervalId);
        document.getElementById("active-timers").removeChild(timer.element);
        activeTimers.splice(index, 1);
    }
}

