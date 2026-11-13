/**
 * CAMBIA ESTO CUANDO CONFIRMEN LA PRÓXIMA FUNCIÓN.
 * La presentación del 15 de mayo de 2026 citada por Idartes es HISTÓRICA.
 */
export const EVENT = {
  name: 'IMPRO-LAB',
  subtitle: 'Talk show de improvisación',
  nextDate: 'Próxima fecha por anunciar',
  nextVenue: 'Bogotá · escenario por confirmar',
  instagram: '', // p. ej. 'https://www.instagram.com/usuario/'
  contactEmail: '', // email público de contacto, si lo desean
};

export const SALES = {
  enabled: import.meta.env.VITE_TICKETS_ENABLED === 'true',
  priceCOP: Number(import.meta.env.VITE_TICKET_PRICE_COP) || null,
  nequiUrl: import.meta.env.VITE_NEQUI_PAYMENT_URL?.trim() || '',
};

export const PROMPTS = {
  amor: [
    { label: 'COMPLICADO', text: 'Te declaras, pero la otra persona cree que estás practicando una escena.' },
    { label: 'PLOT TWIST', text: 'Tienes cinco minutos para conquistar a alguien que viene del futuro.' },
    { label: 'MENSAJE ENVIADO', text: 'Le mandas un audio romántico a la persona equivocada.' },
    { label: 'SIN GUION', text: 'Dos personas discuten porque cada una cree que la otra está enamorada.' },
  ],
  amistad: [
    { label: 'ZONA DE RIESGO', text: 'Tu mejor amistad organiza una cita sorpresa… contigo.' },
    { label: 'TODO NORMAL', text: 'Presentas a tu ex como “solo un amigo” ante su nueva pareja.' },
    { label: 'SECRETO A VOCES', text: 'En una fiesta descubren que todos tienen el mismo amor platónico.' },
    { label: 'ALTO DRAMA', text: 'Tu mejor amigo confiesa algo importante justo cuando se va la luz.' },
  ],
  caos: [
    { label: 'ÚLTIMA HORA', text: 'Un noticiero entrevista en vivo a una persona que acaba de olvidar quién es.' },
    { label: 'CAMBIO DE PLANES', text: 'En mitad de una boda, los invitados intercambian sus papeles.' },
    { label: 'NO HAY VUELTA ATRÁS', text: 'Cada vez que alguien dice “amor”, todos cambian de emoción.' },
    { label: 'AL AIRE', text: 'Un programa de citas descubre que su presentadora es una viajera del tiempo.' },
  ],
};
