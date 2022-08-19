import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const daysEl = document.querySelectorAll('.value')[0];
const hoursEl = document.querySelectorAll('.value')[1];
const minutesEl = document.querySelectorAll('.value')[2];
const secondsEl = document.querySelectorAll('.value')[3];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {        
        if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            // window.alert('Please choose a date in the future');
        } else {
            ableBtn(startBtn);

            const { days, hours, minutes, seconds } = convertMs(selectedDates[0].getTime() - options.defaultDate.getTime());
            showTime({ days, hours, minutes, seconds });            
        }
    
    console.log(selectedDates[0]);
  },
};

disabledBtn(startBtn);
flatpickr(inputEl, options);

startBtn.addEventListener('click', startTimer);

function startTimer(e) {
    disabledBtn(e.target);

    const timerId = setInterval(() => {
        const timing = {
            days: daysEl.textContent,
            hours: hoursEl.textContent,
            minutes: minutesEl.textContent,
            seconds: secondsEl.textContent,
        };

        if (daysEl.textContent === "00" && hoursEl.textContent === "00" && minutesEl.textContent === "00" && secondsEl.textContent === "01") {
            clearInterval(timerId);
        }

        timeCounting(timing);
        
        showTime(timing);

    }, 1000);
}





function timeCounting(timing) {
    if (timing.seconds === "00" && timing.minutes !== "00") {
        timing.seconds = 59;
        timing.minutes -= 1;
    } else {
        timing.seconds -= 1;
    }

    if (timing.minutes === "00" && timing.hours !== "00") {
        timing.minutes = 59;
        timing.hours -= 1;
    }

    if (timing.hours === "00" && timing.days !== "00") {
        timing.hours = 23;
        timing.days -= 1;
    }
}

function showTime({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function disabledBtn(btn) {
    btn.setAttribute('disabled', true);
    btn.style.backgroundColor = 'rgba(255, 0, 0, .5)';
    btn.style.cursor = 'wait';
}

function ableBtn(btn) {
    btn.removeAttribute('disabled');
    btn.style.backgroundColor = 'rgba(0, 255, 0, .5)';
    btn.style.cursor = 'default';
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}