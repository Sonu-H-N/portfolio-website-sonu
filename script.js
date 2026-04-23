const toggleBtn = document.getElementById("theme-toggle");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const observerTargets = document.querySelectorAll(".reveal, .project-card");
const menuToggle = document.getElementById("menu-toggle");
const navLinksMenu = document.getElementById("nav-links");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  toggleBtn.textContent = "🌞";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  toggleBtn.textContent = isLight ? "🌞" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinksMenu.classList.toggle("show-menu");
  menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinksMenu.classList.remove("show-menu");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("nav-scrolled", window.scrollY > 50);

  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.15 }
);

observerTargets.forEach(el => observer.observe(el));