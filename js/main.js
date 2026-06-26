window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("out");
  }, 2000);
});

const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    document
      .getElementById("back-top")
      .classList.toggle("show", window.scrollY > 500);
    highlightNav();
  },
  { passive: true },
);

const ham = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");

ham.addEventListener("click", () => {
  ham.classList.toggle("open");
  mobileNav.classList.toggle("open");
});

mobileNav.querySelectorAll(".mobile-link").forEach((l) => {
  l.addEventListener("click", () => {
    ham.classList.remove("open");
    mobileNav.classList.remove("open");
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function highlightNav() {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach((l) => {
    const href = l.getAttribute("href").replace("#", "");
    l.classList.toggle("active", href === current);
  });
}

const revealEls = document.querySelectorAll(".reveal, .reveal-l, .reveal-r");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const siblings = [
          ...e.target.parentElement.querySelectorAll(
            ".reveal, .reveal-l, .reveal-r",
          ),
        ];
        const idx = siblings.indexOf(e.target);
        setTimeout(() => e.target.classList.add("visible"), idx * 60);
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
);

revealEls.forEach((el) => revealObs.observe(el));

const skillSection = document.getElementById("skills");
const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        document.querySelectorAll(".skill-bar-fill").forEach((bar) => {
          bar.style.width = bar.dataset.w + "%";
        });
        skillObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.25 },
);
skillObs.observe(skillSection);

document.querySelectorAll(".filter-pill").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-pill")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    const f = this.dataset.f;
    document.querySelectorAll(".project-card").forEach((card) => {
      const show = f === "all" || card.dataset.cat === f;
      card.style.display = show ? "" : "none";
    });
  });
});

function openCertModal(title, provider, year, imagePath) {
  document.getElementById("m-icon").innerHTML = `<img src="${imagePath}" alt="${title}" style="max-width: 100%; border-radius: 8px;">`;
  document.getElementById("m-title").textContent = title;
  document.getElementById("m-sub").textContent = provider;
  document.getElementById("m-year").textContent = year;
  document.getElementById("cert-modal").classList.add("open");
}

function closeCertModal() {
  document.getElementById("cert-modal").classList.remove("open");
}

document.getElementById("cert-modal").addEventListener("click", function (e) {
  if (e.target === this) closeCertModal();
});

function handleSubmit() {
  const btn = document.getElementById("form-submit");
  btn.textContent = "✓ Pesan terkirim!";
  btn.style.background = "#1a7a3a";
  setTimeout(() => {
    btn.textContent = "Kirim Pesan →";
    btn.style.background = "";
  }, 3000);
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});