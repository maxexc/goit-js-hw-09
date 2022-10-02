import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
console.log(refs.input);

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      console.log(selectedDates[0]);
      refs.startBtn.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
      return;
    }

    const time = selectedDates[0] - Date.now();
    // refs.startBtn.disabled = false;
    refs.startBtn.removeAttribute('disabled');

    refs.startBtn.onclick = function () {
      clearInterval(intervalId);
      onTimer(time);
      refs.startBtn.setAttribute('disabled', true);
    };
  },
};

flatpickr(refs.input, options);

function onTimer(time) {
  refs.startBtn.setAttribute('disabled', true);
  // refs.input.setAttribute('disabled', true);
  console.log('start timer:', time);
  renderTimer(convertMs(time));
  intervalId = setInterval(() => {
    console.log(time);
    time -= 1000;
    renderTimer(convertMs(time));
    if (time < 1000) {
      clearInterval(intervalId);
      Notify.success('Time is up!');
      // refs.input.removeAttribute('disabled');
      return;
    }
  }, 1000);
}

function renderTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
  // return String(value).padStart(2, '0');
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
