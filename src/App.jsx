import React, { useEffect, useState } from 'react';
import { EVENT, SALES, PROMPTS } from './siteData.js';

const currency = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

const isSafePaymentUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
};

function Topbar() {
  return (
    <div className="topbar">
      <div className="layout topbar-inner"><span>IMPROVISACIÓN EN VIVO · BOGOTÁ</span><span>100% SIN LIBRETO <span aria-hidden="true">✳</span> 100% IMPREDECIBLE</span></div>
    </div>
  );
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <nav className="nav layout" aria-label="Navegación principal">
      <a href="#inicio" className="logo" onClick={close} aria-label="La Friendzone, inicio"><span className="logo-mark">LF<span className="logo-dot">.</span></span><span className="logo-copy">LA FRIENDZONE <small>IMPRO SHOW</small></span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-links" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Cerrar ×' : 'Menú ☰'}</button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="main-links">
        <a href="#el-show" onClick={close}>El show</a>
        <a href="#experiencia" onClick={close}>La experiencia</a>
        <a href="#confesionario" onClick={close}>Impro lab</a>
        <a className="nav-ticket" href="#entradas" onClick={close}>ENTRADAS <span aria-hidden="true">↗</span></a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="inicio">
      <div className="hero-light hero-light-a" aria-hidden="true" />
      <div className="hero-light hero-light-b" aria-hidden="true" />
      <Topbar />
      <Navigation />
      <div className="layout hero-content">
        <div className="hero-left">
          <div className="eyebrow"><span className="live-dot" /> EL TALK SHOW DONDE TODO PUEDE PASAR</div>
          <h1 className="hero-title"><span>LA</span><span>FRIEND<span className="title-exclaim">!</span></span><span className="hero-title-outline">ZONE<span className="title-star" aria-hidden="true">✳</span></span></h1>
          <div className="hero-baseline"><span className="highlight-hand">DEL VISTO AL ESCENARIO.</span> SIN PASAR POR EL GUIÓN.</div>
          <p className="hero-desc">Una noche de humor, historias de amor (y de casi amor), música y escenas que nacen de lo que cuenta el público. Lo único seguro es que no se repetirá.</p>
          <div className="hero-actions"><a className="btn btn-primary" href="#entradas">QUIERO ESTAR AHÍ <span aria-hidden="true">↗</span></a><a className="text-link" href="#el-show">DESCUBRE EL SHOW <span aria-hidden="true">↓</span></a></div>
          <div className="hero-note"><span className="asterisk" aria-hidden="true">✳</span> No es una obra con libreto. Tú traes la chispa.</div>
        </div>
        <div className="hero-side">
          <div className="live-stamp" aria-hidden="true"><span>LIVE</span><b>ON STAGE</b><span className="stamp-bolt">↗</span></div>
          <div className="broadcast-card">
            <div className="broadcast-top"><span>EN CARTELERA</span><span className="broadcast-symbol">● ● ●</span></div>
            <div className="broadcast-big">TU HISTORIA<br/><em>CAMBIA</em><br/>EL SHOW<span className="broadcast-period">.</span></div>
            <div className="broadcast-line" />
            <div className="broadcast-footer"><span>PRÓXIMA FUNCIÓN</span><strong>POR ANUNCIAR</strong></div>
          </div>
          <div className="hero-caption">SIN ENSAYO PREVIO. SIN SEGUNDAS TOMAS. <span>↙</span></div>
        </div>
      </div>
      <div className="hero-bottom-border" />
    </header>
  );
}

function Ticker() {
  return <div className="ticker" aria-label="Risas, improvisación y muchas historias"><div className="ticker-inner" aria-hidden="true">{Array.from({length: 4}, (_, i) => <span key={i}>NO HAY GUIÓN <b>✳</b> HAY HISTORIAS <b>✳</b> HAY IMPRO <b>✳</b> </span>)}</div></div>;
}

function About() {
  return <section className="section about" id="el-show">
    <div className="layout about-grid">
      <div><div className="section-kicker">01 / QUÉ ES ESTO</div><h2 className="section-title">¿AMIGOS?<br/><em>¿ALGO MÁS?</em><br/><span>¿O QUÉ?</span></h2></div>
      <div className="about-copy"><span className="margin-symbol" aria-hidden="true">↗</span><h3>Un talk show que se sale del libreto. Literal.</h3><p><strong>La Friendzone</strong> mezcla la energía de un programa de entrevistas con lo mejor de la improvisación teatral. Las anécdotas de la audiencia se transforman en escenas, juegos y momentos musicales en vivo.</p><p>Hablamos de vínculos, desamores, amistades y esas situaciones que son demasiado absurdas para inventarlas. Con una diferencia: <strong>acá sí nos reímos juntos.</strong></p><div className="about-quote">“Tú cuentas la historia.<br/>Nosotros improvisamos el resto.”</div></div>
    </div>
  </section>;
}

const STEPS = [
  { n: '01', label: 'TÚ TRAES LA HISTORIA', text: 'La audiencia comparte ideas y experiencias que encienden la función.', symbol: '✳' },
  { n: '02', label: 'EL ELENCO SE LANZA', text: 'Improvisadores y músicos transforman esas pistas en algo inesperado.', symbol: '↗' },
  { n: '03', label: 'NADIE SABE EL FINAL', text: 'Cada escena sucede una sola vez. Ni el elenco sabe cómo termina.', symbol: '★' },
];
function Experience() {
  return <section className="section experience" id="experiencia"><div className="layout"><div className="section-kicker">02 / CÓMO FUNCIONA</div><div className="experience-heading"><h2 className="section-title">EL PÚBLICO<br/><span>ES EL GUIÓN.</span></h2><p>En este show no vienes solo a mirar. Vienes a darle al elenco la mejor materia prima: <strong>lo que te ha pasado.</strong></p></div><div className="steps">{STEPS.map((s) => <div className="step" key={s.n}><div className="step-header"><span>ESCENA {s.n}</span><span className="step-symbol" aria-hidden="true">{s.symbol}</span></div><h3>{s.label}</h3><p>{s.text}</p><span className="step-corner" aria-hidden="true">↗</span></div>)}</div></div></section>;
}

function Confessional() {
  const [category, setCategory] = useState('amor');
  const [promptIndex, setPromptIndex] = useState(0);
  const [scene, setScene] = useState(null);
  const [rotation, setRotation] = useState(0);
  const choose = (id) => {setCategory(id);setPromptIndex(0);setScene(null);};
  const improvise = () => {
    const pool = PROMPTS[category];
    const next = promptIndex % pool.length;
    setScene(pool[next]);
    setPromptIndex((prev) => prev + 1);
    setRotation((prev) => prev + 1);
  };
  return <section className="section confessional" id="confesionario"><div className="layout confession-grid">
    <div><div className="section-kicker">03 / HAZ LA PRUEBA</div><h2 className="section-title">SE PRENDE<br/>LA <span>IMPRO.</span></h2><p className="confession-lead">¿Crees que es fácil improvisar? Elige un tema y deja que el azar te dé una consigna. En escena, el elenco tendría que resolverla sin prepararse.</p><div className="category-label">ELIGE TU DRAMA:</div><div className="category-options" role="group" aria-label="Categoría de improvisación"><button className={category === 'amor' ? 'active' : ''} type="button" onClick={() => choose('amor')}>♡ AMOR</button><button className={category === 'amistad' ? 'active' : ''} type="button" onClick={() => choose('amistad')}>✳ AMISTAD</button><button className={category === 'caos' ? 'active' : ''} type="button" onClick={() => choose('caos')}>↯ CAOS</button></div><button className="btn btn-dark" type="button" onClick={improvise}>¡IMPROVISA! <span aria-hidden="true">↗</span></button><p className="disclaimer">Juego de muestra. Las escenas del espectáculo se crean en vivo.</p></div>
    <div className="prompt-card"><div className="prompt-card-top"><span>LA FRIENDZONE · IMPRO LAB</span><span>NO. 00{(rotation % 9) + 1}</span></div><div className="prompt-mark" aria-hidden="true">✳</div><div className="prompt-body" aria-live="polite">{scene ? <><div className="prompt-tag">{scene.label}</div><h3>{scene.text}</h3></> : <><div className="prompt-tag">TU ESCENA COMIENZA AQUÍ</div><h3>NO SABEMOS QUÉ VA A PASAR.<br/><em>ESA ES LA GRACIA.</em></h3></>}</div><div className="prompt-card-bottom"><span>IMPRO: ON</span><span>✦ SOLO UNA TOMA</span></div></div>
  </div></section>;
}

function Tickets() {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const canBuy = SALES.enabled && !!SALES.priceCOP;
  const canUseNequi = canBuy && isSafePaymentUrl(SALES.nequiUrl);
  const buy = async (event) => {
    event.preventDefault();
    if (!canBuy) return;
    setError('');setProcessing(true);
    try {
      const response = await fetch('/api/create-checkout', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({quantity, email})});
      const data = await response.json();
      if (!response.ok || !data.checkoutUrl) throw new Error(data.error || 'No pudimos iniciar el pago.');
      window.location.assign(data.checkoutUrl);
    } catch (e) {setError(e.message || 'Intenta más tarde.');setProcessing(false);}
  };
  return <section className="section tickets" id="entradas"><div className="layout tickets-grid"><div className="ticket-copy"><div className="section-kicker">04 / PRÓXIMA FUNCIÓN</div><h2 className="section-title">NO TE<br/>QUEDES <em>EN</em><br/><span>VISTO.</span></h2><p>Cuando el show vuelva a escena, queremos verte en primera fila. Aquí encontrarás la próxima fecha y el acceso a las entradas.</p><div className="tickets-star" aria-hidden="true">✷</div></div>
    <div className="ticket-panel"><div className="ticket-head"><span>BOLETERÍA · LA FRIENDZONE</span><span className="ticket-status">{canBuy ? 'VENTA ABIERTA' : 'PRÓXIMAMENTE'}</span></div><div className="ticket-title">TU PASE AL CAOS <span aria-hidden="true">↗</span></div><div className="ticket-detail"><span>FECHA</span><strong>{EVENT.nextDate}</strong></div><div className="ticket-detail"><span>LUGAR</span><strong>{EVENT.nextVenue}</strong></div><div className="ticket-detail"><span>VALOR POR PERSONA</span><strong>{SALES.priceCOP ? currency(SALES.priceCOP) : 'Por anunciar'}</strong></div>
      {canBuy ? <form className="checkout-form" onSubmit={buy}><label htmlFor="buyerEmail">TU CORREO PARA EL PROCESO DE COMPRA</label><input id="buyerEmail" type="email" placeholder="tu@email.com" value={email} required maxLength={200} onChange={(e) => setEmail(e.target.value)} /><label htmlFor="ticketQty">ENTRADAS</label><div className="ticket-qty"><button type="button" aria-label="Disminuir entradas" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><output id="ticketQty" aria-label="Cantidad de entradas">{quantity}</output><button type="button" aria-label="Aumentar entradas" onClick={() => setQuantity(Math.min(6, quantity + 1))}>+</button></div><div className="ticket-total"><span>TOTAL</span><strong>{currency(SALES.priceCOP * quantity)}</strong></div><button type="submit" className="btn btn-primary btn-buy" disabled={processing}>{processing ? 'CONECTANDO…' : 'PAGAR CON MERCADO PAGO ↗'}</button>{error && <p className="form-error" role="alert">{error}</p>}{canUseNequi && (quantity === 1 ? <a className="nequi-link" href={SALES.nequiUrl} target="_blank" rel="noopener noreferrer">PAGAR 1 ENTRADA CON LINK DE NEQUI ↗</a> : <p className="ticket-note">El link de Nequi está previsto para una entrada por operación. Selecciona 1 entrada para usarlo.</p>)}<p className="ticket-note">El pago se procesa en un proveedor externo. La entrada solo se confirma tras verificar el pago.</p></form> : <><div className="tickets-closed"><span aria-hidden="true">✳</span><strong>LA PRÓXIMA ESCENA ESTÁ EN PREPARACIÓN.</strong><p>Fecha, lugar, precio y boletería se publicarán aquí cuando estén confirmados.</p></div><a className="btn btn-primary btn-buy" href="#inicio">VUELVE AL PRINCIPIO ↗</a></>}
      <div className="ticket-foot">SIN LIBRETO. CON TODAS LAS GANAS. <span>✳</span></div></div>
  </div></section>;
}

const FAQ = [
  { q: '¿Es stand-up o teatro?', a: 'Es un talk show de improvisación: mezcla conversación, escenas teatrales creadas en el momento, humor y música en vivo.' },
  { q: '¿Las historias están escritas?', a: 'No. Las experiencias y propuestas de la audiencia sirven como punto de partida para construir escenas diferentes en cada presentación.' },
  { q: '¿Tengo que ir en pareja?', a: 'Para nada. Puedes venir con tus amigos, con tu pareja, con tu ex (si se llevan bien) o sin compañía.' },
  { q: '¿Dónde y cuándo será la próxima función?', a: 'La próxima fecha y el escenario aún están por confirmar. Esta web se actualizará cuando exista información oficial.' },
];
function Questions() {
  const [expanded, setExpanded] = useState(0);
  return <section className="section questions" id="preguntas"><div className="layout questions-grid"><div><div className="section-kicker">05 / PREGUNTAS FRECUENTES</div><h2 className="section-title">¿Y SI<br/><em>PREGUNTAS?</em></h2><p>Tranquilo: fuera del escenario sí tenemos algunas respuestas preparadas.</p></div><div className="faq-list">{FAQ.map((item, i) => <div className="faq-item" key={item.q}><button type="button" aria-expanded={expanded === i} onClick={() => setExpanded(expanded === i ? -1 : i)}><span>{String(i + 1).padStart(2, '0')}. {item.q}</span><b aria-hidden="true">{expanded === i ? '−' : '+'}</b></button>{expanded === i && <p>{item.a}</p>}</div>)}</div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="layout"><div className="footer-top"><div className="footer-logo">LA<br/>FRIEND<span>ZONE.</span></div><div className="footer-links"><a href="#inicio">INICIO ↑</a><a href="#el-show">EL SHOW</a><a href="#entradas">ENTRADAS</a>{EVENT.instagram && <a href={EVENT.instagram} target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a>}{EVENT.contactEmail && <a href={`mailto:${EVENT.contactEmail}`}>CONTACTO ↗</a>}</div></div><div className="footer-bottom"><span>HECHO PARA QUE CADA FUNCIÓN SEA IRREPETIBLE. © {new Date().getFullYear()} LA FRIENDZONE</span><span>BOGOTÁ, COLOMBIA ✳</span></div></div></footer>;
}

function PaymentReturn() {
  const status = new URLSearchParams(window.location.search).get('checkout');
  const [visible, setVisible] = useState(Boolean(status));
  useEffect(() => { if (!status) setVisible(false); }, [status]);
  if (!visible) return null;
  return <div className="payment-return" role="status"><div><strong>{status === 'failure' ? 'El pago no se completó.' : 'Regresaste del proceso de pago.'}</strong><p>La compra no está confirmada en esta página. La validación real debe realizarse en el servidor con Mercado Pago.</p></div><button type="button" aria-label="Cerrar aviso" onClick={() => setVisible(false)}>×</button></div>;
}

export default function App() {
  return <><Hero /><Ticker /><main><About /><Experience /><Confessional /><Tickets /><Questions /></main><Footer /><PaymentReturn /></>;
}
