const greetingButton = document.querySelector('#greeting-button');
const message = document.querySelector('#message');
const clickCount = document.querySelector('#click-count');
let clicks = 0;

greetingButton.addEventListener('click', () => {
  message.textContent = '¡JavaScript funciona correctamente!';
  clicks += 1;
  clickCount.textContent = String(clicks);
});
