const greetingButton = document.querySelector('#greeting-button');
const message = document.querySelector('#message');
const clickCount = document.querySelector('#click-count');
const resetButton = document.querySelector('#reset-button');
let clicks = 0;

greetingButton.addEventListener('click', () => {
  message.textContent = '¡JavaScript funciona correctamente!';
  clicks += 1;
  clickCount.textContent = String(clicks);
});

resetButton.addEventListener('click', () => {
  // Fallo intencional para la prueba de CI: falta reiniciar la variable clicks.
  clickCount.textContent = '0';
});
