// Mobile menu
const navToggle = document.getElementById("nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");

navToggle.addEventListener("click", () => {
  const open = mobileMenu.hidden;
  mobileMenu.hidden = !open;
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.hidden = true;
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Navbar scroll state
const siteNav = document.getElementById("site-nav");
window.addEventListener("scroll", () => {
  siteNav.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Footer clock (Asia/Kolkata)
const clockEl = document.getElementById("footer-clock");
function tickClock() {
  clockEl.textContent = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}
tickClock();
setInterval(tickClock, 30000);

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Toasts
const toastRoot = document.getElementById("toast-root");
function toast(message, type = "success") {
  const el = document.createElement("div");
  el.className = `toast${type === "error" ? " toast-error" : ""}`;
  el.textContent = message;
  toastRoot.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

// Contact form -> mailto
const EMAIL = "anilkumarmaladkar@gmail.com";
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();
  if (!name || !email || !message) {
    toast("Please fill in every field.", "error");
    return;
  }
  const subject = encodeURIComponent(`Portfolio hello from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  toast("Opening your email app…");
});

// Back to top
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


const marquee = document.querySelector(".marquee");
const track = marquee?.querySelector(".marquee-track");

if (marquee && track) {
  let position = 0;
  let lastTime = 0;
  let dragging = false;
  let lastPointerX = 0;

  const speed = 45; // Automatic scroll speed in pixels per second

  function getLoopWidth() {
    return track.scrollWidth / 2;
  }

  function normalizePosition() {
    const loopWidth = getLoopWidth();
    if (loopWidth > 0) {
      position = ((position % loopWidth) + loopWidth) % loopWidth;
    }
  }

  function render() {
    track.style.transform = `translate3d(${-position}px, 0, 0)`;
  }

  function animate(time) {
    if (!lastTime) lastTime = time;

    const delta = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;

    if (!dragging && !marquee.matches(":hover")) {
      position += speed * delta;
      normalizePosition();
      render();
    }

    requestAnimationFrame(animate);
  }

  track.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragging = true;
    lastPointerX = event.clientX;

    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener("pointermove", (event) => {
    if (!dragging) return;

    const delta = event.clientX - lastPointerX;
    lastPointerX = event.clientX;

    position -= delta;

    normalizePosition();
    render();
  });

  function stopDragging() {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("is-dragging");
  }

 
  track.addEventListener("pointerup", stopDragging);
  track.addEventListener("pointercancel", stopDragging);
  track.addEventListener("lostpointercapture", stopDragging);

  // Allow horizontal scrolling with a mouse wheel or trackpad
  marquee.addEventListener("wheel", (event) => {
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    event.preventDefault();

    position += delta;
    normalizePosition();
    render();
  }, { passive: false });

  requestAnimationFrame(animate);
}




