/* ==========================================================
   FISHING WEBSITE — COZUMEL
   main.js — shared behavior across all pages
   ========================================================== */

   document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Header solid on scroll ---------- */
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function () {
        if (window.scrollY > 40) header.classList.add('solid');
        else header.classList.remove('solid');
      };
      window.addEventListener('scroll', onScroll);
      onScroll();
    }
  
    /* ---------- Mobile nav toggle ---------- */
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.main-nav');
    if (toggle && nav) {
      var setOpen = function (isOpen) {
        nav.classList.toggle('open', isOpen);
        toggle.textContent = isOpen ? '✕' : '☰';
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        // body{overflow:hidden} alone doesn't stop Lenis — it listens to
        // wheel/touch on window directly, so the page behind the open
        // menu would keep scrolling without this.
        if (window.__lenis) { isOpen ? window.__lenis.stop() : window.__lenis.start(); }
      };
      toggle.setAttribute('aria-expanded', 'false');
      toggle.addEventListener('click', function () {
        setOpen(!nav.classList.contains('open'));
      });
      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setOpen(false); });
      });
    }
  
    /* ---------- Scroll reveal ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
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
  
    /* ---------- Lightbox (gallery pages) ---------- */
    var lightbox = document.querySelector('.lightbox');
    if (lightbox) {
      var lightboxImg = lightbox.querySelector('img');
      var closeBtn = lightbox.querySelector('.lightbox-close');
      document.querySelectorAll('[data-lightbox]').forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          var src = trigger.getAttribute('data-lightbox');
          if (lightboxImg) lightboxImg.src = src;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
          if (window.__lenis) window.__lenis.stop();
        });
      });
      var closeLightbox = function () {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        if (window.__lenis) window.__lenis.start();
      };
      if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
      });
    }
  
    /* ---------- FAQ accordion ---------- */
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var willOpen = !item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function (open) {
          if (open !== item) {
            open.classList.remove('open');
            open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          }
        });
        item.classList.toggle('open', willOpen);
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        // Opening/closing an item changes the page's height, which shifts
        // every ScrollTrigger below it out of sync with the actual layout.
        if (window.ScrollTrigger) {
          setTimeout(function () { window.ScrollTrigger.refresh(); }, 350);
        }
      });
    });
  
  });