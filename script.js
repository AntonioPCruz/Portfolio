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
    const track = document.getElementById("image-track");

    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";  
    track.dataset.prevPercentage = track.dataset.percentage;
    }

    const handleOnMove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
    track.dataset.percentage = nextPercentage;
    
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });
    
    for(const image of track.getElementsByClassName("image")) {
        image.animate({
        objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
    }

    /* -- Had to add extra lines for touch events -- */

    window.onmousedown = e => handleOnDown(e);

    window.ontouchstart = e => handleOnDown(e.touches[0]);

    window.onmouseup = e => handleOnUp(e);

    window.ontouchend = e => handleOnUp(e.touches[0]);

    window.onmousemove = e => handleOnMove(e);

    window.ontouchmove = e => handleOnMove(e.touches[0]);
});