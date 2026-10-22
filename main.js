const greetingButton = document.querySelector('#greeting-button');
const message = document.querySelector('#message');

greetingButton.addEventListener('click', () => {
  message.textContent = '¡JavaScript funciona correctamente!';
});
