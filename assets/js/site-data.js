// Benessere in Movimento — caricamento dati globali (contatti/social)
// Popola qualsiasi elemento con id corrispondente, presente in nav/footer/contatti.

async function loadSiteData() {
  try {
    const res = await fetch('content/site.json');
    const d = await res.json();

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el && value !== undefined) el.textContent = value;
    };
    const setHref = (id, value) => {
      const el = document.getElementById(id);
      if (el && value !== undefined) el.setAttribute('href', value);
    };

    // Nav
    setText('nav-phone', d.phone_display);

    // Footer (presente su tutte le pagine)
    setText('footer-tagline', d.footer_tagline);
    setText('footer-copyright', d.footer_copyright);
    setText('footer-address', d.address);
    setText('footer-phone-link', d.phone_display);
    setHref('footer-phone-link', 'tel:' + d.phone_link);
    setText('footer-email-link', d.email);
    setHref('footer-email-link', 'mailto:' + d.email);
    setHref('social-ig-personal', d.instagram_personal_url);
    setHref('social-ig-asd', d.instagram_asd_url);
    setHref('social-email', 'mailto:' + d.email);

    // Pagina Contatti
    setHref('contact-phone-link', 'tel:' + d.phone_link);
    setText('contact-phone-text', d.phone_display);
    setHref('contact-email-link', 'mailto:' + d.email);
    setText('contact-email-text', d.email);
    setHref('contact-ig-personal-link', d.instagram_personal_url);
    setText('contact-ig-personal-handle', d.instagram_personal_handle);
    setHref('contact-ig-asd-link', d.instagram_asd_url);
    setText('contact-ig-asd-handle', d.instagram_asd_handle);
    setText('contact-address', d.address);

    // Favicon impostata dal pannello: sostituisce quella di default nell'HTML.
    // Se il campo e' vuoto restano validi i tag statici gia' presenti in <head>.
    if (d.favicon) {
      document.querySelectorAll('link[rel="icon"]').forEach(function (l) { l.remove(); });
      const icon = document.createElement('link');
      icon.rel = 'icon';
      icon.href = d.favicon;
      document.head.appendChild(icon);
    }

    const form = document.getElementById('contact-form');
    if (form) form.setAttribute('action', 'mailto:' + d.email);

  } catch (e) {
    console.warn('Impossibile caricare content/site.json', e);
  }
}

document.addEventListener('DOMContentLoaded', loadSiteData);
