/*
Implementation for the A* algorithm Pseudocode: https://en.wikipedia.org/wiki/A*_search_algorithm
using the Taxicab distance between two nodes on the cartesian plane in the grid as a heuristic.
*/
var grid;
var w, h, star, end;
var openset = [];

var dx = [1, 0, -1, 0];
var dy = [0, 1, 0, -1];
var rectvalue = 20;
var buttom1, buttom2, buttom3, buttom4, buttom5, buttom6, buttom7, starAstar = false;
var point_mouse_x, point_mouse_y, do_ = 0;
point_mouse_x = point_mouse_y = -1;

function setup() {

    createCanvas(1200, 800);
    background(25, 25, 25);
    w = floor(width / rectvalue),
        h = floor(height / rectvalue);

    grid = new Array(h);

    for (var i = 0; i < h; i++) {
        grid[i] = new Array(w);

    }

    //generate grid
    for (var i = 0; i < h; i++) {


        for (var j = 0; j < w; j++) {
            grid[i][j] = new node(i, j);

        }

    }

    //gnerate neabours
    for (var i = 0; i < h; i++) {


        for (var j = 0; j < w; j++) {
            grid[i][j].my_neighbors();

        }

    }



    star = -1;
    end = -1;



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

    //
    let vis = createP('Visited ');
    let path_ = createP('The Path ... ');
    vis.style('background-color', color(246, 114, 128));
    path_.style('background-color', color(79, 152, 202));

    vis.style('width', '55px');
    path_.style('width', '90px');



}

function draw() {
    //background(50);


    //print point in grid
    if (do_ >= 2) {
        var save_i, svae_j;
        save_i = svae_j = -1;
        for (var i = 0; i < h; i++) {


            for (var j = 0; j < w; j++) {

                if ((grid[i][j].i * rectvalue) <= point_mouse_y && (grid[i][j].j * rectvalue) <= point_mouse_x && point_mouse_x <= width && point_mouse_y <= height) {
                    save_i = i, svae_j = j;
                }

            }

        }
        if (save_i != -1 && do_ == 2)
            star = grid[save_i][svae_j], grid[save_i][svae_j].color_node = [0, 200, 0];

        if (save_i != -1 && do_ == 3)
            grid[save_i][svae_j].wall = true, grid[save_i][svae_j].color_node = [27, 38, 44];

        if (save_i != -1 && do_ == 4)
            end = grid[save_i][svae_j], grid[save_i][svae_j].color_node = [200, 0, 0];


    }

    //A* Algo
    if (openset.length > 0 && starAstar) {

        //lowest cost of F
        var currnet = 0;
        for (var i = 0; i < openset.length; i++) {

            if (openset[currnet].f >= openset[i].f) {
                currnet = i;
            }

        }
        var currnet_node = openset[currnet];


        if (openset[currnet] == end) {
            openset[currnet].color_node = [255, 50, 0];

            return;

        }

        RemoveFromArray(currnet_node);
        currnet_node.visited = true;
        currnet_node.color_node = [246, 114, 128];
        //closeset.push(currnet_node);

        //the neighbors for each cell
        var currnet_neighbors = currnet_node.neighbors;
        //for all neighbors

        for (var n = 0; n < currnet_neighbors.length; n++) {

            var now_neighbor = currnet_neighbors[n];
            if (!now_neighbor.visited && !now_neighbor.wall) {

                var newpath = false;

                var tempG = currnet_node.g + Heuristic(now_neighbor, currnet_node);

                if (openset.includes(now_neighbor)) {

                    if (tempG < now_neighbor.g) {
                        now_neighbor.g = tempG;
                        newpath = true;
                    }

                } else {
                    now_neighbor.g = tempG;
                    openset.push(now_neighbor);
                    newpath = true;
                }

                if (newpath) {
                    now_neighbor.h = Heuristic(now_neighbor, end);
                    //the cost of function
                    now_neighbor.f = now_neighbor.g + now_neighbor.h;
                    now_neighbor.previous = currnet_node;
                }


            }



        }





    } else if (starAstar && openset.length == 0) {

        starAstar = false;

        path = [];
        return;

    }



    for (let i = 0; i < h; i++) {

        for (let j = 0; j < w; j++) {


            grid[i][j].show(grid[i][j].color_node[0], grid[i][j].color_node[1], grid[i][j].color_node[2]);

        }



    }



    if (starAstar) {
        //path
        path = [];
        var temp = currnet_node;
        path.push(temp);
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }


        for (var i = 0; i < path.length; i++) {

            path[i].show(79, 152, 202);

        }


    }



}




function RemoveFromArray(index) {

    for (let i = openset.length - 1; i >= 0; i--) {
        if (openset[i] == index)
            openset.splice(i, 1);
    }

}

function Heuristic(a, b) {

    //taxicab distance
    return Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
}



function Demo() {

    Clear();
    starAstar = true;

    //generate grid
    do_ = 1;
    for (var i = 0; i < h; i++) {


        for (var j = 0; j < w; j++) {

            if (Math.random(1) < 0.15 && star != grid[i][j] && end != grid[i][j]) {
                grid[i][j].wall = true;
                grid[i][j].color_node = [0, 0, 0];

            }

        }

    }

    //gnerate neabours



    star = grid[0][0];

    end = grid[h - 1][w - 1];
    end.color_node = [80, 216, 144];

    star.visited = end.visited = false;
    openset.push(star);


}


function Clear() {


    openset = [];

    for (var i = 0; i < h; i++) {


        for (var j = 0; j < w; j++) {
            //init  
            grid[i][j].wall = grid[i][j].visited = false;
            grid[i][j].f = grid[i][j].g = grid[i][j].h = 0;
            grid[i][j].previous = undefined;
            grid[i][j].wall = false;
            grid[i][j].color_node = [239, 255, 251];


        }

    }

    starAstar = false;
    draw();

}

function mouseDragged() {

    point_mouse_x = mouseX;
    point_mouse_y = mouseY;

}



function mousePressed() {

    point_mouse_x = mouseX;
    point_mouse_y = mouseY;

}


function Stop() {

    starAstar = false;
}


function Star() {
    if (star != -1 && end != -1)
        starAstar = true, openset.push(star);
}


function CreateStarPoint() {

    do_ = 2;

}


function CreateWall() {

    do_ = 3
}

function CreateTarget() {

    do_ = 4;

}