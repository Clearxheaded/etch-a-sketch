document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#container");
    const sizeButton = document.querySelector("#size-btn");
    
    let userSize = 16; // Default size (16x16)
    
    function createGrid() {
        container.innerHTML = '';
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Calculate square size based on the smaller of width or height to ensure squares fit both dimensions
        const squareSize = Math.floor(Math.min(containerWidth, containerHeight) / userSize);
        
        container.style.width = `${squareSize * userSize}px`;
        container.style.height = `${squareSize * userSize}px`;
        
        for (let i = 0; i < userSize * userSize; i++) {
            const div = document.createElement("div");
            div.classList.add("square");
            div.style.height = `${squareSize}px`;
            div.style.width = `${squareSize}px`;
            div.style.boxSizing = 'border-box';
            
            div.addEventListener("mouseover", () => {
                div.style.backgroundColor = "blue";
            });
            
            container.appendChild(div);
        }
    }
    
    createGrid();
    
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
});