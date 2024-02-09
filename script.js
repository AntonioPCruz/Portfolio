document.addEventListener("DOMContentLoaded", function () {
    const nameScreen = document.getElementById("name-screen");
    const hugeName = document.querySelector(".huge-name");
    const body = document.querySelector("body");

    function hideNameScreen() {
        nameScreen.classList.add("fade-out");
        setTimeout(() => {
            nameScreen.style.display = "none";
            body.style.overflow = "auto"; // Revert overflow to auto when hiding name-screen
        }, 1000);
    }

    setTimeout(() => {
        hugeName.style.opacity = 1; // Set opacity to 1 to trigger fade-in effect
        body.style.overflow = "hidden"; // Hide scrollbar when showing name-screen
    }, 100);

    setTimeout(() => {
        hideNameScreen();
        body.style.overflow = "auto"; // Revert overflow to auto after name-screen disappears
    }, 3000);
});

function openPdf(pdfUrl) {
    window.open(pdfUrl, '_blank');
}

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

            iteration += 1 / 6;
        }, 30);
    }

    function handleMouseOver(event) {
        startAnimation(event.target);
    }

    document.querySelectorAll("h1[data-value]").forEach(h1Element => {
        h1Element.addEventListener("mouseover", handleMouseOver);
        setTimeout(() => startAnimation(h1Element), 3100);
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

document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', e => {
        cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
    })

    document.addEventListener('click', () => {
        cursor.classList.add("expand");

        setTimeout(() => {
            cursor.classList.remove("expand");
        }, 500)
    })
});

document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
            else {
                entry.target.classList.remove("show");
            }
        });
    })

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(element => observer.observe(element));
});

document.addEventListener("DOMContentLoaded", function () {
    const points = document.querySelectorAll(".point");
    const lineContainer = document.querySelector(".line");

    // Function to calculate the distance between two points
    function calculateDistance(point1, point2) {
        const x1 = point1.offsetLeft + point1.offsetWidth / 2;
        const y1 = point1.offsetTop + point1.offsetHeight / 2;
        const x2 = point2.offsetLeft + point2.offsetWidth / 2;
        const y2 = point2.offsetTop + point2.offsetHeight / 2;

        return {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
        };
    }

    // Function to draw lines between each point
    function drawLines() {
        lineContainer.innerHTML = ''; // Clear existing lines
        for (let i = 0; i < points.length - 1; i++) {
            const startPoint = points[i];
            const endPoint = points[i + 1];
            const distance = calculateDistance(startPoint, endPoint);

            // Create and style line element
            const line = document.createElement("div");
            line.classList.add("line");
            line.style.position = "absolute";
            line.style.left = distance.x1 + "px";
            line.style.top = distance.y1 - 15 + "px";
            line.style.width = Math.sqrt((distance.x2 - distance.x1) ** 2 + (distance.y2 - distance.y1) ** 2) + "px";
            line.style.transformOrigin = "0 50%";
            line.style.transform = "rotate(" + (Math.atan2(distance.y2 - distance.y1, distance.x2 - distance.x1) * 180 / Math.PI) + "deg)";
            line.style.background = "#ffffff";
            line.style.height = "5px";

            // Append line to line container
            lineContainer.appendChild(line);
        }
    }

    // Redraw lines on window resize
    window.addEventListener("resize", drawLines);

    // Initial drawing of lines
    drawLines();
});