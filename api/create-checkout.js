/**
 * Vercel Serverless Function · Mercado Pago Checkout Pro (Orders API).
 * Nunca pasar el Access Token al cliente ni aceptar precios enviados por el navegador.
 * Esta función abre el proceso de pago; NO emite boletos ni valida pagos aprobados.
 */
import { randomUUID } from 'node:crypto';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  if (process.env.TICKETS_ENABLED !== 'true') {
    return res.status(403).json({ error: 'La venta de entradas todavía no está habilitada.' });
  }

  const token = process.env.MP_ACCESS_TOKEN;
  const siteUrl = process.env.SITE_URL;
  const price = Number(process.env.TICKET_PRICE_COP);
  if (!token || !siteUrl || !Number.isInteger(price) || price < 1000 || price > 1000000) {
    return res.status(503).json({ error: 'La boletería aún no está configurada.' });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(siteUrl);
    if (parsedUrl.protocol !== 'https:') throw new Error('HTTPS requerido');
  } catch {
    return res.status(503).json({ error: 'La dirección del sitio está mal configurada.' });
  }

  const { email, quantity } = req.body || {};
  const normalizedEmail = typeof email === 'string' ? email.trim() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || normalizedEmail.length > 200) {
    return res.status(400).json({ error: 'Escribe un correo electrónico válido.' });
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 6) {
    return res.status(400).json({ error: 'Selecciona entre 1 y 6 entradas.' });
  }

  const reference = `impro-lab-${randomUUID()}`;
  const unitPrice = price.toFixed(2);
  const totalAmount = (price * quantity).toFixed(2);
  const baseUrl = parsedUrl.origin;

  const order = {
    type: 'online',
    processing_mode: 'manual',
    total_amount: totalAmount,
    description: 'Entradas IMPRO-LAB - Talk Show de Improvisación',
    external_reference: reference,
    payer: { email: normalizedEmail },
    items: [{ title: 'Entrada general - IMPRO-LAB', quantity, unit_price: unitPrice }],
    config: {
      online: {
        success_url: `${baseUrl}/?checkout=return`,
        failure_url: `${baseUrl}/?checkout=failure`,
        pending_url: `${baseUrl}/?checkout=pending`,
        auto_return: 'all',
      },
    },
  };

  try {
    const response = await fetch('https://api.mercadopago.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Idempotency-Key': randomUUID(),
      },
      body: JSON.stringify(order),
      signal: AbortSignal.timeout(15000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || typeof data.checkout_url !== 'string' || !data.checkout_url.startsWith('https://')) {
      console.error('Mercado Pago create order failed', response.status, data);
      return res.status(502).json({ error: 'No se pudo abrir el checkout. Intenta nuevamente.' });
    }
    return res.status(200).json({ checkoutUrl: data.checkout_url, orderId: data.id });
  } catch (error) {
    console.error('Mercado Pago unavailable', error?.message);
    return res.status(502).json({ error: 'La pasarela de pagos no responde en este momento.' });
  }
}
