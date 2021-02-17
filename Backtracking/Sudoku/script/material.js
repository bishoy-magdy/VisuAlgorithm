var slider;
var speed;
var button;
var autoSolve = 0;
var generate;
var lasti, lastj;
var invalid = 0;
var inputsudoku;
var stop;
var takeanswer;
var takeAnswer;
var Size;
var ispressed=0;
function material() {
     //design
     createP('Difficulty');
     slider = createSlider(20, 60, 45, 5);
     generate = createButton('Generate');
     takeanswer=createButton('Input Answers');
     takeanswer.mousePressed(()=>{takeAnswer=1});
     createP('Frame Rate');
     speed = createSlider(1, 60, 30, 1);
     generateGrid();
     clearGrid();
     button = createButton('Auto Solve');
     button.style('margin:', 'auto');
     generate.mousePressed(Generate);
     button.mousePressed(AutoSolve);
     inputsudoku = createButton('Input Sudoku');
     inputsudoku.mousePressed(inputSudoku);
     stop = createButton('Original Sudoku');
     stop.mousePressed(Stop);
    

    
} 




function AutoSolve() {




    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            if (grid[i][j].value != 0 && grid[i][j].state == 0) {

                let temp = grid[i][j].value;
                grid[i][j].value = 0;
                if (!valid2(i, j, temp))
                    invalid = 1;

                grid[i][j].value = temp;

            }
        }
    }

    autoSolve = 1
}

function Generate() {
    autoSolve = 0;
    flagX = 0;
    takeAnswer=0;
    state = [];
    index = [];
    undo_stack = [];
    invalid = 0;
    clearGrid();
    sudokuGenerating(0, 0);
    RemoveDigit();
}


function inputSudoku() {
    takeAnswer=0;
    autoSolve = 0;
    flagX = 0;
    state = [];
    index = [];
    undo_stack = [];
    invalid = 0;
    clearGrid();
}

function Stop() {

    invalid = 0;
    autoSolve = 0;
    state = [];
    while (index.length) {
        let II = index[index.length - 1].first,
            JJ = index[index.length - 1].second;

        grid[II][JJ].value = 0;
        grid[II][JJ].state = 0;

        index.pop();

    }

    while (undo_stack.length) {
        let II = undo_stack[undo_stack.length - 1].first,
            JJ = undo_stack[undo_stack.length - 1].second;
        grid[II][JJ].value = 0;
        grid[II][JJ].state = 0;

        undo_stack.pop();

    }


}
