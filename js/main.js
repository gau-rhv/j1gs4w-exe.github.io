(function (html) {
  "use strict";

  html.className = html.className.replace(/\bno-js\b/g, "") + " js ";

  /* Preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    window.addEventListener("load", function () {
      document.querySelector("body").classList.remove("ss-preload");
      document.querySelector("body").classList.add("ss-loaded");

      preloader.addEventListener("transitionend", function (e) {
        if (e.target.matches("#preloader")) {
          this.style.display = "none";
        }
      });
    });
  }; // end ssPreloader

  /* Parallax
   * -------------------------------------------------- */
  const ssParallax = function () {
    const rellax = new Rellax(".rellax");
  }; // end ssParallax

  /* Move header menu
   * -------------------------------------------------- */
  const ssMoveHeader = function () {
    const hdr = document.querySelector(".s-header");
    const hero = document.querySelector("#hero");
    let triggerHeight;

    if (!(hdr && hero)) return;

    setTimeout(function () {
      triggerHeight = hero.offsetHeight - 170;
    }, 300);

    window.addEventListener("scroll", function () {
      let loc = window.scrollY;

      if (loc > triggerHeight) {
        hdr.classList.add("sticky");
      } else {
        hdr.classList.remove("sticky");
      }

      if (loc > triggerHeight + 20) {
        hdr.classList.add("offset");
      } else {
        hdr.classList.remove("offset");
      }

      if (loc > triggerHeight + 150) {
        hdr.classList.add("scrolling");
      } else {
        hdr.classList.remove("scrolling");
      }
    });
  }; // end ssMoveHeader

  /* Mobile Menu
   * ---------------------------------------------------- */
  const ssMobileMenu = function () {
    const toggleButton = document.querySelector(".s-header__menu-toggle");
    const headerNavWrap = document.querySelector(".s-header__nav-wrap");
    const siteBody = document.querySelector("body");

    if (!(toggleButton && headerNavWrap)) return;

    toggleButton.addEventListener("click", function (event) {
      event.preventDefault();
      toggleButton.classList.toggle("is-clicked");
      siteBody.classList.toggle("menu-is-open");
    });

    headerNavWrap.querySelectorAll(".s-header__nav a").forEach(function (link) {
      link.addEventListener("click", function (evt) {
        // at 800px and below
        if (window.matchMedia("(max-width: 800px)").matches) {
          toggleButton.classList.toggle("is-clicked");
          siteBody.classList.toggle("menu-is-open");
        }
      });
    });

    window.addEventListener("resize", function () {
      // above 800px
      if (window.matchMedia("(min-width: 801px)").matches) {
        if (siteBody.classList.contains("menu-is-open"))
          siteBody.classList.remove("menu-is-open");
        if (toggleButton.classList.contains("is-clicked"))
          toggleButton.classList.remove("is-clicked");
      }
    });
  }; // end ssMobileMenu

  /* Highlight active menu link on pagescroll
   * ------------------------------------------------------ */
  const ssScrollSpy = function () {
    const sections = document.querySelectorAll(".target-section");

    // Add an event listener listening for scroll
    window.addEventListener("scroll", navHighlight);

    function navHighlight() {
      // Get current scroll position uwu
      let scrollY = window.pageYOffset;

      sections.forEach(function (current) {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector(".s-header__nav a[href*=" + sectionId + "]")
            .parentNode.classList.add("current");
        } else {
          document
            .querySelector(".s-header__nav a[href*=" + sectionId + "]")
            .parentNode.classList.remove("current");
        }
      });
    }
  }; // end ScrollSpy

  /* Swiper
   * ------------------------------------------------------ */
  const ssSwiper = function () {
    const mySwiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        // when window width is >= 401px
        401: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when window width is >= 801px
        801: {
          slidesPerView: 2,
          spaceBetween: 48,
        },
      },
    });
  }; // end ssSwiper

  /* Lightbox
   * ------------------------------------------------------ */
  const ssLightbox = function () {
    const folioLinks = document.querySelectorAll(".folio-item a");
    const modals = [];

    folioLinks.forEach(function (link) {
      let modalbox = link.getAttribute("href");
      let instance = basicLightbox.create(document.querySelector(modalbox), {
        onShow: function (instance) {
          //detect Escape key press
          document.addEventListener("keydown", function (evt) {
            evt = evt || window.event;
            if (evt.keyCode === 27) {
              instance.close();
            }
          });
        },
      });
      modals.push(instance);
    });

    folioLinks.forEach(function (link, index) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        modals[index].show();
      });
    });
  }; // end ssLightbox

  /* Alert boxes
   * ------------------------------------------------------ */
  const ssAlertBoxes = function () {
    const boxes = document.querySelectorAll(".alert-box");

    boxes.forEach(function (box) {
      box.addEventListener("click", function (e) {
        if (e.target.matches(".alert-box__close")) {
          e.stopPropagation();
          e.target.parentElement.classList.add("hideit");

          setTimeout(function () {
            box.style.display = "none";
          }, 500);
        }
      });
    });
  }; // end ssAlertBoxes

  /* Smoothscroll
   * ------------------------------------------------------ */
  const ssSmoothScroll = function () {
    const triggers = document.querySelectorAll(".smoothscroll");

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        const target = trigger.getAttribute("href");

        Jump(target, {
          duration: 1200,
        });
      });
    });
  }; // end SmoothScroll

  /* back to top
   * ------------------------------------------------------ */
  const ssBackToTop = function () {
    const pxShow = 900;
    const goTopButton = document.querySelector(".ss-go-top");

    if (!goTopButton) return;

    // Show or hide the button
    if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

    window.addEventListener("scroll", function () {
      if (window.scrollY >= pxShow) {
        if (!goTopButton.classList.contains("link-is-visible"))
          goTopButton.classList.add("link-is-visible");
      } else {
        goTopButton.classList.remove("link-is-visible");
      }
    });
  }; // end ssBackToTop

  /* initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssParallax();
    ssMoveHeader();
    ssMobileMenu();
    ssScrollSpy();
    ssSwiper();
    ssLightbox();
    ssAlertBoxes();
    ssSmoothScroll();
    ssBackToTop();
  })();
})(document.documentElement);

(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  on(
    "click",
    "#navbar .nav-link",
    function (e) {
      let section = select(this.hash);
      if (section) {
        e.preventDefault();

        let navbar = select("#navbar");
        let header = select("#header");
        let sections = select("section", true);
        let navlinks = select("#navbar .nav-link", true);

        navlinks.forEach((item) => {
          item.classList.remove("active");
        });

        this.classList.add("active");

        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }

        if (this.hash == "#header") {
          header.classList.remove("header-top");
          sections.forEach((item) => {
            item.classList.remove("section-show");
          });
          return;
        }

        if (!header.classList.contains("header-top")) {
          header.classList.add("header-top");
          setTimeout(function () {
            sections.forEach((item) => {
              item.classList.remove("section-show");
            });
            section.classList.add("section-show");
          }, 350);
        } else {
          sections.forEach((item) => {
            item.classList.remove("section-show");
          });
          section.classList.add("section-show");
        }

        scrollto(this.hash);
      }
    },
    true
  );

  window.addEventListener("load", () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash);

      if (initial_nav) {
        let header = select("#header");
        let navlinks = select("#navbar .nav-link", true);

        header.classList.add("header-top");

        navlinks.forEach((item) => {
          if (item.getAttribute("href") == window.location.hash) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });

        setTimeout(function () {
          initial_nav.classList.add("section-show");
        }, 350);

        scrollto(window.location.hash);
      }
    }
  });

  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }
})();

// TextScramble

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases = [
  "I am J1gs4w",
  "I am a Student",
  "I am a CTF Player",
  "A Cybersec Enthusiast",
  "I am a Programmer",
  "I am a 3D Artist",
  "I am a Gamer",
];

const el = document.querySelector(".anim-text");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800);
  });
  counter = (counter + 1) % phrases.length;
};

next();
