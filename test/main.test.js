const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { runInNewContext } = require('node:vm');

const source = readFileSync(resolve(__dirname, '../main.js'), 'utf8');

// Doble mínimo del DOM: permite probar el script sin dependencias externas.
function loadPage() {
  const message = { textContent: '' };
  const listeners = new Map();
  const button = {
    addEventListener(event, handler) {
      listeners.set(event, handler);
    },
    click() {
      listeners.get('click')?.();
    },
  };

  runInNewContext(source, {
    document: {
      querySelector(selector) {
        return {
          '#greeting-button': button,
          '#message': message,
        }[selector] ?? null;
      },
    },
  });

  return { button, message };
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
