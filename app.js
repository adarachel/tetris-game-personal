document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid') // USE A QUERY SELECTOR TO LOOK THROUGH OUR HTML DOCUMENT AND FIND THE ELEMENT WITH A CLASS NAME OF GRID
    let squares = Array.from(document.querySelectorAll('.grid div'))
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

    //DECIDE WHERE WE WAN TO START DRAWING OUR TETROMINOES ON THE SQUARES GRID
    let currentPosition = 4
    let current = theTetrominoes[0] [0] //PICK THE ltetrominoes FIRST ROTATION, THIS IS NOW CURRENT SHAPE

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    draw()

})