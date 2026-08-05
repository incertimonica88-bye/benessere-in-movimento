// Home — popola i blocchi da content/home.json e content/testimonials.json

async function loadHome() {
  try {
    const res = await fetch('content/home.json');
    const d = await res.json();

    document.getElementById('hero-eyebrow').textContent = d.hero_eyebrow;
    document.getElementById('hero-title').innerHTML = (d.hero_title || '').replace(/\n/g, '<br>');
    document.getElementById('hero-lede').textContent = d.hero_lede;
    document.getElementById('hero-image').src = d.hero_image;

    document.getElementById('intro-quote').textContent = '«' + d.intro_quote + '»';

    document.getElementById('areas-eyebrow').textContent = d.areas_eyebrow;
    document.getElementById('areas-title').textContent = d.areas_title;
    document.getElementById('areas-lede').textContent = d.areas_lede;

    const grid = document.getElementById('areas-grid');
    grid.innerHTML = d.areas.map(a => `
      <a href="${a.link}" class="area-card reveal">
        <img src="${a.image}" alt="${a.title}">
        <div class="area-card__overlay"><h3>${a.title}</h3><p>${a.text}</p></div>
      </a>`).join('');

    document.getElementById('chisono-image').src = d.chisono_image;
    document.getElementById('chisono-eyebrow').textContent = d.chisono_eyebrow;
    document.getElementById('chisono-title').textContent = d.chisono_title;
    document.getElementById('chisono-text-1').textContent = d.chisono_text_1;
    document.getElementById('chisono-text-2').textContent = d.chisono_text_2;

    document.getElementById('testimonials-eyebrow').textContent = d.testimonials_eyebrow;
    document.getElementById('testimonials-title').textContent = d.testimonials_title;

    document.getElementById('cta-title').textContent = d.cta_title;
    document.getElementById('cta-text').textContent = d.cta_text;

    if (window.renderBlocksInto) window.renderBlocksInto('extra-blocks', d.extra_blocks);
    if (window.observeReveals) window.observeReveals();
  } catch (e) {
    console.warn('Impossibile caricare content/home.json', e);
  }
}

async function loadHomeTestimonials() {
  try {
    const res = await fetch('content/home.json');
    const d = await res.json();

    // Prima scelta: le recensioni scelte dal pannello nella pagina Home.
    let items = (d.testimonials || []).filter(t => t && t.text);

    // Ripiego: quelle segnate "in evidenza" nell'elenco testimonianze.
    if (!items.length) {
      const tr = await fetch('content/testimonials.json');
      items = ((await tr.json()).items || [])
        .filter(t => t.featured).slice(0, 3)
        .map(t => ({ label: '', text: t.text }));
    }

    const grid = document.getElementById('testimonials-grid');
    if (grid) {
      grid.innerHTML = items.map(t => `
      <div class="testi-card reveal">
        <div class="testi-card__stars">★★★★★</div>
        <p>"${t.text}"</p>
        ${t.label ? `<div class="testi-card__meta">${t.label}</div>` : ''}
      </div>`).join('');
    }

    const more = document.getElementById('testimonials-more');
    const link = document.getElementById('testimonials-more-link');
    if (more && link && d.reviews_link) {
      link.setAttribute('href', d.reviews_link);
      link.textContent = d.reviews_button || 'Leggi tutte le recensioni';
      more.style.display = '';
    }

    if (window.observeReveals) window.observeReveals();
  } catch (e) {
    console.warn('Impossibile caricare le testimonianze della Home', e);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  loadHome();
  loadHomeTestimonials();
});
