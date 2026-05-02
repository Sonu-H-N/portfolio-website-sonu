/* ============================================================
   SONU H N — PORTFOLIO v2.0 — script.js
   Features: Preloader, Custom Cursor, Theme Toggle (persisted),
   Navbar scroll + active links, Hamburger Menu, Typing Effect,
   Scroll Reveal, Skill Bar Animations, Tabs, Contact Form
   Validation, Scroll-to-Top
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ===== PRELOADER ===== */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("hidden"), 600);
  });

  /* ===== THEME TOGGLE (persisted) ===== */
  const themeBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  const applySavedTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.body.classList.add("light-mode");
      themeIcon.className = "fas fa-sun";
    } else {
      document.body.classList.remove("light-mode");
      themeIcon.className = "fas fa-moon";
    }
  };
  applySavedTheme();

  themeBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");
    themeIcon.className = isLight ? "fas fa-sun" : "fas fa-moon";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  /* ===== CUSTOM CURSOR ===== */
  const cursorDot  = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");

  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursorDot.style.left  = e.clientX + "px";
      cursorDot.style.top   = e.clientY + "px";
      cursorRing.style.left = e.clientX + "px";
      cursorRing.style.top  = e.clientY + "px";
    });

    document.querySelectorAll("a, button, .project-card, .skill-item, .about-card, .contact-item").forEach(el => {
      el.addEventListener("mouseenter", () => cursorRing.classList.add("hovering"));
      el.addEventListener("mouseleave", () => cursorRing.classList.remove("hovering"));
    });
  }

  /* ===== NAVBAR: scroll state + active link ===== */
  const navbar   = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const onScroll = () => {
    // scrolled class
    navbar.classList.toggle("scrolled", window.scrollY > 30);

    // active link
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute("id");
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });

    // scroll-to-top button
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ===== HAMBURGER MENU ===== */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinksEl = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinksEl.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close on link click
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinksEl.classList.remove("open");
      menuToggle.classList.remove("open");
    });
  });

  /* ===== TYPING EFFECT (loop) ===== */
  const typingEl  = document.getElementById("typing");
  const words     = ["Sonu H N", "a Developer", "a Creator", "a Problem Solver"];
  let  wordIndex  = 0;
  let  charIndex  = 0;
  let  deleting   = false;
  let  typeDelay  = 120;

  const type = () => {
    const current = words[wordIndex];
    if (!deleting) {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        typeDelay = 1600;
      } else {
        typeDelay = 120;
      }
    } else {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeDelay = 300;
      } else {
        typeDelay = 60;
      }
    }
    setTimeout(type, typeDelay);
  };
  type();

  /* ===== SCROLL REVEAL ===== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  /* ===== SKILL BAR ANIMATION ===== */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-fill").forEach(fill => {
          fill.style.width = fill.dataset.width + "%";
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById("skills");
  if (skillsSection) skillObserver.observe(skillsSection);

  /* ===== SKILLS TABS ===== */
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      const tab = document.getElementById("tab-" + btn.dataset.tab);
      if (tab) {
        tab.classList.add("active");
        // Re-trigger skill fill for newly visible tab
        tab.querySelectorAll(".skill-fill").forEach(fill => {
          fill.style.width = "0";
          setTimeout(() => { fill.style.width = fill.dataset.width + "%"; }, 50);
        });
      }
    });
  });

  /* ===== SCROLL TO TOP ===== */
  const scrollTopBtn = document.getElementById("scroll-top");
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ===== CONTACT FORM VALIDATION ===== */
  const form       = document.getElementById("contact-form");
  const nameInput  = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const msgInput   = document.getElementById("message");
  const formSuccess = document.getElementById("formSuccess");

  const setError = (input, errId, msg) => {
    document.getElementById(errId).textContent = msg;
    input.classList.toggle("invalid", !!msg);
  };

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    if (nameInput.value.trim().length < 2) {
      setError(nameInput, "nameErr", "Please enter your name (at least 2 chars).");
      valid = false;
    } else {
      setError(nameInput, "nameErr", "");
    }

    if (!validateEmail(emailInput.value.trim())) {
      setError(emailInput, "emailErr", "Please enter a valid email address.");
      valid = false;
    } else {
      setError(emailInput, "emailErr", "");
    }

    if (msgInput.value.trim().length < 10) {
      setError(msgInput, "msgErr", "Message must be at least 10 characters.");
      valid = false;
    } else {
      setError(msgInput, "msgErr", "");
    }

    if (valid) {
      // Simulate send (replace with EmailJS / Formspree for production)
      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        formSuccess.classList.add("show");
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
        setTimeout(() => formSuccess.classList.remove("show"), 5000);
      }, 1200);
    }
  });

  // Live validation clear on input
  [nameInput, emailInput, msgInput].forEach(input => {
    input.addEventListener("input", () => {
      input.classList.remove("invalid");
    });
  });

  /* ===== SMOOTH ANCHOR SCROLL (fallback for older browsers) ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

});
