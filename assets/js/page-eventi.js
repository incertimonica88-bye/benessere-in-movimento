// Eventi & Formazione — popola i blocchi da content/eventi.json

async function loadEventi() {
  try {
    const res = await fetch('content/eventi.json');
    const d = await res.json();

    document.getElementById('ev-eyebrow').textContent = d.eyebrow;
    document.getElementById('ev-title').textContent = d.title;
    document.getElementById('ev-lede').textContent = d.lede;
    document.getElementById('ev-header-image').src = d.header_image;

    document.getElementById('ev-eventi-eyebrow').textContent = d.eventi_eyebrow;
    document.getElementById('ev-eventi-title').textContent = d.eventi_title;
    document.getElementById('ev-eventi-p1').textContent = d.eventi_p1;
    document.getElementById('ev-eventi-p2').textContent = d.eventi_p2;
    document.getElementById('ev-eventi-image-1').src = d.eventi_image_1;
    document.getElementById('ev-eventi-image-2').src = d.eventi_image_2;

    document.getElementById('ev-gallery').innerHTML = d.gallery
      .map(src => `<img src="${src}" alt="Evento o workshop di Benessere in Movimento">`).join('');

    document.getElementById('ev-formazione-eyebrow').textContent = d.formazione_eyebrow;
    document.getElementById('ev-formazione-title').textContent = d.formazione_title;
    document.getElementById('ev-formazione-p1').textContent = d.formazione_p1;
    document.getElementById('ev-formazione-p2').textContent = d.formazione_p2;
    document.getElementById('ev-formazione-image').src = d.formazione_image;

    document.getElementById('ev-cta-title').textContent = d.cta_title;
    document.getElementById('ev-cta-text').textContent = d.cta_text;

    if (window.observeReveals) window.observeReveals();
  } catch (e) {
    console.warn('Impossibile caricare content/eventi.json', e);
  }
}

document.addEventListener('DOMContentLoaded', loadEventi);
