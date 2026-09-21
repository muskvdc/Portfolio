/* =========================================================
MARCO.DEV — MAIN JAVASCRIPT
Web Designer & Front-End Developer
========================================================= */

/* =========================================================
01. DOM ELEMENT REFERENCES
========================================================= */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

/* =========================================================
02. MOBILE NAVIGATION
========================================================= */
if (hamburger && navLinks) {
    hamburger.setAttribute('aria-expanded', 'false');

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('show');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});
}

/* =========================================================
03. PROJECT FILTERING
========================================================= */
/* =========================================================
03. PROJECT FILTERING
Main filters: All / Dev Projects / WordPress / Shopify.
Dev subfilters appear ONLY while Dev Projects is active.
========================================================= */

const mainFilters = document.querySelectorAll(".filter");
const devSubfilters = document.querySelector(".subfilters");
const devSubfilterButtons = document.querySelectorAll(".subfilter");
const projectCards = document.querySelectorAll(".project");

let activeMainFilter = "all";
let activeDevSubfilter = "all";

function renderProjects() {
    projectCards.forEach((project) => {
        const category = project.dataset.cat;
        const subcategory = project.dataset.sub;

        let visible = false;

        if (activeMainFilter === "all") {
            visible = true;
        } else if (activeMainFilter === "dev") {
        visible =
        category === "dev" &&
        (activeDevSubfilter === "all" ||
        subcategory === activeDevSubfilter);
    } else {
    visible = category === activeMainFilter;
}

project.hidden = !visible;
});

const count = document.getElementById("projectCount");
if (count) {
    const visibleCount = [...projectCards].filter((project) => !project.hidden).length;
    count.textContent = `${visibleCount} project${visibleCount === 1 ? "" : "s"}`;
}
}

mainFilters.forEach((button) => {
    button.addEventListener("click", () => {
        activeMainFilter = button.dataset.filter;

        mainFilters.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        if (devSubfilters) {
            devSubfilters.hidden = activeMainFilter !== "dev";
        }

    if (activeMainFilter === "dev") {
        activeDevSubfilter = "all";
        devSubfilterButtons.forEach((item) => item.classList.remove("active"));
        const allDev = document.querySelector('.subfilter[data-sub="all"]');
        if (allDev) allDev.classList.add("active");
    }

renderProjects();
});
});

devSubfilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeDevSubfilter = button.dataset.sub;

        devSubfilterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        // Keep the Dev Projects main filter active.
        activeMainFilter = "dev";
        mainFilters.forEach((item) => {
            item.classList.toggle("active", item.dataset.filter === "dev");
        });

    renderProjects();
});
});

renderProjects();

/* =========================================================
04. SCROLL REVEAL
========================================================= */
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));
} else {
revealItems.forEach((item) => item.classList.add('visible'));
}

/* =========================================================
05. SMOOTH INTERNAL NAVIGATION
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* =========================================================
06. ACTIVE NAVIGATION SECTION
========================================================= */
const sections = document.querySelectorAll('section[id]');
const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if ('IntersectionObserver' in window && sections.length && sectionLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            sectionLinks.forEach((link) => {
                link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${entry.target.id}`
                );
            });
    });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));
}

/* =========================================================
07. REDUCED MOTION SUPPORT
========================================================= */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduce-motion');
}
