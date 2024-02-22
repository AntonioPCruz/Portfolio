// Função para abrir um PDF em uma nova aba
function openPdf(pdfUrl) {
    window.open(pdfUrl, '_blank');
}

document.addEventListener("DOMContentLoaded", function () {
    // Array de palavras que constituem o nome e conjunto de letras do alfabeto (e a letra 'Ó')
    const words = ["ANTONIO", "CRUZ"];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÓ";
    let interval = null;

    // Função para iniciar a animação
    function startAnimation(element) {
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            // Altera as letras de forma aleatória para simular uma animação
            element.innerText = element.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return element.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 27)];
                })
                .join("");

            // Interrompe a animação quando a iteração excede o comprimento da palavra, ou seja, quando o nome é exibido por completo
            if (iteration >= element.dataset.value.length) {
                clearInterval(interval);
            }

            iteration += 1 / 6; // Controla a velocidade da animação
        }, 30);
    }

    // Função para lidar com o evento de passar o mouse sobre o nome
    function handleMouseOver(event) {
        startAnimation(event.target);
    }

    // Inicia a animação para todos os elementos h1 com o atributo 'data-value' quando em hover
    document.querySelectorAll("h1[data-value]").forEach(h1Element => {
        h1Element.addEventListener("mouseover", handleMouseOver);
        setTimeout(() => startAnimation(h1Element), 500); // Inicia a animação automaticamente após 500ms
    });
});

// Atualiza a posição do ponteiro do rato nas caixas dos projetos
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
    // Adiciona eventos de clique para abrir links nas cartas
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

// Função para navegar pela galeria de imagens
document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.querySelector(".next-btn");
    const prevButton = document.querySelector(".prev-btn");
    const galleryImages = document.querySelectorAll(".gallery-image");

    const middleIndex = Math.floor(galleryImages.length / 2);
    let currentIndex = 0;

    // Função para dar zoom à imagem a ser visualizada
    function showImage(index) {
        galleryImages.forEach((image, i) => {
            const isMiddle = i === index;
            image.classList.toggle("zoomed", isMiddle);
        });

        const offset = (middleIndex - index) * (galleryImages[0].offsetWidth + 240);
        document.querySelector('.gallery-images').style.transform = `translateX(${offset}px)`;
    }

    // Função para ajustar o índice da imagem
    function adjustIndex(index) {
        return (index + galleryImages.length) % galleryImages.length;
    }

    // Para os botões de próxima imagem e imagem anterior
    nextButton.addEventListener("click", function () {
        currentIndex = adjustIndex(currentIndex + 1);
        showImage(currentIndex);
    });

    prevButton.addEventListener("click", function () {
        currentIndex = adjustIndex(currentIndex - 1);
        showImage(currentIndex);
    });

    showImage(0); // Mostra a primeira imagem ao carregar a página
});

// Cursor personalizado
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

// Animação de entrada dos elementos hidden
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