***index.html***



<!DOCTYPE html>

<html lang="en">

<head>

&#x20;   <meta charset="UTF-8">

&#x20;   <meta name="viewport" content="width=device-width, initial-scale=1.0">

&#x20;   <title>Snake Game</title>

&#x20;   <link rel="stylesheet" href="style.css">

&#x20;   

</head>



<body>

&#x20;   <main>



&#x20;       <section>



&#x20;           <div class="infos">



&#x20;               <div class="info">

&#x20;                   <h3>High Score: 

&#x20;                       <span id="high-score">0</span>

&#x20;                   </h3>

&#x20;               </div>



&#x20;                 <div class="info">

&#x20;                   <h3>Score: 

&#x20;                       <span id="score">0</span>

&#x20;                   </h3>

&#x20;               </div>



&#x20;                 <div class="info">

&#x20;                   <h3>Time:

&#x20;                       <span id="time">00:00</span>

&#x20;                   </h3>

&#x20;               </div>



&#x20;           </div>



&#x20;           <div class="board">

&#x20;               

&#x20;           </div>



&#x20;       </section>



&#x20;       <div class="modal">

&#x20;           <div class="start-game">

&#x20;               <h3> Welcome to Snake Game </h3>

&#x20;               <button class="btn btn-start"> Start Game </button>

&#x20;           </div>

&#x20;       </div>

&#x20;       <div class="game-over">

&#x20;           <h3> Game Over </h3>

&#x20;           <button class="btn btn-restart"> Restart Game </button>

&#x20;       </div>

&#x20;   </main>



&#x20;   <script src="script.js"></script>



</body>

</html>



\-------------------------------------------------------------------------------------------

***style.css***



\* {

&#x20;   margin: 0;

&#x20;   padding: 0;

&#x20;   box-sizing: border-box;

}



html, 

body {

&#x20;   height: 100%;

&#x20;   width: 100%;

}



:root {



&#x20;   /\* Variables...\*/





&#x20;   /\* Background Colors \*/

&#x20;   --bg-primary-color: #0c0c0c;

&#x20;   --bg-fill-color: #fdfdfc;

&#x20;   --bg-food-color: #ff3b3b;



&#x20;   /\* Text Colors \*/

&#x20;   --text-primary-color: #ffffff;



&#x20;   /\* Spacing Variables \*/

&#x20;   --space-xs: 4px;

&#x20;   --space-sm: 8px;

&#x20;   --space-md: 16px;

&#x20;   --space-lg: 24px;

&#x20;   --space-xl: 32px;

&#x20;   --space-2xl: 40px;

&#x20;   --space-3xl: 48px;



&#x20;   /\* Border Colors \*/

&#x20;   --border-primary-color: #ffffff;



&#x20;   /\* Border Radius \*/

&#x20;   --border-radius-xs: 4px;

&#x20;   --border-radius-sm: 8px;

&#x20;   --border-radius-md: 12px;

&#x20;   --border-radius-lg: 16px;

&#x20;   --border-radius-xl: 20px;

&#x20;   --border-radius-2xl: 24px;

}



html {

&#x20;   background-color: var(--bg-primary-color);

&#x20;   color: var(--text-primary-color);

&#x20;   font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

}



main,

section {

&#x20;   width: 100%;

&#x20;   height: 100%;

}



.btn {

&#x20;   padding: var(--space-sm) var(--space-md);

&#x20;   border: none;

&#x20;   border-radius: var(--border-radius-sm);

&#x20;   cursor: pointer;

&#x20;   transition: all 0.3s ease;

}



.btn:hover {

&#x20;   transform: scale(1.1);

}



section {

&#x20;   padding: var(--space-2xl);

&#x20;   display: flex;

&#x20;   flex-direction: column;

&#x20;   height: 100%;

&#x20;   gap: var(--border-radius-lg);

}



section .infos {

&#x20;   width: 100%;

&#x20;   display: flex;  /\*parallel\*/

&#x20;   justify-content: space-between;

}



.infos {

&#x20;   padding: var(--space-sm) var(--space-md);

&#x20;   border: 1px solid var(--border-primary-color);

&#x20;   border-radius: var(--border-radius-sm);

}



.board {

&#x20;   border: 1px solid var(--border-primary-color);

&#x20;   flex-grow: 1;

&#x20;   display: grid;

&#x20;   grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));

&#x20;   grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));

}



.block {

&#x20;   border: 1px solid var(--border-primary-color);

&#x20;   border-radius: 50%;

}



.fill {

&#x20;   background-color: var(--bg-fill-color);

}



.food {

&#x20;   background-color: var(--bg-food-color);

}



.modal {

&#x20;   height: 100vh;

&#x20;   width: 100vw;;

&#x20;   position: fixed;

&#x20;   top: 0;

&#x20;   left: 0;

&#x20;   background-color: #35353587;

&#x20;   backdrop-filter: blur(4px);

&#x20;   display: flex;

&#x20;   justify-content: center;

&#x20;   align-items: center;

}



.modal .start-game, 

.modal .game-over {

&#x20;   display: flex;

&#x20;   flex-direction: column;

&#x20;   align-items: center;

&#x20;   gap: var(--space-lg);

}



.modal .game-over {

&#x20;   display: none ;

}



\-----------------------------------------------------------------------------------------

***script.js***



const board = document.querySelector(".board");

const startButton = document.querySelector(".btn-start");

const modal = document.querySelector(".modal");



const startGameModal = document.querySelector(".start-game");

const gameOverModal = document.querySelector(".game-over");

const restartButton = document.querySelector(".btn-restart");



const highscoreElement = document.querySelector("#high-score");

const scoreElement = document.querySelector("#score");

const timeElement = document.querySelector("#time3");



// creating board

const blockHeight = 50;

const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth);

const rows = Math.floor(board.clientHeight / blockHeight);



let highscore = localStorage.getItem("highscore") || 0;

let score = 0;

let time = "00-00";



highscoreElement.innerText = highscore;



let intevalId = null;

let timerIntervalId = null;



let food = {

&#x20;   x: Math.floor(Math.random() \* rows),

&#x20;   y: Math.floor(Math.random() \* cols)

};



const blocks = \[];



let snake = \[     // array

&#x20;   { x: 1, y: 3 } // head

];



let direction = "down";



// Creating every block

for (let row = 0; row < rows; row++)

{

&#x20;   for (let col = 0; col < cols; col++)

&#x20;   {

&#x20;       const block = document.createElement("div");



&#x20;       block.classList.add("block");



&#x20;       board.appendChild(block);



&#x20;       blocks\[`${row}-${col}`] = block;

&#x20;   }

}





// Render game

function render()

{

&#x20;   let head = null;



&#x20;   // Calculate next head position

&#x20;   if (direction === "left")

&#x20;   {

&#x20;       head = {

&#x20;           x: snake\[0].x,

&#x20;           y: snake\[0].y - 1

&#x20;       };

&#x20;   }

&#x20;   else if (direction === "right")

&#x20;   {

&#x20;       head = {

&#x20;           x: snake\[0].x,

&#x20;           y: snake\[0].y + 1

&#x20;       };

&#x20;   }

&#x20;   else if (direction === "down")

&#x20;   {

&#x20;       head = {

&#x20;           x: snake\[0].x + 1,

&#x20;           y: snake\[0].y

&#x20;       };

&#x20;   }

&#x20;   else if (direction === "up")

&#x20;   {

&#x20;       head = {

&#x20;           x: snake\[0].x - 1,

&#x20;           y: snake\[0].y

&#x20;       };

&#x20;   }





&#x20;   // Wall collision

&#x20;   if (

&#x20;       head.x < 0 ||

&#x20;       head.x >= rows ||

&#x20;       head.y < 0 ||

&#x20;       head.y >= cols

&#x20;   )

&#x20;   {

&#x20;       clearInterval(intevalId);

&#x20;       clearInterval(timerIntervalId);



&#x20;       modal.style.display = "flex";

&#x20;       startGameModal.style.display = "none";

&#x20;       gameOverModal.style.display = "flex";



&#x20;       return;

&#x20;   }





&#x20;   // Remove old snake

&#x20;   snake.forEach(segment =>

&#x20;   {

&#x20;       blocks\[`${segment.x}-${segment.y}`].classList.remove("fill");

&#x20;   });





&#x20;   // Move snake

&#x20;   snake.unshift(head);





&#x20;   // Food collision

&#x20;   if (head.x === food.x \&\& head.y === food.y)

&#x20;   {

&#x20;       // Remove old food

&#x20;       blocks\[`${food.x}-${food.y}`].classList.remove("food");



&#x20;       // Generate new food

&#x20;       food = {

&#x20;           x: Math.floor(Math.random() \* rows),

&#x20;           y: Math.floor(Math.random() \* cols)

&#x20;       };



&#x20;       blocks\[`${food.x}-${food.y}`].classList.add("food");





&#x20;       // Score

&#x20;       score += 10;

&#x20;       scoreElement.innerText = score;





&#x20;       // Highscore

&#x20;       if (score > highscore)

&#x20;       {

&#x20;           highscore = score;



&#x20;           localStorage.setItem(

&#x20;               "highscore",

&#x20;               highscore.toString()

&#x20;           );



&#x20;           highscoreElement.innerText = highscore;

&#x20;       }



&#x20;       // Don't remove tail

&#x20;       // Snake grows

&#x20;   }

&#x20;   else

&#x20;   {

&#x20;       // Normal movement

&#x20;       snake.pop();

&#x20;   }





&#x20;   // Render snake

&#x20;   snake.forEach(segment =>

&#x20;   {

&#x20;       blocks\[`${segment.x}-${segment.y}`].classList.add("fill");

&#x20;   });

}





// Start game

startButton.addEventListener("click", () =>

{

&#x20;   modal.style.display = "none";



&#x20;   // Start snake movement

&#x20;   intevalId = setInterval(() =>

&#x20;   {

&#x20;       render();

&#x20;   }, 300);





&#x20;   // Start timer

&#x20;   timerIntervalId = setInterval(() =>

&#x20;   {

&#x20;       let \[min, sec] = time.split("-").map(Number);



&#x20;       if (sec === 59)

&#x20;       {

&#x20;           min += 1;

&#x20;           sec = 0;

&#x20;       }

&#x20;       else

&#x20;       {

&#x20;           sec += 1;

&#x20;       }



&#x20;       time = `${String(min).padStart(2, "0")}-${String(sec).padStart(2, "0")}`;



&#x20;       timeElement.innerText = time;



&#x20;   }, 1000);

});





// Restart game

restartButton.addEventListener("click", restartGame);





function restartGame()

{

&#x20;   // Clear old intervals

&#x20;   clearInterval(intevalId);

&#x20;   clearInterval(timerIntervalId);





&#x20;   // Remove old food

&#x20;   blocks\[`${food.x}-${food.y}`].classList.remove("food");





&#x20;   // Remove old snake

&#x20;   snake.forEach(segment =>

&#x20;   {

&#x20;       blocks\[`${segment.x}-${segment.y}`].classList.remove("fill");

&#x20;   });





&#x20;   // Reset score and time

&#x20;   score = 0;

&#x20;   time = "00-00";



&#x20;   scoreElement.innerText = score;

&#x20;   timeElement.innerText = time;

&#x20;   highscoreElement.innerText = highscore;





&#x20;   // Reset direction

&#x20;   direction = "down";





&#x20;   // Reset snake

&#x20;   snake = \[

&#x20;       { x: 1, y: 3 }

&#x20;   ];





&#x20;   // Generate new food

&#x20;   // IMPORTANT: no "let" here

&#x20;   food = {

&#x20;       x: Math.floor(Math.random() \* rows),

&#x20;       y: Math.floor(Math.random() \* cols)

&#x20;   };



&#x20;   blocks\[`${food.x}-${food.y}`].classList.add("food");





&#x20;   // Hide modal

&#x20;   modal.style.display = "none";





&#x20;   // Start snake again

&#x20;   intevalId = setInterval(() =>

&#x20;   {

&#x20;       render();

&#x20;   }, 300);





&#x20;   // Start timer again

&#x20;   timerIntervalId = setInterval(() =>

&#x20;   {

&#x20;       let \[min, sec] = time.split("-").map(Number);



&#x20;       if (sec === 59)

&#x20;       {

&#x20;           min += 1;

&#x20;           sec = 0;

&#x20;       }

&#x20;       else

&#x20;       {

&#x20;           sec += 1;

&#x20;       }



&#x20;       time = `${String(min).padStart(2, "0")}-${String(sec).padStart(2, "0")}`;



&#x20;       timeElement.innerText = time;



&#x20;   }, 1000);

}





// Keyboard controls



addEventListener("keydown", (event) =>

{

&#x20;   if (event.key === "ArrowUp" \&\& direction !== "down")

&#x20;   {

&#x20;       direction = "up";

&#x20;   }

&#x20;   else if (event.key === "ArrowRight" \&\& direction !== "left")

&#x20;   {

&#x20;       direction = "right";

&#x20;   }

&#x20;   else if (event.key === "ArrowLeft" \&\& direction !== "right")

&#x20;   {

&#x20;       direction = "left";

&#x20;   }

&#x20;   else if (event.key === "ArrowDown" \&\& direction !== "up")

&#x20;   {

&#x20;       direction = "down";

&#x20;   }

});



