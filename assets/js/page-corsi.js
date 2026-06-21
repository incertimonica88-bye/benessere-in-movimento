// Corsi — popola i blocchi da content/corsi.json e content/testimonials.json

function renderCourse(c) {
  const tagClass = c.tag_style === 'terra' ? 'tag tag--terra' : 'tag';
  const tagsHtml = (c.tags || []).map(t => `<span class="${tagClass}">${t}</span>`).join('');

  let bottomHtml = '';
  if (c.has_schedule) {
    const dayPlaceholder = (c.schedule_day || '').trim().toLowerCase().startsWith('da definire') ? ' placeholder' : '';
    const locPlaceholder = (c.schedule_location || '').trim().toLowerCase().startsWith('da definire') ? ' placeholder' : '';
    bottomHtml = `
      <div class="course-card__schedule">
        <div class="schedule-field"><strong>Giorno e orario</strong><span class="${dayPlaceholder.trim()}">${c.schedule_day || ''}</span></div>
        <div class="schedule-field"><strong>Luogo</strong><span class="${locPlaceholder.trim()}">${c.schedule_location || ''}</span></div>
      </div>`;
  } else if (c.cta_text) {
    bottomHtml = `<a href="${c.cta_link}" class="btn btn--outline" style="margin-top:0.6rem;">${c.cta_text}</a>`;
  }

  const noteHtml = c.note ? `<p style="font-size:0.88rem; color:var(--ink-soft);">${c.note}</p>` : '';
  const marginBottom = c.id === 'gravidanza' ? '2.5rem' : '4rem';

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

    const container = document.getElementById('corsi-list');
    container.innerHTML = d.courses.map(renderCourse).join('');

    try {
      const testiRes = await fetch('content/testimonials.json');
      const testimonials = (await testiRes.json()).items || [];
      const gravBlock = document.getElementById('course-gravidanza');
      if (gravBlock) {
        const testiHtml = renderTestimonials(testimonials.filter(t => t.course === 'gravidanza'));
        gravBlock.closest('.course-list').insertAdjacentHTML('afterend', testiHtml);
      }
    } catch (e) {
      console.warn('Impossibile caricare content/testimonials.json', e);
    }

    document.getElementById('corsi-cta-title').textContent = d.cta_title;
    document.getElementById('corsi-cta-text').textContent = d.cta_text;

    if (window.observeReveals) window.observeReveals();
  } catch (e) {
    console.warn('Impossibile caricare content/corsi.json', e);
  }
}

document.addEventListener('DOMContentLoaded', loadCorsi);
