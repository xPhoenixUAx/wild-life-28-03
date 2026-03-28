const header = document.querySelector("[data-site-header]");
const menu = document.querySelector("[data-mobile-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const menuLinks = document.querySelectorAll(".mobile-nav a");
const mobileNavGroups = document.querySelectorAll(".mobile-nav-group");
const yearTarget = document.querySelector("[data-year]");
const cookieConsentKey = "wcc-cookie-consent";

const getCookieConsent = () => {
  try {
    return window.localStorage.getItem(cookieConsentKey);
  } catch (error) {
    return null;
  }
};

const setCookieConsent = (value) => {
  try {
    window.localStorage.setItem(cookieConsentKey, value);
  } catch (error) {
    // Ignore storage failures and still dismiss the banner for the session view.
  }
};

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

const createCookieBanner = () => {
  if (getCookieConsent()) {
    return;
  }

  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.setAttribute("aria-label", "Cookie notice");
  banner.innerHTML = `
    <div>
      <p class="cookie-banner__title">Cookie Notice</p>
      <p class="cookie-banner__copy">This site uses essential cookies and may use analytics cookies to understand traffic and improve page performance. By continuing, you can accept analytics cookies or keep essential cookies only.</p>
    </div>
    <div class="cookie-banner__actions">
      <button class="button" type="button" data-cookie-consent="accept">Accept Cookies</button>
      <button class="button button-secondary" type="button" data-cookie-consent="essential">Only Essential</button>
      <a class="text-link cookie-banner__link" href="cookie-policy.html">Cookie Policy</a>
    </div>
  `;

  document.body.appendChild(banner);

  banner.addEventListener("click", (event) => {
    const action = event.target.closest("[data-cookie-consent]");

    if (!action) {
      return;
    }

    setCookieConsent(action.getAttribute("data-cookie-consent"));
    banner.remove();
  });
};

createCookieBanner();

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
