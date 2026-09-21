/* =========================================================
MARCO.DEV — MAIN JAVASCRIPT
Web Designer & Front-End Developer
========================================================= */

/* =========================================================
01. DOM ELEMENT REFERENCES
========================================================= */
const hamburger = document.querySelector('.menu');
const navLinks = document.querySelector('.navlinks');
const year = document.getElementById('year');


/* =========================================================
02. MOBILE NAVIGATION
Uses the existing HTML/CSS classes:
.menu, .navlinks and .open
========================================================= */
if (hamburger && navLinks) {

    const closeMobileNav = () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');

        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation');
    };

    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation');

    hamburger.addEventListener('click', () => {

        const isOpen = navLinks.classList.toggle('open');

        hamburger.classList.toggle('active', isOpen);

        hamburger.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        hamburger.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation' : 'Open navigation'
        );
    });

    navLinks.querySelectorAll('a').forEach((link) => {

        link.addEventListener('click', closeMobileNav);

    });

    window.addEventListener('resize', () => {

        if (window.innerWidth > 720) {
            closeMobileNav();
        }

    });
}


/* =========================================================
03. PROJECT FILTERING
Main filters:
All / Dev Projects / WordPress / Shopify

Dev subfilters appear only while Dev Projects is active.
========================================================= */
const mainFilters = document.querySelectorAll('.filter');
const devSubfilters = document.querySelector('.subfilters');
const devSubfilterButtons = document.querySelectorAll('.subfilter');
const projectCards = document.querySelectorAll('.project');
const projectCount = document.getElementById('projectCount');

let activeMainFilter = 'all';
let activeDevSubfilter = 'all';


function renderProjects() {

    let visibleCount = 0;

    projectCards.forEach((project) => {

        const category = project.dataset.cat;
        const subcategory = project.dataset.sub;

        let visible = false;


        if (activeMainFilter === 'all') {

            visible = true;

        } else if (activeMainFilter === 'dev') {

            visible =
                category === 'dev' &&
                (
                    activeDevSubfilter === 'all' ||
                    subcategory === activeDevSubfilter
                );

        } else {

            visible = category === activeMainFilter;

        }


        project.hidden = !visible;


        if (visible) {
            visibleCount += 1;
        }

    });


    if (projectCount) {

        projectCount.textContent =
            `${visibleCount} project${visibleCount === 1 ? '' : 's'}`;

    }
}


mainFilters.forEach((button) => {

    button.addEventListener('click', () => {

        activeMainFilter = button.dataset.filter;


        mainFilters.forEach((item) => {

            item.classList.toggle(
                'active',
                item === button
            );

        });


        if (devSubfilters) {

            devSubfilters.hidden =
                activeMainFilter !== 'dev';

        }


        if (activeMainFilter === 'dev') {

            activeDevSubfilter = 'all';


            devSubfilterButtons.forEach((item) => {

                item.classList.toggle(
                    'active',
                    item.dataset.sub === 'all'
                );

            });

        }


        renderProjects();

    });

});


devSubfilterButtons.forEach((button) => {

    button.addEventListener('click', () => {

        activeDevSubfilter = button.dataset.sub;

        activeMainFilter = 'dev';


        devSubfilterButtons.forEach((item) => {

            item.classList.toggle(
                'active',
                item === button
            );

        });


        mainFilters.forEach((item) => {

            item.classList.toggle(
                'active',
                item.dataset.filter === 'dev'
            );

        });


        if (devSubfilters) {
            devSubfilters.hidden = false;
        }


        renderProjects();

    });

});


renderProjects();


/* =========================================================
04. SCROLL REVEAL
The current portfolio does not require reveal classes,
but this keeps the script safe if .reveal elements
are added later.
========================================================= */
const revealItems = document.querySelectorAll('.reveal');


if (revealItems.length) {

    if ('IntersectionObserver' in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('visible');

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12
            }
        );


        revealItems.forEach((item) => {

            revealObserver.observe(item);

        });

    } else {

        revealItems.forEach((item) => {

            item.classList.add('visible');

        });

    }

}


/* =========================================================
05. SMOOTH INTERNAL NAVIGATION

The existing CSS scroll-padding-top handles
the sticky header.
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener('click', (event) => {

        const targetId = link.getAttribute('href');


        if (!targetId || targetId === '#') {
            return;
        }


        const target = document.querySelector(targetId);


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    });

});


/* =========================================================
06. ACTIVE NAVIGATION SECTION

Uses the actual .navlinks class from the HTML.
========================================================= */
const sections = document.querySelectorAll('section[id]');
const sectionLinks =
    document.querySelectorAll('.navlinks a[href^="#"]');


if (
    'IntersectionObserver' in window &&
    sections.length &&
    sectionLinks.length
) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                sectionLinks.forEach((link) => {

                    const isActive =
                        link.getAttribute('href') ===
                        `#${entry.target.id}`;


                    link.classList.toggle(
                        'active',
                        isActive
                    );


                    if (isActive) {

                        link.setAttribute(
                            'aria-current',
                            'page'
                        );

                    } else {

                        link.removeAttribute(
                            'aria-current'
                        );

                    }

                });

            });

        },
        {
            rootMargin: '-35% 0px -55% 0px'
        }
    );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });

}


/* =========================================================
07. CURRENT YEAR
Keeps the footer year automatically up to date.
========================================================= */
if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
08. REDUCED MOTION SUPPORT
========================================================= */
if (
    window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches
) {

    document.documentElement.classList.add(
        'reduce-motion'
    );

}