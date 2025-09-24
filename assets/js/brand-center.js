/* Brand Center interactions */
(function () {
  // AOS
  if (window.AOS) AOS.init({ once: true });

  // GLightbox (open the image files directly)
  // Using the default selector ".glightbox"
  const lb = GLightbox({
    selector: '.glightbox',
    openEffect: 'zoom',
    closeEffect: 'zoom',
    plyr: { css: '' } // no player CSS needed
  });

  // Filtering
  const grid = document.getElementById('brandGrid');
  const filterBtns = document.querySelectorAll('.filters [data-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter'); // all | club | district | theme
      const cards = grid.querySelectorAll('.brand-card');

      cards.forEach(card => {
        card.classList.remove('d-none');
        if (filter !== 'all' && !card.classList.contains(filter)) {
          card.classList.add('d-none');
        }
      });
    });
  });

  // Background toggle (for thumbnail area only)
  const bgBtns = document.querySelectorAll('[data-bg]');
  bgBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bgBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-bg'); // light | dark | checker
      grid.classList.remove('bg-light', 'bg-dark', 'bg-checker');
      grid.classList.add(`bg-${mode}`);
    });
  });
})();
