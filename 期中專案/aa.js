const icon = document.getElementById("music-icon");
const audio = document.getElementById("bgm");
let playing = true;
icon.addEventListener("click", () => {
  if(playing){ audio.pause(); icon.style.opacity="0.4"; }
  else { audio.play(); icon.style.opacity="1"; }
  playing = !playing;
});

/* --- Skills sliders: update bars and numeric label --- */
document.querySelectorAll('.skill-input').forEach(input => {
  const target = input.dataset.target;
  const valLabel = input.parentElement.querySelector('.skill-value');
  const bar = document.querySelector('.skill-fill[data-skill="'+target+'"]');
  input.addEventListener('input', e => {
    const v = e.target.value;
    if (bar) bar.style.width = v + '%';
    if (valLabel) valLabel.textContent = v + '%';
  });
});

/* --- Experience carousel control --- */
(function(){
  const cards = Array.from(document.querySelectorAll('.experience-carousel .card'));
  let idx = 0;
  const show = newIndex => {
    cards.forEach(c => c.classList.remove('active'));
    cards[newIndex].classList.add('active');
    idx = newIndex;
  };
  document.querySelector('.experience-carousel .next').addEventListener('click', () => {
    show((idx+1) % cards.length);
  });
  document.querySelector('.experience-carousel .prev').addEventListener('click', () => {
    show((idx-1 + cards.length) % cards.length);
  });
  // allow left/right arrow keys when focused on carousel
  document.addEventListener('keydown', e => {
    if (document.activeElement.closest && document.activeElement.closest('.experience-carousel')) {
      if (e.key === 'ArrowRight') document.querySelector('.experience-carousel .next').click();
      if (e.key === 'ArrowLeft') document.querySelector('.experience-carousel .prev').click();
    }
  });
})();

/* --- Software mastery sliders: update circle and linear bars --- */
document.querySelectorAll('[data-target^="sw-"]').forEach(range => {
  const target = range.dataset.target;
  const bar = document.querySelector('[data-bar="'+target+'"]');
  const circle = range.closest('.software-item').querySelector('.circle-progress');
  range.addEventListener('input', e => {
    const v = e.target.value;
    if (bar) bar.style.width = v + '%';
    if (circle){
      circle.style.setProperty('--p', v);
      circle.textContent = v + '%';
    }
  });
});

/* --- Back to top --- */
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({top:0,behavior:'smooth'});
});

/* --- Smooth anchor offset because of fixed nav: adjust on click --- */
document.querySelectorAll('.navbar a').forEach(a=>{
  a.addEventListener('click', e=>{
    // default smooth scroll will do but offset the fixed nav
    // use manual scroll
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const rectTop = el.getBoundingClientRect().top + window.pageYOffset;
    const offset = 68; // navbar height + small gap
    window.scrollTo({top: rectTop - offset, behavior:'smooth'});
  });
});

/* --- Make sections grow slightly like bubble on mouseover (tweak transform origin for nicer feel) --- */
document.querySelectorAll('.section').forEach(sec=>{
  sec.addEventListener('mouseenter', () => {
    sec.style.transform = 'scale(1.04)';
  });
  sec.addEventListener('mouseleave', () => {
    sec.style.transform = '';
  });
});

/* --- Accessibility helpers: enable focus outline for keyboard users --- */
document.addEventListener('keydown', function(e){
  if (e.key === 'Tab') document.body.classList.add('show-focus');
});