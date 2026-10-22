const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { runInNewContext } = require('node:vm');

const source = readFileSync(resolve(__dirname, '../main.js'), 'utf8');

// Doble mínimo del DOM: permite probar el script sin dependencias externas.
function createButton() {
  const listeners = new Map();
  return {
    addEventListener(event, handler) {
      listeners.set(event, handler);
    },
    click() {
      listeners.get('click')?.();
    },
  };
}

function loadPage() {
  const message = { textContent: '' };
  const clickCount = { textContent: '0' };
  const button = createButton();
  const resetButton = createButton();

  runInNewContext(source, {
    document: {
      querySelector(selector) {
        return {
          '#greeting-button': button,
          '#message': message,
          '#click-count': clickCount,
          '#reset-button': resetButton,
        }[selector] ?? null;
      },
    },
  });

  return { button, message, clickCount, resetButton };
}

test('el mensaje permanece vacío antes de hacer clic', () => {
  const { message } = loadPage();

  assert.equal(message.textContent, '');
});

test('hacer clic en el botón muestra el saludo', () => {
  const { button, message } = loadPage();

  button.click();

  assert.equal(message.textContent, '¡JavaScript funciona correctamente!');
});

test('varios clics mantienen un único saludo', () => {
  const { button, message } = loadPage();

  button.click();
  button.click();
  button.click();

  assert.equal(message.textContent, '¡JavaScript funciona correctamente!');
});

test('el contador empieza en cero', () => {
  const { clickCount } = loadPage();

  assert.equal(clickCount.textContent, '0');
});

test('cada clic incrementa el contador en uno', () => {
  const { button, clickCount } = loadPage();

  for (let clicks = 1; clicks <= 3; clicks += 1) {
    button.click();
    assert.equal(clickCount.textContent, String(clicks));
  }
});

test('cargar de nuevo la página reinicia el contador', () => {
  const firstPage = loadPage();
  firstPage.button.click();
  assert.equal(firstPage.clickCount.textContent, '1');

  const newPage = loadPage();

  assert.equal(newPage.clickCount.textContent, '0');
  newPage.button.click();
  assert.equal(newPage.clickCount.textContent, '1');
  assert.equal(firstPage.clickCount.textContent, '1');
});

test('reiniciar el contador muestra cero', () => {
  const { button, resetButton, clickCount } = loadPage();
  button.click();
  button.click();

  resetButton.click();

  assert.equal(clickCount.textContent, '0');
});

test('el primer clic después de reiniciar cuenta desde uno', () => {
  const { button, resetButton, clickCount } = loadPage();
  button.click();
  button.click();
  resetButton.click();

  button.click();

  assert.equal(clickCount.textContent, '1');
});
