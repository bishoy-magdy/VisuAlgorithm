function Point(x, y) {

    this.X = x;
    this.Y = y;
    this.color_point = [247, 242, 231];
    this.visited = false;
    this.dis = 0;
}


var grid = [];
var valueX = 20,
    w, h;

var stack = [];

var star_point, found = false;
var button1, button2, button3, button4, button5;

function setup() {

    createCanvas(1200, 800);
    w = width / valueX;
    h = height / valueX;
    background(25);

    for (var i = 0; i < w; i++) {

        for (var j = 0; j < h; j++) {

            grid.push(new Point(i, j));
        }


    }



    star_point = Math.floor((h) * (w / 2) + (h / 2));


    //stack.push(S);

    //buttom
    button2 = createButton('Create Start Point');

    button1 = createButton('Create Target Point');

    button3 = createButton('Create Wall');

    button4 = createButton('Start');

    button5 = createButton('Stop');

    buttom6 = createButton('Clear');
    buttom7 = createButton('Demo');

    let col = color(47, 196, 178);

    buttom7.style('background-color', col);
    buttom6.style('background-color', col);
    button5.style('background-color', col);
    button4.style('background-color', col);
    button3.style('background-color', col);
    button2.style('background-color', col);
    button1.style('background-color', col);
    //


    //action
    buttom7.mousePressed(Demo);
    buttom6.mousePressed(Clear);
    button5.mousePressed(Stop);
    button4.mousePressed(Star);
    button3.mousePressed(CreateWall);
    button2.mousePressed(CreateStarPoint);
    button1.mousePressed(CreateTarget);


}


var point_mouse_x, point_mouse_y;
point_mouse_y = point_mouse_x = null;
var flagx = null,
    startpoint;
var BFSstar = false,
    do_ = 0;

var Target = null;
var test = [50, 26, 20];

var distance = -1;

function draw() {
    background(50);

    for (var pos = 0; pos < grid.length; pos++) {
        fill(grid[pos].color_point[0], grid[pos].color_point[1], grid[pos].color_point[2], grid[pos].color_point[3]);
        rect(grid[pos].X * valueX, grid[pos].Y * valueX, valueX, valueX);

        if (point_mouse_x != null && do_ != 0) {

            if ((grid[pos].X * valueX) <= point_mouse_x && (grid[pos].Y * valueX) <= point_mouse_y && point_mouse_x <= width && point_mouse_y <= height) {

                flagx = pos;

            }
        }

    }


    if (flagx != null) {
        if (do_ == 1 && !grid[flagx].visited) {
            grid[flagx].color_point = [27, 38, 44];
            grid[flagx].visited = true;
            //do_ = 0;
        } else if (do_ == 2 && !grid[flagx].visited) {
            grid[flagx].color_point = [163, 93, 106];
            stack.push(flagx);
            startpoint = flagx;
            do_ = 0;

        } else if (do_ == 3 && !grid[flagx].visited) {
            grid[flagx].color_point = [82, 222, 151];
            Target = flagx;
            do_ = 0;
        }

        flagx = null;

    }
    if (stack.length >= 1 && BFSstar) {

        var star = stack.shift();

        if (grid[star].visited != true) {
            if (star == Target) {
                grid[star].color_point = [82, 222, 151];
                found = true;
                distance = grid[star].dis;
                Stop();

            } else if (startpoint != star)
                grid[star].color_point = [44, 120, 115];

            grid[star].visited = true;
            fill(255, 186, 90);
            rect(grid[star].X * valueX, grid[star].Y * valueX, valueX, valueX);
            var flag = false;

            // four directions U D L R 

            if (valid(star + h) && !grid[star + h].visited) {
                stack.push((star + h));
                grid[star + h].dis = grid[star].dis + 1;
            }
            if (valid(star - h) && !grid[star - h].visited) {

                stack.push(star - h);
                grid[star - h].dis = grid[star].dis + 1;
            }
            if (valid(star + 1) && grid[star + 1].X == grid[star].X && !grid[star + 1].visited) {

                stack.push(star + 1);
                grid[star + 1].dis = grid[star].dis + 1;
            }
            if (valid(star - 1) && grid[star - 1].X == grid[star].X && !grid[star - 1].visited) {

                stack.push(star - 1);
                grid[star - 1].dis = grid[star].dis + 1;
            }

        } else {
            if (grid[star].color_point[0] != 27) {
                fill(255, 0, 0);
                rect(grid[star].X * valueX, grid[star].Y * valueX, valueX, valueX);
            }
        }

    }


    if (found) {

        Print_(distance);
    }

}

function valid(x) {

    return x >= 0 && x < grid.length;
}

function mouseDragged() {

    point_mouse_x = mouseX;
    point_mouse_y = mouseY;

}



function mousePressed() {

    point_mouse_x = mouseX;
    point_mouse_y = mouseY;

}

function Star() {
    if (stack.length >= 1)
        BFSstar = true;
}

function Stop() {

    BFSstar = false;
}

function CreateWall() {

    do_ = 1;

}

function CreateStarPoint() {

    do_ = 2;

}

function CreateTarget() {

    do_ = 3;

}

function Clear() {
    Stop();
    grid = [];
    stack = [];
    found = false;
    for (var i = 0; i < w; i++) {

        for (var j = 0; j < h; j++) {

            grid.push(new Point(i, j));
        }


    }

}

function Demo() {


    Clear();

    var black = floor(grid.length / 5);
    startpoint = Math.floor((h) * (w / 2) + (h / 2));
    while (black--) {
        var block = floor(random(0, grid.length - 1));
        if (block != startpoint) {
            grid[block].visited = true;
            grid[block].color_point = [27, 38, 44];
        }
    }
    grid[startpoint].color_point = [163, 93, 106];
    stack.push(startpoint);
    Target = grid.length - 1;
    grid[Target].color_point = [82, 222, 151];

    Star();

}

function Print_(value) {

    textSize(42);
    textAlign(CENTER, CENTER);
    fill(207, 27, 27);

    text('The Distance from the starting point to the target is ' + distance + ' Steps', width / 2, height / 2);


}
