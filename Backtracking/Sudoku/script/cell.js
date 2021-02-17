var grid = [];

class cell {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.value = 0;
        this.state = 0;
        this.answer = 0;

    }
    //rect and boundary
    out() {

        noFill();
        noStroke();

        if (this.x < 3 && this.y < 3)
            fill(253, 223, 174);

        else if (this.x < 3 && this.y < 6)
            fill(168, 212, 197);

        else if (this.x < 3 && this.y < 9)
            fill(215, 209, 234);

        else if (this.x < 6 && this.y < 3)
            fill(211, 187, 221);

        else if (this.x < 6 && this.y < 6)
            fill(249, 207, 190);

        else if (this.x < 6 && this.y < 9)
            fill(243, 184, 209);

        else if (this.x < 9 && this.y < 3)
            fill(170, 221, 248);
        else if (this.x < 9 && this.y < 6)
            fill(217,230,177);
        else
            fill(162,205,239);



        strokeWeight(0.6);
        stroke(88, 90, 114);

        rect(this.y * Size, this.x * Size, Size, Size);

        //text and size 
        textAlign(CENTER);
        strokeWeight(Size * 0.02);
        textSize(Size / (20 / 9));

    }
    norm() {

        this.out();
        fill(0, 0, 0);
        if (this.value > 0)
            text(this.value, this.y * Size + Size / 2, this.x * Size + Size / 2);
    }
    // changing the color of the number to detect the state of each cell
    do() {

        this.out();
        fill(55,122,101);
        if (this.value > 0)
            text(this.value, this.y * Size + Size / 2, this.x * Size + Size / 2);

    }

    undo() {

        this.out();
        fill(239, 79, 79);
        if (this.value > 0)
            text(this.value, this.y * Size + Size / 2, this.x * Size + Size / 2);

    }

    draw() {

        if (this.state == 0)
            this.norm();
        else if (this.state == 1)
            this.do();
        else
            this.undo();

        //drawing digit answer in top-left
        if (this.answer != 0) {
            textSize(23);
            if (this.value != 0 && this.value == this.answer)
                fill(255, 215, 0);
            else
                fill(255, 0, 0);
            text(this.answer, this.y * Size + Size / 4, this.x * Size + Size / 4);

        }

    }


}

function drawGrid() {

    for (var i = 0; i < 9; i++) {

        for (var j = 0; j < 9; j++) {

            // to know the position which cell the mouse touch it
            if (ispressed && mouseX <= (j * Size + Size) && mouseY <= (i * Size + Size) &&
                mouseX >= (j * Size) && mouseY >= (i * Size)) {

                lasti = i, lastj = j;

                ispressed = 0;
            }
            grid[i][j].draw();


        }

    }

    //boundary
    // the size not systematic
    noFill();
    strokeWeight(Size * 0.075);
    rect(0, 0, 9 * Size, 9 * Size);
    strokeWeight(Size * 0.05);

    line(3 * Size, 0, 3 * Size, 9 * Size);
    line(6 * Size, 0, 6 * Size, 9 * Size);

    line(0, 3 * Size, 9 * Size, 3 * Size);
    line(0, 6 * Size, 9 * Size, 6 * Size);

}

function generateGrid() {

    for (var i = 0; i < 9; i++) {
        // list of list
        grid[i] = new Array(9);

    }

    for (var i = 0; i < 9; i++) {

        for (var j = 0; j < 9; j++) {
            // init cell
            grid[i][j] = new cell(i, j);

        }

    }
}

function clearGrid() {
    state = [];
    index = [];
    undo_stack = [];
    for (var i = 0; i < 9; i++) {

        for (var j = 0; j < 9; j++) {

            grid[i][j].value = 0;
            grid[i][j].state = 0;
            grid[i][j].answer = 0;


        }

    }

}

function mouseClicked() {

    ispressed = 1;
}

function keyPressed() {
    return key;
}