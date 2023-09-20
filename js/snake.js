document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const cellSize = 20; // Adjust cell size to match CSS
    let snakeHeadPosition = { x: 10, y: 10 }; // Initial position of the snake's head
    let snakeDirection = 'right'; // Initial direction
    let foodPosition = { x: 5, y: 5 }; // Initial position of the food
    let isGameRunning = false; // Flag to control the game state
    let snakeBody = []; // Array to store the snake's body segments

    // Function to create and render the snake's head
    function renderSnakeHead() {
        const snakeHead = document.createElement('div');
        snakeHead.classList.add('cell', 'snake-head');
        snakeHead.style.gridColumn = snakeHeadPosition.x;
        snakeHead.style.gridRow = snakeHeadPosition.y;
        gameBoard.appendChild(snakeHead);
    }
    
    renderSnakeHead();

     // Function to create and render the food
    function renderFood() {
    const food = document.createElement('div');
    food.classList.add('cell', 'food'); // Add the 'food' class for styling
    food.style.gridColumn = foodPosition.x;
    food.style.gridRow = foodPosition.y;
    gameBoard.appendChild(food);
}
        renderFood();

   // Function to generate a random position for the food
   function getRandomPosition() {
    const maxX = Math.floor(gameBoard.clientWidth / cellSize);
    const maxY = Math.floor(gameBoard.clientHeight / cellSize);

    const newX = Math.floor(Math.random() * maxX) + 1; // Add 1 to avoid position 0
    const newY = Math.floor(Math.random() * maxY) + 1; // Add 1 to avoid position 0

    return `${newX} / ${newY}`;
}

   // Function to update the snake's position based on its direction
   function updateSnakePosition() {

    switch (snakeDirection) {
        case 'left':
            snakeHeadPosition.x--;
            break;
        case 'up':
            snakeHeadPosition.y--;
            break;
        case 'right':
            snakeHeadPosition.x++;
            break;
        case 'down':
            snakeHeadPosition.y++;
            break;
    }

    // Update the snake's head position on the grid
    const snakeHead = document.querySelector('.snake-head');
    snakeHead.style.gridColumn = snakeHeadPosition.x;
    snakeHead.style.gridRow = snakeHeadPosition.y;

     // Check for collision with food
     if (snakeHeadPosition.x === foodPosition.x && snakeHeadPosition.y === foodPosition.y) {
        // Remove the food element
        const food = document.querySelector('.food');
        food.parentNode.removeChild(food);

        // Generate a new position for the food
        foodPosition = getRandomPosition();
        
        // Increase the snake's length by adding a new body segment
        const newBodySegment = document.createElement('div');
        newBodySegment.classList.add('cell', 'snake-body'); // Add the 'snake-body' class for styling
    
        // Calculate the position for the new body segment based on the direction
        let newSegmentPosition = { x: snakeHeadPosition.x, y: snakeHeadPosition.y };
        switch (snakeDirection) {
            case 'left':
                newSegmentPosition.x++;
                break;
            case 'up':
                newSegmentPosition.y++;
                break;
            case 'right':
                newSegmentPosition.x--;
                break;
            case 'down':
                newSegmentPosition.y--;
                break;
        }
    
        // Update the new body segment's position
        newBodySegment.style.gridColumn = newSegmentPosition.x;
        newBodySegment.style.gridRow = newSegmentPosition.y;
    
        // Add the new segment to the snake's body
        snakeBody.push(newSegmentPosition);
    
        // Append the new body segment to the game board
        gameBoard.appendChild(newBodySegment);
    }
    
}
/// end of function
   
      // Function to start the game loop
      function startGame() {
        if (!isGameRunning) {
            isGameRunning = true;
            setInterval(updateSnakePosition, 200); // Adjust the interval as needed (in milliseconds)
        }
    }

   // Event listener for arrow key presses to change the snake's direction and start the game
   document.addEventListener('keydown', (event) => {
    if (!isGameRunning) {
        startGame();
    }

    switch (event.key) {
        case 'ArrowLeft':
            snakeDirection = 'left';
            break;
        case 'ArrowUp':
            snakeDirection = 'up';
            break;
        case 'ArrowRight':
            snakeDirection = 'right';
            break;
        case 'ArrowDown':
            snakeDirection = 'down';
            break;
    }
});
   
   
   
   
  
});