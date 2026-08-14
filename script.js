// script.js


/* =========================
   DATA
========================= */

const data = [

    // Ancient Egypt

    {
        title: "Pyramids of Giza",
        category: "ancient",
        image: "images/pyramids.jpg"
    },

    {
        title: "The Great Sphinx",
        category: "ancient",
        image: "images/sphinx.jpg"
    },

    {
        title: "Giza Plateau",
        category: "ancient",
        image: "images/giza.jpg"
    },

    {
        title: "Valley of the Kings",
        category: "ancient",
        image: "images/valley-kings.jpg"
    },


    // Temples

    {
        title: "Luxor Temple",
        category: "temples",
        image: "images/luxor.jpg"
    },

    {
        title: "Karnak Temple",
        category: "temples",
        image: "images/karnak.jpg"
    },

    {
        title: "Abu Simbel",
        category: "temples",
        image: "images/abu-simbel.jpg"
    },

    {
        title: "Philae Temple",
        category: "temples",
        image: "images/philae-temple.jpg"
    },


    // Cairo

    {
        title: "Streets of Cairo",
        category: "cairo",
        image: "images/cairo.jpg"
    },

    {
        title: "Cairo at Night",
        category: "cairo",
        image: "images/cairo-night.jpg"
    },

    {
        title: "Islamic Cairo",
        category: "cairo",
        image: "images/islamic-cairo.jpg"
    },

    {
        title: "Cairo Citadel",
        category: "cairo",
        image: "images/citadel-cairo.jpg"
    },

    {
        title: "Khan El Khalili",
        category: "cairo",
        image: "images/khan-el-khalili.jpg"
    },


    // Museums

    {
        title: "Egyptian Museum",
        category: "museums",
        image: "images/egyptian-museum.jpg"
    },


    // Nature

    {
        title: "The Nile River",
        category: "nature",
        image: "images/nile.jpg"
    },

    {
        title: "Nile Sunset",
        category: "nature",
        image: "images/nile-sunset.jpg"
    },

    {
        title: "Aswan",
        category: "nature",
        image: "images/aswan.jpg"
    },

    {
        title: "Siwa Oasis",
        category: "nature",
        image: "images/siwa-oasis.jpg"
    },


    // Desert

    {
        title: "White Desert",
        category: "desert",
        image: "images/white-desert.jpg"
    },

    {
        title: "Siwa Desert",
        category: "desert",
        image: "images/siwa-oasis.jpg"
    },


    // Coast

    {
        title: "Red Sea",
        category: "coast",
        image: "images/red-sea.jpg"
    },

    {
        title: "Red Sea Coast",
        category: "coast",
        image: "images/red-sea-coast.jpg"
    },

    {
        title: "Dahab",
        category: "coast",
        image: "images/dahab.jpg"
    },

    {
        title: "Hurghada",
        category: "coast",
        image: "images/hurghada.jpg"
    },


    // Cities

    {
        title: "Alexandria Coast",
        category: "cities",
        image: "images/alexandria.jpg"
    },

    {
        title: "Alexandria Harbor",
        category: "cities",
        image: "images/alexandria-harbor.jpg"
    }

];


/* =========================
   ELEMENTS
========================= */

const grid =
    document.getElementById("grid");

const filters =
    document.querySelectorAll(".filters button");

const lightbox =
    document.getElementById("lightbox");

const view =
    document.getElementById("view");

const viewer =
    document.querySelector(".viewer-loading");

const title =
    document.getElementById("title");

const category =
    document.getElementById("category");

const count =
    document.getElementById("count");

const close =
    document.getElementById("close");

const prev =
    document.getElementById("prev");

const next =
    document.getElementById("next");

const loader =
    document.getElementById("loader");

const heroPhoto =
    document.querySelector(".hero-photo");

const heroImg =
    heroPhoto.querySelector("img");


/* =========================
   STATE
========================= */

let current = data;

let index = 0;


/* =========================
   PAGE LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hide");

    }, 400);

});


/* =========================
   HERO IMAGE LOADING
========================= */

function loadHeroImage() {

    const finish = () => {

        heroPhoto.classList.add("loaded");

    };


    if (
        heroImg.complete &&
        heroImg.naturalWidth > 0
    ) {

        finish();

        return;
    }


    heroImg.addEventListener(
        "load",
        finish,
        { once: true }
    );


    heroImg.addEventListener(
        "error",
        finish,
        { once: true }
    );

}


loadHeroImage();


/* =========================
   IMAGE LOADING
========================= */

function loadImage(img, parent) {

    const finish = () => {

        parent.classList.add("loaded");

    };


    if (
        img.complete &&
        img.naturalWidth > 0
    ) {

        finish();

        return;
    }


    img.addEventListener(
        "load",
        finish,
        { once: true }
    );


    img.addEventListener(
        "error",
        finish,
        { once: true }
    );

}


/* =========================
   RENDER GALLERY
========================= */

function render(filter = "all") {

    current =
        filter === "all"
            ? data
            : data.filter(
                item =>
                    item.category === filter
            );


    grid.innerHTML = "";


    current.forEach((item, i) => {

        const card =
            document.createElement("article");


        card.className =
            "card";


        card.style.animationDelay =
            `${i * 40}ms`;


        card.innerHTML = `

            <div class="photo">

                <span class="image-spinner"></span>

                <img
                    src="${item.image}"
                    alt="${item.title}"
                    loading="lazy"
                >

            </div>

            <div>

                <span>
                    ${item.category}
                </span>

                <h3>
                    ${item.title}
                </h3>

            </div>

        `;


        const img =
            card.querySelector("img");


        const photo =
            card.querySelector(".photo");


        loadImage(img, photo);


        card.addEventListener(
            "click",
            () => open(i)
        );


        grid.appendChild(card);

    });

}


/* =========================
   OPEN LIGHTBOX
========================= */

function open(i) {

    index = i;

    update();

    lightbox.classList.add("open");

    document.body.classList.add("lock");

}


/* =========================
   UPDATE LIGHTBOX
========================= */

function update() {

    const item =
        current[index];


    viewer.classList.remove("loaded");

    view.classList.remove("loaded");

    view.src = "";


    title.textContent =
        item.title;


    category.textContent =
        item.category;


    count.textContent =
        `${index + 1} / ${current.length}`;


    const image =
        new Image();


    image.onload = () => {

        view.src =
            item.image;

        view.alt =
            item.title;

        view.classList.add("loaded");

        viewer.classList.add("loaded");

    };


    image.onerror = () => {

        view.src =
            item.image;

        view.alt =
            item.title;

        view.classList.add("loaded");

        viewer.classList.add("loaded");

    };


    image.src =
        item.image;

}


/* =========================
   NEXT / PREVIOUS
========================= */

function nextImage() {

    index++;


    if (
        index >= current.length
    ) {

        index = 0;

    }


    update();

}


function previousImage() {

    index--;


    if (index < 0) {

        index =
            current.length - 1;

    }


    update();

}


/* =========================
   CLOSE LIGHTBOX
========================= */

function closeBox() {

    lightbox.classList.remove("open");

    document.body.classList.remove("lock");

}


/* =========================
   HERO CLICK
========================= */

heroPhoto.addEventListener(
    "click",
    () => {

        /*
         * Hero image opens
         * the complete gallery.
         */

        current = data;

        index = 0;

        open(index);

    }
);


/* =========================
   FILTERS
========================= */

filters.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filters.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            render(
                button.dataset.filter
            );

        }
    );

});


/* =========================
   BUTTON EVENTS
========================= */

close.addEventListener(
    "click",
    closeBox
);


next.addEventListener(
    "click",
    nextImage
);


prev.addEventListener(
    "click",
    previousImage
);


/* =========================
   CLICK OUTSIDE IMAGE
========================= */

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeBox();

        }

    }
);


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "open"
            )
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeBox();

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextImage();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousImage();

        }

    }
);


/* =========================
   START
========================= */

render();