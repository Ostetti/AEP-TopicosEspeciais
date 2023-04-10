import './style.css'
const startButton = document.querySelector("#start-button");
const resultElement = document.querySelector("#result");
const imageContainer = document.querySelector("#image-container");


// Função que retorna uma imagem aleatória da API do Unsplash com a cor passada como parâmetro
async function getUnsplashImage(color) {
    const unsplashAccessKey = "N76zOtlWY0M1val14JQPR2C4TXyDhZcsvYy9RBSxibk";
    const url = "https://api.unsplash.com/search/photos?query=$%7Bcolor%7D";
    const headers = { Authorization: `Client-ID ${unsplashAccessKey}` };

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (data && data.results && data.results.length > 0) {
            const { urls, alt_description } = data.results[0];
            const img = document.createElement("img");
            img.src = urls.regular;
            img.alt = alt_description;
            imageContainer.innerHTML = '';
            imageContainer.appendChild(img);
        } else {
            console.log('Não foi possível encontrar uma imagem correspondente para a cor selecionada.');
        }
    } catch (error) {
        console.error(error);
    }
}

// Event listener para o botão que inicia a captura da cor
startButton.addEventListener("click", () => {
    if (!window.EyeDropper) {
        resultElement.textContent = "Your browser does not support the EyeDropper API";
        return;
    }

    const eyeDropper = new EyeDropper();

    eyeDropper
        .open()
        .then((result) => {
            const color = result.sRGBHex;
            resultElement.textContent = color;
            resultElement.style.backgroundColor = color;
            getUnsplashImage(color);
        })
        .catch((e) => {
            resultElement.textContent = e;
        });
});

const myElement = document.querySelector("button");
myElement.style.borderColor = color;