document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#container");
    const sizeButton = document.querySelector("#size-btn");
    const colorPicker = document.querySelector("#color-picker");
    const rainbowBtn = document.querySelector("#rainbow-btn");
    const eraserBtn = document.querySelector("#eraser-btn");
    const clearBtn = document.querySelector("#clear-btn");

    let userSize = 16;
    let isDrawing = false;
    let currentMode = 'normal';

    function randomRgb() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    function createGrid() {
        container.innerHTML = '';
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const squareSize = Math.floor(Math.min(containerWidth, containerHeight) / userSize);

        container.style.width = `${squareSize * userSize}px`;
        container.style.height = `${squareSize * userSize}px`;

        for (let i = 0; i < userSize * userSize; i++) {
            const div = document.createElement("div");
            div.classList.add("square");
            div.style.height = `${squareSize}px`;
            div.style.width = `${squareSize}px`;
            div.style.boxSizing = 'border-box';

            div.addEventListener("mouseover", (e) => {
                if (isDrawing) {
                    paintCell(div);
                }
            });

            div.addEventListener("mousedown", (e) => {
                e.preventDefault(); // Prevent dragging
                paintCell(div);
            });

            container.appendChild(div);
        }
    }

    function paintCell(cell) {
        switch (currentMode) {
            case 'rainbow':
                cell.style.backgroundColor = randomRgb();
                break;
            case 'eraser':
                cell.style.backgroundColor = 'white';
                break;
            default:
                cell.style.backgroundColor = colorPicker.value;
        }
    }

    const templates = {
        heart: [
            [0, 1, 1, 0, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0]
        ],
        smiley: [
            [0, 0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 0, 0]
        ],
        star: [
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 0, 0],
            [0, 1, 0, 1, 0, 1, 0],
            [1, 0, 0, 1, 0, 0, 1]
        ]
    };

    function applyTemplate(templateName) {
        const template = templates[templateName];
        if (!template) return;

        const startRow = Math.floor((userSize - template.length) / 2);
        const startCol = Math.floor((userSize - template[0].length) / 2);

        const cells = container.querySelectorAll('.square');

        cells.forEach(cell => cell.style.backgroundColor = 'white');

        template.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === 1) {
                    const index = (startRow + i) * userSize + (startCol + j);
                    if (cells[index]) {
                        cells[index].style.backgroundColor = colorPicker.value;
                    }
                }
            });
        });
    }

    document.addEventListener("mousedown", () => isDrawing = true);
    document.addEventListener("mouseup", () => isDrawing = false);
    document.addEventListener("mouseleave", () => isDrawing = false);

    sizeButton.addEventListener("click", () => {
        let newSize = prompt("Please enter a new grid size (max 100x100): ");
        newSize = parseInt(newSize);

        if (isNaN(newSize) || newSize <= 0) {
            alert("Please enter a valid positive number");
        } else if (newSize > 100) {
            alert("The size cannot be larger than 100");
        } else {
            userSize = newSize;
            createGrid();
        }
    });

    rainbowBtn.addEventListener("click", () => {
        currentMode = currentMode === 'rainbow' ? 'normal' : 'rainbow';
        rainbowBtn.classList.toggle('active');
        eraserBtn.classList.remove('active');
    });

    eraserBtn.addEventListener("click", () => {
        currentMode = currentMode === 'eraser' ? 'normal' : 'eraser';
        eraserBtn.classList.toggle('active');
        rainbowBtn.classList.remove('active');
    });

    clearBtn.addEventListener("click", () => {
        const cells = container.querySelectorAll('.square');
        cells.forEach(cell => cell.style.backgroundColor = 'white');
    });

    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const templateName = e.target.dataset.template;
            applyTemplate(templateName);
        });
    });

    createGrid();
});