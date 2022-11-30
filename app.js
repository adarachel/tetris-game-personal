document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid') // USE A QUERY SELECTOR TO LOOK THROUGH OUR HTML DOCUMENT AND FIND THE ELEMENT WITH A CLASS NAME OF GRID
  let squares = Array.from(document.querySelectorAll('.grid div')) // WE USE document.querySelector TO FIND THE ELEMENT IN THE HTML FILE AND ASSIGN IT TO THE VARIABLE
  // Array.from() IS AN IN-BUILT JAVASCRIPT METHOD // WE USE IT TO COLLECT ALL THE DIVS IN OUR GRID AND TURN IT INTO AN ARRAY WE CAN WORK WITH
  const ScoreDisplay = document.getElementById('#score')
  const StartBtn = document.getElementById('#start-button')
  const width = 10 // TELL JAVASCRIPT THE WIDTH OF OUR GRID IN SQUARES USING const //THE VALUE WILL NOT CHANGE SO WE USE const
  
//The tetrominoes
const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]  
]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2, width*2+1],
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2,width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    //PUT THE SHAPES IN AN ARRAY OF THEIR OWN

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    //DECIDE WHERE WE WANT TO START DRAWING OUR TETROMINOES ON THE SQUARES GRID
    let currentPosition = 4
    let currentRotation = 0

    //RANDOMLY SELECT A TETROMINO (FROM THE theTetriminoes ARRAY) AND ITS FIRST ROTATION
    let random = Math.floor(Math.random()*theTetrominoes.length) 
    //USE math.random AND MULTIPLY IT BY THE .length OF OUR TETRIMINOES ARRAY
    //THEN PASS THROUGH Math.floor TO ROUND DOWN THE NUMBER TO ITS NEAREST FULL INTEGER

    let current = theTetrominoes[random] [currentRotation] //PICK THE lTetrominoes FIRST ROTATION, THIS IS NOW CURRENT SHAPE

    //DRAW THE TETROMINO
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino') 
        })
    }

    //UNDRAW THE RANDOMLY CHOSEN TETROMINO AND ITS CURRENT ROTATION
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }
    
    //MAKE THE TETROMINO MOVE DOWN EVERY SECOND
    timerId = setInterval(moveDown, 1000) //WE ASSIGNED THIS TO timerId SO WE CAN STOP THE setInterval IN THE FUTURE

    //ASSIGN FUNCTIONS TO keyCodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    //MOVE DOWN FUNCTION
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //FREEZE FUNTION
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //START A NEW TETROMINO FALLING
            random = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    //MOVE THE TETROMINO LEFT, UNLESS IT IS AT THE EDGE OR THERE IS A BLOCKAGE
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition +=1
        }

        draw()
    }

    //MOVE THE TETROMINO RIGHT, UNLESS IT IS AT THE EDGE OR THERE IS A BLOCKAGE
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

        if(!isAtRightEdge) currentPosition +=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }
        draw()
    }

    //ROTATE THE TETROMINO
    function rotate() {
        undraw()
        currentRotation ++
        if(currentRotation === current.length) { //IF THE CURRENT ROTATION GETS TO 4, MAKE IT GO BACK TO 0
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }
    

})