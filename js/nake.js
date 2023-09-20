// function init() {

// }

// window.addEventListener('DOMContentLoaded', init)

Function init {
    // create grid
    const grid = document.querySelector(‘.grid’)
    // BOARD CONFIG
    const width = 10
    const height = 10
    const cellCount = width * height
    let cells = []
    // CHARACTER CONFIG
    // this will need to be the bottom of the page
    const startingPosition = 0
    let currentPosition = 0
    // CREATE GRID CELLS
    // ! FUNCTIONS
    // CREATE GRID CELLS
    function createGrid() {
    // Use the cellCount to create our grid cells
    for (let i = 0; i < cellCount; i++){
    const cell = document.createElement('div')
    // Add index to div element
    cell.innerText = i
    // The logic behind grid movement the index allows us to see where we are
    // this gives us the grid cell index
    // Add index to attribute // dataset is an array of key / value pairs
    // index is just the name of the individual cells // this is an attribute // another way of setting an attribute is by coding cell.setAttribute(‘data-index’)
    cell.dataset.index = 1
    // add the height and width to each grid cell (div)
    // use template literals - the second option will allow for dynamic changes
    cell.style.height = '10%' `${100 / height}`
    cell.style.width = '10%' `${100 / width}`
    // Add cell to grid - this adds the grid to the DOM
    grid.appendChild(cell)
    // add newlyCreated div cell to cells array
    cells.push(cell)
    }
}
    console.log(cells)
    // add cat character to starting position
    const cells = document.querySelectorAll('.cell'); // Assuming you have a grid of cells

    let currentPosition = startingPosition;
    
    // Function to add the 'snake' class to a cell
    function addSnake(position) {
      cells[position].classList.add('snake');
    }
    
    // Function to remove the 'snake' class from the current position
    function removeSnake() {
      cells[currentPosition].classList.remove('snake');
    }
    
    // Function to handle movement
    function handleMovement(event) {
      const key = event.key;
      
      // Remove snake from previous position before updating the current position
      removeSnake();
      
      // Check which key was pressed and execute code
      if (key === 'ArrowUp') {
        console.log('UP');
        currentPosition -= width;
      } else if (key === 'ArrowDown' && currentPosition + width <= cellCount - 1) {
        console.log('DOWN');
        currentPosition += width;
      } else if (key === 'ArrowLeft' && currentPosition % width !== 0) {
        console.log('LEFT');
        currentPosition--;
      } else if (key === 'ArrowRight' && currentPosition % width !== width - 1) {
        console.log('RIGHT');
        currentPosition++;
      } else {
        console.log('INVALID KEY');
      }
      
      addSnake(currentPosition);
    }
    
    // Add event listener for keydown once when the page loads
    window.addEventListener('DOMContentLoaded', init);
   