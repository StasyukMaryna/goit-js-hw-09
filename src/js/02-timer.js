import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timer = document.querySelector('.timer');
const fieldValue = document.querySelectorAll('.value');
const button = document.querySelector('button[data-start]');
const datetimePicker = document.getElementById('datetime-picker');

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      button.disabled = true;
    } else {
      button.disabled = false;
      setInterval(updateCountdown, 1000);
    }

    function updateCountdown() {
      const currentDate = new Date();
      const selectedDate = flatpickr.parseDate(datetimePicker.value);
      const timeDifference = selectedDate.getTime() - currentDate.getTime();

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      fieldValue[0].textContent = formatTimeValue(days);
      fieldValue[1].textContent = formatTimeValue(hours);
      fieldValue[2].textContent = formatTimeValue(minutes);
      fieldValue[3].textContent = formatTimeValue(seconds);
    }

    function formatTimeValue(value) {
      return String(value).padStart(2, '0');
    }
  },
};

flatpickr(datetimePicker, options);
