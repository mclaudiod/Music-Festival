document.addEventListener("DOMContentLoaded", function() {
    startApp();
});

function startApp () {
    fixedNavigation();
    createGallery();
    scrollNav();
};

function fixedNavigation() {
    const bar = document.querySelector(".header");
    const aboutFestival = document.querySelector(".about-festival");
    const body = document.querySelector("body");

    window.addEventListener("scroll", function() {
        if (aboutFestival.getBoundingClientRect().bottom < 0) {
            bar.classList.add("fixed");
            body.classList.add("body-scroll");
        } else {
            bar.classList.remove("fixed");
            body.classList.remove("body-scroll");
        };
    });
};

function scrollNav() {
    const links = document.querySelectorAll(".principal-navigation a");

    // You can't associate addEventListener if it's querySelectorAll, you have to associate to each one indivitually

    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const section = document.querySelector(e.target.attributes.href.value);
            section.scrollIntoView({behavior: "smooth"});
        });
    });
};

function createGallery() {
    const gallery = document.querySelector(".image-gallery");

    for (let i = 1; i <=12; i++) {
        const image = document.createElement("picture");
        image.innerHTML = `
            <source src="build/img/grande/${i}.avif" type="image/avif">
            <source src="build/img/grande/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${i}.jpg" alt="Gallery Image">
        `;

        image.onclick = function() {
            showImage(i);
        };

        gallery.appendChild(image);
    };
};

function showImage(id) {
    const image = document.createElement("picture");
    image.innerHTML = `
        <source src="build/img/grande/${id}.avif" type="image/avif">
        <source src="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Gallery Image">
    `;

    // Creates the Overley with the image

    const overlay = document.createElement("div");
    overlay.appendChild(image);
    overlay.classList.add("overlay");
    overlay.onclick = function() {
        const body = document.querySelector("body");
        body.classList.remove("pinup-body");
        overlay.remove();
    };

    // Button to close the Modal

    const closeModal = document.createElement("p");
    closeModal.textContent = "X";
    closeModal.classList.add("button-close");

    // closeModal.onclick = function() {
    //     const body = document.querySelector("body");
    //     body.classList.remove("pinup-body");
    //     overlay.remove();
    // };

    overlay.appendChild(closeModal);

    // Add it to the HTML

    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("pinup-body");
};