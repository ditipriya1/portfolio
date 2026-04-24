// =============================================
//  DITIPRIYA CHAKRABORTY — PORTFOLIO SCRIPTS
//  Beginner-friendly, heavily commented.
//  All features use vanilla JavaScript only.
// =============================================


// ---- 1. NAVBAR: Add shadow when user scrolls down ----
// We listen for the "scroll" event on the window.
// When the page is scrolled more than 30px, we add a CSS class
// called "scrolled" to the navbar, which adds a shadow via CSS.

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 30) {
    // User has scrolled — add the class
    navbar.classList.add('scrolled');
  } else {
    // Back at the top — remove the class
    navbar.classList.remove('scrolled');
  }
});


// ---- 2. HAMBURGER MENU: Toggle mobile navigation ----
// On small screens, the nav links are hidden.
// When the hamburger button is clicked, we toggle a CSS class
// called "open" on both the button and the mobile menu.

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function () {
  // .classList.toggle() adds the class if it's missing, removes it if it's there
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Also close the mobile menu whenever any mobile link is clicked
// (so the menu doesn't stay open after navigation)
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


// ---- 3. SKILL BAR ANIMATION ----
// The skill bars start at width: 0% in CSS.
// We use the IntersectionObserver API to detect when the
// skills section scrolls into view, then animate each bar
// to its target width (set in the HTML via data-width attribute).

// Get all the skill fill elements
const skillFills = document.querySelectorAll('.skill-fill');

// IntersectionObserver watches for elements entering the viewport
const skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    // entry.isIntersecting = true means the element is now visible
    if (entry.isIntersecting) {
      const fill = entry.target;

      // Read the target width from the HTML attribute data-width
      // e.g., <div class="skill-fill" data-width="80%"></div>
      const targetWidth = fill.getAttribute('data-width');

      // Apply the width — CSS transition handles the animation
      fill.style.width = targetWidth;

      // Stop observing this element (animation should only run once)
      skillObserver.unobserve(fill);
    }
  });
}, {
  threshold: 0.3   // trigger when 30% of the element is visible
});

// Tell the observer to watch each skill bar
skillFills.forEach(function (fill) {
  skillObserver.observe(fill);
});


// ---- 4. FADE-IN ANIMATION FOR SECTIONS ----
// As the user scrolls, each section gently fades in and slides up.
// We do this by: watching elements with the class "section",
// and adding a class "visible" when they enter the viewport.
// The CSS does the actual animation.

// First, add the starting (hidden) styles via JavaScript
// so the page still works even if JS is slow to load.
const sections = document.querySelectorAll('.section');

sections.forEach(function (section) {
  // Start sections invisible and slightly shifted down
  section.style.opacity = '0';
  section.style.transform = 'translateY(24px)';
  section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

// Observer for section fade-in
const sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const sec = entry.target;

      // Make the section visible
      sec.style.opacity = '1';
      sec.style.transform = 'translateY(0)';

      // Stop observing (only animate once)
      sectionObserver.unobserve(sec);
    }
  });
}, {
  threshold: 0.1   // trigger when just 10% is visible (earlier feel)
});

sections.forEach(function (section) {
  sectionObserver.observe(section);
});


// ---- 5. SMOOTH ACTIVE LINK HIGHLIGHT (optional enhancement) ----
// As the user scrolls, the active nav link gets highlighted.
// This gives visual feedback about which section they're in.

const allSections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

// Listen to scroll events
window.addEventListener('scroll', function () {
  let currentSection = '';

  // Check which section is currently visible
  allSections.forEach(function (section) {
    const sectionTop = section.offsetTop - 100;  // 100px offset for navbar height
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');  // get the section's id, e.g. "about"
    }
  });

  // Update the nav links — add "active" style to the matching link
  navLinksList.forEach(function (link) {
    link.style.color = '';  // reset color first

    // Check if this link points to the current section
    if (link.getAttribute('href') === '#' + currentSection) {
      link.style.color = 'var(--accent)';   // highlight it with accent color
    }
  });
});


// ---- 6. PROJECT CARD TILT EFFECT (subtle mouse interaction) ----
// When the mouse moves over a project card, the card slightly
// tilts to follow the cursor. This adds a premium feel.

const projectCards = document.querySelectorAll('.project-card, .skill-card');

projectCards.forEach(function (card) {
  card.addEventListener('mousemove', function (e) {
    // getBoundingClientRect returns the size and position of the element
    const rect = card.getBoundingClientRect();

    // Calculate how far the mouse is from the center of the card
    const x = e.clientX - rect.left;   // mouse X relative to card
    const y = e.clientY - rect.top;    // mouse Y relative to card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation: small angle, proportional to distance from center
    const rotateX = ((y - centerY) / centerY) * -4;  // up to 4 degrees
    const rotateY = ((x - centerX) / centerX) * 4;

    // Apply the 3D tilt transform
    card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.05s ease';
  });

  // Reset when mouse leaves the card
  card.addEventListener('mouseleave', function () {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease, box-shadow 0.25s ease';
  });
});
