// Contatti — carica eventuali blocchi modulari aggiunti da pannello

async function loadContattiBlocks() {
  try {
    const res = await fetch('content/contatti.json');
    const d = await res.json();
    if (window.renderBlocksInto) window.renderBlocksInto('extra-blocks', d.extra_blocks);
  } catch (e) {
    console.warn('Impossibile caricare content/contatti.json', e);
  }
}

document.addEventListener('DOMContentLoaded', loadContattiBlocks);
