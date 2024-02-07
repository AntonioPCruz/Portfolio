document.addEventListener("DOMContentLoaded", function () {
    const words = ["ANTONIO", "CRUZ"];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÓ";
    let interval = null;

    function startAnimation(element) {
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            element.innerText = element.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return element.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 27)];
                })
                .join("");

            if (iteration >= element.dataset.value.length) {
                clearInterval(interval);
            }

            iteration += 1 / 5;
        }, 30);
    }

    function handleMouseOver(event) {
        startAnimation(event.target);
    }

    document.querySelectorAll("h1[data-value]").forEach(h1Element => {
        h1Element.addEventListener("mouseover", handleMouseOver);
        startAnimation(h1Element); 
    });
});

document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
  
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", function () {
            const link = card.querySelector("a");
            if (link) {
                window.open(link.href, "_blank");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.querySelector(".next-btn");
    const prevButton = document.querySelector(".prev-btn");
    const galleryImages = document.querySelectorAll(".gallery-image");

    const middleIndex = Math.floor(galleryImages.length / 2);
    let currentIndex = middleIndex;

    function showImage(index) {
        galleryImages.forEach((image, i) => {
            const isMiddle = i === index;
            image.classList.toggle("zoomed", isMiddle);
        });

        const offset = (middleIndex - index) * (galleryImages[0].offsetWidth + 20);
        document.querySelector('.gallery-images').style.transform = `translateX(${offset}px)`;
    }

    nextButton.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showImage(currentIndex);
    });

    prevButton.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentIndex);
    });

    showImage(currentIndex);
});