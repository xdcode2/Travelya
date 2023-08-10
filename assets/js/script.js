import Destination from "./destination.js";
import DestinationText from "./destiText.js";
import DestinationBg from "./destiBg.js";
import Blog from "./blog.js";
import Testimonial from "./testimonial.js";

const navBar = document.querySelector(".header"),
    menuBtn = document.querySelector(".header__menu-icon"),
    closeMenuBtn = document.querySelector(".close-icon"),
    sections = document.querySelectorAll("section[id]"),
    destiSliderWrapper = document.querySelector(".destinations__slider-wrapper"),
    destinationsText = document.querySelector(".destinations__text"),
    destinationsBg = document.querySelector(".destinations__bg"),
    blogContent = document.querySelector(".blogs__content"),
    testiSliderWrapper = document.querySelector(".testimonials__wrapper"),
    scrollUpBtn = document.querySelector(".scroll-up");

const DESTINATIOS_API = "../assets/apis/destinations.json";
const BLOG_API = "../assets/apis/blogs.json";
const TESTIMONIALS_API = "../assets/apis/testimonials.json";

// initialize Scroll Reveal
const sr = ScrollReveal({ origin: "top", distance: "100px", duration: 2000, delay: 200 });

/* ============== Header ============== */

menuBtn.addEventListener("click", () => document.body.classList.add("menu-toggled"));

closeMenuBtn.addEventListener("click", () => document.body.classList.remove("menu-toggled"));

function changeHeaderBg() {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        navBar.style.backgroundColor = "var(--blue-60-opcty-70)";
        navBar.style.backdropFilter = "blur(20px)";
    } else {
        navBar.style.backgroundColor = "transparent";
        navBar.style.backdropFilter = "blur(0px)";
    }
}

/* ============== Home Section ============== */

const thumbnailsSwiper = new Swiper(".home__thumbnails", {
    slidesPerView: 3.5,
    spaceBetween: 20,
    loop: true,
    effect: "carousel",
    allowTouchMove: false,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: { slidesPerView: 1.5 },
        800: { slidesPerView: 1.8 },
        940: { slidesPerView: 2.2 },
        1000: { slidesPerView: 2.4 },
        1100: { slidesPerView: 2.5 },
        1200: { slidesPerView: 2.8 },
        1300: { slidesPerView: 3.1 },
        1380: { slidesPerView: 3.5 },
    },
});

thumbnailsSwiper.on("slideChange", () => {
    let realIndex = thumbnailsSwiper.realIndex,
        prevRealIndex = thumbnailsSwiper.previousRealIndex;
    document.querySelectorAll(".home__slide")[prevRealIndex].classList.remove("active");
    document.querySelectorAll(".home__slide")[realIndex].classList.add("active");
});

/* ============== About Section ============== */
/* ScrollReveal JS */
sr.reveal(".about__text", { origin: "left" });
sr.reveal(".about__image", { origin: "right" });
/* ============== Destinations Section ============== */

async function renderDestinations() {
    const respone = await fetch(DESTINATIOS_API);
    const data = await respone.json();
    data.map((desti) => {
        destiSliderWrapper.innerHTML += Destination(desti);
        destinationsText.innerHTML += DestinationText(desti);
        destinationsBg.innerHTML += DestinationBg(desti);
    });
    const destiSwiper = new Swiper(".destinations__slider", {
        effect: "cards",
        grabCursor: true,
        centeredSlides: true,
    });
    document.querySelectorAll(".destination-text")[0].classList.add("active");
    document.querySelectorAll(".destination-bg")[0].classList.add("active");
    destiSwiper.on("slideChange", () => {
        let realIndex = destiSwiper.realIndex,
            prevRealIndex = destiSwiper.previousRealIndex;
        document.querySelectorAll(".destination-text")[prevRealIndex].classList.remove("active");
        document.querySelectorAll(".destination-bg")[prevRealIndex].classList.remove("active");
        document.querySelectorAll(".destination-text")[realIndex].classList.add("active");
        document.querySelectorAll(".destination-bg")[realIndex].classList.add("active");
    });
    sr.reveal(".destinations__slider");
    sr.reveal(".destinations__text");
}

/* ============== Blog Section ============== */
async function renderBlogs() {
    const respone = await fetch(BLOG_API);
    const data = await respone.json();
    data.map((blog) => {
        blogContent.innerHTML += Blog(blog);
    });
    sr.reveal(".blog", { interval: 100 });
}

/* ============== Testimonials Section ============== */
async function renderTestmonials() {
    const respone = await fetch(TESTIMONIALS_API);
    const data = await respone.json();
    data.map((testi) => {
        testiSliderWrapper.innerHTML += Testimonial(testi);
    });
    const testiSwiper = new Swiper(".testimonials__content", {
        slidesPerView: 1,
        effect: "fade",
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
    });
    sr.reveal(".testimonials__content");
}

/* ============== Footer ============== */
/* ScrollReveal JS */
sr.reveal(".footer__col", { interval: 100 });

/* ============== Active Scroll ============== */

function activeScroll() {
    const scrollY = window.scrollY;
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 16,
            sectionHeight = section.offsetHeight,
            link = document.querySelector(`.header__link a[href='#${section.id}'`);
        if (scrollY >= sectionTop && scrollY <= sectionHeight + sectionTop) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/* ============== Scroll Up ============== */

function showScrollUpBtn() {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add("show");
    } else {
        scrollUpBtn.classList.remove("show");
    }
}

scrollUpBtn.addEventListener("click", () => window.scrollTo({ behavior: "smooth", top: 0, left: 0 }));

window.addEventListener("scroll", () => {
    changeHeaderBg();
    showScrollUpBtn();
    activeScroll();
});

window.addEventListener("load", () => {
    renderDestinations();
    renderBlogs();
    renderTestmonials();
    activeScroll();
    document.querySelector(".home__thumbnails").classList.add("reveal");
});
