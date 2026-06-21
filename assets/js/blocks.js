// Benessere in Movimento — motore dei blocchi modulari (estensione libera per ogni pagina)
// Ogni blocco ha un campo "type" scelto dal pannello: testo_immagine, citazione, galleria, video, elenco, cta

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
      return `
        <div class="reveal" style="max-width:860px; margin:0 auto;">
          ${block.title ? `<h2 style="margin-bottom:1.2rem;">${block.title}</h2>` : ''}
          <div class="video-wrapper">
            <iframe src="${block.video_url || ''}" title="${block.title || 'Video'}" allowfullscreen loading="lazy"></iframe>
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

function renderBlocksInto(containerId, blocks) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!blocks || !blocks.length) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = blocks.map(b => renderBlock(b)).join('');
  if (window.observeReveals) window.observeReveals();
}

window.renderBlocksInto = renderBlocksInto;
