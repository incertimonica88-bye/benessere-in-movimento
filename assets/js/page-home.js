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
    const res = await fetch('content/testimonials.json');
    const items = (await res.json()).items || [];
    const featured = items.filter(t => t.featured).slice(0, 3);
    const grid = document.getElementById('testimonials-grid');
    grid.innerHTML = featured.map(t => `
      <div class="testi-card reveal">
        <div class="testi-card__stars">★★★★★</div>
        <p>"${t.text}"</p>
        <div class="testi-card__meta">Corso di Yoga in Gravidanza</div>
      </div>`).join('');
    if (window.observeReveals) window.observeReveals();
  } catch (e) {
    console.warn('Impossibile caricare content/testimonials.json', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadHome();
  loadHomeTestimonials();
});
