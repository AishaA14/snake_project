document.addEventListener('DOMContentLoaded', () => {


// STATE VARIABLES

//initialize the grid as a 2d array
const gameBoard = document.querySelector('.game-board')
const gridSize = 20 // defines the size of the grid
const grid = [] // empty array represents the grid

// use a for loop to create the game board
// iterate over the rows, loop continues until row is less than 20

for (let row = 0; row < gridSize; row++) {
    const rowArray = [] // empty array to represent row, hold the cells for that row
    for (let col = 0; col < gridSize; col++) {
        const cell = document.createElement('div') // represents single cell in grid
        cell.classList.add('cell')
        gameBoard.appendChild(cell) // append the div to the game board
        rowArray.push('cell') //push the div into the row array
    }
    grid.push(rowArray) // push the row array into the grid
}


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

// Create the initial body segment
const snakeBodySegment = document.createElement('div');
snakeBodySegment.classList.add('snake-body');
// Set the initial position (for example, x: 4, y: 5)
snakeBodySegment.style.gridColumn = '11';
snakeBodySegment.style.gridRow = '11';
gameBoard.appendChild(snakeBodySegment);


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


// move snake
function moveSnake() {
    //update the snake's position based on the direction
    const head = snake.body[0]

    switch (snake.direction) {
        case 'left':
            head.x -= 1
            break
            case 'right':
                head.x += 1
                case 'up':
                    head.y -= 1
                    break
                    case 'down':
                        head.y += 1
                        break
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
})

// CALL THE FUNCTIONS
gameLoop()
placeFood()


});



//cached elements




