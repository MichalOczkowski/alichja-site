document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a[href^='#']");

  function activateNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const offsetTop = section.offsetTop - 100;
      const offsetHeight = section.offsetHeight;

      if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
        navLinks.forEach(link => link.classList.remove("active"));
        const currentLink = document.querySelector(`.main-nav a[href="#${section.id}"]`);
        if (currentLink) currentLink.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", activateNav);
  activateNav();

  // FADE-IN
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));

  // Walidacja formularza
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        e.preventDefault();
        alert("Wypełnij wszystkie pola formularza.");
      }
    });
  }
});

const basePath = window.location.pathname.includes('/faq/') ||
                 window.location.pathname.includes('/blog/') ||
                 window.location.pathname.includes('/historia/') ? '../' : '';

const backgrounds = [
  `${basePath}images/back/1.jpg`,
  `${basePath}images/back/2.jpg`,
  `${basePath}images/back/3.jpg`,
  `${basePath}images/back/4.jpg`,
  `${basePath}images/back/5.jpg`,
  `${basePath}images/back/6.jpg`,
  `${basePath}images/back/7.jpg`,
  `${basePath}images/back/8.jpg`,
  `${basePath}images/back/9.jpg`,
  `${basePath}images/back/10.jpg`,
];

let current = 0;
let showingBg1 = true;

function preloadImages(paths) {
  paths.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

function swapBackground() {
  if (!document.getElementById('bg1') || !document.getElementById('bg2')) return;

  let next;
  do {
    next = Math.floor(Math.random() * backgrounds.length);
  } while (next === current);
  current = next;

  const nextBg = backgrounds[current];
  const bg1 = document.getElementById('bg1');
  const bg2 = document.getElementById('bg2');

  if (showingBg1) {
    bg2.style.backgroundImage = `url('${nextBg}')`;
    bg2.style.opacity = "1";
    bg1.style.opacity = "0";
  } else {
    bg1.style.backgroundImage = `url('${nextBg}')`;
    bg1.style.opacity = "1";
    bg2.style.opacity = "0";
  }

  showingBg1 = !showingBg1;
}

preloadImages(backgrounds);

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById('bg1')) {
    document.getElementById('bg1').style.backgroundImage = `url('${backgrounds[0]}')`;
    document.getElementById('bg1').style.opacity = "1";
    setInterval(swapBackground, 20000);
  }
});
