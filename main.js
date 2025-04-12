const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
styleSwitcherToggle.addEventListener('click', () => {
    document.querySelector('.style-switcher').classList.toggle('open');
});

window.addEventListener('scroll', () => {
    if (document.querySelector('.style-switcher').classList.contains('open')) {
        document.querySelector('.style-switcher').classList.remove('open');
    }
});

const alternateStyles = document.querySelectorAll('.alternate-style');
function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute('title')) {
            style.removeAttribute('disabled');
        } else {
            style.setAttribute('disabled', 'true');
        }
    });
}

/* Dark/Light Mode */
const dayNight = document.querySelector('.day-night');
dayNight.addEventListener('click', () => {
    dayNight.querySelector('i').classList.toggle('fa-sun');
    dayNight.querySelector('i').classList.toggle('fa-moon');
    document.body.classList.toggle('dark');
});

window.addEventListener('load', () => {
    if (document.body.classList.contains('dark')) {
        dayNight.querySelector('i').classList.add('fa-sun');
    } else {
        dayNight.querySelector('i').classList.add('fa-moon');
    }
});

/* Typing Animation */
var typed = new Typed('.typing', {
    strings: ["", "Web Designer", "Web Developer", "Graphic Designer", "Creative Mind"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

/* Changing Aside Active Link */
const nav = document.querySelector('.nav');
const navList = nav.querySelectorAll('li');
const totalNavList = navList.length;
const allSection = document.querySelectorAll('.section');
const totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector('a').classList.contains('active')) {
                addBackSection(j);
            }
            navList[j].querySelector('a').classList.remove('active');
        }
        this.classList.add('active');
        showSection(this);

        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function addBackSection(num) {
    allSection[num].classList.add('back-section');
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('back-section');
    }
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('active');
    }

    const target = element.getAttribute("href").split("#")[1];
    document.querySelector('#' + target).classList.add('active');
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector('a').classList.remove('active');
        const target = element.getAttribute('href').split('#')[1];
        if (target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) {
            navList[i].querySelector('a').classList.add('active');
        }
    }
}

document.querySelector('.hire-me').addEventListener('click', function () {
    const sectionIndex = this.getAttribute('data-section-index');
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
});

/* Activating Mobile Menu */
const navTogglerBtn = document.querySelector('.nav-toggler');
const aside = document.querySelector('.aside');

navTogglerBtn.addEventListener('click', () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    aside.classList.toggle('open');
    navTogglerBtn.classList.toggle('open');
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle('open');
    }
}

/* Text Animation on Scroll */
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title h2, .home-info h3, .home-info p, .service-item-inner h4, .service-item-inner p, .portfolio-item-inner .portfolio-text h4, .portfolio-item-inner .portfolio-text p');
    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.style.animationPlayState = 'running';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

/* 3D Tilt Effect for Service and Portfolio Cards */
const serviceCards = document.querySelectorAll('.service-item-inner');
const portfolioCards = document.querySelectorAll('.portfolio-item-inner');

const addTiltEffect = (cards) => {
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = y / 15;
            const rotateY = -x / 15;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
            card.classList.add('tilt');
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
            card.classList.remove('tilt');
        });

        card.addEventListener('mouseenter', () => {
            const h4 = card.querySelector('h4');
            const p = card.querySelector('p');
            if (h4 && p) {
                h4.style.animation = 'none';
                p.style.animation = 'none';
                setTimeout(() => {
                    h4.style.animation = '';
                    p.style.animation = '';
                }, 10);
            }
        });
    });
};

addTiltEffect(serviceCards);
addTiltEffect(portfolioCards);

/* Progress Bar Animation */
const progressBars = document.querySelectorAll('.progress-in');
window.addEventListener('scroll', () => {
    progressBars.forEach((bar) => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            bar.style.width = bar.getAttribute('style').match(/\d+/)[0] + '%';
        }
    });
});