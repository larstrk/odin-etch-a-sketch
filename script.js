const GRIDSIDE = 600;
let squareHightWidth = 16;

const sketchArea = document.querySelector("#sketch-area");
const sliderContainer = document.querySelector("#slider-container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");

const buttonContainer = document.querySelector("#button-area");


sliderValue.textContent = `${slider.value} x ${slider.value}`;

sketchArea.style.height = sketchArea.style.width = `${GRIDSIDE}px`;
buttonContainer.style.width = sliderContainer.style.width = `${GRIDSIDE}px`;

function setBackgroundColor(event) {
    if (event.buttons === 1) {
        this.style.backgroundColor = "black";
    }
}

function createGrid(squareHightWidth) {
    let squareNum = squareHightWidth * squareHightWidth;
    let squareSize = `${(GRIDSIDE / squareHightWidth) - 2}px`;

    for (let i = 0; i < squareNum; i++) {
        const square = document.createElement("div");
        square.style.width = square.style.height = squareSize;
        square.classList.add("cell");

        sketchArea.appendChild(square);

        square.addEventListener("mousedown", setBackgroundColor)
        square.addEventListener("mousemove", setBackgroundColor)
    }
}

function removeSquares() {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild);
    }
}

slider.oninput = function() {
    let txt = `${this.value} x ${this.value}`;
    sliderValue.textContent = txt;
    removeSquares();
    createGrid(this.value);
}



// Buttons and there functions

// const gridButton = document.querySelector("#grid-button");
const clearButton = document.querySelector("#clear-button");
const shadeButton = document.querySelector("#shade-button");
const randomButton = document.querySelector("#random-button");
const eraserButton = document.querySelector("#eraser-button");

const squares = document.querySelectorAll(".cell");

function clearBackgroundColor() {
    const squares = document.querySelectorAll(".cell");

    squares.forEach(square => {
        square.style.backgroundColor = "white";
    });
}

clearButton.addEventListener('click', clearBackgroundColor);

// function changeGridBorder() {
//     const squares = document.querySelectorAll(".cell");
    
//     squares.forEach(square => {
//         // Überprüfen, ob die Border auf 1px ist
//         const currentBorderStyle = square.style.border;
        
//         if (currentBorderStyle === "1px solid whitesmoke") {
//             // Wenn die Border vorhanden ist, entferne sie
//             square.style.border = "none";
//             square.style.width = square.style.height = `${GRIDSIDE / squareHightWidth}px`;
//         } else {
//             // Wenn die Border nicht vorhanden ist, füge sie hinzu
//             square.style.border = "1px solid whitesmoke";
//             square.style.width = square.style.height = `${(GRIDSIDE / squareHightWidth) - 2}px`;
//         }

//     });
// }

// gridButton.addEventListener('click', changeGridBorder);


// Variable, um den Status des Modi zu verfolgen
let eraserMode = false;
let shadeMode = false;
let randomMode = false;

function eraseBackgroundColor(event) {
    if (eraserMode && event.buttons === 1) {
        // Das Ziel des Ereignisses erhalten (das angeklickte Quadrat)
        const targetSquare = event.target;

        // Setzt die Hintergrundfarbe des angeklickten Squares auf weiß
        targetSquare.style.backgroundColor = "white";
    }
}

function toggleEraserMode() {
    // Den Radierermodus umschalten
    if (shadeMode) {
        toggleShadeMode();
    }else if (randomMode) {
        toggleRandomMode();
    }

    eraserMode = !eraserMode;

    // Hintergrundfarbe des Eraser-Buttons ändern basierend auf dem Modus
    if (eraserMode) {
        eraserButton.style.backgroundColor = "lightgray";
    } else {
        eraserButton.style.backgroundColor = "";
    }
}

function toggleShadeMode() {
    // Den Shade mode umschalten
    if (eraserMode) {
        toggleEraserMode();
    }else if (randomMode) {
        toggleRandomMode();
    }

    shadeMode = !shadeMode;

    // Hintergrundfarbe des Eraser-Buttons ändern basierend auf dem Modus
    if (shadeMode) {
        shadeButton.style.backgroundColor = "lightgray";
    } else {
        shadeButton.style.backgroundColor = "";
    }
}

function toggleRandomMode() {
    // Den Random mode umschalten
    if (eraserMode) {
        toggleEraserMode();
    }else if (shadeMode) {
        toggleShadeMode();
    }

    randomMode = !randomMode;

    // Hintergrundfarbe des Eraser-Buttons ändern basierend auf dem Modus
    if (randomMode) {
        randomButton.style.backgroundColor = "lightgray";
    } else {
        randomButton.style.backgroundColor = "";
    }
}

function shadeBackgroundColor(event) {
    // Bei wiederholtem Drübergehen wird die Hintergrundfarbe progressiv dunkler
    if (shadeMode && event.buttons === 1) {
        const targetSquare = event.target;

        // Überprüfen, ob die Eigenschaft shadeDarkness existiert
        if (!targetSquare.shadeDarkness) {
            targetSquare.shadeDarkness = 0;
        }

        // Wenn shadeDarkness kleiner als 10 ist, weiter schattieren
        if (targetSquare.shadeDarkness < 10) {
            // Berechne die neue Dunkelheit
            const newDarkness = targetSquare.shadeDarkness + 10;

            // Hintergrundfarbe mit dem neuen Dunkelheitswert setzen
            targetSquare.style.backgroundColor = `rgba(0, 0, 0, ${newDarkness / 100})`;

            // Aktualisiere den Dunkelheitszähler
            targetSquare.shadeDarkness = newDarkness;
        }
    }
}


function randomBackgroundColor(event) {
    if (randomMode && event.buttons === 1) {
        const targetSquare = event.target;
        const randomColor = getRandomColor();
        targetSquare.style.backgroundColor = randomColor;
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



eraserButton.addEventListener('click', toggleEraserMode);
sketchArea.addEventListener("mousedown", eraseBackgroundColor);
sketchArea.addEventListener("mousemove", eraseBackgroundColor);

shadeButton.addEventListener('click', toggleShadeMode);
sketchArea.addEventListener("mousedown", shadeBackgroundColor);
sketchArea.addEventListener("mousemove", shadeBackgroundColor);

randomButton.addEventListener('click', toggleRandomMode);
sketchArea.addEventListener("mousedown", randomBackgroundColor);
sketchArea.addEventListener("mousemove", randomBackgroundColor);

//TODO Wenn ein Button aktiv ist und ein anderer geklickt wird, schalte den aktiven auf false

//TODO Wenn random mode soll nur eine random farbe gewählt werden wenn die hintergrundfarbe nicht mehr weiß ist.

createGrid(16);
