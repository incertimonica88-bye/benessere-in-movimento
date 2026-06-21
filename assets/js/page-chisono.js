// Chi sono — popola i blocchi da content/chisono.json

async function loadChiSono() {
  try {
    const res = await fetch('content/chisono.json');
    const d = await res.json();

    document.getElementById('cs-eyebrow').textContent = d.eyebrow;
    document.getElementById('cs-title').textContent = d.title;
    document.getElementById('cs-lede').textContent = d.lede;
    document.getElementById('cs-header-image').src = d.header_image;

    document.getElementById('cs-story-eyebrow').textContent = d.story_eyebrow;
    document.getElementById('cs-story-title').textContent = d.story_title;
    document.getElementById('cs-story-p1').textContent = d.story_p1;
    document.getElementById('cs-story-p2').textContent = d.story_p2;
    document.getElementById('cs-story-image').src = d.story_image;

    document.getElementById('cs-asd-eyebrow').textContent = d.asd_eyebrow;
    document.getElementById('cs-asd-title').textContent = d.asd_title;
    document.getElementById('cs-asd-p1').innerHTML = d.asd_p1;
    document.getElementById('cs-asd-p2').textContent = d.asd_p2;
    document.getElementById('cs-asd-image-1').src = d.asd_image_1;
    document.getElementById('cs-asd-image-2').src = d.asd_image_2;

    document.getElementById('cs-cred-eyebrow').textContent = d.credentials_eyebrow;
    document.getElementById('cs-cred-title').textContent = d.credentials_title;
    document.getElementById('cs-cred-lede').textContent = d.credentials_lede;
    document.getElementById('cs-cred-yoga').innerHTML = d.credentials_yoga.map(i => `<li>${i}</li>`).join('');
    document.getElementById('cs-cred-aerea').innerHTML = d.credentials_aerea.map(i => `<li>${i}</li>`).join('');

    const gallery = document.getElementById('cs-gallery');
    gallery.innerHTML = d.gallery.map(src => `<img src="${src}" alt="Momento di Benessere in Movimento">`).join('');

    document.getElementById('cs-cta-title').textContent = d.cta_title;
    document.getElementById('cs-cta-text').textContent = d.cta_text;

    if (window.observeReveals) window.observeReveals();
  } catch (e) {
    console.warn('Impossibile caricare content/chisono.json', e);
  }
}

document.addEventListener('DOMContentLoaded', loadChiSono);
