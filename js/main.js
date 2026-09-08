document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Header: transparent over hero, solid/glass after scrolling past it */
  var header = document.querySelector('.site-header');
  var hero = document.querySelector('.hero-cinematic');
  if (header) {
    if (!hero) {
      header.classList.add('no-hero');
    } else {
      var threshold = Math.max(hero.offsetHeight - 90, 60);
      var onScroll = function () {
        if (window.scrollY > threshold) {
          header.classList.add('is-solid');
        } else {
          header.classList.remove('is-solid');
        }
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  /* Hero slideshow */
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 6000);
  }

  /* Contact form: opens the user's mail app with a pre-filled message,
     no backend involved. Reads config from data-* attributes on the form. */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var to = contactForm.getAttribute('data-mailto');
      var subjectLabel = contactForm.getAttribute('data-subject-label') || 'New message from';
      var labelName = contactForm.getAttribute('data-label-name') || 'Name';
      var labelEmail = contactForm.getAttribute('data-label-email') || 'Email';

      var name = (contactForm.querySelector('[name="name"]') || {}).value || '';
      var email = (contactForm.querySelector('[name="email"]') || {}).value || '';
      var message = (contactForm.querySelector('[name="message"]') || {}).value || '';

      var subject = encodeURIComponent(subjectLabel + ' ' + name);
      var body = encodeURIComponent(
        message + '\n\n' + labelName + ': ' + name + '\n' + labelEmail + ': ' + email
      );

      window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
    });
  }

  /* Reveal-on-scroll for editorial sections */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }
});
