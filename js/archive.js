document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const cellSize = 20; // Adjust cell size to match CSS
    let snakeBody = [  
        { x: 10, y: 10 }, 
        // { x: 9, y: 10 }   // Initial position of the second segment
        ]; 
    let snakeDirection = 'right'; // Initial direction
    let foodPosition = { x: 5, y: 5 }; // Initial position of the food
    let isGameRunning = false; // Flag to control the game state
    let maxX = Math.floor(gameBoard.clientWidth / cellSize);
    let maxY = Math.floor(gameBoard.clientHeight / cellSize);
    let gameInterval;

    // Function to create and render the snake
    function renderSnake() {
        // Remove previous snake segments from the board
        document.querySelectorAll('.snake').forEach((segment) => {
            segment.parentNode.removeChild(segment);
        });

        snakeBody.forEach((segment, index) => {
            const snakeSegment = document.createElement('div');
            snakeSegment.classList.add('cell', 'snake');
            snakeSegment.style.gridColumn = segment.x;
            snakeSegment.style.gridRow = segment.y;
            gameBoard.appendChild(snakeSegment);
        });
    }
    renderSnake();

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
        const newX = Math.floor(Math.random() * maxX) + 1; // Generate a random x-coordinate within the grid
        const newY = Math.floor(Math.random() * maxY) + 1; // Generate a random y-coordinate within the grid

        return {
            x: newX,
            y: newY
        };
    }

    // Function to update the snake's position based on its direction
    function updateSnakePosition() {
        // create a new head of the snake based on the current direction
        let newHead = { ...snakeBody[0] };
console.log(newHead)
        switch (snakeDirection) {
            case 'left':
                newHead.x--;
                break;
            case 'up':
                newHead.y--;
                break;
            case 'right':
                newHead.x++;
                break;
            case 'down':
                newHead.y++;
                break;
        }

        console.log(newHead.x, maxX)
        // console.log(newHead.y, maxY)

        // Check for game over conditions
        if (
            newHead.x < 1 || newHead.x > maxX ||
            newHead.y < 1 || newHead.y > maxY ||
            snakeBody.some(segment => segment.x === newHead.x && segment.y === newHead.y)
        ) {
        // Show the game over message
        const gameOverMessage = document.getElementById("gameOverMessage");
        gameOverMessage.style.display = "block";

        // Clear the game interval to stop the snake from moving
        clearInterval(gameInterval);

        return;
        }

        // Check for collision with food
        if (newHead.x === foodPosition.x && newHead.y === foodPosition.y) {
            // Remove the existing food element
            const food = document.querySelector('.food');
            food.parentNode.removeChild(food);

            // Generate a new position for the food
            foodPosition = getRandomPosition();

            // Increase the snake's length by adding the new head
            snakeBody.unshift(newHead);

            // Render the updated snake and new food
            renderSnake();
            renderFood();
        } else {
            // Remove the last segment to maintain the snake's length
            snakeBody.pop();

            // Add the new head
            snakeBody.unshift(newHead);

            // Render the updated snake
            renderSnake();
        }
    }


    // Function to reset the game
    function resetGame() {
        // Clear any existing game interval (to stop the snake from moving)
        clearInterval(gameInterval);
    
        // Clear the game board and reset variables
        gameBoard.innerHTML = '';
        snakeBody = [
            { x: 10, y: 10 },
            { x: 9, y: 10 }
        ];
        snakeDirection = 'right';
        foodPosition = getRandomPosition();
        isGameRunning = false;
    
        // Re-render initial state
        renderSnake();
        renderFood();
    
        // Hide the game over message
        const gameOverMessage = document.getElementById("gameOverMessage");
        gameOverMessage.style.display = "none";
    }


    // Function to start the game loop
    function startGame() {
        if (!isGameRunning) {
            isGameRunning = true;
            gameInterval = setInterval(updateSnakePosition, 200); // Store the interval ID
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