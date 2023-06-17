import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInp = document.querySelector('input[name="delay"]');
const stepInp = document.querySelector('input[name="step"]');
const amountInp = document.querySelector('input[name="amount"]');
const createButton = document.querySelector('button[type="submit"]');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const delay = parseInt(delayInp.value);
  const step = parseInt(stepInp.value);
  const amount = parseInt(amountInp.value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const currentDelay = delay + i * step;
    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        successNotiflix(position, delay);
      })
      .catch(({ position, delay }) => {
        failNotiflix(position, delay);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function successNotiflix(position, delay) {
  Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
    clickToclose: true,
    timeOut: 4000,
  });
}

function failNotiflix(position, delay) {
  Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
    clickToclose: true,
    timeOut: 4000,
  });
}
