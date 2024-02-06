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

    let currentIndex = 0;

    function showImage(index) {
        const centerIndex = Math.floor(galleryImages.length / 2);
        const offset = centerIndex - index;

        galleryImages.forEach((image, i) => {
            const newPosition = (i + offset + galleryImages.length) % galleryImages.length;
            image.style.order = newPosition;
        });
    }

    function swapImages(nextIndex) {
        const currentImage = galleryImages[currentIndex];
        const nextImage = galleryImages[nextIndex];
        const parent = currentImage.parentNode;
    
        parent.insertBefore(nextImage, currentImage);
    
        const temp = galleryImages[currentIndex];
        galleryImages[currentIndex] = galleryImages[nextIndex];
        galleryImages[nextIndex] = temp;
    }
    
    nextButton.addEventListener("click", function () {
        const nextIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        swapImages(nextIndex);
        currentIndex = nextIndex;
        showImage(currentIndex);
    });

    prevButton.addEventListener("click", function () {
        const prevIndex = (currentIndex + 1) % galleryImages.length;
        swapImages(prevIndex);
        currentIndex = prevIndex;
        showImage(currentIndex);
    });

    showImage(currentIndex);
});