// Corsi — genera le fasce dei corsi da content/corsi.json e content/testimonials.json

function renderScheduleRows(rows, note) {
  const list = (rows || []).filter(r => r && (r.nome || r.orari));
  if (!list.length) return '';
  const cards = list.map(r => `
    <div class="oc">
      <div class="oc__top">
        <span class="oc__nome">${r.nome || ''}</span>
        ${r.per_chi ? `<span class="oc__chi">${r.per_chi}</span>` : ''}
      </div>
      <div class="oc__quando">${[r.frequenza, r.orari].filter(Boolean).join('<br>')}</div>
      <div class="oc__prezzi">
        ${r.prezzo_mensile ? `<span class="pill">Mensile <b>${r.prezzo_mensile}</b></span>` : ''}
        ${r.prezzo_trimestrale ? `<span class="pill">Trimestrale <b>${r.prezzo_trimestrale}</b></span>` : ''}
      </div>
    </div>`).join('');
  return `<div class="orari-cards">${cards}</div>${note ? `<div class="schedule-note">${note}</div>` : ''}`;
}

function renderTestimonials(items) {
  if (!items || !items.length) return '';
  const cards = items.map(t => `
    <div class="testi-card">
      <div class="testi-card__stars">★★★★★</div>
      <p>"${t.text}"</p>
    </div>`).join('');
  return `<div class="testi-grid reveal" style="margin-top:2rem;">${cards}</div>`;
}

function renderGallery(c) {
  const imgs = (c.gallery || [])
    .map(g => (g && typeof g === 'object') ? g.image : g)
    .filter(Boolean);
  if (!imgs.length) return '';
  const items = imgs.map(src => `<img src="${src}" alt="${c.title || ''}" loading="lazy">`).join('');
  return `<div class="course-gallery reveal" style="margin-top:2rem;">${items}</div>`;
}

function renderPrices(prices) {
  const list = (prices || []).filter(p => p && (p.label || p.amount));
  if (!list.length) return '';
  const pills = list.map(p =>
    `<span class="pill">${p.label || ''}${p.amount ? ` <b>${p.amount}</b>` : ''}</span>`).join('');
  return `<div class="course-prices">${pills}</div>`;
}

function renderCourse(c, index, testimonials) {
  const tagClass = c.tag_style === 'terra' ? 'tag tag--terra' : 'tag';
  const tagsHtml = (c.tags || []).map(t => `<span class="${tagClass}">${t}</span>`).join('');

  const usesRows = c.use_schedule_rows && (c.schedule_rows || []).length;

  let scheduleHtml = '';
  if (c.has_schedule && !usesRows) {
    const dayPlaceholder = (c.schedule_day || '').trim().toLowerCase().startsWith('da definire') ? 'placeholder' : '';
    const locPlaceholder = (c.schedule_location || '').trim().toLowerCase().startsWith('da definire') ? 'placeholder' : '';
    scheduleHtml = `
      <div class="course-card__schedule">
        <div class="schedule-field"><strong>Giorno e orario</strong><span class="${dayPlaceholder}">${c.schedule_day || ''}</span></div>
        <div class="schedule-field"><strong>Luogo</strong><span class="${locPlaceholder}">${c.schedule_location || ''}</span></div>
      </div>`;
  } else if (c.has_schedule && usesRows && c.schedule_location) {
    const locPlaceholder = (c.schedule_location || '').trim().toLowerCase().startsWith('da definire') ? 'placeholder' : '';
    scheduleHtml = `
      <div class="course-card__schedule">
        <div class="schedule-field"><strong>Luogo</strong><span class="${locPlaceholder}">${c.schedule_location}</span></div>
      </div>`;
  }

  const pricesHtml = renderPrices(c.prices);

  const ctaHtml = c.cta_text
    ? `<a href="${c.cta_link || 'contatti.html'}" class="btn btn--outline" style="margin-top:0.9rem;">${c.cta_text}</a>`
    : '';
  const noteHtml = c.note ? `<p style="font-size:0.88rem; color:var(--ink-soft);">${c.note}</p>` : '';

  const rowsHtml = usesRows ? renderScheduleRows(c.schedule_rows, c.schedule_note) : '';
  const testiHtml = renderTestimonials(testimonials);
  const galleryHtml = renderGallery(c);
  const extras = (c.gallery_position === 'sopra')
    ? galleryHtml + testiHtml
    : testiHtml + galleryHtml;

  const band = index % 2 === 0 ? 'course-band--cream' : 'course-band--white';

  return `
  <section class="section course-band ${band}" id="${c.id}">
    <div class="container">
      <div class="course-list reveal">
        <span class="eyebrow">${c.category_label}</span>
        <h2 class="course-band__title">${c.title}</h2>
        <div class="course-card" id="course-${c.id}">
          <div class="course-card__media"><img src="${c.image}" alt="${c.title}"></div>
          <div>
            <div class="course-card__head">
              <h3>${c.title}</h3>
              <div class="tags">${tagsHtml}</div>
            </div>
            <p>${c.description}</p>
            ${noteHtml}
            ${scheduleHtml}
            ${pricesHtml}
            ${ctaHtml}
          </div>
        </div>
      </div>
      ${rowsHtml}
      ${extras}
    </div>
  </section>`;
}

function renderCategoryNav(courses) {
  return courses.map(c => `<a href="#${c.id}">${c.title}</a>`).join('');
}

function renderOnDemand(d) {
  if (!d.ondemand_title && !d.ondemand_text) return '';
  const link = d.ondemand_pdf || d.ondemand_button_link || 'contatti.html';
  const isPdf = /\.pdf($|\?)/i.test(link);
  const btn = d.ondemand_button_text
    ? `<a class="ondemand__btn" href="${link}"${isPdf ? ' target="_blank" rel="noopener" download' : ''}>${d.ondemand_button_text}</a>`
    : '';
  const img = d.ondemand_image
    ? `<div class="ondemand__media"><img src="${d.ondemand_image}" alt="${d.ondemand_title || ''}" loading="lazy"></div>`
    : '';
  return `
    <div class="ondemand reveal">
      ${img}
      <div class="ondemand__body">
        <div>
          ${d.ondemand_eyebrow ? `<span class="ondemand__badge">${d.ondemand_eyebrow}</span>` : ''}
          <h2>${d.ondemand_title || ''}</h2>
          ${d.ondemand_text ? `<p>${d.ondemand_text}</p>` : ''}
          ${btn}
        </div>
      </div>
    </div>`;
}

function renderGoogleReviews(d) {
  if (!d.google_link) return '';
  return `
    <div class="gmaps reveal">
      <div class="gmaps__left">
        <div class="gmaps__logo">G</div>
        <div>
          <h3>${d.google_title || 'Le recensioni complete su Google'}</h3>
          <div class="gmaps__stars">★★★★★</div>
          ${d.google_text ? `<p>${d.google_text}</p>` : ''}
        </div>
      </div>
      <a class="btn btn--primary" href="${d.google_link}" target="_blank" rel="noopener">${d.google_button || 'Leggi su Google'}</a>
    </div>`;
}

async function loadCorsi() {
  try {
    const res = await fetch('content/corsi.json');
    const d = await res.json();

    document.getElementById('corsi-title').textContent = d.page_title;
    document.getElementById('corsi-lede').textContent = d.page_lede;

    let testimonials = [];
    try {
      const testiRes = await fetch('content/testimonials.json');
      testimonials = (await testiRes.json()).items || [];
    } catch (e) {
      console.warn('Impossibile caricare content/testimonials.json', e);
    }

    const byCourse = {};
    testimonials.forEach(t => {
      if (!byCourse[t.course]) byCourse[t.course] = [];
      byCourse[t.course].push(t);
    });

    const courses = d.courses || [];

    const nav = document.getElementById('category-nav');
    if (nav) nav.innerHTML = renderCategoryNav(courses);

    document.getElementById('corsi-list').innerHTML =
      courses.map((c, i) => renderCourse(c, i, byCourse[c.id])).join('');

    const odBox = document.getElementById('ondemand');
    const odSection = document.getElementById('ondemand-section');
    if (odBox && odSection) {
      const odHtml = renderOnDemand(d);
      if (odHtml) { odBox.innerHTML = odHtml; odSection.style.display = ''; }
    }

    const gBox = document.getElementById('google-reviews');
    const gSection = document.getElementById('google-reviews-section');
    if (gBox && gSection) {
      const gHtml = renderGoogleReviews(d);
      if (gHtml) {
        gBox.innerHTML = gHtml;
        gSection.style.display = '';
      }
    }

    document.getElementById('corsi-cta-title').textContent = d.cta_title;
    document.getElementById('corsi-cta-text').textContent = d.cta_text;

    if (window.renderBlocksInto) window.renderBlocksInto('extra-blocks', d.extra_blocks);
    if (window.observeReveals) window.observeReveals();
  } catch (e) {
    console.warn('Impossibile caricare content/corsi.json', e);
  }
}

document.addEventListener('DOMContentLoaded', loadCorsi);
