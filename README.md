# LA FRIENDZONE · React + Vite + Vercel

Landing de una página, responsive, construida **sin fotos, logos externos ni librerías de animación**. El lenguaje visual se inspira en un escenario de improvisación, afiches teatrales y programas de entrevistas.

## 1. Inicia el proyecto

```bash
npm install
npm run dev
```

Abre la URL local que muestre Vite. Para compilar: `npm run build`. Para subir a Vercel: importa el repositorio de GitHub, framework **Vite**, comando `npm run build`, directorio de salida `dist`.

## 2. Edita las fechas y datos del show

En `src/siteData.js` cambia:

- `EVENT.nextDate` (fecha real de una **función futura**)
- `EVENT.nextVenue` (escenario, localidad y dirección si están confirmados)
- `EVENT.instagram` y `EVENT.contactEmail` (solo si son cuentas oficiales del proyecto)
- `PROMPTS` (consignas del laboratorio de improvisación)

**Importante:** Idartes publicó una función el **15 de mayo de 2026** en la Sala Gaitán. Esa fecha ya pasó y no debe presentarse como próxima función. Fuente: https://www.idartes.gov.co/es/agenda/presentacion/la-friendzone-talk-show-de-impro-show

## 3. Cobrar con Mercado Pago

La función `api/create-checkout.js` usa la **API Orders de Checkout Pro** (la recomendada actualmente por Mercado Pago en Colombia). El navegador envía correo y cantidad de entradas; el precio se define *exclusivamente* en el servidor. El comprador termina el pago en la plataforma segura de Mercado Pago.

1. Crea una cuenta comercial y una aplicación en Mercado Pago Developers. Obtén el **Access Token** de pruebas. Nunca lo pongas en `src`, ni en un `VITE_*`, ni en Git.
2. En Vercel, ve a **Project → Settings → Environment Variables**. Configura lo siguiente (ejemplo de un PRECIO DE PRUEBA, no es el precio de la obra):

   | Variable | Ejemplo | Visibilidad |
   | --- | --- | --- |
   | `MP_ACCESS_TOKEN` | tu token de Mercado Pago | Privada / servidor |
   | `TICKET_PRICE_COP` | `38000` | Privada / servidor |
   | `TICKETS_ENABLED` | `true` | Privada / servidor |
   | `SITE_URL` | `https://tu-dominio.vercel.app` | Servidor |
   | `VITE_TICKET_PRICE_COP` | `38000` | Pública / frontend |
   | `VITE_TICKETS_ENABLED` | `true` | Pública / frontend |

   Mantén ambas variables `*_TICKETS_ENABLED` en `false` mientras no esté confirmada una nueva función, su aforo y condiciones de venta.
3. Redeploy para aplicar los cambios. En desarrollo local, `npm run dev` levanta **solo la interfaz**; para probar las funciones serverless usa `npx vercel dev` con las variables correspondientes o despliega una vista previa en Vercel.
4. Haz pagos de prueba usando el entorno de pruebas de Mercado Pago. La API puede rechazar órdenes si faltan requisitos específicos de tu cuenta; contrasta contra la documentación y el panel de desarrolladores.

Referencias:
- https://www.mercadopago.com.co/developers/es/docs/checkout-pro-orders/create-order
- https://www.mercadopago.com.co/developers/es/docs/checkout-pro-orders/web-integration/configure-back-urls
- https://www.mercadopago.com.co/developers/es/docs/checkout-pro-orders/notifications

### ⚠ Antes de vender entradas reales

La solución entregada **solo inicia el checkout**; no es un sistema completo de boletería. Antes de recibir pagos reales implementa y prueba:

- **Webhook** de Mercado Pago con validación criptográfica de `x-signature` y **consulta a Mercado Pago desde el servidor** para determinar el estado real, importe, destinatario y referencia de cada orden; no te bases en la URL de retorno del usuario.
- **Persistencia** de pedidos y compradores (por ejemplo Supabase/Neon/Postgres), validación de pagos y emisión de entradas con ID/QR único, con entrega por email o integración al control de acceso.
- **Control de aforo y reserva** para evitar sobreventas y duplicados, así como términos de venta, política de privacidad y política de devoluciones aplicable.
- Monitoreo, control de abusos y pruebas de escenarios de pago pendiente, fallido, duplicado y devolución.

## 4. Alternativa con Nequi

Más sencillo que conectar directamente la API de Nequi es crear un **Link de pagos en Nequi Negocios** y añadirlo a Vercel como `VITE_NEQUI_PAYMENT_URL=https://...` (link real y completo). Si además abres la venta, aparece el botón “Pagar 1 entrada con link de Nequi” cuando la cantidad seleccionada sea 1. **Configura el enlace para el mismo precio de una entrada, verifica el monto en el destino** y concilia el recaudo manualmente. Esta ruta es un pago externo; **el sitio no valida automáticamente el resultado** ni emite entradas.

Nequi también dispone de APIs empresariales (Push y QR), pero requieren habilitación como comercio y un flujo de notificaciones/verificación propio.

Referencias:
- https://ayuda.nequi.com.co/hc/es/articles/38968897164941--C%C3%B3mo-usar-los-links-de-pagos-de-la-app-Nequi-Negocios
- https://www.nequi.com.co/negocios/apis

## 5. Estructura

```text
la-friendzone-web/
├── api/
│   └── create-checkout.js  # Serverless Vercel, órdenes Mercado Pago
├── src/
│   ├── App.jsx             # Landing y componentes
│   ├── siteData.js         # Datos editables, consignas y UI de pagos
│   ├── styles.css          # Diseño, responsive, animaciones
│   └── main.jsx
├── preview-estatica.html  # Vista de lectura (no interactiva)
├── index.html
├── .env.example
├── .gitignore
└── package.json
```

## 6. Contenido y derechos

La propuesta usa la descripción pública de Idartes como **referencia informativa**, no copia su diseño ni utiliza imágenes o marcas institucionales. Verifica con el equipo artístico los nombres, reparto, titularidad del espectáculo, derechos de venta, aforo y autorización para usar el nombre del show antes de publicarlo como web oficial.
