
function setup() {
    //set width & height of can
    createCanvas(700, 700);

    //the size of each react in grid
    Size = width / 9;

    //init carry of keyboard
    key = 0;

    //launch buttons and sliders
    material();
    

}

function draw() {

    //click auto solve button ? can change the speed frame
    if (autoSolve)
        frameRate(speed.value());
    else
        frameRate(60);


    drawGrid();

    if (keyIsPressed === true && key <= '9' && key >= '0' && state.length == 0 || key == 'Backspace') {
        if(!takeAnswer)
        key == 'Backspace' ? grid[lasti][lastj].value = 0 :  grid[lasti][lastj].value = key - '0';
        else if(grid[lasti][lastj].value==0)
        key == 'Backspace' ? grid[lasti][lastj].answer = 0 :  grid[lasti][lastj].answer = key - '0';



    }

    // more speed processing
    let extraspeed = (speed.value() == 60 ? 500 : 1);
    while (extraspeed--) {
        if (autoSolve)
            solvewithAnimation();
    }

    //check if sudoku is invalid in case the user input new sudoku
    if (invalid) {

        fill(255, 0, 0);
        textSize(Size * 0.8);
        text('Sudoku is Not Valid 😞', width / 2, height / 2);

    }
}
