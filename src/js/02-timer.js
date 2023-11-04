import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

let date;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      alert('Please choose a date in the future.');
      startButton.disabled = true;
    } else {
      date = selectedDates[0];
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  timerId = setInterval(() => {
    convertMs(date - new Date());
  }, 1000);
});

const fieldStyles = document.querySelectorAll('.field');
const valueStyles = document.querySelectorAll('.value');
const labelStyles = document.querySelectorAll('.label');

fieldStyles.forEach(field => {
  field.style.display = 'inline-block';
});

valueStyles.forEach(value => {
  value.style.fontSize = '20px';
  value.style.fontWeight = 'bold';
});

labelStyles.forEach(label => {
  label.style.fontStyle = 'italic';
});
