// Corsi — popola i blocchi da content/corsi.json e content/testimonials.json

function renderCourse(c, hasTestimonials) {
  const tagClass = c.tag_style === 'terra' ? 'tag tag--terra' : 'tag';
  const tagsHtml = (c.tags || []).map(t => `<span class="${tagClass}">${t}</span>`).join('');

  let scheduleHtml = '';
  if (c.has_schedule) {
    const dayPlaceholder = (c.schedule_day || '').trim().toLowerCase().startsWith('da definire') ? ' placeholder' : '';
    const locPlaceholder = (c.schedule_location || '').trim().toLowerCase().startsWith('da definire') ? ' placeholder' : '';
    scheduleHtml = `
      <div class="course-card__schedule">
        <div class="schedule-field"><strong>Giorno e orario</strong><span class="${dayPlaceholder.trim()}">${c.schedule_day || ''}</span></div>
        <div class="schedule-field"><strong>Luogo</strong><span class="${locPlaceholder.trim()}">${c.schedule_location || ''}</span></div>
      </div>`;
  }
  const ctaHtml = c.cta_text
    ? `<a href="${c.cta_link || 'contatti.html'}" class="btn btn--outline" style="margin-top:0.9rem;">${c.cta_text}</a>`
    : '';
  const bottomHtml = scheduleHtml + ctaHtml;

  const noteHtml = c.note ? `<p style="font-size:0.88rem; color:var(--ink-soft);">${c.note}</p>` : '';
  const marginBottom = hasTestimonials ? '2.5rem' : '4rem';

  return `
  <div id="${c.id}" class="course-list reveal" style="margin-bottom:${marginBottom};">
    <span class="eyebrow">${c.category_label}</span>
    <h2 style="margin-bottom:1.6rem;">${c.title}</h2>
    <div class="course-card" id="course-${c.id}">
      <div class="course-card__media"><img src="${c.image}" alt="${c.title}"></div>
      <div>
        <div class="course-card__head">
          <h3>${c.title}</h3>
          <div class="tags">${tagsHtml}</div>
        </div>
        <p>${c.description}</p>
        ${noteHtml}
        ${bottomHtml}
      </div>
    </div>
  </div>`;
}

function renderTestimonials(items) {
  if (!items.length) return '';
  const cards = items.map(t => `
    <div class="testi-card">
      <div class="testi-card__stars">★★★★★</div>
      <p>"${t.text}"</p>
    </div>`).join('');
  return `<div class="testi-grid reveal" style="margin-bottom:4rem;">${cards}</div>`;
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

    const testimonialsByCourse = {};
    testimonials.forEach(t => {
      if (!testimonialsByCourse[t.course]) testimonialsByCourse[t.course] = [];
      testimonialsByCourse[t.course].push(t);
    });

    const container = document.getElementById('corsi-list');
    container.innerHTML = d.courses
      .map(c => renderCourse(c, !!(testimonialsByCourse[c.id] && testimonialsByCourse[c.id].length)))
      .join('');

    d.courses.forEach(c => {
      const matching = testimonialsByCourse[c.id];
      if (!matching || !matching.length) return;
      const courseBlock = document.getElementById('course-' + c.id);
      if (!courseBlock) return;
      courseBlock.closest('.course-list').insertAdjacentHTML('afterend', renderTestimonials(matching));
    });

    document.getElementById('corsi-cta-title').textContent = d.cta_title;
    document.getElementById('corsi-cta-text').textContent = d.cta_text;

    if (window.renderBlocksInto) window.renderBlocksInto('extra-blocks', d.extra_blocks);
    if (window.observeReveals) window.observeReveals();
  } catch (e) {
    console.warn('Impossibile caricare content/corsi.json', e);
  }
}

document.addEventListener('DOMContentLoaded', loadCorsi);
