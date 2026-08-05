// Benessere in Movimento — motore dei blocchi modulari, posizionabili in 3 punti della pagina
// Ogni blocco ha "type" (testo_immagine, citazione, galleria, video, elenco, cta)
// e "position" (inizio | centro | fine) per scegliere dove comparire nella pagina

// --- Normalizzatore link video -------------------------------------------
// Accetta qualsiasi cosa si possa copiare da YouTube o Vimeo e la converte
// nella forma "embed", l'unica che i loro server permettono di incorporare:
//   https://youtu.be/ABC                          -> youtube.com/embed/ABC
//   https://www.youtube.com/watch?v=ABC           -> youtube.com/embed/ABC
//   https://www.youtube.com/shorts/ABC            -> youtube.com/embed/ABC
//   <iframe src="..."></iframe> (codice completo)  -> estrae il src e lo converte
//   https://vimeo.com/123456                      -> player.vimeo.com/video/123456
// Se riconosce un istante di partenza (?t=90) lo mantiene.
function videoEmbedUrl(raw) {
  if (!raw) return '';
  let s = String(raw).trim();

  // Caso "ho incollato tutto il codice di incorporamento": tengo solo il src
  const srcAttr = s.match(/src\s*=\s*["']([^"']+)["']/i);
  if (srcAttr) s = srcAttr[1].trim();

  if (s.indexOf('//') === 0) s = 'https:' + s;

  // YouTube — l'ID del video è sempre lungo 11 caratteri
  const yt = s.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (yt) {
    const start = s.match(/[?&](?:start|t)=(\d+)/);
    return 'https://www.youtube.com/embed/' + yt[1] + (start ? '?start=' + start[1] : '');
  }

  // Vimeo
  const vm = s.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return 'https://player.vimeo.com/video/' + vm[1];

  // Formato non riconosciuto: lo lascio com'è (potrebbe essere un altro servizio)
  return s;
}

// Rende sicuro un testo inserito dal pannello dentro un attributo HTML
function attr(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderBlock(block) {
  switch (block.type) {

    case 'testo_immagine': {
      const reverseClass = block.image_position === 'destra' ? '' : ' split--reverse';
      return `
        <div class="split${reverseClass} reveal">
          <div>
            ${block.title ? `<h2>${block.title}</h2>` : ''}
            ${block.text ? `<p>${block.text}</p>` : ''}
          </div>
          <div class="split__media">
            ${block.image ? `<img src="${block.image}" alt="${block.title || ''}">` : ''}
          </div>
        </div>`;
    }

    case 'citazione': {
      return `
        <blockquote class="block-quote reveal">
          «${block.quote || ''}»
          ${block.author ? `<cite>— ${block.author}</cite>` : ''}
        </blockquote>`;
    }

    case 'galleria': {
      const imgs = (block.images || []).map(img => `<img src="${img.image || img}" alt="${block.title || 'Galleria'}">`).join('');
      return `
        <div class="reveal">
          ${block.title ? `<div class="heading-block center"><h2>${block.title}</h2></div>` : ''}
          <div class="gallery-strip">${imgs}</div>
        </div>`;
    }

    case 'video': {
      const src = videoEmbedUrl(block.video_url);
      if (!src) return '';
      return `
        <div class="reveal" style="max-width:860px; margin:0 auto;">
          ${block.title ? `<h2 style="margin-bottom:1.2rem;">${block.title}</h2>` : ''}
          <div class="video-wrapper">
            <iframe src="${attr(src)}" title="${attr(block.title || 'Video')}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen loading="lazy"></iframe>
          </div>
        </div>`;
    }

    case 'elenco': {
      const items = (block.items || []).map(i => `<li>${i.item || i}</li>`).join('');
      return `
        <div class="block-list reveal" style="max-width:680px; margin:0 auto;">
          ${block.title ? `<h2>${block.title}</h2>` : ''}
          <ul>${items}</ul>
        </div>`;
    }

    case 'cta': {
      return `
        <div class="cta-banner reveal">
          <div>
            <h2>${block.title || ''}</h2>
            ${block.text ? `<p>${block.text}</p>` : ''}
          </div>
          ${block.button_text ? `<a href="${block.button_link || '#'}" class="btn btn--primary">${block.button_text}</a>` : ''}
        </div>`;
    }

    default:
      return '';
  }
}

// Distribuisce i blocchi nei 3 slot della pagina (slot-inizio, slot-centro, slot-fine),
// nascondendo la sezione contenitore se per quello slot non c'è nessun blocco.
function renderBlocksGrouped(blocks) {
  const slots = { inizio: [], centro: [], fine: [] };
  (blocks || []).forEach(b => {
    const pos = (b.position && slots[b.position]) ? b.position : 'fine';
    slots[pos].push(b);
  });

  Object.keys(slots).forEach(pos => {
    const section = document.getElementById('slot-' + pos);
    const container = document.getElementById('extra-blocks-' + pos);
    if (!section || !container) return;
    if (slots[pos].length) {
      container.innerHTML = slots[pos].map(renderBlock).join('');
      section.style.display = '';
    } else {
      container.innerHTML = '';
      section.style.display = 'none';
    }
  });

  if (window.observeReveals) window.observeReveals();
}

// Inserisce i blocchi in un unico contenitore e NASCONDE la sezione che lo avvolge
// quando non c'e' nessun blocco, cosi' non resta spazio vuoto nella pagina.
function renderBlocksInto(containerId, blocks) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const section = container.closest('section');
  const list = blocks || [];

  if (list.length) {
    container.innerHTML = list.map(renderBlock).join('');
    if (section) section.style.display = '';
  } else {
    container.innerHTML = '';
    if (section) section.style.display = 'none';
  }

  if (window.observeReveals) window.observeReveals();
}

window.renderBlocksInto = renderBlocksInto;
window.renderBlocksGrouped = renderBlocksGrouped;
