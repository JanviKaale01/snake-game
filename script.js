
const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");

const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");

const highscoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

// Creating board
const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let highscore = localStorage.getItem("highscore") || 0;
let score = 0;
let time = "00:00";

highscoreElement.innerText = highscore;

let intevalId = null;
let timerIntervalId = null;

let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols)
};

const blocks = [];

let snake = [
    { x: 1, y: 3 } // Head
];

let direction = "down";

// Creating every block
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");

        block.classList.add("block");
        board.appendChild(block);

        blocks[`${row}-${col}`] = block;
    }
}

// Display food initially
blocks[`${food.x}-${food.y}`].classList.add("food");

// Render game
function render() {
    let head = null;

    // Calculate next head position
    if (direction === "left") {
        head = {
            x: snake[0].x,
            y: snake[0].y - 1
        };
    }
    else if (direction === "right") {
        head = {
            x: snake[0].x,
            y: snake[0].y + 1
        };
    }
    else if (direction === "down") {
        head = {
            x: snake[0].x + 1,
            y: snake[0].y
        };
    }
    else if (direction === "up") {
        head = {
            x: snake[0].x - 1,
            y: snake[0].y
        };
    }

    // Wall collision
    if (
        head.x < 0 ||
        head.x >= rows ||
        head.y < 0 ||
        head.y >= cols
    ) {
        clearInterval(intevalId);
        clearInterval(timerIntervalId);

        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";

        return;
    }

    // Remove old snake
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    // Move snake
    snake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {

        // Remove old food
        blocks[`${food.x}-${food.y}`].classList.remove("food");

        // Generate new food
        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };

        blocks[`${food.x}-${food.y}`].classList.add("food");

        // Score
        score += 10;
        scoreElement.innerText = score;

        // Highscore
        if (score > highscore) {
            highscore = score;

            localStorage.setItem(
                "highscore",
                highscore.toString()
            );

            highscoreElement.innerText = highscore;
        }

        // Don't remove tail
        // Snake grows
    }
    else {
        // Normal movement
        snake.pop();
    }

    // Render snake
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    });
}

// Start game
startButton.addEventListener("click", () => {
    modal.style.display = "none";

    // Start snake movement
    intevalId = setInterval(() => {
        render();
    }, 300);

    // Start timer
    timerIntervalId = setInterval(() => {
        let [min, sec] = time.split(":").map(Number);

        sec++;

        if (sec === 60) {
            min++;
            sec = 0;
        }

        time = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

        timeElement.innerText = time;

    }, 1000);
});

// Restart game
restartButton.addEventListener("click", restartGame);

function restartGame() {
    // Clear old intervals
    clearInterval(intevalId);
    clearInterval(timerIntervalId);

    // Remove old food
    blocks[`${food.x}-${food.y}`].classList.remove("food");

    // Remove old snake
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    // Reset score and time
    score = 0;
    time = "00:00";

    scoreElement.innerText = score;
    timeElement.innerText = time;
    highscoreElement.innerText = highscore;

    // Reset direction
    direction = "down";

    // Reset snake
    snake = [
        { x: 1, y: 3 }
    ];

    // Generate new food
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    };

    blocks[`${food.x}-${food.y}`].classList.add("food");

    // Hide modal
    modal.style.display = "none";

    // Start snake again
    intevalId = setInterval(() => {
        render();
    }, 300);

    // Start timer again
    timerIntervalId = setInterval(() => {
        let [min, sec] = time.split(":").map(Number);

        sec++;

        if (sec === 60) {
            min++;
            sec = 0;
        }

        time = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

        timeElement.innerText = time;

    }, 1000);
}

// Keyboard controls
addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }
    else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
    else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }
    else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
});
