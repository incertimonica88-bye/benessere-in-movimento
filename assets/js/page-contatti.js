// Contatti — carica eventuali blocchi modulari aggiunti da pannello

async function loadContattiBlocks() {
  try {
    const res = await fetch('content/contatti.json');
    const d = await res.json();
    const pv = document.getElementById('privacy-text');
    if (pv && d.privacy_text) {
      pv.textContent = d.privacy_text;
      if (d.privacy_link) {
        const a = document.createElement('a');
        a.href = d.privacy_link;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = d.privacy_link_text || 'Informativa privacy';
        a.style.color = 'var(--terracotta)';
        a.style.textDecoration = 'underline';
        pv.appendChild(document.createTextNode(' '));
        pv.appendChild(a);
      }
    }

    if (window.renderBlocksInto) window.renderBlocksInto('extra-blocks', d.extra_blocks);
  } catch (e) {
    console.warn('Impossibile caricare content/contatti.json', e);
  }
}

document.addEventListener('DOMContentLoaded', loadContattiBlocks);
