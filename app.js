document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid') // USE A QUERY SELECTOR TO LOOK THROUGH OUR HTML DOCUMENT AND FIND THE ELEMENT WITH A CLASS NAME OF GRID
  let squares = Array.from(document.querySelectorAll('.grid div')) // WE USE document.querySelector TO FIND THE ELEMENT IN THE HTML FILE AND ASSIGN IT TO THE VARIABLE
  // Array.from() IS AN IN-BUILT JAVASCRIPT METHOD // WE USE IT TO COLLECT ALL THE DIVS IN OUR GRID AND TURN IT INTO AN ARRAY WE CAN WORK WITH
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10 // TELL JAVASCRIPT THE WIDTH OF OUR GRID IN SQUARES USING const //THE VALUE WILL NOT CHANGE SO WE USE const
  let nextRandom = 0
  let timerId
  let score = 0
  
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
    // timerId = setInterval(moveDown, 1000) //WE ASSIGNED THIS TO timerId SO WE CAN STOP THE setInterval IN THE FUTURE

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
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
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

    //SHOW UP-NEXT TETROMINOES IN  MINI-GRID
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0

    //THE TETROMINOES WITHOUT ROTATIONS
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTtetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
    ]

    //DISPLAY THE SHAPE IN THE MINI-GRID DISPLAY
    function displayShape() {
        //REMOVE ANY TRACE OF A TETROMINO FROM THE ENTIRE GRID
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }

    //ADD FUNCTIONALITY TO THE BUTTON
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            displayShape()
        }
    })

    //ADD SCORE
    function addScore() {
        for(let i = 0; i < 199; i +=width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score +=10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    } 

    //GAME OVER 
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'end'
        clearInterval(timerId)
    } 
}
    

})