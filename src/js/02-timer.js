import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

console.log('rerer');

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    const time = selectedDates[0] - options.defaultDate;
    refs.startButton.removeAttribute('disabled');
    // marckUp(convertMs(time));

    refs.startButton.onclick = function () {
      clearInterval(intervalId);
      timer(time);
      refs.startButton.setAttribute('disabled', 'disabled');
    };
  },
};

flatpickr(refs.input, options);

function timer(time) {
  refs.startButton.setAttribute('disabled', 'disabled');
  console.log('timer', time);
  marckUp(convertMs(time));
  intervalId = setInterval(() => {
    console.log(time);
    time -= 1000;
    marckUp(convertMs(time));
    if (time < 1000) clearInterval(intervalId);
  }, 1000);
}

function marckUp(obj) {
  const { days, hours, minutes, seconds } = obj;
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
