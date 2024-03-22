// variables
let workTime = 25;
let breakTime = 5;
let seconds = "00";
let timerInterval;

// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;
}

// start timer
function start() {
    // change button
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // reset seconds
    seconds = 59;

    // start work timer
    startWorkTimer();
}

// start work timer
function startWorkTimer() {
    let workMinutes = workTime - 1;

    timerInterval = setInterval(() => {
        // change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // start countdown
        seconds--;

        if (seconds < 0) {
            workMinutes--;
            seconds = 59;

            if (workMinutes < 0) {
                clearInterval(timerInterval);
                startBreakTimer();
            }
        }
    }, 1000); // 1000 = 1s
}

// start break timer
function startBreakTimer() {
    clearInterval(timerInterval); // stop the work timer
    let breakMinutes = breakTime - 1; // Initialize break minutes

    // reset seconds
    seconds = 59;

    timerInterval = setInterval(() => {
        // change the display
        document.getElementById('minutes').innerHTML = breakMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // start countdown
        seconds--;

        if (seconds < 0) {
            breakMinutes--;
            seconds = 59;

            if (breakMinutes < 0) {
                clearInterval(timerInterval);
                resetTimer();
            }
        }
    }, 1000); // 1000 = 1s
}

// toggle between work and break buttons
function toggleWorkBreak() {
    const workButton = document.getElementById('workButton');
    const breakButton = document.getElementById('breakButton');

    workButton.classList.toggle('active');
    breakButton.classList.toggle('active');

    if (workButton.classList.contains('active')) {
        resetTimer();
        startWorkTimer();
    } else {
        resetTimer();
        startBreakTimer();
    }
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval); // Stop the timer interval
    // Reset timer display to initial work time
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";
    // Reset button display
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";
}

// Function to toggle dark mode
function toggleDarkMode() {
    // Toggle dark mode class on body
    document.body.classList.toggle('dark-mode');

    // Toggle icon based on dark mode
    const icon = document.getElementById('dark-mode-icon');
    const currentIcon = icon.getAttribute('src');
    const newIcon = currentIcon.includes('moon') ? 'sun.png' : 'moon.png';
    icon.setAttribute('src', 'assets/' + newIcon);

    // Change background image based on dark mode
    const body = document.body;
    const currentBg = body.style.backgroundImage;
    if (currentBg.includes('bg-night')) {
        body.style.backgroundImage = "url('assets/bg.jpg')";
    } else {
        body.style.backgroundImage = "url('assets/bg-night.jpeg')";
    }
}

// Function to play the clicking sound
function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0; // Reset sound to start
    clickSound.play();
}
