# 🥟 Sistema POS Web (GitHub + Netlify + Google Sheets)

## Paso 1: Configurar Google Sheets
1. Crea una hoja de cálculo en Google Sheets.
2. Nombra la primera pestaña como `Productos` y pon en la fila 1: `ID` | `Nombre` | `Precio` | `Stock`
3. Crea otra pestaña llamada `Ventas` y pon en la fila 1: `Fecha` | `Producto` | `Cantidad` | `Total`

## Paso 2: Subir el Backend (Apps Script)
1. En tu Google Sheet, ve a **Extensiones > Apps Script**.
2. Pega el contenido del archivo `Code.gs` y guarda.
3. Haz clic en **Implementar > Nueva implementación** (Tipo: Aplicación web).
4. Ejecutar como: **Yo** | Quién tiene acceso: **Cualquier persona**.
5. Copia la URL generada (termina en `/exec`).

## Paso 3: Conectar y Desplegar en Netlify
1. Abre `index.html` con tu editor de código y reemplaza `TU_URL_DE_APPS_SCRIPT_AQUI` por tu URL.
2. Sube `index.html` a un repositorio de GitHub y conéctalo a Netlify (o simplemente arrastra la carpeta descomprimida directamente a la pantalla de Netlify Drop).
