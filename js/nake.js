// // Create the initial body segment
// const snakeBodySegment = document.createElement('div');
// snakeBodySegment.classList.add('snake-body');
// // Set the initial position (for example, x: 4, y: 5)
// snakeBodySegment.style.gridColumn = '11';
// snakeBodySegment.style.gridRow = '10';
// gameBoard.appendChild(snakeBodySegment);




// use a for loop to create the game board
// iterate over the rows, loop continues until row is less than 20

// for (let row = 0; row < gridSize; row++) {
//     const rowArray = [] // empty array to represent row, hold the cells for that row
//     for (let col = 0; col < gridSize; col++) {
//         const cell = document.createElement('div') // represents single cell in grid
//         cell.classList.add('cell')
//         gameBoard.appendChild(cell) // append the div to the game board
//         rowArray.push('cell') //push the div into the row array
//     }
//     grid.push(rowArray) // push the row array into the grid
// }
// })


// for (let row = 0; row < snakeStartPosition.length; row++) {
    
//     for (let col = 0; col < snakeStartPosition[0].length; col++) {
//         const cell = document.createElement('div') // represents single cell in grid
//         cell.classList.add('cell')
//         gameBoard.appendChild(cell) // append the div to the game board
       
//     }

// }

    // //map key names to snake directions
    // const directionMap = {
    //     ArrowLeft: 'left',
    //     ArrowRight: 'right',
    //     ArrowUp: 'up',
    //     ArrowDown: 'down',
    // }
    // //check if the key name is in the direction map
    // if (directionMap.hasOwnProperty(keyName)) {
    //     const newDirection = directionMap[keyName]
    //     //set snake direction to mapped direction
    //     if (snake.direction !== getOppositeDirection(newDirection)) {
    //         snake.direction = newDirection
    //         }
    //     }









    ////////////////////////////////////////////////////////////////////////////////////////////////

    document.addEventListener('DOMContentLoaded', () => {


        // STATE VARIABLES
        
        //initialize the grid as a 2d array
        const gameBoard = document.querySelector('.game-board')
        const gridSize = 20 // defines the size of the grid
        
        
        
        
        // G R I D
        function renderGameScreen(rows, columns, snakePosition = [0,0]) {
            // if  (rows === 0 || columns === 0) {
            //     return 'grid cannot be created'
            // }
        
            const grid = [] // empty array represents the grid
            for (let row = 0; row < rows; row++) {
                    const rowArray = [] // empty array to represent row, hold the cells for that row
                    for (let col = 0; col < columns; col++) {
                    
                    
                        rowArray.push(0) //push the div into the row array
                    }
                    grid.push(rowArray) // push the row array into the grid
                }
                grid[snakePosition[0]][snakePosition[1]] = 1
                return grid
            }
            
            const snakeStartPosition = renderGameScreen(20, 20, [10, 10])
        
        
        
        //  S N A K E
        
            //map key names to snake directions
            const directionMap = {
                ArrowLeft: 'left',
                ArrowRight: 'right',
                ArrowUp: 'up',
                ArrowDown: 'down',
            }
            //check if the key name is in the direction map
            if (directionMap.hasOwnProperty(keyName)) {
                const newDirection = directionMap[keyName]
                //set snake direction to mapped direction
                if (snake.direction !== getOppositeDirection(newDirection)) {
                    snake.direction = newDirection
                    }
                }
        
        // track snake position in cells
        for (let row = 0; row < snakeStartPosition.length; row++) {
            for (let col = 0; col < snakeStartPosition[0].length; col++) {
                const cell = document.createElement('div');
                if (snakeStartPosition[row][col] === 1) {
                    cell.classList.add('snake-head'); // Apply the snake head class
                } else if (snakeStartPosition[row][col] === 2) {
                    cell.classList.add('snake-body'); // Apply the snake body class
                } else {
                    cell.classList.add('cell'); // Apply the cell class for empty cells
                }
                gameBoard.appendChild(cell);
            }
        }
        
        
        })
        
        
        
        const snake = {
            body: [{x: 10, y: 10}],
            direction: 'right',
            length: 1,
        }
        
        // Create the snake's head element
        const snakeHead = document.createElement('div');
        snakeHead.classList.add('snake-head');
        // Set the initial position 
        snakeHead.style.gridColumn = '10';
        snakeHead.style.gridRow = '10';
        gameBoard.appendChild(snakeHead);
        
        
        // move snake
        
        const cellSize = 20; 
        
        document.addEventListener('keydown', (event) => {
          // Get the key code of the pressed arrow key
          const keyCode = event.keyCode;
        
          // Calculate the current row and column of the snake's head
          const currentRow = parseInt(snakeHead.style.gridRow);
          const currentCol = parseInt(snakeHead.style.gridColumn);
        
          // Update the position based on the arrow key pressed
          switch (keyCode) {
            case 37: // Left arrow key
              snakeHead.style.gridColumn = `${currentCol - 1}`;
              break;
            case 38: // Up arrow key
              snakeHead.style.gridRow = `${currentRow - 1}`;
              break;
            case 39: // Right arrow key
              snakeHead.style.gridColumn = `${currentCol + 1}`;
              break;
            case 40: // Down arrow key
              snakeHead.style.gridRow = `${currentRow + 1}`;
              break;
          }
        })
        
        
        
        
        
        
        // F O O
        
        const food = {
            x: 0,
            y: 0,
        }
        
        
        // Create the food element
        const foodElement = document.createElement('div');
        foodElement.classList.add('food');
        // Set the initial position (for example, x: 8, y: 8)
        foodElement.style.gridColumn = '8';
        foodElement.style.gridRow = '8';
        gameBoard.appendChild(foodElement);
        
        
        // FUNCTIONS
        
        // function to render snake
        function renderSnake() {
            const snakeBody = snake.body;
        
            // Clear previous snake classes from the game board
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    const cell = grid[row][col];
                    cell.classList.remove('snake-head', 'snake-body');
                }
            }
            // Apply snake classes to the new positions
            for (let i = 0; i < snakeBody.length; i++) {
                const { x, y } = snakeBody[i];
                const cell = grid[y][x];
        
                if (i === 0) {
                    cell.classList.add('snake-head');
                } else {
                    cell.classList.add('snake-body');
                }
            }
        }
        
        
        
        
        
        
        // create a function to randomly place the food on the game board
        function placeFood() {
            food.x = Math.floor(Math.random() * gridSize)
            food.y = Math.floor(Math.random() * gridSize)
        
            // calculate pixel coordinates for the food element
        
            const foodElement = document.getElementById('food')
            const cellWidth = gameBoard.clientHeight / gridSize // cell width is calculated by dividing the width of the game board by the number of columns in the grid
            const cellHeight = gameBoard.clientHeight / gridSize
            foodElement.style.left = food.x * cellWidth + 'px' //sets the left css property of the food element to position it horizontally within the game board. calculated left position based on the food.x coordinate
            foodElement.style.top =food.y * cellHeight + 'px'
        
            // show the food
        
            foodElement.style.display = 'block'
        
        
            //implement additional logic to make sure food is not generated in the same position as the snake
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        function clearGameBoard() {
            const cells = gameBoard.querySelectorAll('.cell')
            cells.forEach(cell => {
                cell.classList.remove('snake-body')
            })
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        function gameLoop() {
        
        moveSnake()
        
        // render snake on the game board
           renderSnake() 
        
        // set timeout is a built in js function. Allows you to schedule a function to be executed after a specified delay in ms.
           setTimeout(gameLoop, gameSpeed)
        }
        
        // function to get the opposite direction
        function getOppositeDirection(direction) {
            const opposites = {
                left: 'right',
                right: 'left',
                up: 'down',
                down: 'up',
            }
            return opposites[direction] || direction
        }
        
        
        // EVENT LISTENERS
        
        document.addEventListener('keydown', (event) => {
            const keyName = event.key
        
        
        })
        
        // CALL THE FUNCTIONS
        gameLoop()
        placeFood()
        
        
        // });
        
        
        
        // //cached elements
            //     if (snakeBody.length > 0) {
        //         newBodySegment.style.gridColumn = snakeBody[snakeBody.length - 1].x;
        //         newBodySegment.style.gridRow = snakeBody[snakeBody.length - 1].y;
        //         snakeBody.push({ x: snakeBody[snakeBody.length - 1].x, y: snakeBody[snakeBody.length - 1].y });
        //     } else {
        //         newBodySegment.style.gridColumn = snakeHeadPosition.x;
        //         newBodySegment.style.gridRow = snakeHeadPosition.y;
        //         snakeBody.push(snakeHeadPosition);
        //     }
        //     gameBoard.appendChild(newBodySegment);
        // }



           // Increase the snake's length by adding a new body segment
           const newBodySegment = document.createElement('div');
           newBodySegment.classList.add('cell', 'snake-body'); // Add the 'snake-body' class for styling
           if (snakeBody.length > 0) {
               newBodySegment.style.gridColumn = snakeBody[snakeBody.length - 1].x;
               newBodySegment.style.gridRow = snakeBody[snakeBody.length - 1].y;
               snakeBody.push({ x: snakeBody[snakeBody.length - 1].x, y: snakeBody[snakeBody.length - 1].y });
           } else {
               newBodySegment.style.gridColumn = snakeHeadPosition.x;
               newBodySegment.style.gridRow = snakeHeadPosition.y;
               snakeBody.push(snakeHeadPosition);
           }
           gameBoard.appendChild(newBodySegment);
       }

       // Update the positions of the snake's body segments on the game board
   for (let i = 0; i < snakeBody.length; i++) {
       const segment = snakeBody[i];
       const bodySegment = document.querySelector('.snake-body:nth-child(' + (i + 2) + ')');
       if (bodySegment) {
           bodySegment.style.gridColumn = segment.x;
           bodySegment.style.gridRow = segment.y;
       }
   }

   const snakeHead = document.createElement('div');
   snakeHead.classList.add('cell', 'snake-head');
   snakeHead.style.gridColumn = snakeHeadPosition.x;
   snakeHead.style.gridRow = snakeHeadPosition.y;
   gameBoard.appendChild(snakeHead);


      // Increase the snake's length by adding a new body segment
      const newBodySegment = document.createElement('div');
      newBodySegment.classList.add('cell', 'snake-body'); // Add the 'snake-body' class for styling
  
      // Calculate the position for the new body segment based on the direction // refactor into a single snake array
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

  // Remove the food element
  const food = document.querySelector('.food');
  food.parentNode.removeChild(food);

  // Generate a new position for the food
  foodPosition = getRandomPosition();


   // Update the snake's head position on the grid
    // const snake = document.querySelector('.snake');
    // snakeHead.style.gridColumn = snakeHeadPosition.x;
    // snakeHead.style.gridRow = snakeHeadPosition.y;