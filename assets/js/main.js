/* =============================================================
   Reteti Adventure Safaris — Main JavaScript
   -------------------------------------------------------------
   Handles: mobile menu, itinerary accordion, FAQ accordion,
   language switcher, scroll animations, back-to-top, and the
   contact form interaction.

   No HTML is generated dynamically. All visible content lives
   in index.html; this file only enhances existing markup.
   ============================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initItineraryAccordion();
    initFaqAccordion();
    initHeroSlider();
    initFeaturedGallery();
    initGalleryViewMore();
    initTestimonialCarousel();
    initScrollAnimations();
    initHeaderScroll();
    initBackToTop();
    initContactForm();
  });

  /* ---------------------------------------------------------
     1. Mobile Menu
     --------------------------------------------------------- */
  function initMobileMenu() {
    var hamburger = document.getElementById("hamburger");
    var mobileNav = document.getElementById("mobile-nav");
    var closeNav = document.getElementById("close-nav");
    if (!hamburger || !mobileNav) return;

    var openMenu = function () {
      mobileNav.classList.add("open");
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
    var closeMenu = function () {
      mobileNav.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    var toggleMenu = function (e) {
      if (e) e.stopPropagation();
      if (mobileNav.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    hamburger.addEventListener("click", toggleMenu);
    if (closeNav) closeNav.addEventListener("click", closeMenu);

    // Close when a mobile link is tapped
    mobileNav.querySelectorAll(".mobile-link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close when tapping outside the menu panel
    document.addEventListener("click", function (e) {
      if (!mobileNav.classList.contains("open")) return;
      if (mobileNav.contains(e.target) || e.target === hamburger || hamburger.contains(e.target)) return;
      closeMenu();
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------------------------------------------------------
     2. Itinerary Accordion
     --------------------------------------------------------- */
  function initItineraryAccordion() {
    var headers = document.querySelectorAll(".itin-header");
    headers.forEach(function (header) {
      header.addEventListener("click", function () {
        var body = header.nextElementSibling;
        var isActive = header.classList.contains("active");
        header.classList.toggle("active", !isActive);
        if (body) body.classList.toggle("open", !isActive);
      });
    });
  }

  /* ---------------------------------------------------------
     3. FAQ Accordion
     --------------------------------------------------------- */
  function initFaqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var question = item.querySelector(".faq-question");
      if (!question) return;
      question.addEventListener("click", function () {
        var isActive = item.classList.contains("active");
        // Close all others for a single-open accordion
        items.forEach(function (other) {
          other.classList.remove("active");
        });
        item.classList.toggle("active", !isActive);
      });
    });
  }

  /* ---------------------------------------------------------
     4. Language Switcher (multilingual scaffold)
     -------------------------------------------------------------
     English is the source content already present in the HTML.
     Spanish (and any future language) can be filled into the
     TRANSLATIONS object below. Missing keys fall back to the
     original English text captured on first load.
     --------------------------------------------------------- */
  var TRANSLATIONS = {
    en: {}, // populated from the DOM on load
    es: {}  // placeholder — add Spanish strings here (key: value)
  };

  function initLanguageSwitcher() {
    // Capture the original English content as the baseline.
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      TRANSLATIONS.en[el.getAttribute("data-i18n")] = el.textContent.trim();
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      TRANSLATIONS.en["__html__" + el.getAttribute("data-i18n-html")] =
        el.innerHTML.trim();
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      TRANSLATIONS.en["__ph__" + el.getAttribute("data-i18n-placeholder")] =
        el.getAttribute("placeholder") || "";
    });

    var buttons = document.querySelectorAll(".lang-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLanguage(btn.getAttribute("data-lang"));
      });
    });
  }

  function setLanguage(lang) {
    var dict = TRANSLATIONS[lang] || {};
    var fallback = TRANSLATIONS.en;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = dict[key] != null ? dict[key] : fallback[key];
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      var val =
        dict["__html__" + key] != null
          ? dict["__html__" + key]
          : fallback["__html__" + key];
      if (val != null) el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      var val =
        dict["__ph__" + key] != null
          ? dict["__ph__" + key]
          : fallback["__ph__" + key];
      if (val != null) el.setAttribute("placeholder", val);
    });

    // Reflect the active state on every language button.
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
    document.documentElement.setAttribute("lang", lang);
  }

  /* ---------------------------------------------------------
     4b. Header shrink-on-scroll
     --------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function update() {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------------------------------------------------------
     5. Scroll Animations (reveal package cards)
     --------------------------------------------------------- */
  function initScrollAnimations() {
    var cards = document.querySelectorAll(".pkg-card");
    if (!cards.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (card) {
        card.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () {
              el.classList.add("visible");
            }, i * 90);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  /* ---------------------------------------------------------
     6. Back to Top
     --------------------------------------------------------- */
  function initBackToTop() {
    var backTop = document.getElementById("back-top");
    if (!backTop) return;

    window.addEventListener("scroll", function () {
      backTop.classList.toggle("show", window.scrollY > 500);
    });
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------
     7. Hero Slider
     --------------------------------------------------------- */
  function initHeroSlider() {
    var root = document.getElementById("hero-slider");
    if (!root) return;
    var slides = root.querySelectorAll(".hero-slide");
    var dots = root.querySelectorAll(".hero-dot");
    var prev = document.getElementById("hero-prev");
    var next = document.getElementById("hero-next");
    var heroInner = document.getElementById("hero-inner");
    var heroHeadline = document.getElementById("hero-headline");
    var heroSub = document.getElementById("hero-sub");
    var heroCta = document.getElementById("hero-cta");
    var heroCtaLabel = document.getElementById("hero-cta-label");
    var heroTagline = document.getElementById("hero-tagline");
    if (slides.length < 2) return;

    var current = 0;
    var timer = null;
    var INTERVAL = 6000;

    function applyContent(slide) {
      if (!slide) return;
      if (heroHeadline) heroHeadline.textContent = slide.getAttribute("data-headline") || "";
      if (heroSub) heroSub.textContent = slide.getAttribute("data-sub") || "";
      if (heroCtaLabel) heroCtaLabel.textContent = slide.getAttribute("data-cta") || "";
      if (heroCta) heroCta.setAttribute("href", slide.getAttribute("data-cta-href") || "#quote-form");
      if (heroTagline) heroTagline.textContent = slide.getAttribute("data-tagline") || "";
    }

    function go(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle("is-active", i === current);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === current);
      });
      if (heroInner) {
        heroInner.classList.add("is-fading");
        setTimeout(function () {
          applyContent(slides[current]);
          heroInner.classList.remove("is-fading");
        }, 220);
      } else {
        applyContent(slides[current]);
      }
    }
    function nextSlide() {
      go(current + 1);
    }
    function prevSlide() {
      go(current - 1);
    }
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(nextSlide, INTERVAL);
    }

    if (next)
      next.addEventListener("click", function () {
        nextSlide();
        restart();
      });
    if (prev)
      prev.addEventListener("click", function () {
        prevSlide();
        restart();
      });
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        go(parseInt(dot.getAttribute("data-slide"), 10));
        restart();
      });
    });

    root.addEventListener("mouseenter", function () {
      if (timer) clearInterval(timer);
    });
    root.addEventListener("mouseleave", restart);

    restart();
  }

  /* ---------------------------------------------------------
     8. Featured Gallery (thumbnail swap)
     --------------------------------------------------------- */
  function initFeaturedGallery() {
    var mainImg = document.getElementById("featured-main-img");
    var thumbs = document.querySelectorAll("#featured-thumbs .featured-thumb");
    if (!mainImg || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var src = thumb.getAttribute("data-src");
        if (!src) return;
        mainImg.style.opacity = "0";
        setTimeout(function () {
          mainImg.setAttribute("src", src);
          mainImg.style.opacity = "1";
        }, 180);
        thumbs.forEach(function (t) {
          t.classList.remove("is-active");
        });
        thumb.classList.add("is-active");
      });
    });
  }

  /* ---------------------------------------------------------
     9. Testimonial Carousel
     --------------------------------------------------------- */
  function initTestimonialCarousel() {
    var root = document.getElementById("testi-carousel");
    var viewport = document.getElementById("testi-viewport");
    var track = document.getElementById("testi-track");
    var dotsWrap = document.getElementById("testi-dots");
    var prevBtn = document.getElementById("testi-prev");
    var nextBtn = document.getElementById("testi-next");
    if (!root || !viewport || !track) return;

    var slides = Array.prototype.slice.call(track.children);
    var total = slides.length;
    var index = 0;
    var timer = null;
    var INTERVAL = 4500;
    var perView = getPerView();

    function getPerView() {
      var w = window.innerWidth;
      if (w <= 620) return 1;
      if (w <= 900) return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(0, total - perView);
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      var pages = maxIndex() + 1;
      for (var i = 0; i < pages; i++) {
        var dot = document.createElement("button");
        dot.className = "testi-dot" + (i === index ? " is-active" : "");
        dot.setAttribute("aria-label", "Go to review " + (i + 1));
        (function (i) {
          dot.addEventListener("click", function () {
            goTo(i);
            restart();
          });
        })(i);
        dotsWrap.appendChild(dot);
      }
    }

    function updateDots() {
      if (!dotsWrap) return;
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }

    function render() {
      var slideWidth = viewport.clientWidth / perView;
      track.style.transform = "translateX(" + -(index * slideWidth) + "px)";
      updateDots();
    }

    function goTo(i) {
      index = Math.max(0, Math.min(i, maxIndex()));
      render();
    }

    function next() {
      index = index >= maxIndex() ? 0 : index + 1;
      render();
    }

    function prev() {
      index = index <= 0 ? maxIndex() : index - 1;
      render();
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, INTERVAL);
    }

    if (nextBtn)
      nextBtn.addEventListener("click", function () {
        next();
        restart();
      });
    if (prevBtn)
      prevBtn.addEventListener("click", function () {
        prev();
        restart();
      });

    root.addEventListener("mouseenter", function () {
      if (timer) clearInterval(timer);
    });
    root.addEventListener("mouseleave", restart);

    // Swipe support
    var touchStartX = 0;
    var touchDeltaX = 0;
    viewport.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.touches[0].clientX;
        touchDeltaX = 0;
        if (timer) clearInterval(timer);
      },
      { passive: true }
    );
    viewport.addEventListener(
      "touchmove",
      function (e) {
        touchDeltaX = e.touches[0].clientX - touchStartX;
      },
      { passive: true }
    );
    viewport.addEventListener("touchend", function () {
      if (touchDeltaX > 40) prev();
      else if (touchDeltaX < -40) next();
      restart();
    });

    window.addEventListener("resize", function () {
      var newPerView = getPerView();
      if (newPerView !== perView) {
        perView = newPerView;
        buildDots();
      }
      index = Math.min(index, maxIndex());
      render();
    });

    buildDots();
    render();
    restart();
  }

  /* ---------------------------------------------------------
     10. Contact Form
     --------------------------------------------------------- */
  function initContactForm() {
    var forms = document.querySelectorAll(".inquiry-form form");
    forms.forEach(function (form) {
      var block = form.closest(".inquiry-form");
      var success = block ? block.querySelector(".form-success") : null;

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var name = form.querySelector('[name="your-name"]');
        var email = form.querySelector('[name="your-email"]');
        var mobile = form.querySelector('[name="your-mobile"]');

        // Minimal required-field validation.
        if (name && !name.value.trim()) {
          name.focus();
          return;
        }
        if (mobile && !mobile.value.trim()) {
          mobile.focus();
          return;
        }
        if (email && !email.value.trim()) {
          email.focus();
          return;
        }

        // Pre-fill the WhatsApp confirmation link with the enquiry.
        var waBtn = success ? success.querySelector("a[href*='wa.me']") : null;
        if (waBtn) {
          var msg =
            "Hello Reteti Safaris! I just sent a safari enquiry. Name: " +
            (name ? name.value.trim() : "");
          waBtn.setAttribute(
            "href",
            "https://wa.me/254700302965?text=" + encodeURIComponent(msg)
          );
        }

        // Swap the form for the success message.
        form.style.display = "none";
        if (success) success.style.display = "block";
      });
    });
  }

  /* ---------------------------------------------------------
   8b. Guest Gallery - View More Photos
   --------------------------------------------------------- */
function initGalleryViewMore() {
  var moreBtn = document.getElementById("gallery-more-btn");
  var hiddenItems = document.querySelectorAll(".gallery-item.is-hidden");
  if (!moreBtn || !hiddenItems.length) return;

  moreBtn.addEventListener("click", function (e) {
    e.preventDefault();

    hiddenItems.forEach(function (item) {
      item.classList.remove("is-hidden");
    });

    moreBtn.parentElement.style.display = "none";
  });
}

  /* ---------- Gallery Lightbox ---------- */
  function initGalleryLightbox() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
    var lightbox = document.getElementById("gallery-lightbox");
    if (!items.length || !lightbox) return;

    var imgEl = document.getElementById("lightbox-img");
    var counterEl = document.getElementById("lightbox-counter");
    var closeBtn = document.getElementById("lightbox-close");
    var prevBtn = document.getElementById("lightbox-prev");
    var nextBtn = document.getElementById("lightbox-next");
    var current = 0;
    var touchStartX = null;

    function show(index) {
      current = (index + items.length) % items.length;
      var link = items[current];
      imgEl.src = link.getAttribute("href");
      imgEl.alt = link.querySelector("img").getAttribute("alt") || "Safari photo";
      counterEl.textContent = (current + 1) + " / " + items.length;
    }

    function open(index) {
      show(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    items.forEach(function (item, i) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        open(i);
      });
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () { show(current - 1); });
    nextBtn.addEventListener("click", function () { show(current + 1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });

    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? show(current - 1) : show(current + 1);
      }
      touchStartX = null;
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", initGalleryLightbox);
})();
