const startBtn = document.querySelectorAll('button')[0];
const stopBtn = document.querySelectorAll('button')[1];
const body = document.querySelector('body');
let intervalId = null;

startBtn.addEventListener('click', startChangingColors);
stopBtn.addEventListener('click', stopChangingColors);

disabledBtn(stopBtn);
ableBtn(startBtn);


function startChangingColors(e) {
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();        
    }, 1000);
    disabledBtn(startBtn);
    ableBtn(stopBtn);
}

function stopChangingColors(e) {
    clearInterval(intervalId);
    disabledBtn(stopBtn);
    ableBtn(startBtn);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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
