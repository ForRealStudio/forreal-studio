// MENU MOBILE

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("active");
});


// ZAMYKANIE MENU PO KLIKNIĘCIU

const navLinks = document.querySelectorAll("#navigation a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});


// ROK W STOPCE

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// AKTYWNY LINK W MENU

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


// EFEKT POJAWIANIA SIĘ SEKCJI

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    },

    {
        threshold: 0.15
    }

);

const animatedElements = document.querySelectorAll(
    ".section, .project-card, .team-card, .about-card"
);

animatedElements.forEach(element => {
    observer.observe(element);
});