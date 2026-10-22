# Proyecto vanilla

Página básica con HTML, CSS y JavaScript, sin dependencias ni compilación.

## Ver la página

Abre `index.html` directamente en tu navegador.

El botón muestra un saludo y aumenta un contador con cada clic. El contador comienza en cero y se reinicia al recargar la página.

## Prueba de CI fallido: feature/feature2

Esta rama agrega el botón **Reiniciar contador** con un fallo intencional: muestra cero, pero conserva el valor interno anterior. Después de dos clics, reiniciar y volver a hacer clic, muestra 3 en lugar de 1.

El test `el primer clic después de reiniciar cuenta desde uno` verifica el comportamiento correcto y debe fallar. Por eso `npm test` devuelve un código de salida distinto de cero y el workflow de CI falla. Para corregirlo en una siguiente iteración, agrega `clicks = 0;` dentro del manejador del botón de reinicio.

## Archivos

- `index.html`: estructura de la página.
- `styles.css`: estilos básicos y adaptables a móviles.
- `main.js`: interacción del botón.

## Ejecutar los tests

Necesitas Node.js 24 o superior y npm.

```sh
npm ci
npm test
```

En PowerShell, si la política de ejecución bloquea `npm`, usa `npm.cmd ci` y `npm.cmd test`.

Los tests usan los módulos nativos `node:test` y `node:assert`, sin dependencias externas. Comprueban el estado inicial del mensaje, el saludo al hacer clic, el comportamiento con clics repetidos, el incremento del contador y su reinicio al cargar de nuevo la página. El DOM se simula con un doble mínimo; no son pruebas en un navegador real.

## Integración continua

El workflow `.github/workflows/ci.yml` se ejecuta en cada push y pull request. Configura Node.js 24, ejecuta `npm ci` y después `npm test`. Si falla cualquier test, el workflow falla.

## Próximas iteraciones

Agregar el despliegue en GitHub Pages.
