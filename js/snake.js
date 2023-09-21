document.addEventListener('DOMContentLoaded', function() {

    let score = 0;
    let grid = []
    let foodPosition;
    let snakeBody= []
    let gridDimension = [20,20]
    let activeDirection = "right"; // store the current direction
    const snakeSpeed = 200;
    let gameStarted = false; // Indicates if the game has started
    let paused = false;
    let gameOver = false;
    
    //* create the game grid
    const createGrid = (dimension=[5,5]) =>{
        const grid = []
        for (let row = 0; row < dimension[0]; row ++){
            const rowArray = []
            for (let column = 0; column < dimension[1]; column ++ ){
                rowArray.push(0)
            }
            grid.push(rowArray)
        }
        return grid
    }

    //* render the game board
    const renderGameBoard = (gridDimension, grid) => {
        
        // remove game board and re-render on every move
        document.getElementById("game-board").remove();
        let gameBoard = document.createElement("div");
        gameBoard.setAttribute("id", "game-board")
        document.body.appendChild(gameBoard);

        grid.map((rows)=>{
            rows.map((column) => {
                let element = document.createElement("div")
                if (column == 0)
                    element.setAttribute("class", "grid")
                if (column == 1)
                    element.setAttribute("class", "snake")
                if (column == 2)
                    element.setAttribute("class", "food")
                gameBoard.appendChild(element)
            })
        })

        // set grid styling for each item type
        Array.from(["grid", "snake", "food"]).map((grid)=>{
            const gridItems = document.getElementsByClassName(grid)
            Array.from(gridItems).map((grid) => grid.style.width = `${500/gridDimension[0]}px`);
            Array.from(gridItems).map((grid) => grid.style.height = `${500/gridDimension[1]}px`);
        })
    }

    //* update the grid with the food position
    const updateFoodPosition = (foodPosition) =>{
        grid[foodPosition[0]][foodPosition[1]] = 2
        return grid
    }

    //* detect collision with food
    const snakeHasFoundFood = (snakePosition, foodPosition) => {
        return (
            snakePosition[0] == foodPosition[0] &&
            snakePosition[1] == foodPosition[1]
        )
    }

    //* update snake length when it finds food
    const updateSnakeLength = (snakePosition) => {
        // console.log(snakePosition)
        grid[snakePosition[0]][snakePosition[1]] = 1
        snakeBody.push(snakePosition)
         // Play the sound when the snake eats food
        const eatSound = document.getElementById("eatSound");
        eatSound.play();
    }

    //* generate the position for the food
    // check for the available positions were the snakes body is not present
    const generateNewFoodPosition = () =>{
        const availableLocations = []
        for (const indexOfRow in grid){
            for (const indexOfColumn in grid[indexOfRow]){
                const gridValue = (grid[indexOfRow][indexOfColumn])
                if (gridValue === 0)
                    availableLocations.push([indexOfRow, indexOfColumn])
            }
        }
        const randomSelection = Math.floor(Math.random() * availableLocations.length) + 1
        return availableLocations[randomSelection]
    }    

    //* update snake position
    const updateSnakePosition = (newBody, currentSnakeLength) => {
        const selfCollision = snakeBody.filter((coord) => coord[0] === newBody[0] && coord[1] === newBody[1]);
    
        if (selfCollision.length >= 1 || newBody[0] < 0 || newBody[0] > gridDimension[0] - 1 || newBody[1] < 0 || newBody[1] > gridDimension[1] - 1) {
            displayGameOverModal();

            // Play the wall collision sound
        const wallCollisionSound = document.getElementById("wallCollisionSound");
        wallCollisionSound.play();

        return;
        }
        snakeBody.splice(0,0,newBody)
        
        const updatedSnakePosition = snakeBody.slice(0,currentSnakeLength)
        updatedSnakePosition.forEach((coord)=>{
            grid[coord[0]][coord[1]] = 1
        })
        
        const discardedSnakePosition = snakeBody.slice(currentSnakeLength,)
        // console.log("snake body part to remove", discardedSnakePosition)
        discardedSnakePosition.forEach((coord)=>{
            grid[coord[0]][coord[1]] = 0
        })
        
        snakeBody = updatedSnakePosition
        
    }

    //* Function to display the instructions modal
    function displayInstructionsModal() {
        const modal = document.getElementById("instructions-modal");
        modal.style.display = "block";

        const startGameButton = document.getElementById("start-game-button");
        startGameButton.addEventListener("click", () => {
            modal.style.display = "none"; // Hide the modal
            // startGame(); // Start the game
        });
    }

    //* Display the instructions modal when the page loads
    displayInstructionsModal();
    function displayGameOverModal() {
        const modal = document.getElementById("game-over-modal");
        modal.style.display = "block";
    
        const restartButton = document.getElementById("restart-button");
        restartButton.addEventListener("click", () => {
            // Reload or restart your game here
            window.location.reload(); // reload the page

            // Update high score if the current score is higher
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            updateHighScore(highScore); // Update the high score element
        }
        });
    }

    // * update score of the game

    const updateScore = (score) =>{
        parseInt(document.getElementById("current-score").innerHTML=
        `Current score is: ${score}`)
    }

    //* Update high score element

        // Initialize high score from local storage
    let highScore = parseInt(localStorage.getItem('highScore')) || 0;

    // Update high score element
    const highScoreElement = document.getElementById("high-score");
    highScoreElement.innerHTML = `High Score: ${highScore}`;

   

    //* STARTING THE GAME //
    grid = createGrid(gridDimension) // create game grid
    // console.log(grid);
    
    updateSnakePosition([4,4], 1) //initialize snake position
    // console.log([4,4])

    foodPosition = generateNewFoodPosition(gridDimension) // get new food position
    updateFoodPosition(foodPosition) // initialize food position

    renderGameBoard(gridDimension, grid) // render the game and characters on screen
    updateScore(score) // initialize score

    //* manages the game state.
    const manageGameState = (newHeadPositionOfSnake) =>{

        const lastKnownPosition = snakeBody.at(-1)
        updateSnakePosition(newHeadPositionOfSnake, snakeBody.length)
        renderGameBoard(gridDimension, grid)
        if (snakeHasFoundFood(newHeadPositionOfSnake, foodPosition)) {
            updateSnakeLength(lastKnownPosition)
            foodPosition = generateNewFoodPosition(gridDimension)
            updateFoodPosition(foodPosition)
            updateScore(score+=1)
        }
        // console.log(grid)
        renderGameBoard(gridDimension, grid)      
    }

    //* Function to toggle the game state (pause/resume)
    function toggleGamePause() {
        paused = !paused; // Toggle the paused state

        if (paused) {
            clearInterval(snakeMovementInterval); // Pause the game loop
        } else {
            // Resume the game loop
            snakeMovementInterval = setInterval(moveSnake, snakeSpeed);
        }
    }
    function togglePausedModal(paused) {
        const pausedModal = document.getElementById("paused-modal");
        pausedModal.style.display = paused ? "block" : "none";
    }

    //* Monitor snake movement.
    function moveSnake() {
        if (paused) {
            togglePausedModal(true); // Display "Paused" pop-up when paused
            return; // Stop moving if the game is paused
        } else {
            togglePausedModal(false); // Hide "Paused" pop-up when resumed
        }

        if (!gameStarted) {
            return; // Stop moving if the game hasn't started yet
        }

        let newHeadPositionOfSnake;
        
        if (activeDirection === "up") {
            // Calculate the new position for the snake if moving up
            newHeadPositionOfSnake = [snakeBody[0][0] - 1, snakeBody[0][1]];
        } else if (activeDirection === "down") {
            // Calculate the new position for the snake if moving down
            newHeadPositionOfSnake = [snakeBody[0][0] + 1, snakeBody[0][1]];
        } else if (activeDirection === "left") {
            // Calculate the new position for the snake if moving left
            newHeadPositionOfSnake = [snakeBody[0][0], snakeBody[0][1] - 1];
        } else if (activeDirection === "right") {
            // Calculate the new position for the snake if moving right
            newHeadPositionOfSnake = [snakeBody[0][0], snakeBody[0][1] + 1];
        }
        
        manageGameState(newHeadPositionOfSnake);
    }
    
    // Call moveSnake function every specified interval (snakeSpeed)
    const snakeMovementInterval = setInterval(moveSnake, snakeSpeed);

    //* Start the game when any arrow key is pressed
    document.addEventListener("keydown", (e) => {
        if (!gameStarted) {
            gameStarted = true; // Set the game as started
        }
        if (!gameOver) {
        if (e.key === "ArrowUp" && activeDirection !== "down") {
            activeDirection = "up";
        } else if (e.key === "ArrowDown" && activeDirection !== "up") {
            activeDirection = "down";
        } else if (e.key === "ArrowLeft" && activeDirection !== "right") {
            activeDirection = "left";
        } else if (e.key === "ArrowRight" && activeDirection !== "left") {
            activeDirection = "right";
        }
        if (e.key === " ") { // Check if the space bar is pressed
            toggleGamePause(); // Toggle the game pause/resume
        }
        }
    });

}, false);
