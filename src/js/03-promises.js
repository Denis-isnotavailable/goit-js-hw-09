import Notiflix from 'notiflix';

const delayEl = document.querySelector('[name="delay"]');
const delayStepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');
const formEl = document.querySelector('.form');



function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;  

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {        
        resolve({ position: position, delay: delay });        
      } else {        
        reject({ position: position, delay: delay });        
      }
    }, delay);
  });

  return promise;
}


formEl.addEventListener("submit", showPromises);

function showPromises(event) {
  event.preventDefault();  

  let del = delayEl.value;

  for (let i = 1; i <= amountEl.value; i += 1) {
    createPromise(i, del)
    .then(({ position, delay }) => {      
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);      
    }).catch(({ position, delay }) => {    
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);    
    });
    
    del = Number.parseInt(del) + Number.parseInt(delayStepEl.value);
  } 
};

