import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const selector = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysFieldRef = document.querySelector('[data-days]');
const hoursFieldRef = document.querySelector('[data-hours]');
const minutesFieldRef = document.querySelector('[data-minutes]');
const secondsFieldRef = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');
const fieldValue = document.querySelectorAll('.value');

startBtn.disabled = true;

Object.assign(timer.style, {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontSize: '24px',
  marginTop: '20px',
});

fieldValue.forEach(element => {
  element.style.marginLeft = '20px';
  element.style.marginRight = '5px';
  element.style.color = 'red';
});

function pad(value) {
  return String(value).padStart(2, '0');
}

function doCountInterval(ms) {
  const interval = setInterval(() => {
    ms = ms - 1000;
    makeTextContent(ms);
    startBtn.disabled = true;

    if (ms <= 1000) {
      clearInterval(interval);
    }
  }, 1000);
}

function makeTextContent(ms) {
  let { days, hours, minutes, seconds } = convertMs(ms);
  daysFieldRef.textContent = `${days}`;
  hoursFieldRef.textContent = `${hours}`;
  minutesFieldRef.textContent = `${minutes}`;
  secondsFieldRef.textContent = `${seconds}`;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        clickToClose: true,
        timeout: 4000,
      });
    } else {
      startBtn.disabled = false;
    }
    let countedTime = selectedDates[0].getTime() - Date.now();

    startBtn.addEventListener('click', () => {
      doCountInterval(countedTime);
      makeTextContent(countedTime);
    });
  },
};

flatpickr(selector, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hoursnpm
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
