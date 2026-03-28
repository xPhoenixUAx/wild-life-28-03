const header = document.querySelector("[data-site-header]");
const menu = document.querySelector("[data-mobile-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const menuLinks = document.querySelectorAll(".mobile-nav a");
const mobileNavGroups = document.querySelectorAll(".mobile-nav-group");
const yearTarget = document.querySelector("[data-year]");

const closeMobileGroups = () => {
  mobileNavGroups.forEach((group) => {
    group.removeAttribute("open");
  });
};

const setMenuState = (isOpen) => {
  if (!menu || !menuToggle) {
    return;
  }

  if (!isOpen) {
    closeMobileGroups();
  }

  menu.classList.toggle("is-open", isOpen);
  menu.setAttribute("aria-hidden", String(!isOpen));
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
};

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });
}

if (menuClose) {
  menuClose.addEventListener("click", () => {
    setMenuState(false);
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

window.addEventListener("pageshow", () => {
  setMenuState(false);
  closeMobileGroups();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

if (menu) {
  menu.addEventListener("click", (event) => {
    if (event.target === menu) {
      setMenuState(false);
    }
  });
}

const handleScroll = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

handleScroll();
window.addEventListener("scroll", handleScroll, { passive: true });

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (window.lucide) {
  window.lucide.createIcons();
}

if (window.AOS) {
  window.AOS.init({
    duration: 700,
    easing: "ease-out-cubic",
    once: true,
    offset: 24,
    mirror: false
  });
}
