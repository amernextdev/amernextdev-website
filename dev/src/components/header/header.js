const header = document.getElementById('site-header');

const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 0);
};

window.addEventListener('scroll', onScroll, { passive: true });